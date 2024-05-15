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
} from '@dao-dao/types/contracts/DaoProposalSingle.v2'

import {
  DaoProposalSingleV2Client,
  DaoProposalSingleV2QueryClient,
} from '../../../contracts/DaoProposalSingle.v2'
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
  DaoProposalSingleV2QueryClient,
  QueryClientParams
>({
  key: 'daoProposalSingleV2QueryClient',
  get:
    ({ contractAddress, chainId }) =>
    ({ get }) => {
      const client = get(cosmWasmClientForChainSelector(chainId))
      return new DaoProposalSingleV2QueryClient(client, contractAddress)
    },
  dangerouslyAllowMutability: true,
})

export type ExecuteClientParams = WithChainId<{
  contractAddress: string
  sender: string
}>

export const executeClient = selectorFamily<
  DaoProposalSingleV2Client | undefined,
  ExecuteClientParams
>({
  key: 'daoProposalSingleV2ExecuteClient',
  get:
    ({ chainId, contractAddress, sender }) =>
    ({ get }) => {
      const client = get(signingCosmWasmClientAtom({ chainId }))
      if (!client) return

      return new DaoProposalSingleV2Client(client, sender, contractAddress)
    },
  dangerouslyAllowMutability: true,
})

export const configSelector = selectorFamily<Config, QueryClientParams>({
  key: 'daoProposalSingleV2Config',
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
    params: Parameters<DaoProposalSingleV2QueryClient['proposal']>
  }
>({
  key: 'daoProposalSingleV2Proposal',
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
    params: Parameters<DaoProposalSingleV2QueryClient['listProposals']>
  }
>({
  key: 'daoProposalSingleV2ListProposals',
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
    params: Parameters<DaoProposalSingleV2QueryClient['reverseProposals']>
  }
>({
  key: 'daoProposalSingleV2ReverseProposals',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      get(refreshProposalsIdAtom)

      const client = get(queryClient(queryClientParams))
      return await client.reverseProposals(...params)
    },
})
export const proposalCountSelector = selectorFamily<number, QueryClientParams>({
  key: 'daoProposalSingleV2ProposalCount',
  get:
    (queryClientParams) =>
    async ({ get }) => {
      get(refreshProposalsIdAtom)
      const client = get(queryClient(queryClientParams))
      return await client.proposalCount()
    },
})
export const getVoteSelector = selectorFamily<
  VoteResponse,
  QueryClientParams & {
    params: Parameters<DaoProposalSingleV2QueryClient['getVote']>
  }
>({
  key: 'daoProposalSingleV2GetVote',
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
    params: Parameters<DaoProposalSingleV2QueryClient['listVotes']>
  }
>({
  key: 'daoProposalSingleV2ListVotes',
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
    params: Parameters<DaoProposalSingleV2QueryClient['proposalCreationPolicy']>
  }
>({
  key: 'daoProposalSingleV2ProposalCreationPolicy',
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
    params: Parameters<DaoProposalSingleV2QueryClient['proposalHooks']>
  }
>({
  key: 'daoProposalSingleV2ProposalHooks',
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
    params: Parameters<DaoProposalSingleV2QueryClient['voteHooks']>
  }
>({
  key: 'daoProposalSingleV2VoteHooks',
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
    params: Parameters<DaoProposalSingleV2QueryClient['dao']>
  }
>({
  key: 'daoProposalSingleV2Dao',
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
  key: 'daoProposalSingleV2ListAllVotes',
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
