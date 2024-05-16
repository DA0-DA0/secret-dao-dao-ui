import { selectorFamily } from 'recoil'

import {
  CwVestingStakeHistory,
  Uint128,
  Uint64,
  WithChainId,
} from '@dao-dao/types'
import { OwnershipForAddr, Vest } from '@dao-dao/types/contracts/CwVesting'

import {
  CwVestingClient,
  CwVestingQueryClient,
} from '../../../contracts/CwVesting'
import { refreshVestingAtom, signingCosmWasmClientAtom } from '../../atoms'
import { cosmWasmClientForChainSelector } from '../chain'
import { QueryIndexerParams } from '../indexer'

type QueryClientParams = WithChainId<{
  contractAddress: string
}>

const queryClient = selectorFamily<CwVestingQueryClient, QueryClientParams>({
  key: 'cwVestingQueryClient',
  get:
    ({ contractAddress, chainId }) =>
    ({ get }) => {
      const client = get(cosmWasmClientForChainSelector(chainId))
      return new CwVestingQueryClient(client, contractAddress)
    },
  dangerouslyAllowMutability: true,
})

export type ExecuteClientParams = WithChainId<{
  contractAddress: string
  sender: string
}>

export const executeClient = selectorFamily<
  CwVestingClient | undefined,
  ExecuteClientParams
>({
  key: 'cwVestingExecuteClient',
  get:
    ({ chainId, contractAddress, sender }) =>
    ({ get }) => {
      const client = get(signingCosmWasmClientAtom({ chainId }))
      if (!client) return
      return new CwVestingClient(client, sender, contractAddress)
    },
  dangerouslyAllowMutability: true,
})

export const infoSelector = selectorFamily<
  Vest,
  QueryClientParams & {
    params: Parameters<CwVestingQueryClient['info']>
  }
>({
  key: 'cwVestingInfo',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      get(refreshVestingAtom(''))
      get(refreshVestingAtom(queryClientParams.contractAddress))

      const client = get(queryClient(queryClientParams))
      return await client.info(...params)
    },
})
export const ownershipSelector = selectorFamily<
  OwnershipForAddr,
  QueryClientParams & {
    params: Parameters<CwVestingQueryClient['ownership']>
  }
>({
  key: 'cwVestingOwnership',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      get(refreshVestingAtom(''))
      get(refreshVestingAtom(queryClientParams.contractAddress))
      const client = get(queryClient(queryClientParams))
      return await client.ownership(...params)
    },
})
export const distributableSelector = selectorFamily<
  Uint128,
  QueryClientParams & {
    params: Parameters<CwVestingQueryClient['distributable']>
  }
>({
  key: 'cwVestingDistributable',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      get(refreshVestingAtom(''))
      get(refreshVestingAtom(queryClientParams.contractAddress))
      const client = get(queryClient(queryClientParams))
      return await client.distributable(...params)
    },
})
export const vestedSelector = selectorFamily<
  Uint128,
  QueryClientParams & {
    params: Parameters<CwVestingQueryClient['vested']>
  }
>({
  key: 'cwVestingVested',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      get(refreshVestingAtom(''))
      get(refreshVestingAtom(queryClientParams.contractAddress))
      const client = get(queryClient(queryClientParams))
      return await client.vested(...params)
    },
})
export const totalToVestSelector = selectorFamily<
  Uint128,
  QueryClientParams & {
    params: Parameters<CwVestingQueryClient['totalToVest']>
  }
>({
  key: 'cwVestingTotalToVest',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.totalToVest(...params)
    },
})
export const vestDurationSelector = selectorFamily<
  Uint64,
  QueryClientParams & {
    params: Parameters<CwVestingQueryClient['vestDuration']>
  }
>({
  key: 'cwVestingVestDuration',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.vestDuration(...params)
    },
})
export const stakeSelector = selectorFamily<
  Uint128,
  QueryClientParams & {
    params: Parameters<CwVestingQueryClient['stake']>
  }
>({
  key: 'cwVestingStake',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      get(refreshVestingAtom(''))
      get(refreshVestingAtom(queryClientParams.contractAddress))
      const client = get(queryClient(queryClientParams))
      return await client.stake(...params)
    },
})

//! Custom selectors

// TODO(indexer): Use TX events indexer for this instead.
export const stakeHistorySelector = selectorFamily<
  CwVestingStakeHistory | null,
  QueryClientParams & Pick<QueryIndexerParams, 'block'>
>({
  key: 'cwVestingValidatorStakeHistory',
  get:
    ({ contractAddress, chainId }) =>
    // eslint-disable-next-line react/display-name
    ({ get }) => {
      // No indexer on Secret Network.
      return null

      // const anyId = get(refreshVestingAtom(''))
      // const thisId = get(refreshVestingAtom(contractAddress))
      // return get(
      //   queryContractIndexerSelector({
      //     contractAddress,
      //     formula: 'cwVesting/stakeHistory',
      //     chainId,
      //     id: anyId + thisId,
      //     noFallback: true,
      //   })
      // )
    },
})

// No query to get this value, so require it.
export const unbondingDurationSecondsSelector = selectorFamily<
  number | null,
  QueryClientParams
>({
  key: 'cwVestingValidatorUnbondingDurationSeconds',
  get:
    ({ contractAddress, chainId }) =>
    // eslint-disable-next-line react/display-name
    ({ get }) =>
      // No indexer on Secret Network.
      null,
  // get(
  //   queryContractIndexerSelector({
  //     contractAddress,
  //     formula: 'cwVesting/unbondingDurationSeconds',
  //     chainId,
  //     noFallback: true,
  //   })
  // ),
})
