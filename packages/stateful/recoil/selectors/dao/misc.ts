import uniq from 'lodash.uniq'
import { selectorFamily, waitForAll, waitForAllSettled } from 'recoil'

import {
  DaoCoreV2Selectors,
  DaoVotingCw20StakedSelectors,
  accountsSelector,
  addressIsModuleSelector,
  contractInfoSelector,
  contractInstantiateTimeSelector,
  contractVersionSelector,
  isDaoSelector,
  moduleAddressSelector,
  queryContractIndexerSelector,
  queryWalletIndexerSelector,
  refreshProposalsIdAtom,
  reverseLookupPolytoneProxySelector,
} from '@dao-dao/state'
import {
  ChainId,
  ContractVersion,
  ContractVersionInfo,
  DaoInfo,
  DaoPageMode,
  DaoParentInfo,
  DaoWithDropdownVetoableProposalList,
  DaoWithVetoableProposals,
  Feature,
  IndexerDaoWithVetoableProposals,
  ProposalModule,
  StatefulProposalLineProps,
  SupportedFeatureMap,
  WithChainId,
} from '@dao-dao/types'
import { ConfigResponse as CwCoreV1ConfigResponse } from '@dao-dao/types/contracts/CwCore.v1'
import { ConfigResponse as DaoCoreV2ConfigResponse } from '@dao-dao/types/contracts/DaoCore.v2'
import {
  CHAIN_SUBDAOS,
  DAO_CORE_CONTRACT_NAMES,
  DaoVotingCw20StakedAdapterId,
  NEUTRON_GOVERNANCE_DAO,
  VETOABLE_DAOS_ITEM_KEY_PREFIX,
  getChainGovernanceDaoDescription,
  getConfiguredChainConfig,
  getDaoProposalPath,
  getDisplayNameForChainId,
  getFallbackImage,
  getImageUrlForChainId,
  getSupportedFeatures,
  isConfiguredChainName,
  isFeatureSupportedByVersion,
  mustGetConfiguredChainConfig,
  parseContractVersion,
} from '@dao-dao/utils'

import { fetchProposalModules } from '../../../utils/fetchProposalModules'
import { matchAdapter as matchVotingModuleAdapter } from '../../../voting-module-adapter'
import { daoDropdownInfoSelector } from './cards'

export const daoCoreProposalModulesSelector = selectorFamily<
  ProposalModule[],
  WithChainId<{ coreAddress: string }>
>({
  key: 'daoCoreProposalModules',
  get:
    ({ coreAddress, chainId }) =>
    async ({ get }) => {
      const coreVersion = get(
        contractVersionSelector({
          contractAddress: coreAddress,
          chainId,
        })
      )

      return await fetchProposalModules(chainId, coreAddress, coreVersion)
    },
})

// Gets CW20 governance token address if this DAO uses the cw20-staked voting
// module adapter.
export const daoCw20GovernanceTokenAddressSelector = selectorFamily<
  string | undefined,
  WithChainId<{
    coreAddress: string
  }>
>({
  key: 'daoCw20GovernanceTokenAddress',
  get:
    ({ coreAddress, chainId }) =>
    ({ get }) => {
      const votingModuleAddress = get(
        DaoCoreV2Selectors.votingModuleSelector({
          contractAddress: coreAddress,
          chainId,
          params: [],
        })
      )
      const votingModuleInfo = votingModuleAddress
        ? get(
            contractInfoSelector({
              contractAddress: votingModuleAddress,
              chainId,
            })
          )
        : undefined

      let usesCw20VotingModule
      try {
        usesCw20VotingModule =
          !!votingModuleInfo &&
          matchVotingModuleAdapter(votingModuleInfo.info.contract)?.id ===
            DaoVotingCw20StakedAdapterId
      } catch {
        usesCw20VotingModule = false
      }

      const cw20GovernanceTokenAddress =
        votingModuleAddress && usesCw20VotingModule
          ? get(
              DaoVotingCw20StakedSelectors.tokenContractSelector({
                contractAddress: votingModuleAddress,
                chainId,
                params: [],
              })
            )
          : undefined

      return cw20GovernanceTokenAddress
    },
})

// Retrieve all potential SubDAOs of the DAO from the indexer.
export const daoPotentialSubDaosSelector = selectorFamily<
  string[],
  WithChainId<{
    coreAddress: string
  }>
>({
  key: 'daoPotentialSubDaos',
  get:
    ({ coreAddress, chainId }) =>
    ({ get }) => {
      const potentialSubDaos: {
        contractAddress: string
        info: ContractVersionInfo
      }[] = get(
        queryContractIndexerSelector({
          chainId,
          contractAddress: coreAddress,
          formula: 'daoCore/potentialSubDaos',
          noFallback: true,
        })
      )

      // Filter out those that do not appear to be DAO contracts and also the
      // contract itself since it is probably its own admin.
      return potentialSubDaos
        .filter(
          ({ contractAddress, info }) =>
            contractAddress !== coreAddress &&
            DAO_CORE_CONTRACT_NAMES.some((name) => info.contract.includes(name))
        )
        .map(({ contractAddress }) => contractAddress)
    },
})

export const daoInfoSelector = selectorFamily<
  DaoInfo,
  {
    chainId: string
    coreAddress: string
  }
>({
  key: 'daoInfo',
  get:
    ({ chainId, coreAddress }) =>
    ({ get }) => {
      // Native chain governance.
      if (isConfiguredChainName(chainId, coreAddress)) {
        // Neutron uses an actual DAO so load it instead.
        if (chainId === ChainId.NeutronMainnet) {
          coreAddress = NEUTRON_GOVERNANCE_DAO
        } else {
          const govModuleAddress = get(
            moduleAddressSelector({
              chainId,
              name: 'gov',
            })
          )
          const accounts = get(
            accountsSelector({
              chainId,
              address: govModuleAddress,
            })
          )

          return {
            chainId,
            coreAddress: mustGetConfiguredChainConfig(chainId).name,
            coreVersion: ContractVersion.Gov,
            supportedFeatures: Object.values(Feature).reduce(
              (acc, feature) => ({
                ...acc,
                [feature]: false,
              }),
              {} as SupportedFeatureMap
            ),
            votingModuleAddress: '',
            votingModuleContractName: '',
            proposalModules: [],
            name: getDisplayNameForChainId(chainId),
            description: getChainGovernanceDaoDescription(chainId),
            imageUrl: getImageUrlForChainId(chainId),
            created: undefined,
            isActive: true,
            activeThreshold: null,
            items: {},
            polytoneProxies: {},
            accounts,
            parentDao: null,
            admin: '',
          }
        }
      }

      // Otherwise get DAO info from contract.

      const dumpState = get(
        DaoCoreV2Selectors.dumpStateSelector({
          contractAddress: coreAddress,
          chainId,
          params: [],
        })
      )
      if (!dumpState) {
        throw new Error('DAO failed to dump state.')
      }

      const votingModuleAddress =
        typeof dumpState.voting_module === 'string'
          ? dumpState.voting_module
          : 'addr' in dumpState.voting_module
          ? dumpState.voting_module.addr
          : ''

      const [
        // Non-loadables
        [
          coreVersion,
          votingModuleInfo,
          proposalModules,
          created,
          _items,
          polytoneProxies,
          accounts,
        ],
        // Loadables
        [isActiveResponse, activeThresholdResponse],
      ] = get(
        waitForAll([
          // Non-loadables
          waitForAll([
            contractVersionSelector({
              contractAddress: coreAddress,
              chainId,
            }),
            contractInfoSelector({
              contractAddress: votingModuleAddress,
              chainId,
            }),
            daoCoreProposalModulesSelector({
              coreAddress,
              chainId,
            }),
            contractInstantiateTimeSelector({
              address: coreAddress,
              chainId,
            }),
            DaoCoreV2Selectors.listAllItemsSelector({
              contractAddress: coreAddress,
              chainId,
            }),
            DaoCoreV2Selectors.polytoneProxiesSelector({
              contractAddress: coreAddress,
              chainId,
            }),
            accountsSelector({
              address: coreAddress,
              chainId,
            }),
          ]),
          // Loadables
          waitForAllSettled([
            // All voting modules use the same active threshold queries, so it's
            // safe to use the cw20-staked selector.
            DaoVotingCw20StakedSelectors.isActiveSelector({
              contractAddress: votingModuleAddress,
              chainId,
              params: [],
            }),
            DaoVotingCw20StakedSelectors.activeThresholdSelector({
              contractAddress: votingModuleAddress,
              chainId,
              params: [],
            }),
          ]),
        ])
      )

      const votingModuleContractName =
        votingModuleInfo?.info.contract || 'fallback'

      // Some voting modules don't support the isActive query, so if the query
      // fails, assume active.
      const isActive =
        isActiveResponse.state === 'hasError' ||
        (isActiveResponse.state === 'hasValue' &&
          isActiveResponse.contents.active)
      const activeThreshold =
        (activeThresholdResponse.state === 'hasValue' &&
          activeThresholdResponse.contents.active_threshold) ||
        null

      // Convert items list into map.
      const items = _items.reduce(
        (acc, [key, value]) => ({
          ...acc,
          [key]: value,
        }),
        {} as Record<string, string>
      )

      const { admin } = dumpState

      const parentDao: DaoParentInfo | null =
        admin && admin !== coreAddress
          ? get(
              daoParentInfoSelector({
                chainId,
                parentAddress: admin,
                childAddress: coreAddress,
              })
            ) || null
          : null

      const daoInfo: DaoInfo = {
        chainId,
        coreAddress,
        coreVersion,
        supportedFeatures: getSupportedFeatures(coreVersion),
        votingModuleAddress,
        votingModuleContractName,
        proposalModules,
        name: dumpState.config.name,
        description: dumpState.config.description,
        imageUrl: dumpState.config.image_url || null,
        created,
        isActive,
        activeThreshold,
        items,
        polytoneProxies,
        accounts,
        parentDao,
        admin,
      }

      return daoInfo
    },
})

/**
 * Attempt to fetch the info needed to describe a parent DAO. Returns undefined
 * if not a DAO nor the chain gov module account.
 */
export const daoParentInfoSelector = selectorFamily<
  DaoParentInfo | undefined,
  WithChainId<{
    parentAddress: string
    /**
     * To determine if the parent has registered the child, pass the child. This
     * will set `registeredSubDao` appropriately. Otherwise, if undefined,
     * `registeredSubDao` will be set to false.
     */
    childAddress?: string
  }>
>({
  key: 'daoParentInfo',
  get:
    ({ chainId, parentAddress, childAddress }) =>
    ({ get }) => {
      // If address is a DAO contract...
      if (
        get(
          isDaoSelector({
            chainId,
            address: parentAddress,
          })
        )
      ) {
        const parentAdmin = get(
          DaoCoreV2Selectors.adminSelector({
            chainId,
            contractAddress: parentAddress,
            params: [],
          })
        )
        const {
          info: { version },
        } = get(
          contractInfoSelector({
            chainId,
            contractAddress: parentAddress,
          })
        )
        const parentVersion = parseContractVersion(version)

        if (parentVersion) {
          const {
            name,
            image_url,
          }: CwCoreV1ConfigResponse | DaoCoreV2ConfigResponse = get(
            // Both v1 and v2 have a config query.
            DaoCoreV2Selectors.configSelector({
              chainId,
              contractAddress: parentAddress,
              params: [],
            })
          )

          // Check if parent has registered the child DAO as a SubDAO.
          const registeredSubDao =
            childAddress &&
            isFeatureSupportedByVersion(Feature.SubDaos, parentVersion)
              ? get(
                  DaoCoreV2Selectors.listAllSubDaosSelector({
                    contractAddress: parentAddress,
                    chainId,
                  })
                ).some(({ addr }) => addr === childAddress)
              : false

          return {
            chainId,
            coreAddress: parentAddress,
            coreVersion: parentVersion,
            name,
            imageUrl: image_url || getFallbackImage(parentAddress),
            admin: parentAdmin ?? '',
            registeredSubDao,
          }
        }

        // If address is the chain's x/gov module account...
      } else if (
        get(
          addressIsModuleSelector({
            chainId,
            address: parentAddress,
            moduleName: 'gov',
          })
        )
      ) {
        const chainConfig = getConfiguredChainConfig(chainId)
        return (
          chainConfig && {
            chainId,
            coreAddress: chainConfig.name,
            coreVersion: ContractVersion.Gov,
            name: getDisplayNameForChainId(chainId),
            imageUrl: getImageUrlForChainId(chainId),
            admin: '',
            registeredSubDao:
              !!childAddress &&
              !!CHAIN_SUBDAOS[chainId]?.includes(childAddress),
          }
        )
      }
    },
})

export const daoInfoFromPolytoneProxySelector = selectorFamily<
  | {
      chainId: string
      coreAddress: string
      info: DaoInfo
    }
  | undefined,
  WithChainId<{ proxy: string }>
>({
  key: 'daoInfoFromPolytoneProxy',
  get:
    (params) =>
    ({ get }) => {
      const { chainId, address } =
        get(reverseLookupPolytoneProxySelector(params)) ?? {}
      if (!chainId || !address) {
        return
      }

      // Get DAO info on source chain.
      const info = get(
        daoInfoSelector({
          chainId,
          coreAddress: address,
        })
      )

      return {
        chainId,
        coreAddress: address,
        info,
      }
    },
})

/**
 * DAOs this DAO has enabled vetoable proposal listing for.
 */
export const daoVetoableDaosSelector = selectorFamily<
  { chainId: string; coreAddress: string }[],
  WithChainId<{ coreAddress: string }>
>({
  key: 'daoVetoableDaos',
  get:
    ({ chainId, coreAddress }) =>
    ({ get }) =>
      get(
        DaoCoreV2Selectors.listAllItemsWithPrefixSelector({
          chainId,
          contractAddress: coreAddress,
          prefix: VETOABLE_DAOS_ITEM_KEY_PREFIX,
        })
      ).map(([key]) => {
        const [chainId, coreAdress] = key.split(':')

        return {
          chainId,
          coreAddress: coreAdress,
        }
      }),
})

/**
 * Proposals which this DAO can currently veto.
 */
export const daosWithVetoableProposalsSelector = selectorFamily<
  DaoWithVetoableProposals[],
  WithChainId<{
    coreAddress: string
    /**
     * Include even DAOs not added to the vetoable DAOs list. By default, this
     * will filter out DAOs not explicitly registered in the list.
     */
    includeAll?: boolean
  }>
>({
  key: 'daosWithVetoableProposals',
  get:
    ({ chainId, coreAddress, includeAll = false }) =>
    ({ get }) => {
      // Refresh this when all proposals refresh.
      const id = get(refreshProposalsIdAtom)

      const accounts = get(
        accountsSelector({
          chainId,
          address: coreAddress,
        })
      )

      // Load DAOs this DAO has enabled vetoable proposal listing for.
      const vetoableDaos =
        !includeAll &&
        get(
          isDaoSelector({
            chainId,
            address: coreAddress,
          })
        )
          ? get(
              waitForAllSettled([
                daoVetoableDaosSelector({
                  chainId,
                  coreAddress,
                }),
              ])
            )[0].valueMaybe() || []
          : []

      const daoVetoableProposalsPerChain = (
        get(
          waitForAll(
            accounts.map(({ chainId, address }) =>
              queryWalletIndexerSelector({
                chainId,
                walletAddress: address,
                formula: 'veto/vetoableProposals',
                id,
                noFallback: true,
              })
            )
          )
        ) as (IndexerDaoWithVetoableProposals[] | undefined)[]
      )
        .flatMap((data, index) =>
          (data || []).map((d) => ({
            chainId: accounts[index].chainId,
            ...d,
          }))
        )
        .filter(
          ({ chainId, dao }) =>
            includeAll ||
            vetoableDaos.some(
              (vetoable) =>
                vetoable.chainId === chainId && vetoable.coreAddress === dao
            )
        )

      const uniqueChainsAndDaos = uniq(
        daoVetoableProposalsPerChain.map(
          ({ chainId, dao }) => `${chainId}:${dao}`
        )
      )

      const daoConfigAndProposalModules = get(
        waitForAllSettled(
          uniqueChainsAndDaos.map((chainAndDao) => {
            const [chainId, coreAddress] = chainAndDao.split(':')
            return waitForAll([
              DaoCoreV2Selectors.configSelector({
                chainId,
                contractAddress: coreAddress,
                params: [],
              }),
              daoCoreProposalModulesSelector({
                chainId,
                coreAddress,
              }),
            ])
          })
        )
      )

      return uniqueChainsAndDaos.flatMap((chainAndDao, index) => {
        const daoData = daoConfigAndProposalModules[index]

        return daoData.state === 'hasValue'
          ? {
              chainId: chainAndDao.split(':')[0],
              dao: chainAndDao.split(':')[1],
              name: daoData.contents[0].name,
              proposalModules: daoData.contents[1],
              proposalsWithModule: daoVetoableProposalsPerChain.find(
                (vetoable) =>
                  `${vetoable.chainId}:${vetoable.dao}` === chainAndDao
              )!.proposalsWithModule,
            }
          : []
      })
    },
})

/**
 * Proposals which this DAO can currently veto grouped by DAO with dropdown
 * info.
 */
export const daosWithDropdownVetoableProposalListSelector = selectorFamily<
  DaoWithDropdownVetoableProposalList<StatefulProposalLineProps>[],
  WithChainId<{ coreAddress: string; daoPageMode: DaoPageMode }>
>({
  key: 'daosWithDropdownVetoableProposalList',
  get:
    ({ daoPageMode, ...params }) =>
    ({ get }) => {
      const daosWithVetoableProposals = get(
        daosWithVetoableProposalsSelector(params)
      )

      const daoDropdownInfos = get(
        waitForAllSettled(
          daosWithVetoableProposals.map(({ chainId, dao }) =>
            daoDropdownInfoSelector({
              chainId,
              coreAddress: dao,
            })
          )
        )
      )

      return daosWithVetoableProposals.flatMap(
        ({
          chainId,
          dao,
          proposalModules,
          proposalsWithModule,
        }):
          | DaoWithDropdownVetoableProposalList<StatefulProposalLineProps>
          | [] => {
          const dropdownInfo = daoDropdownInfos
            .find(
              (info) =>
                info.state === 'hasValue' &&
                info.contents.chainId === chainId &&
                info.contents.coreAddress === dao
            )
            ?.valueMaybe()

          if (!dropdownInfo) {
            return []
          }

          return {
            dao: dropdownInfo,
            proposals: proposalsWithModule.flatMap(
              ({ proposalModule: { prefix }, proposals }) =>
                proposals.map(
                  ({ id }): StatefulProposalLineProps => ({
                    chainId,
                    coreAddress: dao,
                    proposalModules,
                    proposalId: `${prefix}${id}`,
                    proposalViewUrl: getDaoProposalPath(
                      daoPageMode,
                      dao,
                      `${prefix}${id}`
                    ),
                    isPreProposeProposal: false,
                  })
                )
            ),
          }
        }
      )
    },
})
