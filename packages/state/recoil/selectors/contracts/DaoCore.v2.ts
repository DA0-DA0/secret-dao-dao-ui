import {
  constSelector,
  selectorFamily,
  waitForAll,
  waitForAllSettled,
  waitForAny,
} from 'recoil'

import {
  AccountType,
  Addr,
  GenericTokenBalance,
  GenericTokenBalanceWithOwner,
  PolytoneProxies,
  TokenType,
  WithChainId,
} from '@dao-dao/types'
import { ContractInfoResponse } from '@dao-dao/types/contracts/Cw721Base'
import {
  AdminNominationResponse,
  ArrayOfAddr,
  ArrayOfArrayOfString,
  ArrayOfProposalModule,
  ArrayOfSubDao,
  Config,
  DaoURIResponse,
  DumpStateResponse,
  GetItemResponse,
  PauseInfoResponse,
  Snip20BalanceResponse,
  SubDao,
  TotalPowerAtHeightResponse,
  VotingPowerAtHeightResponse,
} from '@dao-dao/types/contracts/DaoCore.v2'
import {
  CW721_WORKAROUND_ITEM_KEY_PREFIX,
  POLYTONE_CW20_ITEM_KEY_PREFIX,
  POLYTONE_CW721_ITEM_KEY_PREFIX,
  extractAddressFromMaybeSecretContractInfo,
  getAccount,
  getSupportedChainConfig,
} from '@dao-dao/utils'

import {
  CommonNftSelectors,
  DaoVotingCw20StakedSelectors,
  PolytoneNoteSelectors,
} from '.'
import {
  DaoCoreV2Client,
  DaoCoreV2QueryClient,
} from '../../../contracts/DaoCore.v2'
import {
  refreshDaoVotingPowerAtom,
  refreshWalletBalancesIdAtom,
  signingCosmWasmClientAtom,
} from '../../atoms'
import {
  accountsSelector,
  reverseLookupPolytoneProxySelector,
} from '../account'
import { cosmWasmClientForChainSelector } from '../chain'
import {
  contractInfoSelector,
  isDaoSelector,
  isPolytoneProxySelector,
} from '../contract'
import { genericTokenSelector } from '../token'
import * as Cw20BaseSelectors from './Cw20Base'

type QueryClientParams = WithChainId<{
  contractAddress: string
}>

export const queryClient = selectorFamily<
  DaoCoreV2QueryClient,
  QueryClientParams
>({
  key: 'daoCoreV2QueryClient',
  get:
    ({ contractAddress, chainId }) =>
    ({ get }) => {
      const client = get(cosmWasmClientForChainSelector(chainId))
      return new DaoCoreV2QueryClient(client, contractAddress)
    },
  dangerouslyAllowMutability: true,
})

export type ExecuteClientParams = WithChainId<{
  contractAddress: string
  sender: string
}>

export const executeClient = selectorFamily<
  DaoCoreV2Client | undefined,
  ExecuteClientParams
>({
  key: 'daoCoreV2ExecuteClient',
  get:
    ({ chainId, contractAddress, sender }) =>
    ({ get }) => {
      const client = get(signingCosmWasmClientAtom({ chainId }))
      if (!client) return

      return new DaoCoreV2Client(client, sender, contractAddress)
    },
  dangerouslyAllowMutability: true,
})

export const adminSelector = selectorFamily<
  Addr,
  QueryClientParams & {
    params: Parameters<DaoCoreV2QueryClient['admin']>
  }
>({
  key: 'daoCoreV2Admin',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.admin(...params)
    },
})
export const adminNominationSelector = selectorFamily<
  AdminNominationResponse,
  QueryClientParams & {
    params: Parameters<DaoCoreV2QueryClient['adminNomination']>
  }
>({
  key: 'daoCoreV2AdminNomination',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.adminNomination(...params)
    },
})
export const configSelector = selectorFamily<
  Config,
  QueryClientParams & {
    params: Parameters<DaoCoreV2QueryClient['config']>
  }
>({
  key: 'daoCoreV2Config',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.config(...params)
    },
})
// Use allCw20TokensWithBalancesSelector as it uses the indexer and implements
// pagination for chain queries.
export const _cw20BalancesSelector = selectorFamily<
  Snip20BalanceResponse[],
  QueryClientParams & {
    params: Parameters<DaoCoreV2QueryClient['cw20Balances']>
  }
>({
  key: 'daoCoreV2_Cw20Balances',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      get(refreshWalletBalancesIdAtom(undefined))
      get(refreshWalletBalancesIdAtom(queryClientParams.contractAddress))
      return await client.cw20Balances(...params)
    },
})
// Use allNativeCw20TokenListSelector as it uses the indexer and implements
// pagination for chain queries.
export const _cw20TokenListSelector = selectorFamily<
  ArrayOfAddr,
  QueryClientParams & {
    params: Parameters<DaoCoreV2QueryClient['cw20TokenList']>
  }
>({
  key: 'daoCoreV2_Cw20TokenList',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.cw20TokenList(...params)
    },
})
// Use allNativeCw721TokenListSelector as it uses the indexer and implements
// pagination for chain queries.
export const _cw721TokenListSelector = selectorFamily<
  ArrayOfAddr,
  QueryClientParams & {
    params: Parameters<DaoCoreV2QueryClient['cw721TokenList']>
  }
>({
  key: 'daoCoreV2_Cw721TokenList',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.cw721TokenList(...params)
    },
})
// Reduced to only the necessary subset which can be provided by both the
// indexer and chain.
export const dumpStateSelector = selectorFamily<
  DumpStateResponse | undefined,
  QueryClientParams & {
    params: Parameters<DaoCoreV2QueryClient['dumpState']>
  }
>({
  key: 'daoCoreV2DumpState',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      // If indexer query fails, fallback to contract query.
      const client = get(queryClient(queryClientParams))
      try {
        return await client.dumpState(...params)
      } catch (err) {
        // Ignore errors. An undefined response is sometimes used to indicate
        // that this contract is not a DAO.
        console.error(err)
      }
    },
})
export const getItemSelector = selectorFamily<
  GetItemResponse,
  QueryClientParams & {
    params: Parameters<DaoCoreV2QueryClient['getItem']>
  }
>({
  key: 'daoCoreV2GetItem',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.getItem(...params)
    },
})
// Use listAllItemsSelector as it uses the indexer and implements pagination for
// chain queries.
export const _listItemsSelector = selectorFamily<
  ArrayOfArrayOfString,
  QueryClientParams & {
    params: Parameters<DaoCoreV2QueryClient['listItems']>
  }
>({
  key: 'daoCoreV2_ListItems',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.listItems(...params)
    },
})
export const proposalModulesSelector = selectorFamily<
  ArrayOfProposalModule,
  QueryClientParams & {
    params: Parameters<DaoCoreV2QueryClient['proposalModules']>
  }
>({
  key: 'daoCoreV2ProposalModules',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.proposalModules(...params)
    },
})
export const activeProposalModulesSelector = selectorFamily<
  ArrayOfProposalModule,
  QueryClientParams & {
    params: Parameters<DaoCoreV2QueryClient['activeProposalModules']>
  }
>({
  key: 'daoCoreV2ActiveProposalModules',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.activeProposalModules(...params)
    },
})
export const pauseInfoSelector = selectorFamily<
  PauseInfoResponse,
  QueryClientParams & {
    params: Parameters<DaoCoreV2QueryClient['pauseInfo']>
  }
>({
  key: 'daoCoreV2PauseInfo',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.pauseInfo(...params)
    },
})
export const votingModuleSelector = selectorFamily<
  string,
  QueryClientParams & {
    params: Parameters<DaoCoreV2QueryClient['votingModule']>
  }
>({
  key: 'daoCoreV2VotingModule',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      // If indexer query fails, fallback to contract query.
      const client = get(queryClient(queryClientParams))
      return extractAddressFromMaybeSecretContractInfo(
        await client.votingModule(...params)
      )
    },
})
// Use listAllSubDaosSelector as it uses the indexer and implements pagination
// for chain queries.
export const _listSubDaosSelector = selectorFamily<
  ArrayOfSubDao,
  QueryClientParams & {
    params: Parameters<DaoCoreV2QueryClient['listSubDaos']>
  }
>({
  key: 'daoCoreV2_ListSubDaos',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.listSubDaos(...params)
    },
})
export const daoURISelector = selectorFamily<
  DaoURIResponse,
  QueryClientParams & {
    params: Parameters<DaoCoreV2QueryClient['daoURI']>
  }
>({
  key: 'daoCoreV2DaoURI',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.daoURI(...params)
    },
})
export const votingPowerAtHeightSelector = selectorFamily<
  VotingPowerAtHeightResponse,
  // @ts-ignore
  QueryClientParams & {
    params: Parameters<DaoCoreV2QueryClient['votingPowerAtHeight']>
  }
>({
  key: 'daoCoreV2VotingPowerAtHeight',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      get(refreshDaoVotingPowerAtom(queryClientParams.contractAddress))

      const client = get(queryClient(queryClientParams))
      return await client.votingPowerAtHeight(...params)
    },
})
export const totalPowerAtHeightSelector = selectorFamily<
  TotalPowerAtHeightResponse,
  QueryClientParams & {
    params: Parameters<DaoCoreV2QueryClient['totalPowerAtHeight']>
  }
>({
  key: 'daoCoreV2TotalPowerAtHeight',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      get(refreshDaoVotingPowerAtom(queryClientParams.contractAddress))

      const client = get(queryClient(queryClientParams))
      return await client.totalPowerAtHeight(...params)
    },
})

export const infoSelector = contractInfoSelector

///! Custom selectors

const CW20_TOKEN_LIST_LIMIT = 30
export const allNativeCw20TokenListSelector = selectorFamily<
  ArrayOfAddr,
  QueryClientParams
>({
  key: 'daoCoreV2AllNativeCw20TokenList',
  get:
    (queryClientParams) =>
    async ({ get }) => {
      const tokenList: ArrayOfAddr = []
      while (true) {
        const response = await get(
          _cw20TokenListSelector({
            ...queryClientParams,
            params: [
              {
                startAfter: tokenList[tokenList.length - 1],
                limit: CW20_TOKEN_LIST_LIMIT,
              },
            ],
          })
        )
        if (!response.length) break

        tokenList.push(...response)

        // If we have less than the limit of items, we've exhausted them.
        if (response.length < CW20_TOKEN_LIST_LIMIT) {
          break
        }
      }

      return tokenList
    },
})

// Get all cw20 tokens stored in the items list for polytone proxies across all
// chains.
export const allPolytoneCw20TokensSelector = selectorFamily<
  Record<
    string,
    {
      proxy: string
      tokens: string[]
    }
  >,
  QueryClientParams
>({
  key: 'daoCoreV2AllPolytoneCw20Tokens',
  get:
    (queryClientParams) =>
    ({ get }) => {
      const polytoneProxies = get(polytoneProxiesSelector(queryClientParams))
      const polytoneCw20Keys = get(
        listAllItemsWithPrefixSelector({
          ...queryClientParams,
          prefix: POLYTONE_CW20_ITEM_KEY_PREFIX,
        })
      )

      const tokensByChain = polytoneCw20Keys.reduce(
        (acc, [key]) => {
          const [chainId, token] = key.split(':')
          // If no polytone proxy for this chain, skip it. This should only
          // happen if a key is manually set for a chain that does not have a
          // polytone proxy.
          if (!(chainId in polytoneProxies)) {
            return acc
          }

          if (!acc[chainId]) {
            acc[chainId] = {
              proxy: polytoneProxies[chainId],
              tokens: [],
            }
          }
          acc[chainId].tokens.push(token)

          return acc
        },
        {} as Record<
          string,
          {
            proxy: string
            tokens: string[]
          }
        >
      )

      return tokensByChain
    },
})

// Combine native and polytone cw20 tokens.
export const allCw20TokensSelector = selectorFamily<
  Record<
    string,
    {
      owner: string
      tokens: string[]
    }
  >,
  QueryClientParams & {
    governanceCollectionAddress?: string
  }
>({
  key: 'daoCoreV2AllCw20Tokens',
  get:
    (queryClientParams) =>
    ({ get }) => {
      const nativeCw20Tokens = get(
        allNativeCw20TokenListSelector(queryClientParams)
      )
      const polytoneCw20Tokens = get(
        allPolytoneCw20TokensSelector(queryClientParams)
      )

      // Start with native cw20 tokens.
      let allTokens: Record<
        string,
        {
          owner: string
          tokens: string[]
        }
      > = {
        [queryClientParams.chainId]: {
          owner: queryClientParams.contractAddress,
          tokens: nativeCw20Tokens,
        },
      }

      // Add polytone tokens.
      Object.entries(polytoneCw20Tokens).forEach(
        ([chainId, { proxy, tokens }]) => {
          allTokens[chainId] = {
            owner: proxy,
            tokens,
          }
        }
      )

      return allTokens
    },
})

const CW20_BALANCES_LIMIT = 10
export const nativeCw20TokensWithBalancesSelector = selectorFamily<
  GenericTokenBalance[],
  QueryClientParams & {
    governanceTokenAddress?: string
  }
>({
  key: 'daoCoreV2NativeCw20TokensWithBalances',
  get:
    ({ governanceTokenAddress, ...queryClientParams }) =>
    async ({ get }) => {
      get(refreshWalletBalancesIdAtom(undefined))
      get(refreshWalletBalancesIdAtom(queryClientParams.contractAddress))

      const governanceTokenBalance = governanceTokenAddress
        ? get(
            Cw20BaseSelectors.balanceSelector({
              ...queryClientParams,
              contractAddress: governanceTokenAddress,
              params: [{ address: queryClientParams.contractAddress }],
            })
          ).balance
        : undefined

      const balances: Snip20BalanceResponse[] = []
      while (true) {
        const response = await get(
          _cw20BalancesSelector({
            ...queryClientParams,
            params: [
              {
                startAfter: balances[balances.length - 1]?.addr,
                limit: CW20_BALANCES_LIMIT,
              },
            ],
          })
        )
        if (!response.length) break

        balances.push(...response)

        // If we have less than the limit of items, we've exhausted them.
        if (response.length < CW20_BALANCES_LIMIT) {
          break
        }
      }

      //! Add governance token balance if exists but missing from list.
      if (
        governanceTokenAddress &&
        governanceTokenBalance &&
        !balances.some(({ addr }) => addr === governanceTokenAddress)
      ) {
        // Add to beginning of list.
        balances.splice(0, 0, {
          addr: governanceTokenAddress,
          balance: governanceTokenBalance,
        })
      }

      const tokens = get(
        waitForAll(
          balances.map(({ addr }) =>
            genericTokenSelector({
              type: TokenType.Cw20,
              denomOrAddress: addr,
              chainId: queryClientParams.chainId,
            })
          )
        )
      )

      return tokens.map((token, index) => ({
        token,
        balance: balances![index].balance,
        isGovernanceToken:
          !!governanceTokenAddress &&
          governanceTokenAddress === token.denomOrAddress,
      }))
    },
})

// Get cw20 tokens stored in the items list for a specific polytone proxy chain.
export const polytoneCw20TokensWithBalancesSelector = selectorFamily<
  GenericTokenBalanceWithOwner[],
  QueryClientParams & {
    polytoneChainId: string
  }
>({
  key: 'daoCoreV2PolytoneCw20TokensWithBalances',
  get:
    ({ chainId: mainChainId, contractAddress, polytoneChainId }) =>
    ({ get }) => {
      const accounts = get(
        accountsSelector({
          chainId: mainChainId,
          address: contractAddress,
        })
      )

      const polytoneAccount = getAccount({
        accounts,
        chainId: polytoneChainId,
        types: [AccountType.Polytone],
      })
      if (!polytoneAccount) {
        return []
      }

      const polytoneCw20Tokens =
        get(
          allPolytoneCw20TokensSelector({
            chainId: mainChainId,
            contractAddress,
          })
        )[polytoneChainId]?.tokens || []

      const [tokens, balances] = get(
        waitForAll([
          waitForAll(
            polytoneCw20Tokens.map((denomOrAddress) =>
              genericTokenSelector({
                type: TokenType.Cw20,
                chainId: polytoneChainId,
                denomOrAddress,
              })
            )
          ),
          waitForAllSettled(
            polytoneCw20Tokens.map((tokenContract) =>
              Cw20BaseSelectors.balanceSelector({
                chainId: polytoneChainId,
                contractAddress: tokenContract,
                params: [{ address: polytoneAccount.address }],
              })
            )
          ),
        ])
      )

      return balances.flatMap(
        (loadable, index): GenericTokenBalanceWithOwner | [] =>
          loadable.state === 'hasValue'
            ? {
                owner: polytoneAccount,
                token: tokens[index],
                balance: loadable.contents.balance,
              }
            : []
      )
    },
})

const CW721_TOKEN_LIST_LIMIT = 30
export const allNativeCw721TokenListSelector = selectorFamily<
  ArrayOfAddr,
  QueryClientParams & {
    governanceCollectionAddress?: string
  }
>({
  key: 'daoCoreV2AllNativeCw721TokenList',
  get:
    ({ governanceCollectionAddress, ...queryClientParams }) =>
    async ({ get }) => {
      // Load workaround CW721s from storage items.
      const workaroundContracts = get(
        listAllItemsWithPrefixSelector({
          ...queryClientParams,
          prefix: CW721_WORKAROUND_ITEM_KEY_PREFIX,
        })
      ).map(([key]) => key)

      const tokenList: ArrayOfAddr = [...workaroundContracts]
      while (true) {
        const response = await get(
          _cw721TokenListSelector({
            ...queryClientParams,
            params: [
              {
                startAfter: tokenList[tokenList.length - 1],
                limit: CW721_TOKEN_LIST_LIMIT,
              },
            ],
          })
        )
        if (!response?.length) break

        tokenList.push(...response)

        // If we have less than the limit of items, we've exhausted them.
        if (response.length < CW721_TOKEN_LIST_LIMIT) {
          break
        }
      }

      // Add governance collection to beginning of list if not present.
      if (
        governanceCollectionAddress &&
        !tokenList.includes(governanceCollectionAddress)
      ) {
        tokenList.splice(0, 0, governanceCollectionAddress)
      }

      return tokenList
    },
})

// Get all cw721 collections stored in the items list for polytone proxies
// across all chains.
export const allPolytoneCw721CollectionsSelector = selectorFamily<
  Record<
    string,
    {
      proxy: string
      collectionAddresses: string[]
    }
  >,
  QueryClientParams
>({
  key: 'daoCoreV2AllPolytoneCw721Collections',
  get:
    (queryClientParams) =>
    ({ get }) => {
      const polytoneProxies = get(polytoneProxiesSelector(queryClientParams))
      const polytoneCw721Keys = get(
        listAllItemsWithPrefixSelector({
          ...queryClientParams,
          prefix: POLYTONE_CW721_ITEM_KEY_PREFIX,
        })
      )

      const collectionsByChain = polytoneCw721Keys.reduce(
        (acc, [key]) => {
          const [chainId, collectionAddress] = key.split(':')
          // If no polytone proxy for this chain, skip it. This should only
          // happen if a key is manually set for a chain that does not have a
          // polytone proxy.
          if (!(chainId in polytoneProxies)) {
            return acc
          }

          if (!acc[chainId]) {
            acc[chainId] = {
              proxy: polytoneProxies[chainId],
              collectionAddresses: [],
            }
          }
          acc[chainId].collectionAddresses.push(collectionAddress)

          return acc
        },
        {} as Record<
          string,
          {
            proxy: string
            collectionAddresses: string[]
          }
        >
      )

      return collectionsByChain
    },
})

// Combine native and polytone NFT collections.
export const allCw721CollectionsSelector = selectorFamily<
  Record<
    string,
    {
      owner: string
      collectionAddresses: string[]
    }
  >,
  QueryClientParams & {
    governanceCollectionAddress?: string
  }
>({
  key: 'daoCoreV2AllCw721Collections',
  get:
    (queryClientParams) =>
    ({ get }) => {
      const nativeCw721TokenList = get(
        allNativeCw721TokenListSelector(queryClientParams)
      )
      const polytoneCw721Collections = get(
        allPolytoneCw721CollectionsSelector(queryClientParams)
      )

      // Start with native NFTs.
      let allNfts: Record<
        string,
        {
          owner: string
          collectionAddresses: string[]
        }
      > = {
        [queryClientParams.chainId]: {
          owner: queryClientParams.contractAddress,
          collectionAddresses: nativeCw721TokenList,
        },
      }

      // Add polytone NFTs.
      Object.entries(polytoneCw721Collections).forEach(
        ([chainId, { proxy, collectionAddresses }]) => {
          allNfts[chainId] = {
            owner: proxy,
            collectionAddresses,
          }
        }
      )

      return allNfts
    },
})

// Get all CW721 collections, filtered by the DAO being the minter.
export const allCw721CollectionsWithDaoAsMinterSelector = selectorFamily<
  ({
    address: string
    // DAO's address or polytone proxy that is the minter.
    minter: string
    chainId: string
  } & ContractInfoResponse)[],
  QueryClientParams
>({
  key: 'daoCoreV2AllCw721CollectionsWithDaoAsMinter',
  get:
    (queryClientParams) =>
    ({ get }) => {
      // Flatten dictionary of chainId -> { owner, collectionAddresses } into
      // list of each collection.
      const collections = Object.entries(
        get(allCw721CollectionsSelector(queryClientParams))
      ).flatMap(([chainId, { owner, collectionAddresses }]) =>
        collectionAddresses.map((collectionAddress) => ({
          owner,
          collectionAddress,
          chainId,
        }))
      )

      // Get the minter for each collection.
      const minterResponses = get(
        waitForAny(
          collections.map(({ chainId, collectionAddress }) =>
            CommonNftSelectors.minterSelector({
              contractAddress: collectionAddress,
              chainId,
              params: [],
            })
          )
        )
      )
      // Filter out collections that don't have the DAO as the minter.
      const collectionsWithDaoAsMinter = collections.filter(
        ({ owner }, idx) =>
          minterResponses[idx].state === 'hasValue' &&
          minterResponses[idx].contents.minter === owner
      )

      const collectionInfos = get(
        waitForAny(
          collectionsWithDaoAsMinter.map(({ chainId, collectionAddress }) =>
            CommonNftSelectors.contractInfoSelector({
              contractAddress: collectionAddress,
              chainId,
              params: [],
            })
          )
        )
      )

      return collectionsWithDaoAsMinter.flatMap(
        ({ chainId, owner, collectionAddress }, idx) =>
          collectionInfos[idx].state === 'hasValue'
            ? [
                {
                  chainId,
                  minter: owner,
                  address: collectionAddress,
                  ...collectionInfos[idx].contents!,
                },
              ]
            : []
      )
    },
})

const SUBDAO_LIST_LIMIT = 30
export const listAllSubDaosSelector = selectorFamily<
  WithChainId<SubDao>[],
  QueryClientParams & {
    /**
     * Only include SubDAOs that this DAO is the admin of, meaning this DAO can
     * execute on behalf of the SubDAO.
     */
    onlyAdmin?: boolean
  }
>({
  key: 'daoCoreV2ListAllSubDaos',
  get:
    ({ onlyAdmin, ...queryClientParams }) =>
    async ({ get }) => {
      const subDaos: ArrayOfSubDao = []

      while (true) {
        const response = await get(
          _listSubDaosSelector({
            ...queryClientParams,
            params: [
              {
                startAfter: subDaos[subDaos.length - 1]?.addr,
                limit: SUBDAO_LIST_LIMIT,
              },
            ],
          })
        )
        if (!response?.length) break

        subDaos.push(...response)

        // If we have less than the limit of items, we've exhausted them.
        if (response.length < SUBDAO_LIST_LIMIT) {
          break
        }
      }

      const subDaosWithTypes = get(
        waitForAll(
          subDaos.map((subDao) =>
            waitForAll([
              constSelector({
                ...subDao,
              }),
              isDaoSelector({
                chainId: queryClientParams.chainId,
                address: subDao.addr,
              }),
              isPolytoneProxySelector({
                chainId: queryClientParams.chainId,
                address: subDao.addr,
              }),
            ])
          )
        )
      )

      // Reverse lookup only polytone proxies.
      const reverseLookups = get(
        waitForAllSettled(
          subDaosWithTypes.map(([{ addr }, , isPolytoneProxy]) =>
            // No need to look these up if we only care about the admin DAOs,
            // since SubDAO proxies live on another chain.
            isPolytoneProxy && !onlyAdmin
              ? reverseLookupPolytoneProxySelector({
                  chainId: queryClientParams.chainId,
                  proxy: addr,
                })
              : constSelector(undefined)
          )
        )
      )

      const subDaoAdmins = get(
        waitForAllSettled(
          subDaosWithTypes.map(([{ addr }, isDao]) =>
            // Only look up the admin if we're filtering SubDAOs by admin.
            isDao && onlyAdmin
              ? adminSelector({
                  chainId: queryClientParams.chainId,
                  contractAddress: addr,
                  params: [],
                })
              : constSelector(undefined)
          )
        )
      )

      const validSubDaos = subDaosWithTypes.flatMap(
        ([subDao, isDao, isPolytoneProxy], index): WithChainId<SubDao> | [] =>
          isDao &&
          // If filtering by only admin, check that SubDAO admin is set to the
          // current DAO.
          (!onlyAdmin ||
            (subDaoAdmins[index].state === 'hasValue' &&
              subDaoAdmins[index].contents ===
                queryClientParams.contractAddress))
            ? {
                ...subDao,
                chainId: queryClientParams.chainId,
              }
            : isPolytoneProxy &&
              reverseLookups[index].state === 'hasValue' &&
              reverseLookups[index].contents
            ? {
                addr: reverseLookups[index].contents.address,
                charter: subDao.charter,
                code_hash: subDao.code_hash,
                chainId: reverseLookups[index].contents.chainId,
              }
            : []
      )

      return validSubDaos
    },
})

/**
 * Get the configs for all this DAO's recognized SubDAOs. These will only be
 * SubDAOs on the same chain.
 */
export const allSubDaoConfigsSelector = selectorFamily<
  (WithChainId<{ address: string }> & Config)[],
  QueryClientParams
>({
  key: 'daoCoreV2AllSubDaoConfigs',
  get:
    (queryClientParams) =>
    async ({ get }) => {
      const subDaos = get(listAllSubDaosSelector(queryClientParams))
      const subDaoConfigs = get(
        waitForAll(
          subDaos.map(({ chainId, addr }) =>
            configSelector({
              chainId,
              contractAddress: addr,
              params: [],
            })
          )
        )
      )

      return subDaos.map(({ chainId, addr }, index) => ({
        chainId,
        address: addr,
        ...subDaoConfigs[index],
      }))
    },
})

// Will fail if cannot fetch governance token address.
export const tryFetchGovernanceTokenAddressSelector = selectorFamily<
  string,
  QueryClientParams
>({
  key: 'daoCoreV2TryFetchGovernanceTokenAddress',
  get:
    (queryClientParams) =>
    async ({ get }) => {
      const votingModuleAddress = get(
        votingModuleSelector({ ...queryClientParams, params: [] })
      )
      const governanceTokenAddress = get(
        DaoVotingCw20StakedSelectors.tokenContractSelector({
          ...queryClientParams,
          contractAddress: votingModuleAddress,
          params: [],
        })
      )
      return governanceTokenAddress
    },
})

const ITEM_LIST_LIMIT = 30
export const listAllItemsSelector = selectorFamily<
  ArrayOfArrayOfString,
  QueryClientParams
>({
  key: 'daoCoreV2ListAllItems',
  get:
    (queryClientParams) =>
    async ({ get }) => {
      const items: ArrayOfArrayOfString = []

      while (true) {
        const response = await get(
          _listItemsSelector({
            ...queryClientParams,
            params: [
              {
                startAfter: items[items.length - 1]?.[0],
                limit: ITEM_LIST_LIMIT,
              },
            ],
          })
        )
        if (!response?.length) break

        items.push(...response)

        // If we have less than the limit of items, we've exhausted them.
        if (response.length < ITEM_LIST_LIMIT) {
          break
        }
      }

      return items
    },
})

/**
 * List all items with a certain prefix, removing the prefix from the key.
 */
export const listAllItemsWithPrefixSelector = selectorFamily<
  ArrayOfArrayOfString,
  QueryClientParams & { prefix: string }
>({
  key: 'daoCoreV2ListAllItemsWithPrefix',
  get:
    ({ prefix, ...queryClientParams }) =>
    async ({ get }) => {
      const items = get(listAllItemsSelector(queryClientParams))
      return items.flatMap(([key, value]) =>
        key.startsWith(prefix) ? [[key.substring(prefix.length), value]] : []
      )
    },
})

export const polytoneProxiesSelector = selectorFamily<
  PolytoneProxies,
  QueryClientParams
>({
  key: 'daoCoreV2PolytoneProxies',
  get:
    (queryClientParams) =>
    async ({ get }) => {
      // Get polytone notes on this chain.
      const polytoneConnections =
        getSupportedChainConfig(queryClientParams.chainId)?.polytone || {}

      // Fallback to contract query if indexer fails.
      return Object.entries(polytoneConnections)
        .map(([chainId, { note }]) => ({
          chainId,
          proxy: get(
            PolytoneNoteSelectors.remoteAddressSelector({
              contractAddress: note,
              chainId: queryClientParams.chainId,
              params: [
                {
                  localAddress: queryClientParams.contractAddress,
                },
              ],
            })
          ),
        }))
        .reduce(
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
    },
})

export const approvalDaosSelector = selectorFamily<
  {
    dao: string
    preProposeAddress: string
  }[],
  QueryClientParams
>({
  key: 'daoCoreV2ApprovalDaos',
  get:
    ({ chainId, contractAddress }) =>
    ({ get }) =>
      // No indexer on Secret Network.
      [],
  // get(
  //   queryContractIndexerSelector({
  //     chainId,
  //     contractAddress,
  //     formula: 'daoCore/approvalDaos',
  //     noFallback: true,
  //   })
  // ),
})
