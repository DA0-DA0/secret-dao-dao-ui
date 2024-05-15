import { selectorFamily } from 'recoil'

import { Uint64, WithChainId } from '@dao-dao/types'
import { ArrayOfVestingContract } from '@dao-dao/types/contracts/CwPayrollFactory'
import { OwnershipForAddr } from '@dao-dao/types/contracts/CwVesting'

import {
  CwPayrollFactoryClient,
  CwPayrollFactoryQueryClient,
} from '../../../contracts/CwPayrollFactory'
import { refreshVestingAtom, signingCosmWasmClientAtom } from '../../atoms'
import { cosmWasmClientForChainSelector } from '../chain'

type QueryClientParams = WithChainId<{
  contractAddress: string
}>

const queryClient = selectorFamily<
  CwPayrollFactoryQueryClient,
  QueryClientParams
>({
  key: 'cwPayrollFactoryQueryClient',
  get:
    ({ contractAddress, chainId }) =>
    ({ get }) => {
      const client = get(cosmWasmClientForChainSelector(chainId))
      return new CwPayrollFactoryQueryClient(client, contractAddress)
    },
  dangerouslyAllowMutability: true,
})

export type ExecuteClientParams = WithChainId<{
  contractAddress: string
  sender: string
}>

export const executeClient = selectorFamily<
  CwPayrollFactoryClient | undefined,
  ExecuteClientParams
>({
  key: 'cwPayrollFactoryExecuteClient',
  get:
    ({ chainId, contractAddress, sender }) =>
    ({ get }) => {
      const client = get(signingCosmWasmClientAtom({ chainId }))
      if (!client) return
      return new CwPayrollFactoryClient(client, sender, contractAddress)
    },
  dangerouslyAllowMutability: true,
})
// Use allVestingContractsSelector instead, since it uses the indexer and
// fallsback to looping over pagination to retrieve all from contract.
export const _listVestingContractsSelector = selectorFamily<
  ArrayOfVestingContract,
  QueryClientParams & {
    params: Parameters<CwPayrollFactoryQueryClient['listVestingContracts']>
  }
>({
  key: 'cwPayrollFactoryListVestingContracts',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      get(refreshVestingAtom(''))

      const client = get(queryClient(queryClientParams))
      return await client.listVestingContracts(...params)
    },
})
export const listVestingContractsReverseSelector = selectorFamily<
  ArrayOfVestingContract,
  QueryClientParams & {
    params: Parameters<
      CwPayrollFactoryQueryClient['listVestingContractsReverse']
    >
  }
>({
  key: 'cwPayrollFactoryListVestingContractsReverse',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.listVestingContractsReverse(...params)
    },
})
export const listVestingContractsByInstantiatorSelector = selectorFamily<
  ArrayOfVestingContract,
  QueryClientParams & {
    params: Parameters<
      CwPayrollFactoryQueryClient['listVestingContractsByInstantiator']
    >
  }
>({
  key: 'cwPayrollFactoryListVestingContractsByInstantiator',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.listVestingContractsByInstantiator(...params)
    },
})
export const listVestingContractsByInstantiatorReverseSelector = selectorFamily<
  ArrayOfVestingContract,
  QueryClientParams & {
    params: Parameters<
      CwPayrollFactoryQueryClient['listVestingContractsByInstantiatorReverse']
    >
  }
>({
  key: 'cwPayrollFactoryListVestingContractsByInstantiatorReverse',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.listVestingContractsByInstantiatorReverse(...params)
    },
})
export const listVestingContractsByRecipientSelector = selectorFamily<
  ArrayOfVestingContract,
  QueryClientParams & {
    params: Parameters<
      CwPayrollFactoryQueryClient['listVestingContractsByRecipient']
    >
  }
>({
  key: 'cwPayrollFactoryListVestingContractsByRecipient',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.listVestingContractsByRecipient(...params)
    },
})
export const listVestingContractsByRecipientReverseSelector = selectorFamily<
  ArrayOfVestingContract,
  QueryClientParams & {
    params: Parameters<
      CwPayrollFactoryQueryClient['listVestingContractsByRecipientReverse']
    >
  }
>({
  key: 'cwPayrollFactoryListVestingContractsByRecipientReverse',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.listVestingContractsByRecipientReverse(...params)
    },
})
export const ownershipSelector = selectorFamily<
  OwnershipForAddr,
  QueryClientParams & {
    params: Parameters<CwPayrollFactoryQueryClient['ownership']>
  }
>({
  key: 'cwPayrollFactoryOwnership',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.ownership(...params)
    },
})
export const codeIdSelector = selectorFamily<
  Uint64,
  QueryClientParams & {
    params: Parameters<CwPayrollFactoryQueryClient['codeId']>
  }
>({
  key: 'cwPayrollFactoryCodeId',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.codeId(...params)
    },
})

const ALL_VESTING_CONTRACTS_LIMIT = 30
export const allVestingContractsSelector = selectorFamily<
  ArrayOfVestingContract,
  QueryClientParams
>({
  key: 'cwPayrollFactoryAllVestingContracts',
  get:
    (queryClientParams) =>
    async ({ get }) => {
      get(refreshVestingAtom(''))

      const vestingContracts: ArrayOfVestingContract = []
      while (true) {
        const response = await get(
          _listVestingContractsSelector({
            ...queryClientParams,
            params: [
              {
                startAfter:
                  vestingContracts[vestingContracts.length - 1]?.contract,
                limit: ALL_VESTING_CONTRACTS_LIMIT,
              },
            ],
          })
        )

        if (!response?.length) {
          break
        }

        vestingContracts.push(...response)

        // If we have less than the limit of items, we've exhausted them.
        if (response.length < ALL_VESTING_CONTRACTS_LIMIT) {
          break
        }
      }

      return vestingContracts
    },
})
