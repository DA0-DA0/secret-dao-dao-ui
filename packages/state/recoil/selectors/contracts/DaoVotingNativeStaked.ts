import { selectorFamily } from 'recoil'

import { WithChainId } from '@dao-dao/types'
import {
  ClaimsResponse,
  DaoResponse,
  GetConfigResponse,
  ListStakersResponse,
  TotalPowerAtHeightResponse,
  VotingPowerAtHeightResponse,
} from '@dao-dao/types/contracts/DaoVotingNativeStaked'

import {
  DaoVotingNativeStakedClient,
  DaoVotingNativeStakedQueryClient,
} from '../../../contracts/DaoVotingNativeStaked'
import { signingCosmWasmClientAtom } from '../../atoms'
import {
  refreshClaimsIdAtom,
  refreshDaoVotingPowerAtom,
  refreshWalletBalancesIdAtom,
} from '../../atoms/refresh'
import { cosmWasmClientForChainSelector } from '../chain'
import { contractInfoSelector } from '../contract'

type QueryClientParams = WithChainId<{
  contractAddress: string
}>

export const queryClient = selectorFamily<
  DaoVotingNativeStakedQueryClient,
  QueryClientParams
>({
  key: 'daoVotingNativeStakedQueryClient',
  get:
    ({ contractAddress, chainId }) =>
    ({ get }) => {
      const client = get(cosmWasmClientForChainSelector(chainId))
      return new DaoVotingNativeStakedQueryClient(client, contractAddress)
    },
  dangerouslyAllowMutability: true,
})

export type ExecuteClientParams = WithChainId<{
  contractAddress: string
  sender: string
}>

export const executeClient = selectorFamily<
  DaoVotingNativeStakedClient | undefined,
  ExecuteClientParams
>({
  key: 'daoVotingNativeStakedExecuteClient',
  get:
    ({ chainId, contractAddress, sender }) =>
    ({ get }) => {
      const client = get(signingCosmWasmClientAtom({ chainId }))
      if (!client) return
      return new DaoVotingNativeStakedClient(client, sender, contractAddress)
    },
  dangerouslyAllowMutability: true,
})

export const daoSelector = selectorFamily<
  DaoResponse,
  QueryClientParams & {
    params: Parameters<DaoVotingNativeStakedQueryClient['dao']>
  }
>({
  key: 'daoVotingNativeStakedDao',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.dao(...params)
    },
})
export const getConfigSelector = selectorFamily<
  GetConfigResponse,
  QueryClientParams & {
    params: Parameters<DaoVotingNativeStakedQueryClient['getConfig']>
  }
>({
  key: 'daoVotingNativeStakedGetConfig',
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
    params: Parameters<DaoVotingNativeStakedQueryClient['claims']>
  }
>({
  key: 'daoVotingNativeStakedClaims',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      get(refreshClaimsIdAtom(params[0].address))

      const client = get(queryClient(queryClientParams))
      return await client.claims(...params)
    },
})
export const listStakersSelector = selectorFamily<
  ListStakersResponse,
  QueryClientParams & {
    params: Parameters<DaoVotingNativeStakedQueryClient['listStakers']>
  }
>({
  key: 'daoVotingNativeStakedListStakers',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.listStakers(...params)
    },
})
export const votingPowerAtHeightSelector = selectorFamily<
  VotingPowerAtHeightResponse,
  QueryClientParams & {
    params: Parameters<DaoVotingNativeStakedQueryClient['votingPowerAtHeight']>
  }
>({
  key: 'daoVotingNativeStakedVotingPowerAtHeight',
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
    params: Parameters<DaoVotingNativeStakedQueryClient['totalPowerAtHeight']>
  }
>({
  key: 'daoVotingNativeStakedTotalPowerAtHeight',
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

///! Custom selectors

export const topStakersSelector = selectorFamily<
  | {
      address: string
      balance: string
      votingPowerPercent: number
    }[]
  | undefined,
  QueryClientParams
>({
  key: 'daoVotingNativeStakedTopStakers',
  get:
    (queryClientParams) =>
    ({ get }) => {
      // No indexer on Secret Network.
      return undefined

      // get(refreshWalletBalancesIdAtom(undefined))
      // get(refreshDaoVotingPowerAtom(queryClientParams.contractAddress))

      // return (
      //   get(
      //     queryContractIndexerSelector({
      //       ...queryClientParams,
      //       formula: 'daoVotingNativeStaked/topStakers',
      //       id,
      //       noFallback: true,
      //     })
      //   ) ?? undefined
      // )
    },
})
