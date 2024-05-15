import { selectorFamily } from 'recoil'

import { Addr, WithChainId } from '@dao-dao/types'

import { PolytoneProxyQueryClient } from '../../../contracts/PolytoneProxy'
import { cosmWasmClientForChainSelector } from '../chain'

type QueryClientParams = WithChainId<{
  contractAddress: string
}>

export const queryClient = selectorFamily<
  PolytoneProxyQueryClient,
  QueryClientParams
>({
  key: 'polytoneProxyQueryClient',
  get:
    ({ contractAddress, chainId }) =>
    ({ get }) => {
      const client = get(cosmWasmClientForChainSelector(chainId))
      return new PolytoneProxyQueryClient(client, contractAddress)
    },
  dangerouslyAllowMutability: true,
})

export const instantiatorSelector = selectorFamily<
  Addr,
  QueryClientParams & {
    params: Parameters<PolytoneProxyQueryClient['instantiator']>
  }
>({
  key: 'polytoneProxyInstantiator',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.instantiator(...params)
    },
})

export const remoteControllerForPolytoneProxySelector = selectorFamily<
  string | undefined,
  { chainId: string; voice: string; proxy: string }
>({
  key: 'remoteControllerForPolytoneProxy',
  get:
    ({ chainId, voice, proxy }) =>
    ({ get }) =>
      // No indexer on Secret Network.
      undefined,
  // get(
  //   queryContractIndexerSelector({
  //     chainId,
  //     contractAddress: voice,
  //     formula: 'polytone/voice/remoteController',
  //     args: {
  //       address: proxy,
  //     },
  //     noFallback: true,
  //   })
  // ),
})
