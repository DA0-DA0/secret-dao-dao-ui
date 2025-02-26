import { selectorFamily } from 'recoil'

import { Addr, WithChainId } from '@dao-dao/types'
import {
  Config,
  DepositInfoResponse,
  HooksResponse,
} from '@dao-dao/types/contracts/DaoPreProposeApprover'
import { extractAddressFromMaybeSecretContractInfo } from '@dao-dao/utils'

import { DaoPreProposeApproverQueryClient } from '../../../contracts/DaoPreProposeApprover'
import { refreshProposalsIdAtom } from '../../atoms'
import { cosmWasmClientForChainSelector } from '../chain'

type QueryClientParams = WithChainId<{
  contractAddress: string
}>

export const queryClient = selectorFamily<
  DaoPreProposeApproverQueryClient,
  QueryClientParams
>({
  key: 'daoPreProposeApproverSingleQueryClient',
  get:
    ({ contractAddress, chainId }) =>
    ({ get }) => {
      const client = get(cosmWasmClientForChainSelector(chainId))
      return new DaoPreProposeApproverQueryClient(client, contractAddress)
    },
  dangerouslyAllowMutability: true,
})

export const proposalModuleSelector = selectorFamily<
  Addr,
  QueryClientParams & {
    params: Parameters<DaoPreProposeApproverQueryClient['proposalModule']>
  }
>({
  key: 'daoPreProposeApproverProposalModule',
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
    params: Parameters<DaoPreProposeApproverQueryClient['dao']>
  }
>({
  key: 'daoPreProposeApproverDao',
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
    params: Parameters<DaoPreProposeApproverQueryClient['config']>
  }
>({
  key: 'daoPreProposeApproverConfig',
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
    params: Parameters<DaoPreProposeApproverQueryClient['depositInfo']>
  }
>({
  key: 'daoPreProposeApproverDepositInfo',
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
      DaoPreProposeApproverQueryClient['proposalSubmittedHooks']
    >
  }
>({
  key: 'daoPreProposeApproverProposalSubmittedHooks',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.proposalSubmittedHooks(...params)
    },
})
export const queryExtensionSelector = selectorFamily<
  string | number,
  QueryClientParams & {
    params: Parameters<DaoPreProposeApproverQueryClient['queryExtension']>
  }
>({
  key: 'daoPreProposeApproverQueryExtension',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      get(refreshProposalsIdAtom)

      const client = get(queryClient(queryClientParams))
      const res = await client.queryExtension(...params)

      // This will be an object if on Secret Network and a string otherwise.
      if (
        'pre_propose_approval_contract' in params[0].msg &&
        typeof res === 'object'
      ) {
        return extractAddressFromMaybeSecretContractInfo(res)
      }

      return res
    },
})
