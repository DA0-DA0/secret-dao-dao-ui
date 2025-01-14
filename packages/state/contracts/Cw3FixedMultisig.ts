/**
 * This file was automatically generated by @cosmwasm/ts-codegen@0.35.7.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run the @cosmwasm/ts-codegen generate command to regenerate this file.
 */

import { StdFee } from '@cosmjs/amino'
import {
  CosmWasmClient,
  ExecuteResult,
  SigningCosmWasmClient,
} from '@cosmjs/cosmwasm-stargate'

import {
  Coin,
  CosmosMsgForEmpty,
  Expiration,
  ProposalListResponseForEmpty,
  ProposalResponseForEmpty,
  ThresholdResponse,
  Vote,
  VoteListResponse,
  VoteResponse,
  VoterListResponse,
  VoterResponse,
} from '@dao-dao/types/contracts/Cw3FixedMultisig'

export interface Cw3FixedMultisigReadOnlyInterface {
  contractAddress: string
  threshold: () => Promise<ThresholdResponse>
  proposal: ({
    proposalId,
  }: {
    proposalId: number
  }) => Promise<ProposalResponseForEmpty>
  listProposals: ({
    limit,
    startAfter,
  }: {
    limit?: number
    startAfter?: number
  }) => Promise<ProposalListResponseForEmpty>
  reverseProposals: ({
    limit,
    startBefore,
  }: {
    limit?: number
    startBefore?: number
  }) => Promise<ProposalListResponseForEmpty>
  getVote: ({
    proposalId,
    voter,
  }: {
    proposalId: number
    voter: string
  }) => Promise<VoteResponse>
  listVotes: ({
    limit,
    proposalId,
    startAfter,
  }: {
    limit?: number
    proposalId: number
    startAfter?: string
  }) => Promise<VoteListResponse>
  voter: ({ address }: { address: string }) => Promise<VoterResponse>
  listVoters: ({
    limit,
    startAfter,
  }: {
    limit?: number
    startAfter?: string
  }) => Promise<VoterListResponse>
}
export class Cw3FixedMultisigQueryClient
  implements Cw3FixedMultisigReadOnlyInterface
{
  client: CosmWasmClient
  contractAddress: string

  constructor(client: CosmWasmClient, contractAddress: string) {
    this.client = client
    this.contractAddress = contractAddress
    this.threshold = this.threshold.bind(this)
    this.proposal = this.proposal.bind(this)
    this.listProposals = this.listProposals.bind(this)
    this.reverseProposals = this.reverseProposals.bind(this)
    this.getVote = this.getVote.bind(this)
    this.listVotes = this.listVotes.bind(this)
    this.voter = this.voter.bind(this)
    this.listVoters = this.listVoters.bind(this)
  }

  threshold = async (): Promise<ThresholdResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      threshold: {},
    })
  }
  proposal = async ({
    proposalId,
  }: {
    proposalId: number
  }): Promise<ProposalResponseForEmpty> => {
    return this.client.queryContractSmart(this.contractAddress, {
      proposal: {
        proposal_id: proposalId,
      },
    })
  }
  listProposals = async ({
    limit,
    startAfter,
  }: {
    limit?: number
    startAfter?: number
  }): Promise<ProposalListResponseForEmpty> => {
    return this.client.queryContractSmart(this.contractAddress, {
      list_proposals: {
        limit,
        start_after: startAfter,
      },
    })
  }
  reverseProposals = async ({
    limit,
    startBefore,
  }: {
    limit?: number
    startBefore?: number
  }): Promise<ProposalListResponseForEmpty> => {
    return this.client.queryContractSmart(this.contractAddress, {
      reverse_proposals: {
        limit,
        start_before: startBefore,
      },
    })
  }
  getVote = async ({
    proposalId,
    voter,
  }: {
    proposalId: number
    voter: string
  }): Promise<VoteResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      vote: {
        proposal_id: proposalId,
        voter,
      },
    })
  }
  listVotes = async ({
    limit,
    proposalId,
    startAfter,
  }: {
    limit?: number
    proposalId: number
    startAfter?: string
  }): Promise<VoteListResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      list_votes: {
        limit,
        proposal_id: proposalId,
        start_after: startAfter,
      },
    })
  }
  voter = async ({ address }: { address: string }): Promise<VoterResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      voter: {
        address,
      },
    })
  }
  listVoters = async ({
    limit,
    startAfter,
  }: {
    limit?: number
    startAfter?: string
  }): Promise<VoterListResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      list_voters: {
        limit,
        start_after: startAfter,
      },
    })
  }
}
export interface Cw3FixedMultisigInterface
  extends Cw3FixedMultisigReadOnlyInterface {
  contractAddress: string
  sender: string
  propose: (
    {
      description,
      latest,
      msgs,
      title,
    }: {
      description: string
      latest?: Expiration
      msgs: CosmosMsgForEmpty[]
      title: string
    },
    fee?: number | StdFee | 'auto',
    memo?: string,
    _funds?: Coin[]
  ) => Promise<ExecuteResult>
  vote: (
    {
      proposalId,
      vote,
    }: {
      proposalId: number
      vote: Vote
    },
    fee?: number | StdFee | 'auto',
    memo?: string,
    _funds?: Coin[]
  ) => Promise<ExecuteResult>
  execute: (
    {
      proposalId,
    }: {
      proposalId: number
    },
    fee?: number | StdFee | 'auto',
    memo?: string,
    _funds?: Coin[]
  ) => Promise<ExecuteResult>
  close: (
    {
      proposalId,
    }: {
      proposalId: number
    },
    fee?: number | StdFee | 'auto',
    memo?: string,
    _funds?: Coin[]
  ) => Promise<ExecuteResult>
}
export class Cw3FixedMultisigClient
  extends Cw3FixedMultisigQueryClient
  implements Cw3FixedMultisigInterface
{
  client: SigningCosmWasmClient
  sender: string
  contractAddress: string

  constructor(
    client: SigningCosmWasmClient,
    sender: string,
    contractAddress: string
  ) {
    super(client, contractAddress)
    this.client = client
    this.sender = sender
    this.contractAddress = contractAddress
    this.propose = this.propose.bind(this)
    this.vote = this.vote.bind(this)
    this.execute = this.execute.bind(this)
    this.close = this.close.bind(this)
  }

  propose = async (
    {
      description,
      latest,
      msgs,
      title,
    }: {
      description: string
      latest?: Expiration
      msgs: CosmosMsgForEmpty[]
      title: string
    },
    fee: number | StdFee | 'auto' = 'auto',
    memo?: string,
    _funds?: Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        propose: {
          description,
          latest,
          msgs,
          title,
        },
      },
      fee,
      memo,
      _funds
    )
  }
  vote = async (
    {
      proposalId,
      vote,
    }: {
      proposalId: number
      vote: Vote
    },
    fee: number | StdFee | 'auto' = 'auto',
    memo?: string,
    _funds?: Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        vote: {
          proposal_id: proposalId,
          vote,
        },
      },
      fee,
      memo,
      _funds
    )
  }
  execute = async (
    {
      proposalId,
    }: {
      proposalId: number
    },
    fee: number | StdFee | 'auto' = 'auto',
    memo?: string,
    _funds?: Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        execute: {
          proposal_id: proposalId,
        },
      },
      fee,
      memo,
      _funds
    )
  }
  close = async (
    {
      proposalId,
    }: {
      proposalId: number
    },
    fee: number | StdFee | 'auto' = 'auto',
    memo?: string,
    _funds?: Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        close: {
          proposal_id: proposalId,
        },
      },
      fee,
      memo,
      _funds
    )
  }
}
