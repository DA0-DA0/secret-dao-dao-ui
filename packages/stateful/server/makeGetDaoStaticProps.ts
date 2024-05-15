import { Chain } from '@chain-registry/types'
import { fromBase64 } from '@cosmjs/encoding'
import type { GetStaticProps, GetStaticPropsResult, Redirect } from 'next'
import { TFunction } from 'next-i18next'
import removeMarkdown from 'remove-markdown'

import { serverSideTranslationsWithServerT } from '@dao-dao/i18n/serverSideTranslations'
import {
  DaoCoreV2QueryClient,
  DaoVotingCw20StakedQueryClient,
  PolytoneNoteQueryClient,
  queryIndexer,
} from '@dao-dao/state'
import {
  Account,
  AccountType,
  ActiveThreshold,
  ChainId,
  CommonProposalInfo,
  ContractVersion,
  ContractVersionInfo,
  DaoPageMode,
  DaoParentInfo,
  Feature,
  GovProposalVersion,
  GovProposalWithDecodedContent,
  IndexerDumpState,
  InfoResponse,
  PolytoneProxies,
  ProposalModule,
  ProposalV1,
  ProposalV1Beta1,
  SupportedFeatureMap,
} from '@dao-dao/types'
import {
  Config,
  ListItemsResponse,
  ProposalModuleWithInfo,
} from '@dao-dao/types/contracts/DaoCore.v2'
import { cosmos } from '@dao-dao/types/protobuf'
import {
  CHAIN_SUBDAOS,
  CI,
  CommonError,
  ContractName,
  DAO_CORE_ACCENT_ITEM_KEY,
  DAO_STATIC_PROPS_CACHE_SECONDS,
  INVALID_CONTRACT_ERROR_SUBSTRINGS,
  LEGACY_DAO_CONTRACT_NAMES,
  LEGACY_URL_PREFIX,
  MAINNET,
  MAX_META_CHARS_PROPOSAL_DESCRIPTION,
  NEUTRON_GOVERNANCE_DAO,
  addressIsModule,
  cosmosSdkVersionIs46OrHigher,
  decodeGovProposal,
  extractAddressFromMaybeSecretContractInfo,
  getChainForChainId,
  getChainGovernanceDaoDescription,
  getChainIdForAddress,
  getConfiguredGovChainByName,
  getCosmWasmClientForChainId,
  getDaoPath,
  getDisplayNameForChainId,
  getImageUrlForChainId,
  getRpcForChainId,
  getSupportedChainConfig,
  getSupportedFeatures,
  isFeatureSupportedByVersion,
  isValidBech32Address,
  parseContractVersion,
  polytoneNoteProxyMapToChainIdMap,
  processError,
  retry,
} from '@dao-dao/utils'

import { DaoPageWrapperProps } from '../components'
import {
  ProposalModuleAdapterError,
  matchAndLoadAdapter,
} from '../proposal-module-adapter'
import {
  fetchProposalModules,
  fetchProposalModulesWithInfoFromChain,
} from '../utils/fetchProposalModules'

interface GetDaoStaticPropsMakerProps {
  leadingTitle?: string
  followingTitle?: string
  overrideTitle?: string
  overrideDescription?: string
  overrideImageUrl?: string
  additionalProps?: Record<string, any> | null | undefined
  url?: string
}

interface GetDaoStaticPropsMakerOptions {
  appMode: DaoPageMode
  coreAddress?: string
  getProps?: (options: {
    context: Parameters<GetStaticProps>[0]
    t: TFunction
    chain: Chain
    coreAddress: string
    coreVersion: ContractVersion
    proposalModules: ProposalModule[]
  }) =>
    | GetDaoStaticPropsMakerProps
    | undefined
    | null
    | Promise<GetDaoStaticPropsMakerProps | undefined | null>
}

type GetDaoStaticPropsMaker = (
  options: GetDaoStaticPropsMakerOptions
) => GetStaticProps<DaoPageWrapperProps>

export class LegacyDaoError extends Error {
  constructor() {
    super()
    this.name = 'LegacyDaoError'
  }
}

// Computes DaoPageWrapperProps for the DAO with optional alterations.
export const makeGetDaoStaticProps: GetDaoStaticPropsMaker =
  ({ appMode, coreAddress: _coreAddress, getProps }) =>
  async (context) => {
    // Don't query chain if running in CI.
    if (CI) {
      return { notFound: true }
    }

    // Load server translations and get T function for use in getProps.
    const { i18nProps, serverT } = await serverSideTranslationsWithServerT(
      context.locale,
      ['translation']
    )

    let coreAddress = (_coreAddress ?? context.params?.address) as string

    // Check if address is actually the name of a chain so we can resolve the
    // gov module.
    let chainConfig =
      coreAddress && typeof coreAddress === 'string'
        ? getConfiguredGovChainByName(coreAddress)
        : undefined

    // Render Neutron DAO instead of chain governance.
    if (chainConfig?.chainId === ChainId.NeutronMainnet) {
      coreAddress = NEUTRON_GOVERNANCE_DAO
      chainConfig = undefined
    }

    // Load chain gov module.
    if (chainConfig) {
      const { name: chainName, chain, accentColor } = chainConfig

      // Must be called after server side translations has been awaited, because
      // props may use the `t` function, and it won't be available until after.
      const {
        leadingTitle,
        followingTitle,
        overrideTitle,
        overrideDescription,
        additionalProps,
        url,
      } =
        (await getProps?.({
          context,
          t: serverT,
          chain,
          coreAddress: chainName,
          coreVersion: ContractVersion.Gov,
          proposalModules: [],
        })) ?? {}

      const description =
        overrideDescription ?? getChainGovernanceDaoDescription(chain.chain_id)
      const props: DaoPageWrapperProps = {
        ...i18nProps,
        url: url ?? null,
        title:
          overrideTitle ??
          [
            leadingTitle?.trim(),
            getDisplayNameForChainId(chain.chain_id),
            followingTitle?.trim(),
          ]
            .filter(Boolean)
            .join(' | '),
        description,
        accentColor,
        serializedInfo: {
          chainId: chain.chain_id,
          coreAddress: chainName,
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
          name: getDisplayNameForChainId(chain.chain_id),
          description,
          imageUrl: getImageUrlForChainId(chain.chain_id),
          created: null,
          isActive: true,
          activeThreshold: null,
          items: {},
          polytoneProxies: {},
          accounts: [
            {
              type: AccountType.Native,
              chainId: chain.chain_id,
              address: chainConfig.name,
            },
          ],
          parentDao: null,
          admin: '',
        },
        ...additionalProps,
      }

      return {
        props,
        // No need to regenerate this page as the props for a chain's DAO are
        // constant. The values above can only change when a new version of the
        // frontend is deployed, in which case the static pages will regenerate.
        revalidate: false,
      }
    }

    // Get chain ID for address based on prefix.
    let decodedChainId: string
    try {
      // If invalid address, display not found.
      if (!coreAddress || typeof coreAddress !== 'string') {
        throw new Error('Invalid address')
      }

      decodedChainId = getChainIdForAddress(coreAddress)

      // Validation throws error if address prefix not recognized. Display not
      // found in this case.
    } catch (err) {
      console.error(err)

      // Excluding `info` will render DAONotFound.
      return {
        props: {
          ...i18nProps,
          title: serverT('title.daoNotFound'),
          description: err instanceof Error ? err.message : `${err}`,
        },
      }
    }

    const getForChainId = async (
      chainId: string
    ): Promise<GetStaticPropsResult<DaoPageWrapperProps>> => {
      // If address is polytone proxy, redirect to DAO on native chain.
      try {
        const addressInfo = await queryIndexer<ContractVersionInfo>({
          type: 'contract',
          chainId,
          address: coreAddress,
          formula: 'info',
        })
        if (
          addressInfo &&
          addressInfo.contract === ContractName.PolytoneProxy
        ) {
          // Get voice for this proxy on destination chain.
          const voice = await queryIndexer({
            type: 'contract',
            chainId,
            // proxy
            address: coreAddress,
            formula: 'polytone/proxy/instantiator',
          })

          const dao = await queryIndexer({
            type: 'contract',
            chainId,
            address: voice,
            formula: 'polytone/voice/remoteController',
            args: {
              // proxy
              address: coreAddress,
            },
          })

          return {
            redirect: {
              destination: getDaoPath(appMode, dao),
              permanent: true,
            },
          }
        }
      } catch {
        // If failed, ignore.
      }

      // Add to Sentry error tags if error occurs.
      let coreVersion: ContractVersion | undefined
      try {
        const {
          admin,
          config,
          version,
          votingModule: {
            address: votingModuleAddress,
            info: votingModuleInfo,
          },
          activeProposalModules,
          created,
          isActive,
          activeThreshold,
          parentDao,
          items: _items,
          polytoneProxies,
        } = await daoCoreDumpState(chainId, coreAddress, serverT)
        coreVersion = version

        // If no contract name, will display fallback voting module adapter.
        const votingModuleContractName =
          (votingModuleInfo &&
            'contract' in votingModuleInfo &&
            votingModuleInfo.contract) ||
          'fallback'

        // Get DAO proposal modules.
        const proposalModules = await fetchProposalModules(
          chainId,
          coreAddress,
          coreVersion,
          activeProposalModules
        )

        // Convert items list into map.
        const items = _items.reduce(
          (acc, [key, value]) => ({
            ...acc,
            [key]: value,
          }),
          {} as Record<string, string>
        )

        const accounts: Account[] = [
          // Current chain.
          {
            chainId,
            address: coreAddress,
            type: AccountType.Native,
          },
          // Polytone.
          ...Object.entries(polytoneProxies).map(
            ([chainId, address]): Account => ({
              chainId,
              address,
              type: AccountType.Polytone,
            })
          ),
          // The above accounts are the ones we already have. The rest of the
          // accounts are loaded once the page loads (in `DaoPageWrapper`) since
          // they are more complex and will probably expand over time.
        ]

        // Must be called after server side translations has been awaited,
        // because props may use the `t` function, and it won't be available
        // until after.
        const {
          leadingTitle,
          followingTitle,
          overrideTitle,
          overrideDescription,
          overrideImageUrl,
          additionalProps,
          url,
        } =
          (await getProps?.({
            context,
            t: serverT,
            chain: getChainForChainId(chainId),
            coreAddress,
            coreVersion,
            proposalModules,
          })) ?? {}

        const props: DaoPageWrapperProps = {
          ...i18nProps,
          url: url ?? null,
          title:
            overrideTitle ??
            [leadingTitle?.trim(), config.name.trim(), followingTitle?.trim()]
              .filter(Boolean)
              .join(' | '),
          description: overrideDescription ?? config.description,
          accentColor: items[DAO_CORE_ACCENT_ITEM_KEY] || null,
          serializedInfo: {
            chainId,
            coreAddress,
            coreVersion,
            supportedFeatures: getSupportedFeatures(coreVersion),
            votingModuleAddress,
            votingModuleContractName,
            proposalModules,
            name: config.name,
            description: config.description,
            imageUrl: overrideImageUrl ?? config.image_url ?? null,
            created: created?.toJSON() ?? null,
            isActive,
            activeThreshold,
            items,
            polytoneProxies,
            accounts,
            parentDao,
            admin: admin ?? null,
          },
          ...additionalProps,
        }

        return {
          props,
          // Regenerate the page at most once per `revalidate` seconds. Serves
          // cached copy and refreshes in background.
          revalidate: DAO_STATIC_PROPS_CACHE_SECONDS,
        }
      } catch (error) {
        // Redirect.
        if (error instanceof RedirectError) {
          return {
            redirect: error.redirect,
          }
        }

        // Redirect legacy DAOs (legacy multisigs redirected in next.config.js
        // redirects list).
        if (
          error instanceof LegacyDaoError ||
          (error instanceof Error &&
            error.message.includes(
              'Query failed with (18): Error parsing into type cw3_dao::msg::QueryMsg: unknown variant `dump_state`'
            ))
        ) {
          return {
            redirect: {
              destination:
                LEGACY_URL_PREFIX + getDaoPath(DaoPageMode.Dapp, coreAddress),
              permanent: false,
            },
          }
        }

        console.error(error)

        if (
          error instanceof Error &&
          (error.message.includes('contract: not found') ||
            error.message.includes('no such contract') ||
            error.message.includes('Error parsing into type') ||
            error.message.includes('decoding bech32 failed') ||
            error.message.includes('dumpState reason: Unexpected token'))
        ) {
          // Excluding `info` will render DAONotFound.
          return {
            props: {
              ...i18nProps,
              title: 'DAO not found',
              description: '',
            },
            // Regenerate the page at most once per second. Serves cached copy
            // and refreshes in background.
            revalidate: 1,
          }
        }

        // Return error in props to trigger client-side 500 error.
        return {
          props: {
            ...i18nProps,
            title: serverT('title.500'),
            description: '',
            // Report to Sentry.
            error: processError(error, {
              tags: {
                coreAddress,
                coreVersion: coreVersion ?? '<undefined>',
              },
              extra: { context },
            }),
          },
          // Regenerate the page at most once per second. Serves cached copy and
          // refreshes in background.
          revalidate: 1,
        }
      }
    }

    const result = await getForChainId(decodedChainId)

    // If not found on Terra, try Terra Classic. Let redirects and errors
    // through.
    if (
      MAINNET &&
      'props' in result &&
      // If no serialized info, no DAO found.
      !result.props.serializedInfo &&
      // Don't try Terra Classic if unexpected error occurred.
      !result.props.error &&
      // Only try Terra Classic if Terra failed.
      decodedChainId === ChainId.TerraMainnet
    ) {
      return await getForChainId(ChainId.TerraClassicMainnet)
    }

    return result
  }

interface GetDaoProposalStaticPropsMakerOptions
  extends Omit<GetDaoStaticPropsMakerOptions, 'getProps'> {
  getProposalUrlPrefix: (
    params: Record<string, string | string[] | undefined>
  ) => string
  proposalIdParamKey?: string
}

export const makeGetDaoProposalStaticProps = ({
  getProposalUrlPrefix,
  proposalIdParamKey = 'proposalId',
  ...options
}: GetDaoProposalStaticPropsMakerOptions) =>
  makeGetDaoStaticProps({
    ...options,
    getProps: async ({
      context: { params = {} },
      t,
      chain,
      coreVersion,
      coreAddress,
      proposalModules,
    }) => {
      const proposalId = params[proposalIdParamKey]

      // If invalid proposal ID, not found.
      if (typeof proposalId !== 'string') {
        return {
          followingTitle: t('title.proposalNotFound'),
          additionalProps: {
            proposalInfo: null,
          },
        }
      }

      // Gov module.
      if (coreVersion === ContractVersion.Gov) {
        const url = getProposalUrlPrefix(params) + proposalId

        const client = await retry(
          10,
          async (attempt) =>
            (
              await cosmos.ClientFactory.createRPCQueryClient({
                rpcEndpoint: getRpcForChainId(chain.chain_id, attempt - 1),
              })
            ).cosmos
        )
        const cosmosSdkVersion =
          (
            await client.base.tendermint.v1beta1.getNodeInfo()
          ).applicationVersion?.cosmosSdkVersion.slice(1) || '0.0.0'
        const supportsV1Gov = cosmosSdkVersionIs46OrHigher(cosmosSdkVersion)

        let proposal: GovProposalWithDecodedContent | null = null
        try {
          // Try to load from indexer first.
          const indexerProposal:
            | {
                id: string
                data: string
              }
            | undefined = await queryIndexer({
            chainId: chain.chain_id,
            type: 'generic',
            formula: 'gov/proposal',
            args: {
              id: proposalId,
            },
          })

          if (indexerProposal) {
            if (supportsV1Gov) {
              proposal = await decodeGovProposal({
                version: GovProposalVersion.V1,
                id: BigInt(proposalId),
                proposal: ProposalV1.decode(fromBase64(indexerProposal.data)),
              })
            } else {
              proposal = await decodeGovProposal({
                version: GovProposalVersion.V1_BETA_1,
                id: BigInt(proposalId),
                proposal: ProposalV1Beta1.decode(
                  fromBase64(indexerProposal.data),
                  undefined,
                  true
                ),
              })
            }
          }
        } catch (err) {
          console.error(err)
          // Report to Sentry.
          processError(err)
        }

        // Fallback to querying chain if indexer failed.
        if (!proposal) {
          try {
            if (supportsV1Gov) {
              try {
                const proposalV1 = (
                  await client.gov.v1.proposal({
                    proposalId: BigInt(proposalId),
                  })
                ).proposal
                if (!proposalV1) {
                  throw new Error('NOT_FOUND')
                }

                proposal = await decodeGovProposal({
                  version: GovProposalVersion.V1,
                  id: BigInt(proposalId),
                  proposal: proposalV1,
                })
              } catch (err) {
                // Fallback to v1beta1 query if v1 not supported.
                if (
                  !(err instanceof Error) ||
                  !err.message.includes('unknown query path')
                ) {
                  // Rethrow other errors.
                  throw err
                }
              }
            }

            if (!proposal) {
              const proposalV1Beta1 = (
                await client.gov.v1beta1.proposal(
                  {
                    proposalId: BigInt(proposalId),
                  },
                  true
                )
              ).proposal
              if (!proposalV1Beta1) {
                throw new Error('NOT_FOUND')
              }

              proposal = await decodeGovProposal({
                version: GovProposalVersion.V1_BETA_1,
                id: BigInt(proposalId),
                proposal: proposalV1Beta1,
              })
            }
          } catch (error) {
            if (
              error instanceof Error &&
              (error.message.includes("doesn't exist: key not found") ||
                error.message === 'NOT_FOUND')
            ) {
              return {
                url,
                followingTitle: t('title.proposalNotFound'),
                // Excluding `proposalId` indicates not found.
                additionalProps: {
                  proposalId: null,
                },
              }
            }

            console.error(error)
            // Report to Sentry.
            processError(error)
            // Throw error to trigger 500.
            throw new Error(t('error.unexpectedError'))
          }
        }

        return {
          url,
          followingTitle: proposal.title,
          overrideDescription: removeMarkdown(proposal.description).slice(
            0,
            MAX_META_CHARS_PROPOSAL_DESCRIPTION
          ),
          additionalProps: {
            proposalInfo: {
              id: proposal.id.toString(),
              title: proposal.title,
              description: proposal.description,
              expiration: null,
              createdAtEpoch: null,
              createdByAddress: '',
            } as CommonProposalInfo,
          },
        }
      }

      // DAO.

      let proposalInfo: CommonProposalInfo | null = null
      try {
        const {
          options: {
            proposalModule: { prefix },
          },
          adapter: {
            functions: { getProposalInfo },
          },
        } = await matchAndLoadAdapter(proposalModules, proposalId, {
          chain,
          coreAddress,
        })

        // If proposal is numeric, i.e. has no prefix, redirect to prefixed URL.
        if (!isNaN(Number(proposalId))) {
          throw new RedirectError({
            destination: getProposalUrlPrefix(params) + prefix + proposalId,
            permanent: true,
          })
        }

        // undefined if proposal does not exist.
        proposalInfo = (await getProposalInfo()) ?? null
      } catch (error) {
        // Rethrow.
        if (error instanceof RedirectError) {
          throw error
        }

        // If ProposalModuleAdapterError, treat as 404 below. Otherwise display
        // 500.
        if (!(error instanceof ProposalModuleAdapterError)) {
          // Report to Sentry.
          processError(error)

          console.error(error)
          // Throw error to trigger 500.
          throw new Error(t('error.unexpectedError'))
        }
      }

      return {
        url: getProposalUrlPrefix(params) + proposalId,
        followingTitle: proposalInfo
          ? proposalInfo.title
          : t('title.proposalNotFound'),
        overrideDescription: removeMarkdown(
          proposalInfo?.description ?? ''
        ).slice(0, MAX_META_CHARS_PROPOSAL_DESCRIPTION),
        additionalProps: {
          // If proposal does not exist, null indicates 404.
          proposalInfo,
        },
      }
    },
  })

export class RedirectError {
  constructor(public redirect: Redirect) {}
}

const loadParentDaoInfo = async (
  chainId: string,
  subDaoAddress: string,
  potentialParentAddress: string | null | undefined,
  serverT: TFunction,
  // Prevent cycles by ensuring admin has not already been seen.
  previousParentAddresses: string[]
): Promise<Omit<DaoParentInfo, 'registeredSubDao'> | null> => {
  // If no admin, or admin is set to itself, or admin is a wallet, no parent
  // DAO.
  if (
    !potentialParentAddress ||
    potentialParentAddress === subDaoAddress ||
    previousParentAddresses?.includes(potentialParentAddress)
  ) {
    return null
  }

  try {
    // Check if address is chain module account.
    const cosmosClient = await retry(
      10,
      async (attempt) =>
        (
          await cosmos.ClientFactory.createRPCQueryClient({
            rpcEndpoint: getRpcForChainId(chainId, attempt - 1),
          })
        ).cosmos
    )
    // If chain module gov account...
    if (await addressIsModule(cosmosClient, potentialParentAddress, 'gov')) {
      const chainConfig = getSupportedChainConfig(chainId)
      return chainConfig
        ? {
            chainId,
            coreAddress: chainConfig.name,
            coreVersion: ContractVersion.Gov,
            name: getDisplayNameForChainId(chainId),
            imageUrl: getImageUrlForChainId(chainId),
            parentDao: null,
            admin: '',
          }
        : null
    }

    if (
      !isValidBech32Address(
        potentialParentAddress,
        getChainForChainId(chainId).bech32_prefix
      )
    ) {
      return null
    }

    const {
      admin,
      version,
      config: { name, image_url },
      parentDao,
    } = await daoCoreDumpState(chainId, potentialParentAddress, serverT, [
      ...(previousParentAddresses ?? []),
      potentialParentAddress,
    ])

    return {
      chainId,
      coreAddress: potentialParentAddress,
      coreVersion: version,
      name: name,
      imageUrl: image_url ?? null,
      parentDao,
      admin: admin ?? null,
    }
  } catch (err) {
    // If contract not found, ignore error. Otherwise, log it.
    if (
      !(err instanceof Error) ||
      !INVALID_CONTRACT_ERROR_SUBSTRINGS.some((substring) =>
        (err as Error).message.includes(substring)
      )
    ) {
      console.error(err)
      console.error(
        `Error loading parent DAO (${potentialParentAddress}) of ${subDaoAddress}`,
        processError(err)
      )
    }

    // Don't prevent page render if failed to load parent DAO info.
    return null
  }
}

const ITEM_LIST_LIMIT = 30

interface DaoCoreDumpState {
  admin: string
  config: Config
  version: ContractVersion
  votingModule: {
    address: string
    info: ContractVersionInfo
  }
  activeProposalModules: ProposalModuleWithInfo[]
  created: Date | undefined
  parentDao: DaoParentInfo | null
  items: ListItemsResponse
  polytoneProxies: PolytoneProxies
  isActive: boolean
  activeThreshold: ActiveThreshold | null
}

const daoCoreDumpState = async (
  chainId: string,
  coreAddress: string,
  serverT: TFunction,
  // Prevent cycles by ensuring admin has not already been seen.
  previousParentAddresses?: string[]
): Promise<DaoCoreDumpState> => {
  const cwClient = await getCosmWasmClientForChainId(chainId)

  try {
    const indexerDumpedState = await queryIndexer<IndexerDumpState>({
      type: 'contract',
      address: coreAddress,
      formula: 'daoCore/dumpState',
      chainId,
    })

    // Use data from indexer if present.
    if (indexerDumpedState) {
      if (
        LEGACY_DAO_CONTRACT_NAMES.includes(indexerDumpedState.version?.contract)
      ) {
        throw new LegacyDaoError()
      }

      const coreVersion = parseContractVersion(
        indexerDumpedState.version.version
      )
      if (!coreVersion) {
        throw new Error(serverT('error.failedParsingCoreVersion'))
      }

      const items =
        (await queryIndexer<ListItemsResponse>({
          type: 'contract',
          address: coreAddress,
          formula: 'daoCore/listItems',
          chainId,
        })) ?? []

      const { admin } = indexerDumpedState

      const parentDaoInfo = await loadParentDaoInfo(
        chainId,
        coreAddress,
        admin,
        serverT,
        [...(previousParentAddresses ?? []), coreAddress]
      )

      // Convert to chainId -> proxy map.
      const polytoneProxies = polytoneNoteProxyMapToChainIdMap(
        chainId,
        indexerDumpedState.polytoneProxies || {}
      )

      let isActive = true
      let activeThreshold: ActiveThreshold | null = null
      try {
        // All voting modules use the same active queries, so it's safe to just
        // use one here.
        const client = new DaoVotingCw20StakedQueryClient(
          cwClient,
          indexerDumpedState.voting_module as string
        )
        isActive = (await client.isActive()).active
        activeThreshold =
          (await client.activeThreshold()).active_threshold || null
      } catch {
        // Some voting modules don't support the active queries, so if they
        // fail, assume it's active.
      }

      return {
        ...indexerDumpedState,
        version: coreVersion,
        votingModule: {
          address: indexerDumpedState.voting_module as string,
          info: indexerDumpedState.votingModuleInfo,
        },
        activeProposalModules: indexerDumpedState.proposal_modules.filter(
          ({ status }) => status === 'enabled' || status === 'Enabled'
        ),
        created: indexerDumpedState.createdAt
          ? new Date(indexerDumpedState.createdAt)
          : undefined,
        isActive,
        activeThreshold,
        items,
        parentDao: parentDaoInfo
          ? {
              ...parentDaoInfo,
              // Whether or not this parent has registered its child as a
              // SubDAO.
              registeredSubDao:
                indexerDumpedState.adminInfo?.registeredSubDao ??
                (parentDaoInfo.coreVersion === ContractVersion.Gov &&
                  CHAIN_SUBDAOS[chainId]?.includes(coreAddress)) ??
                false,
            }
          : null,
        polytoneProxies,
      }
    }
  } catch (error) {
    // Rethrow if legacy DAO.
    if (error instanceof LegacyDaoError) {
      throw error
    }

    // Ignore error. Fallback to querying chain below.

    // Log if not no indexer error.
    if (
      !(
        error instanceof Error &&
        error.message === CommonError.NoIndexerForChain
      )
    ) {
      console.error(error, processError(error))
    }
  }

  const daoCoreClient = new DaoCoreV2QueryClient(cwClient, coreAddress)

  const dumpedState = await daoCoreClient.dumpState()
  if (LEGACY_DAO_CONTRACT_NAMES.includes(dumpedState.version.contract)) {
    throw new LegacyDaoError()
  }

  const votingModuleAddress = extractAddressFromMaybeSecretContractInfo(
    dumpedState.voting_module
  )

  const [coreVersion, { info: votingModuleInfo }] = await Promise.all([
    parseContractVersion(dumpedState.version.version),
    (await cwClient.queryContractSmart(votingModuleAddress, {
      info: {},
    })) as InfoResponse,
  ])

  if (!coreVersion) {
    throw new Error(serverT('error.failedParsingCoreVersion'))
  }

  const proposalModules = await fetchProposalModulesWithInfoFromChain(
    chainId,
    coreAddress,
    coreVersion
  )

  // Get all items.
  const items: ListItemsResponse = []
  while (true) {
    const _items = await daoCoreClient.listItems({
      startAfter: items[items.length - 1]?.[0],
      limit: ITEM_LIST_LIMIT,
    })
    if (!_items.length) {
      break
    }

    items.push(..._items)

    // If we got less than the limit, we've reached the end.
    if (_items.length < ITEM_LIST_LIMIT) {
      break
    }
  }

  let isActive = true
  let activeThreshold: ActiveThreshold | null = null
  try {
    // All voting modules use the same active queries, so it's safe to just use
    // one here.
    const client = new DaoVotingCw20StakedQueryClient(
      cwClient,
      votingModuleAddress
    )
    isActive = (await client.isActive()).active
    activeThreshold = (await client.activeThreshold()).active_threshold || null
  } catch {
    // Some voting modules don't support the active queries, so if they fail,
    // assume it's active.
  }

  const { admin } = dumpedState
  const parentDao = await loadParentDaoInfo(
    chainId,
    coreAddress,
    admin,
    serverT,
    [...(previousParentAddresses ?? []), coreAddress]
  )
  let registeredSubDao = false
  // If parent DAO exists, check if this DAO is a SubDAO of the parent.
  if (parentDao) {
    if (
      parentDao.coreVersion !== ContractVersion.Gov &&
      isFeatureSupportedByVersion(Feature.SubDaos, parentDao.coreVersion)
    ) {
      const parentDaoCoreClient = new DaoCoreV2QueryClient(cwClient, admin)

      // Get all SubDAOs.
      const subdaoAddrs: string[] = []
      while (true) {
        const response = await parentDaoCoreClient.listSubDaos({
          startAfter: subdaoAddrs[subdaoAddrs.length - 1],
          limit: SUBDAO_LIST_LIMIT,
        })
        if (!response?.length) break

        subdaoAddrs.push(...response.map(({ addr }) => addr))

        // If we have less than the limit of items, we've exhausted them.
        if (response.length < SUBDAO_LIST_LIMIT) {
          break
        }
      }

      registeredSubDao = subdaoAddrs.includes(coreAddress)
    } else if (parentDao.coreVersion === ContractVersion.Gov) {
      registeredSubDao = !!CHAIN_SUBDAOS[chainId]?.includes(coreAddress)
    }
  }

  // Get DAO polytone proxies.
  const polytoneProxies = (
    await Promise.all(
      Object.entries(getSupportedChainConfig(chainId)?.polytone || {}).map(
        async ([chainId, { note }]) => {
          let proxy
          try {
            proxy = await queryIndexer<string>({
              type: 'contract',
              address: note,
              formula: 'polytone/note/remoteAddress',
              args: {
                address: coreAddress,
              },
              chainId,
            })
          } catch {
            // Ignore error.
          }
          if (!proxy) {
            const polytoneNoteClient = new PolytoneNoteQueryClient(
              cwClient,
              note
            )
            proxy =
              (await polytoneNoteClient.remoteAddress({
                localAddress: coreAddress,
              })) || undefined
          }

          return {
            chainId,
            proxy,
          }
        }
      )
    )
  ).reduce(
    (acc, { chainId, proxy }) => ({
      ...acc,
      ...(proxy
        ? {
            [chainId]: proxy,
          }
        : {}),
    }),
    {} as PolytoneProxies
  )

  return {
    ...dumpedState,
    version: coreVersion,
    votingModule: {
      address: votingModuleAddress,
      info: votingModuleInfo,
    },
    activeProposalModules: proposalModules.filter(
      ({ status }) => status === 'enabled' || status === 'Enabled'
    ),
    created: undefined,
    isActive,
    activeThreshold,
    items,
    parentDao: parentDao
      ? {
          ...parentDao,
          registeredSubDao,
        }
      : null,
    polytoneProxies,
  }
}

const SUBDAO_LIST_LIMIT = 30
