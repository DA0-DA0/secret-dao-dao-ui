import { selectorFamily } from 'recoil'

import { SecretAnyContractInfo, WithChainId } from '@dao-dao/types'
import {
  Config,
  HooksResponse,
  ProposalCreationPolicy,
  ProposalListResponse,
  ProposalResponse,
  VoteInfo,
  VoteListResponse,
  VoteResponse,
} from '@dao-dao/types/contracts/DaoProposalMultiple'

import {
  DaoProposalMultipleClient,
  DaoProposalMultipleQueryClient,
} from '../../../contracts/DaoProposalMultiple'
import {
  refreshProposalIdAtom,
  refreshProposalsIdAtom,
  signingCosmWasmClientAtom,
} from '../../atoms'
import { cosmWasmClientForChainSelector } from '../chain'
import { contractInfoSelector } from '../contract'

type QueryClientParams = WithChainId<{
  contractAddress: string
}>

export const queryClient = selectorFamily<
  DaoProposalMultipleQueryClient,
  QueryClientParams
>({
  key: 'daoProposalMultipleQueryClient',
  get:
    ({ contractAddress, chainId }) =>
    ({ get }) => {
      const client = get(cosmWasmClientForChainSelector(chainId))
      return new DaoProposalMultipleQueryClient(client, contractAddress)
    },
  dangerouslyAllowMutability: true,
})

export type ExecuteClientParams = WithChainId<{
  contractAddress: string
  sender: string
}>

export const executeClient = selectorFamily<
  DaoProposalMultipleClient | undefined,
  ExecuteClientParams
>({
  key: 'daoProposalMultipleExecuteClient',
  get:
    ({ chainId, contractAddress, sender }) =>
    ({ get }) => {
      const client = get(signingCosmWasmClientAtom({ chainId }))
      if (!client) return

      return new DaoProposalMultipleClient(client, sender, contractAddress)
    },
  dangerouslyAllowMutability: true,
})

export const configSelector = selectorFamily<Config, QueryClientParams>({
  key: 'daoProposalMultipleConfig',
  get:
    (queryClientParams) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.config()
    },
})
export const proposalSelector = selectorFamily<
  ProposalResponse,
  QueryClientParams & {
    params: Parameters<DaoProposalMultipleQueryClient['proposal']>
  }
>({
  key: 'daoProposalMultipleProposal',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      get(refreshProposalsIdAtom)
      get(
        refreshProposalIdAtom({
          address: queryClientParams.contractAddress,
          proposalId: params[0].proposalId,
        })
      )

      const client = get(queryClient(queryClientParams))
      return await client.proposal(...params)
    },
})
export const listProposalsSelector = selectorFamily<
  ProposalListResponse,
  QueryClientParams & {
    params: Parameters<DaoProposalMultipleQueryClient['listProposals']>
  }
>({
  key: 'daoProposalMultipleListProposals',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      get(refreshProposalsIdAtom)

      const client = get(queryClient(queryClientParams))
      return await client.listProposals(...params)
    },
})
export const reverseProposalsSelector = selectorFamily<
  ProposalListResponse,
  QueryClientParams & {
    params: Parameters<DaoProposalMultipleQueryClient['reverseProposals']>
  }
>({
  key: 'daoProposalMultipleReverseProposals',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      get(refreshProposalsIdAtom)

      // If indexer query fails, fallback to contract query.
      const client = get(queryClient(queryClientParams))
      return await client.reverseProposals(...params)
    },
})
export const proposalCountSelector = selectorFamily<number, QueryClientParams>({
  key: 'daoProposalMultipleProposalCount',
  get:
    (queryClientParams) =>
    async ({ get }) => {
      get(refreshProposalsIdAtom)

      const client = get(queryClient(queryClientParams))
      return Number(await client.proposalCount())
    },
})
export const getVoteSelector = selectorFamily<
  VoteResponse,
  QueryClientParams & {
    params: Parameters<DaoProposalMultipleQueryClient['getVote']>
  }
>({
  key: 'daoProposalMultipleGetVote',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      get(refreshProposalsIdAtom)
      get(
        refreshProposalIdAtom({
          address: queryClientParams.contractAddress,
          proposalId: params[0].proposalId,
        })
      )

      const client = get(queryClient(queryClientParams))
      return await client.getVote(...params)
    },
})
export const listVotesSelector = selectorFamily<
  VoteListResponse,
  QueryClientParams & {
    params: Parameters<DaoProposalMultipleQueryClient['listVotes']>
  }
>({
  key: 'daoProposalMultipleListVotes',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      get(refreshProposalsIdAtom)
      get(
        refreshProposalIdAtom({
          address: queryClientParams.contractAddress,
          proposalId: params[0].proposalId,
        })
      )

      const client = get(queryClient(queryClientParams))
      return await client.listVotes(...params)
    },
})
export const proposalCreationPolicySelector = selectorFamily<
  ProposalCreationPolicy,
  QueryClientParams & {
    params: Parameters<DaoProposalMultipleQueryClient['proposalCreationPolicy']>
  }
>({
  key: 'daoProposalMultipleProposalCreationPolicy',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.proposalCreationPolicy(...params)
    },
})
export const proposalHooksSelector = selectorFamily<
  HooksResponse,
  QueryClientParams & {
    params: Parameters<DaoProposalMultipleQueryClient['proposalHooks']>
  }
>({
  key: 'daoProposalMultipleProposalHooks',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.proposalHooks(...params)
    },
})
export const voteHooksSelector = selectorFamily<
  HooksResponse,
  QueryClientParams & {
    params: Parameters<DaoProposalMultipleQueryClient['voteHooks']>
  }
>({
  key: 'daoProposalMultipleVoteHooks',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.voteHooks(...params)
    },
})
export const daoSelector = selectorFamily<
  SecretAnyContractInfo,
  QueryClientParams & {
    params: Parameters<DaoProposalMultipleQueryClient['dao']>
  }
>({
  key: 'daoProposalMultipleDao',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.dao(...params)
    },
})
export const infoSelector = contractInfoSelector

const LIST_ALL_VOTES_LIMIT = 30
export const listAllVotesSelector = selectorFamily<
  VoteInfo[],
  QueryClientParams & {
    proposalId: number
  }
>({
  key: 'daoProposalMultipleListAllVotes',
  get:
    ({ proposalId, ...queryClientParams }) =>
    async ({ get }) => {
      const votes: VoteInfo[] = []

      while (true) {
        const response = get(
          listVotesSelector({
            ...queryClientParams,
            params: [
              {
                startAfter: votes[votes.length - 1]?.voter,
                proposalId,
                limit: LIST_ALL_VOTES_LIMIT,
              },
            ],
          })
        )
        if (!response?.votes.length) break

        votes.push(...response.votes)

        // If we have less than the limit of items, we've exhausted them.
        if (response.votes.length < LIST_ALL_VOTES_LIMIT) {
          break
        }
      }

      return votes
    },
})
