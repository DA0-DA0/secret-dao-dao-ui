import { selectorFamily } from 'recoil'

import { WithChainId } from '@dao-dao/types'
import { AdminListResponse } from '@dao-dao/types/contracts/Cw1Whitelist'
import { ContractName } from '@dao-dao/utils'

import { Cw1WhitelistQueryClient } from '../../../contracts/Cw1Whitelist'
import { cosmWasmClientForChainSelector } from '../chain'
import { isContractSelector } from '../contract'

type QueryClientParams = WithChainId<{
  contractAddress: string
}>

export const queryClient = selectorFamily<
  Cw1WhitelistQueryClient,
  QueryClientParams
>({
  key: 'cw1WhitelistQueryClient',
  get:
    ({ contractAddress, chainId }) =>
    ({ get }) => {
      const client = get(cosmWasmClientForChainSelector(chainId))
      return new Cw1WhitelistQueryClient(client, contractAddress)
    },
  dangerouslyAllowMutability: true,
})

export const adminListSelector = selectorFamily<
  AdminListResponse,
  QueryClientParams & {
    params: Parameters<Cw1WhitelistQueryClient['adminList']>
  }
>({
  key: 'cw1WhitelistAdminList',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.adminList(...params)
    },
})
// export const canExecuteSelector = selectorFamily<
//   CanExecuteResponse,
//   QueryClientParams & {
//     params: Parameters<Cw1WhitelistQueryClient['canExecute']>
//   }
// >({
//   key: 'cw1WhitelistCanExecute',
//   get:
//     ({ params, ...queryClientParams }) =>
//     async ({ get }) => {
//       const client = get(queryClient(queryClientParams))
//       return await client.canExecute(...params)
//     },
// })

// If this is a cw1-whitelist contract, return the admins. Otherwise, return
// undefined.
export const adminsIfCw1Whitelist = selectorFamily<
  string[] | undefined,
  QueryClientParams
>({
  key: 'cw1WhitelistCanExecute',
  get:
    (queryClientParams) =>
    async ({ get }) => {
      if (
        !get(
          isContractSelector({
            ...queryClientParams,
            name: ContractName.Cw1Whitelist,
          })
        )
      ) {
        return
      }

      return get(adminListSelector({ ...queryClientParams, params: [] })).admins
    },
})
