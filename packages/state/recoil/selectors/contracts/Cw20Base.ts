import { selectorFamily, waitForAll, waitForAllSettled } from 'recoil'

import {
  AmountWithTimestamp,
  TokenInfoResponseWithAddressAndLogo,
  WithChainId,
} from '@dao-dao/types'
import {
  AllAccountsResponse,
  AllAllowancesResponse,
  AllowanceResponse,
  BalanceResponse,
  DownloadLogoResponse,
  MarketingInfoResponse,
  MinterResponse,
  TokenInfoResponse,
} from '@dao-dao/types/contracts/Cw20Base'

import { DaoCoreV2Selectors, DaoVotingCw20StakedSelectors } from '.'
import {
  Cw20BaseClient,
  Cw20BaseQueryClient,
} from '../../../contracts/Cw20Base'
import {
  refreshWalletBalancesIdAtom,
  signingCosmWasmClientAtom,
} from '../../atoms'
import { cosmWasmClientForChainSelector } from '../chain'

type QueryClientParams = WithChainId<{
  contractAddress: string
}>

const queryClient = selectorFamily<Cw20BaseQueryClient, QueryClientParams>({
  key: 'cw20BaseQueryClient',
  get:
    ({ contractAddress, chainId }) =>
    ({ get }) => {
      const client = get(cosmWasmClientForChainSelector(chainId))
      return new Cw20BaseQueryClient(client, contractAddress)
    },
  dangerouslyAllowMutability: true,
})

export type ExecuteClientParams = WithChainId<{
  contractAddress: string
  sender: string
}>

export const executeClient = selectorFamily<
  Cw20BaseClient | undefined,
  ExecuteClientParams
>({
  key: 'cw20BaseExecuteClient',
  get:
    ({ chainId, contractAddress, sender }) =>
    ({ get }) => {
      const client = get(signingCosmWasmClientAtom({ chainId }))
      if (!client) return
      return new Cw20BaseClient(client, sender, contractAddress)
    },
  dangerouslyAllowMutability: true,
})

export const balanceSelector = selectorFamily<
  BalanceResponse,
  QueryClientParams & {
    params: Parameters<Cw20BaseQueryClient['balance']>
  }
>({
  key: 'cw20BaseBalance',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      get(refreshWalletBalancesIdAtom(params[0].address))

      const client = get(queryClient(queryClientParams))
      return await client.balance(...params)
    },
})
export const tokenInfoSelector = selectorFamily<
  TokenInfoResponse,
  QueryClientParams & {
    params: Parameters<Cw20BaseQueryClient['tokenInfo']>
  }
>({
  key: 'cw20BaseTokenInfo',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.tokenInfo(...params)
    },
})
export const minterSelector = selectorFamily<
  MinterResponse,
  QueryClientParams & {
    params: Parameters<Cw20BaseQueryClient['minter']>
  }
>({
  key: 'cw20BaseMinter',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.minter(...params)
    },
})
export const allowanceSelector = selectorFamily<
  AllowanceResponse,
  QueryClientParams & {
    params: Parameters<Cw20BaseQueryClient['allowance']>
  }
>({
  key: 'cw20BaseAllowance',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      get(refreshWalletBalancesIdAtom(params[0].owner))

      const client = get(queryClient(queryClientParams))
      return await client.allowance(...params)
    },
})
export const allAllowancesSelector = selectorFamily<
  AllAllowancesResponse,
  QueryClientParams & {
    params: Parameters<Cw20BaseQueryClient['allAllowances']>
  }
>({
  key: 'cw20BaseAllAllowances',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      get(refreshWalletBalancesIdAtom(params[0].owner))

      const client = get(queryClient(queryClientParams))
      return await client.allAllowances(...params)
    },
})
export const allAccountsSelector = selectorFamily<
  AllAccountsResponse,
  QueryClientParams & {
    params: Parameters<Cw20BaseQueryClient['allAccounts']>
  }
>({
  key: 'cw20BaseAllAccounts',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.allAccounts(...params)
    },
})
export const marketingInfoSelector = selectorFamily<
  MarketingInfoResponse,
  QueryClientParams & {
    params: Parameters<Cw20BaseQueryClient['marketingInfo']>
  }
>({
  key: 'cw20BaseMarketingInfo',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.marketingInfo(...params)
    },
})
export const downloadLogoSelector = selectorFamily<
  DownloadLogoResponse,
  QueryClientParams & {
    params: Parameters<Cw20BaseQueryClient['downloadLogo']>
  }
>({
  key: 'cw20BaseDownloadLogo',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.downloadLogo(...params)
    },
})

//! Custom

export const balanceWithTimestampSelector = selectorFamily<
  AmountWithTimestamp,
  QueryClientParams & {
    params: Parameters<Cw20BaseQueryClient['balance']>
  }
>({
  key: 'cw20BaseBalanceWithTimestamp',
  get:
    (params) =>
    ({ get }) => {
      const amount = Number(get(balanceSelector(params)).balance)

      return {
        amount,
        timestamp: new Date(),
      }
    },
})

export const logoUrlSelector = selectorFamily<
  string | undefined,
  QueryClientParams
>({
  key: 'cw20BaseLogoUrl',
  get:
    ({ contractAddress, chainId }) =>
    ({ get }) => {
      const logoInfo = get(
        // Cw20 on some chains do not support marketing info.
        waitForAllSettled([
          marketingInfoSelector({
            contractAddress,
            chainId,
            params: [],
          }),
        ])
      )[0].valueMaybe()?.logo
      return logoInfo && logoInfo !== 'embedded' && 'url' in logoInfo
        ? logoInfo.url
        : undefined
    },
})

export const tokenInfoWithAddressAndLogoSelector = selectorFamily<
  TokenInfoResponseWithAddressAndLogo,
  QueryClientParams & {
    params: Parameters<Cw20BaseQueryClient['tokenInfo']>
  }
>({
  key: 'cw20BaseTokenInfoWithAddressAndLogo',
  get:
    (params) =>
    async ({ get }) => {
      const tokenInfo = get(tokenInfoSelector(params))
      const logoInfo = get(marketingInfoSelector(params)).logo

      return {
        address: params.contractAddress,
        ...tokenInfo,
        logoUrl:
          !!logoInfo && logoInfo !== 'embedded' && 'url' in logoInfo
            ? logoInfo.url
            : undefined,
      }
    },
})

export const topAccountBalancesSelector = selectorFamily<
  | {
      address: string
      balance: string
    }[]
  | undefined,
  QueryClientParams & { limit?: number }
>({
  key: 'cw20BaseListTopAccountBalances',
  get:
    ({ limit, ...queryClientParams }) =>
    ({ get }) =>
      // get(
      //   queryContractIndexerSelector({
      //     ...queryClientParams,
      //     formula: 'cw20/topAccountBalances',
      //     args: {
      //       limit,
      //     },
      //   })
      // ) ?? undefined,

      // No indexer on Secret Network.
      undefined,
})

// Get DAOs that use this cw20 token as their governance token from the indexer.
export const daosSelector = selectorFamily<string[], QueryClientParams>({
  key: 'cw20BaseDaos',
  get:
    (queryClientParams) =>
    ({ get }) =>
      // get(
      //   queryContractIndexerSelector({
      //     ...queryClientParams,
      //     formula: 'cw20/daos',
      //     noFallback: true,
      //   })
      // ) ?? [],

      // No indexer on Secret Network.
      [],
})

// Get DAOs that use this cw20 token as their governance token from the indexer,
// and load their dao-voting-cw20-staked and cw20-stake contracts.
export const daosWithVotingAndStakingContractSelector = selectorFamily<
  {
    coreAddress: string
    votingModuleAddress: string
    stakingContractAddress: string
  }[],
  QueryClientParams
>({
  key: 'cw20BaseDaosWithVotingAndStakingContract',
  get:
    (queryClientParams) =>
    ({ get }) => {
      const daos = get(daosSelector(queryClientParams))
      const votingModuleAddresses = get(
        waitForAll(
          daos.map((contractAddress) =>
            DaoCoreV2Selectors.votingModuleSelector({
              ...queryClientParams,
              contractAddress,
              params: [],
            })
          )
        )
      )
      const stakingContractAddresses = get(
        waitForAll(
          votingModuleAddresses.map((contractAddress) =>
            DaoVotingCw20StakedSelectors.stakingContractSelector({
              ...queryClientParams,
              contractAddress,
              params: [],
            })
          )
        )
      )

      return daos.map((coreAddress, index) => ({
        coreAddress,
        votingModuleAddress: votingModuleAddresses[index],
        stakingContractAddress: stakingContractAddresses[index],
      }))
    },
})
