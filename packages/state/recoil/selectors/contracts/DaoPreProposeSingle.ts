import { selectorFamily } from 'recoil'

import { WithChainId } from '@dao-dao/types'
import {
  Config,
  DepositInfoResponse,
} from '@dao-dao/types/contracts/DaoPreProposeSingle'
import { extractAddressFromMaybeSecretContractInfo } from '@dao-dao/utils'

import {
  DaoPreProposeSingleClient,
  DaoPreProposeSingleQueryClient,
} from '../../../contracts/DaoPreProposeSingle'
import { signingCosmWasmClientAtom } from '../../atoms'
import { cosmWasmClientForChainSelector } from '../chain'

type QueryClientParams = WithChainId<{
  contractAddress: string
}>

export const queryClient = selectorFamily<
  DaoPreProposeSingleQueryClient,
  QueryClientParams
>({
  key: 'daoPreProposeSingleQueryClient',
  get:
    ({ contractAddress, chainId }) =>
    ({ get }) => {
      const client = get(cosmWasmClientForChainSelector(chainId))
      return new DaoPreProposeSingleQueryClient(client, contractAddress)
    },
  dangerouslyAllowMutability: true,
})

export type ExecuteClientParams = WithChainId<{
  contractAddress: string
  sender: string
}>

export const executeClient = selectorFamily<
  DaoPreProposeSingleClient | undefined,
  ExecuteClientParams
>({
  key: 'daoPreProposeSingleExecuteClient',
  get:
    ({ chainId, contractAddress, sender }) =>
    ({ get }) => {
      const client = get(signingCosmWasmClientAtom({ chainId }))
      if (!client) return

      return new DaoPreProposeSingleClient(client, sender, contractAddress)
    },
  dangerouslyAllowMutability: true,
})

export const proposalModuleSelector = selectorFamily<
  string,
  QueryClientParams & {
    params: Parameters<DaoPreProposeSingleQueryClient['proposalModule']>
  }
>({
  key: 'daoPreProposeSingleProposalModule',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return extractAddressFromMaybeSecretContractInfo(
        await client.proposalModule(...params)
      )
    },
})
export const daoSelector = selectorFamily<
  string,
  QueryClientParams & {
    params: Parameters<DaoPreProposeSingleQueryClient['dao']>
  }
>({
  key: 'daoPreProposeSingleDao',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return extractAddressFromMaybeSecretContractInfo(
        await client.dao(...params)
      )
    },
})
export const configSelector = selectorFamily<
  Config,
  QueryClientParams & {
    params: Parameters<DaoPreProposeSingleQueryClient['config']>
  }
>({
  key: 'daoPreProposeSingleConfig',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.config(...params)
    },
})
export const depositInfoSelector = selectorFamily<
  DepositInfoResponse,
  QueryClientParams & {
    params: Parameters<DaoPreProposeSingleQueryClient['depositInfo']>
  }
>({
  key: 'daoPreProposeSingleDepositInfo',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.depositInfo(...params)
    },
})
// export const extensionSelector = selectorFamily<
//   ExtensionResponse,
//   QueryClientParams & {
//     params: Parameters<DaoPreProposeSingleQueryClient['queryExtension']>
//   }
// >({
//   key: 'daoPreProposeSingleExtension',
//   get:
//     ({ params, ...queryClientParams }) =>
//     async ({ get }) => {
//       const client = get(queryClient(queryClientParams))
//       return await client.queryExtension(...params)
//     },
// })
