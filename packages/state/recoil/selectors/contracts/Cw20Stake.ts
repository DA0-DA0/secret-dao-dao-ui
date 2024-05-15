import { selectorFamily } from 'recoil'

import { WithChainId } from '@dao-dao/types'
import {
  ClaimsResponse,
  GetConfigResponse,
  GetHooksResponse,
  ListStakersResponse,
  StakedBalanceAtHeightResponse,
  StakedValueResponse,
  TotalStakedAtHeightResponse,
  TotalValueResponse,
} from '@dao-dao/types/contracts/Cw20Stake'
import { ConfigResponse as OraichainCw20StakingProxySnapshotConfigResponse } from '@dao-dao/types/contracts/OraichainCw20StakingProxySnapshot'
import { ContractName } from '@dao-dao/utils'

import {
  Cw20StakeClient,
  Cw20StakeQueryClient,
} from '../../../contracts/Cw20Stake'
import {
  refreshClaimsIdAtom,
  refreshWalletBalancesIdAtom,
  signingCosmWasmClientAtom,
} from '../../atoms'
import { cosmWasmClientForChainSelector } from '../chain'
import { isContractSelector } from '../contract'

type QueryClientParams = WithChainId<{
  contractAddress: string
}>

const queryClient = selectorFamily<Cw20StakeQueryClient, QueryClientParams>({
  key: 'cw20StakeQueryClient',
  get:
    ({ contractAddress, chainId }) =>
    ({ get }) => {
      const client = get(cosmWasmClientForChainSelector(chainId))
      return new Cw20StakeQueryClient(client, contractAddress)
    },
  dangerouslyAllowMutability: true,
})

export type ExecuteClientParams = WithChainId<{
  contractAddress: string
  sender: string
}>

export const executeClient = selectorFamily<
  Cw20StakeClient | undefined,
  ExecuteClientParams
>({
  key: 'cw20StakeExecuteClient',
  get:
    ({ chainId, contractAddress, sender }) =>
    ({ get }) => {
      const client = get(signingCosmWasmClientAtom({ chainId }))
      if (!client) return

      return new Cw20StakeClient(client, sender, contractAddress)
    },
  dangerouslyAllowMutability: true,
})

export const stakedBalanceAtHeightSelector = selectorFamily<
  StakedBalanceAtHeightResponse,
  QueryClientParams & {
    params: Parameters<Cw20StakeQueryClient['stakedBalanceAtHeight']>
  }
>({
  key: 'cw20StakeStakedBalanceAtHeight',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      get(refreshWalletBalancesIdAtom(params[0].address))

      const client = get(queryClient(queryClientParams))
      return await client.stakedBalanceAtHeight(...params)
    },
})
export const totalStakedAtHeightSelector = selectorFamily<
  TotalStakedAtHeightResponse,
  QueryClientParams & {
    params: Parameters<Cw20StakeQueryClient['totalStakedAtHeight']>
  }
>({
  key: 'cw20StakeTotalStakedAtHeight',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      get(refreshWalletBalancesIdAtom(undefined))

      const client = get(queryClient(queryClientParams))
      return await client.totalStakedAtHeight(...params)
    },
})
export const stakedValueSelector = selectorFamily<
  StakedValueResponse,
  QueryClientParams & {
    params: Parameters<Cw20StakeQueryClient['stakedValue']>
  }
>({
  key: 'cw20StakeStakedValue',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      get(refreshWalletBalancesIdAtom(params[0].address))

      // If indexer query fails, fallback to contract query.
      const client = get(queryClient(queryClientParams))
      return await client.stakedValue(...params)
    },
})
export const totalValueSelector = selectorFamily<
  TotalValueResponse,
  QueryClientParams & {
    params: Parameters<Cw20StakeQueryClient['totalValue']>
  }
>({
  key: 'cw20StakeTotalValue',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      get(refreshWalletBalancesIdAtom(undefined))

      const client = get(queryClient(queryClientParams))
      return await client.totalValue(...params)
    },
})
export const getConfigSelector = selectorFamily<
  GetConfigResponse,
  QueryClientParams & {
    params: Parameters<Cw20StakeQueryClient['getConfig']>
  }
>({
  key: 'cw20StakeGetConfig',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.getConfig(...params)
    },
})
export const claimsSelector = selectorFamily<
  ClaimsResponse,
  QueryClientParams & {
    params: Parameters<Cw20StakeQueryClient['claims']>
  }
>({
  key: 'cw20StakeClaims',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      get(refreshClaimsIdAtom(params[0].address))

      const client = get(queryClient(queryClientParams))
      return await client.claims(...params)
    },
})
export const getHooksSelector = selectorFamily<
  GetHooksResponse,
  QueryClientParams & {
    params: Parameters<Cw20StakeQueryClient['getHooks']>
  }
>({
  key: 'cw20StakeGetHooks',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.getHooks(...params)
    },
})
export const listStakersSelector = selectorFamily<
  ListStakersResponse,
  QueryClientParams & {
    params: Parameters<Cw20StakeQueryClient['listStakers']>
  }
>({
  key: 'cw20StakeListStakers',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.listStakers(...params)
    },
})

///! Custom selectors

export const topStakersSelector = selectorFamily<
  | {
      address: string
      balance: string
    }[]
  | undefined,
  QueryClientParams & { limit?: number }
>({
  key: 'cw20StakeTopStakers',
  get:
    ({ limit, ...queryClientParams }) =>
    ({ get }) => {
      // No indexer on Secret Network.
      return undefined

      // get(refreshWalletBalancesIdAtom(undefined)) +
      //   get(refreshDaoVotingPowerAtom(queryClientParams.contractAddress))

      // return (
      //   get(
      //     queryContractIndexerSelector({
      //       ...queryClientParams,
      //       formula: 'cw20Stake/topStakers',
      //       args: {
      //         limit,
      //         oraichainStakingToken,
      //       },
      //       id,
      //       noFallback: true,
      //     })
      //   ) ?? undefined
      // )
    },
})

/**
 * The Oraichain cw20-staking-proxy-snapshot contract is used as the staking
 * contract for their custom staking solution. This selector returns whether or
 * not this is a cw20-staking-proxy-snapshot contract.
 */
export const isOraichainProxySnapshotContractSelector = selectorFamily<
  boolean,
  QueryClientParams
>({
  key: 'cw20StakeIsOraichainProxySnapshotContract',
  get:
    (queryClientParams) =>
    ({ get }) =>
      get(
        isContractSelector({
          ...queryClientParams,
          name: ContractName.OraichainCw20StakingProxySnapshot,
        })
      ),
})

/**
 * Get config for Oraichain's cw20-staking-proxy-snapshot contract.
 */
export const oraichainProxySnapshotConfigSelector = selectorFamily<
  OraichainCw20StakingProxySnapshotConfigResponse,
  QueryClientParams
>({
  key: 'cw20StakeOraichainProxySnapshotConfig',
  get:
    (queryClientParams) =>
    async ({ get }) => {
      if (!get(isOraichainProxySnapshotContractSelector(queryClientParams))) {
        throw new Error(
          'Contract is not an Oraichain cw20-staking proxy-snapshot contract'
        )
      }

      const client = get(
        cosmWasmClientForChainSelector(queryClientParams.chainId)
      )
      return await client.queryContractSmart(
        queryClientParams.contractAddress,
        { config: {} }
      )
    },
})
