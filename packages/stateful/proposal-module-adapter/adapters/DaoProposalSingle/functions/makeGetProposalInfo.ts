import { CosmWasmClient } from '@cosmjs/cosmwasm-stargate'

import {
  DaoPreProposeApprovalSingleQueryClient,
  DaoProposalSingleV2QueryClient,
} from '@dao-dao/state/contracts'
import {
  CommonProposalInfo,
  IProposalModuleAdapterOptions,
} from '@dao-dao/types'
import { ProposalResponse as ProposalV1Response } from '@dao-dao/types/contracts/CwProposalSingle.v1'
import { ProposalResponse as ProposalV2Response } from '@dao-dao/types/contracts/DaoProposalSingle.v2'
import { getCosmWasmClientForChainId } from '@dao-dao/utils'

export const makeGetProposalInfo =
  ({
    proposalModule,
    proposalNumber,
    isPreProposeApprovalProposal,
    chain: { chain_id: chainId },
  }: IProposalModuleAdapterOptions) =>
  async (): Promise<CommonProposalInfo | undefined> => {
    // Lazily connect if necessary.
    let _cosmWasmClient: CosmWasmClient
    const getCosmWasmClient = async () => {
      if (!_cosmWasmClient) {
        _cosmWasmClient = await getCosmWasmClientForChainId(chainId)
      }
      return _cosmWasmClient
    }

    // Get pre-propose approval proposal from pre propose module.
    if (isPreProposeApprovalProposal && proposalModule.prePropose) {
      const cosmWasmClient = await getCosmWasmClient()
      const queryClient = new DaoPreProposeApprovalSingleQueryClient(
        cosmWasmClient,
        proposalModule.prePropose.address
      )

      const proposal = await queryClient.queryExtension({
        msg: {
          proposal: {
            id: proposalNumber,
          },
        },
      })

      return {
        id: `${proposalModule.prefix}*${proposal.approval_id}`,
        title: proposal.msg.title,
        description: proposal.msg.description,
        expiration: null,
        createdAtEpoch: proposal.createdAt
          ? new Date(proposal.createdAt).getTime()
          : null,
        createdByAddress: proposal.proposer,
      }
    }

    let proposalResponse: ProposalV1Response | ProposalV2Response | undefined
    try {
      const cosmWasmClient = await getCosmWasmClient()
      const queryClient = new DaoProposalSingleV2QueryClient(
        cosmWasmClient,
        proposalModule.address
      )

      proposalResponse = await queryClient.proposal({
        proposalId: proposalNumber,
      })
    } catch (err) {
      // If proposal doesn't exist, handle just return undefined instead of
      // throwing an error. Rethrow all other errors.
      if (
        !(err instanceof Error) ||
        !err.message.includes('Proposal not found')
      ) {
        throw err
      }

      console.error(err)
    }

    if (!proposalResponse) {
      return
    }

    const { id, proposal } = proposalResponse

    const createdAtEpoch = new Date(
      (
        await (await getCosmWasmClient()).getBlock(proposal.start_height)
      ).header.time
    ).getTime()

    return {
      id: `${proposalModule.prefix}${id}`,
      title: proposal.title,
      description: proposal.description,
      expiration: proposal.expiration,
      createdAtEpoch,
      createdByAddress: proposal.proposer,
    }
  }
