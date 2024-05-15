import { selectorFamily } from 'recoil'

import { WithChainId } from '@dao-dao/types'
import {
  ActiveThresholdResponse,
  DaoResponse,
  IsActiveResponse,
  StakingContractResponse,
  TokenContractResponse,
  TotalPowerAtHeightResponse,
  VotingPowerAtHeightResponse,
} from '@dao-dao/types/contracts/DaoVotingCw20Staked'

import { DaoVotingCw20StakedQueryClient } from '../../../contracts/DaoVotingCw20Staked'
import {
  refreshDaoVotingPowerAtom,
  refreshWalletBalancesIdAtom,
} from '../../atoms/refresh'
import { cosmWasmClientForChainSelector } from '../chain'
import { contractInfoSelector } from '../contract'

type QueryClientParams = WithChainId<{
  contractAddress: string
}>

const queryClient = selectorFamily<
  DaoVotingCw20StakedQueryClient,
  QueryClientParams
>({
  key: 'daoVotingCw20StakedQueryClient',
  get:
    ({ contractAddress, chainId }) =>
    ({ get }) => {
      const client = get(cosmWasmClientForChainSelector(chainId))
      return new DaoVotingCw20StakedQueryClient(client, contractAddress)
    },
  dangerouslyAllowMutability: true,
})

export const stakingContractSelector = selectorFamily<
  StakingContractResponse,
  QueryClientParams & {
    params: Parameters<DaoVotingCw20StakedQueryClient['stakingContract']>
  }
>({
  key: 'daoVotingCw20StakedStakingContract',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.stakingContract(...params)
    },
})
export const daoSelector = selectorFamily<
  DaoResponse,
  QueryClientParams & {
    params: Parameters<DaoVotingCw20StakedQueryClient['dao']>
  }
>({
  key: 'daoVotingCw20StakedDao',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.dao(...params)
    },
})
export const activeThresholdSelector = selectorFamily<
  ActiveThresholdResponse,
  QueryClientParams & {
    params: Parameters<DaoVotingCw20StakedQueryClient['activeThreshold']>
  }
>({
  key: 'daoVotingCw20StakedActiveThreshold',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.activeThreshold(...params)
    },
})
export const votingPowerAtHeightSelector = selectorFamily<
  VotingPowerAtHeightResponse,
  QueryClientParams & {
    params: Parameters<DaoVotingCw20StakedQueryClient['votingPowerAtHeight']>
  }
>({
  key: 'daoVotingCw20StakedVotingPowerAtHeight',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      get(refreshWalletBalancesIdAtom(params[0].address))

      const client = get(queryClient(queryClientParams))
      return await client.votingPowerAtHeight(...params)
    },
})
export const totalPowerAtHeightSelector = selectorFamily<
  TotalPowerAtHeightResponse,
  QueryClientParams & {
    params: Parameters<DaoVotingCw20StakedQueryClient['totalPowerAtHeight']>
  }
>({
  key: 'daoVotingCw20StakedTotalPowerAtHeight',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      get(refreshWalletBalancesIdAtom(undefined))
      get(refreshDaoVotingPowerAtom(queryClientParams.contractAddress))

      const client = get(queryClient(queryClientParams))
      return await client.totalPowerAtHeight(...params)
    },
})
export const infoSelector = contractInfoSelector
export const tokenContractSelector = selectorFamily<
  TokenContractResponse,
  QueryClientParams & {
    params: Parameters<DaoVotingCw20StakedQueryClient['tokenContract']>
  }
>({
  key: 'daoVotingCw20StakedTokenContract',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.tokenContract(...params)
    },
})
export const isActiveSelector = selectorFamily<
  IsActiveResponse,
  QueryClientParams & {
    params: Parameters<DaoVotingCw20StakedQueryClient['isActive']>
  }
>({
  key: 'daoVotingCw20StakedIsActive',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      get(refreshWalletBalancesIdAtom(undefined))
      const client = get(queryClient(queryClientParams))
      return await client.isActive(...params)
    },
})

///! Custom selectors

export const topStakersSelector = selectorFamily<
  | {
      address: string
      balance: string
      votingPowerPercent: number
    }[]
  | undefined,
  QueryClientParams & { limit?: number }
>({
  key: 'daoVotingCw20StakedTopStakers',
  get:
    ({ limit, ...queryClientParams }) =>
    ({ get }) => {
      // No indexer on Secret Network.
      return undefined

      // get(refreshWalletBalancesIdAtom(undefined))
      // get(refreshDaoVotingPowerAtom(queryClientParams.contractAddress))
      // return (
      //   get(
      //     queryContractIndexerSelector({
      //       ...queryClientParams,
      //       formula: 'daoVotingCw20Staked/topStakers',
      //       args: {
      //         limit,
      //       },
      //       id,
      //       noFallback: true,
      //     })
      //   ) ?? undefined
      // )
    },
})
