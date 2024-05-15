import { selectorFamily } from 'recoil'

import { WithChainId } from '@dao-dao/types'
import { ResultResponse } from '@dao-dao/types/contracts/PolytoneListener'

import { PolytoneListenerQueryClient } from '../../../contracts/PolytoneListener'
import { refreshPolytoneListenerResultsAtom } from '../../atoms'
import { cosmWasmClientForChainSelector } from '../chain'

type QueryClientParams = WithChainId<{
  contractAddress: string
}>

export const queryClient = selectorFamily<
  PolytoneListenerQueryClient,
  QueryClientParams
>({
  key: 'polytoneListenerQueryClient',
  get:
    ({ contractAddress, chainId }) =>
    ({ get }) => {
      const client = get(cosmWasmClientForChainSelector(chainId))
      return new PolytoneListenerQueryClient(client, contractAddress)
    },
  dangerouslyAllowMutability: true,
})

export const noteSelector = selectorFamily<
  string,
  QueryClientParams & {
    params: Parameters<PolytoneListenerQueryClient['note']>
  }
>({
  key: 'polytoneListenerNote',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.note(...params)
    },
})

export const resultSelector = selectorFamily<
  ResultResponse,
  QueryClientParams & {
    params: Parameters<PolytoneListenerQueryClient['result']>
  }
>({
  key: 'polytoneListenerResult',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      get(refreshPolytoneListenerResultsAtom)

      const client = get(queryClient(queryClientParams))
      return await client.result(...params)
    },
})
