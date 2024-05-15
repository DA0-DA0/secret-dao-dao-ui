import { selectorFamily } from 'recoil'

import { WithChainId } from '@dao-dao/types'
import { NullableString } from '@dao-dao/types/contracts/PolytoneNote'

import { PolytoneNoteQueryClient } from '../../../contracts/PolytoneNote'
import { cosmWasmClientForChainSelector } from '../chain'

type QueryClientParams = WithChainId<{
  contractAddress: string
}>

export const queryClient = selectorFamily<
  PolytoneNoteQueryClient,
  QueryClientParams
>({
  key: 'polytoneNoteQueryClient',
  get:
    ({ contractAddress, chainId }) =>
    ({ get }) => {
      const client = get(cosmWasmClientForChainSelector(chainId))
      return new PolytoneNoteQueryClient(client, contractAddress)
    },
  dangerouslyAllowMutability: true,
})

export const remoteAddressSelector = selectorFamily<
  NullableString,
  QueryClientParams & {
    params: Parameters<PolytoneNoteQueryClient['remoteAddress']>
  }
>({
  key: 'polytoneNoteRemoteAddress',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.remoteAddress(...params)
    },
})
