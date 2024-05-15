import { selectorFamily } from 'recoil'

import { Addr, WithChainId } from '@dao-dao/types'
import {
  Config,
  DepositInfoResponse,
  HooksResponse,
} from '@dao-dao/types/contracts/DaoPreProposeApprovalSingle'
import { extractAddressFromMaybeSecretContractInfo } from '@dao-dao/utils'

import {
  DaoPreProposeApprovalSingleClient,
  DaoPreProposeApprovalSingleQueryClient,
} from '../../../contracts/DaoPreProposeApprovalSingle'
import { refreshProposalsIdAtom, signingCosmWasmClientAtom } from '../../atoms'
import { cosmWasmClientForChainSelector } from '../chain'

type QueryClientParams = WithChainId<{
  contractAddress: string
}>

export const queryClient = selectorFamily<
  DaoPreProposeApprovalSingleQueryClient,
  QueryClientParams
>({
  key: 'daoPreProposeApprovalSingleQueryClient',
  get:
    ({ contractAddress, chainId }) =>
    ({ get }) => {
      const client = get(cosmWasmClientForChainSelector(chainId))
      return new DaoPreProposeApprovalSingleQueryClient(client, contractAddress)
    },
  dangerouslyAllowMutability: true,
})

export type ExecuteClientParams = WithChainId<{
  contractAddress: string
  sender: string
}>

export const executeClient = selectorFamily<
  DaoPreProposeApprovalSingleClient | undefined,
  ExecuteClientParams
>({
  key: 'daoPreProposeApprovalSingleExecuteClient',
  get:
    ({ chainId, contractAddress, sender }) =>
    ({ get }) => {
      const client = get(signingCosmWasmClientAtom({ chainId }))
      if (!client) return

      return new DaoPreProposeApprovalSingleClient(
        client,
        sender,
        contractAddress
      )
    },
  dangerouslyAllowMutability: true,
})

export const proposalModuleSelector = selectorFamily<
  Addr,
  QueryClientParams & {
    params: Parameters<DaoPreProposeApprovalSingleQueryClient['proposalModule']>
  }
>({
  key: 'daoPreProposeApprovalSingleProposalModule',
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
  Addr,
  QueryClientParams & {
    params: Parameters<DaoPreProposeApprovalSingleQueryClient['dao']>
  }
>({
  key: 'daoPreProposeApprovalSingleDao',
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
    params: Parameters<DaoPreProposeApprovalSingleQueryClient['config']>
  }
>({
  key: 'daoPreProposeApprovalSingleConfig',
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
    params: Parameters<DaoPreProposeApprovalSingleQueryClient['depositInfo']>
  }
>({
  key: 'daoPreProposeApprovalSingleDepositInfo',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.depositInfo(...params)
    },
})
export const proposalSubmittedHooksSelector = selectorFamily<
  HooksResponse,
  QueryClientParams & {
    params: Parameters<
      DaoPreProposeApprovalSingleQueryClient['proposalSubmittedHooks']
    >
  }
>({
  key: 'daoPreProposeApprovalSingleProposalSubmittedHooks',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.proposalSubmittedHooks(...params)
    },
})
export const queryExtensionSelector = selectorFamily<
  any,
  QueryClientParams & {
    params: Parameters<DaoPreProposeApprovalSingleQueryClient['queryExtension']>
  }
>({
  key: 'daoPreProposeApprovalSingleQueryExtension',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      get(refreshProposalsIdAtom)

      const client = get(queryClient(queryClientParams))
      return await client.queryExtension(...params)
    },
})
