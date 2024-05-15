import { RecoilValueReadOnly, selectorFamily, waitForAll } from 'recoil'

import {
  DaoPreProposeApprovalSingleSelectors,
  DaoPreProposeSingleSelectors,
  DaoProposalSingleV2Selectors,
  blockHeightTimestampSafeSelector,
} from '@dao-dao/state'
import {
  CheckedDepositInfo,
  ContractVersion,
  Duration,
  ProposalStatusEnum,
  WithChainId,
} from '@dao-dao/types'
import { Proposal as PreProposeApprovalSingleProposal } from '@dao-dao/types/contracts/DaoPreProposeApprovalSingle'
import {
  CommonProposalListInfo,
  DepositInfoSelector,
} from '@dao-dao/types/proposal-module-adapter'

export const proposalCountSelector = selectorFamily<
  number,
  WithChainId<{
    proposalModuleAddress: string
  }>
>({
  key: 'daoProposalSingleProposalCount',
  get:
    ({ chainId, proposalModuleAddress }) =>
    ({ get }) =>
      get(
        DaoProposalSingleV2Selectors.proposalCountSelector({
          contractAddress: proposalModuleAddress,
          chainId,
        })
      ),
})

export const maxVotingPeriodSelector = selectorFamily<
  Duration,
  WithChainId<{
    proposalModuleAddress: string
  }>
>({
  key: 'daoProposalSingleMaxVotingPeriod',
  get:
    ({ chainId, proposalModuleAddress }) =>
    ({ get }) => {
      const config = get(
        DaoProposalSingleV2Selectors.configSelector({
          contractAddress: proposalModuleAddress,
          chainId,
        })
      )

      return config.max_voting_period
    },
})

export const reverseProposalInfosSelector: (
  info: WithChainId<{
    proposalModuleAddress: string
    proposalModulePrefix: string
    startBefore: number | undefined
    limit: number | undefined
  }>
) => RecoilValueReadOnly<CommonProposalListInfo[]> = selectorFamily({
  key: 'daoProposalSingleReverseProposalInfos',
  get:
    ({
      chainId,
      proposalModuleAddress,
      proposalModulePrefix,
      startBefore,
      limit,
    }) =>
    async ({ get }) => {
      const proposalResponses = get(
        DaoProposalSingleV2Selectors.reverseProposalsSelector({
          contractAddress: proposalModuleAddress,
          chainId,
          params: [
            {
              startBefore,
              limit,
            },
          ],
        })
      ).proposals

      const timestamps = get(
        waitForAll(
          proposalResponses.map(({ proposal: { start_height } }) =>
            blockHeightTimestampSafeSelector({
              blockHeight: start_height,
              chainId,
            })
          )
        )
      )

      const proposalInfos: CommonProposalListInfo[] = proposalResponses.map(
        ({ id, proposal: { status } }, index) => ({
          id: `${proposalModulePrefix}${id}`,
          proposalNumber: id,
          timestamp: timestamps[index],
          isOpen: status === ProposalStatusEnum.Open,
        })
      )

      return proposalInfos
    },
})

export const reversePreProposePendingProposalInfosSelector: (
  info: WithChainId<{
    proposalModuleAddress: string
    proposalModulePrefix: string
    startBefore: number | undefined
    limit: number | undefined
  }>
) => RecoilValueReadOnly<CommonProposalListInfo[]> = selectorFamily({
  key: 'daoProposalSingleReversePreProposePendingProposalInfos',
  get:
    ({
      chainId,
      proposalModuleAddress,
      proposalModulePrefix,
      startBefore,
      limit,
    }) =>
    async ({ get }) => {
      const pendingProposals = get(
        DaoPreProposeApprovalSingleSelectors.queryExtensionSelector({
          contractAddress: proposalModuleAddress,
          chainId,
          params: [
            {
              msg: {
                reverse_pending_proposals: {
                  start_before: startBefore,
                  limit,
                },
              },
            },
          ],
        })
      ) as PreProposeApprovalSingleProposal[]

      const proposalInfos: CommonProposalListInfo[] = pendingProposals.map(
        ({ approval_id: id, createdAt }) => ({
          id: `${proposalModulePrefix}*${id}`,
          proposalNumber: id,
          timestamp: createdAt ? new Date(createdAt) : undefined,
          isOpen: true,
        })
      )

      return proposalInfos
    },
})

export const reversePreProposeCompletedProposalInfosSelector: (
  info: WithChainId<{
    proposalModuleAddress: string
    proposalModulePrefix: string
    startBefore: number | undefined
    limit: number | undefined
  }>
) => RecoilValueReadOnly<CommonProposalListInfo[]> = selectorFamily({
  key: 'daoProposalSingleReversePreProposeCompletedProposalInfos',
  get:
    ({
      chainId,
      proposalModuleAddress,
      proposalModulePrefix,
      startBefore,
      limit,
    }) =>
    async ({ get }) => {
      const completedProposals = get(
        DaoPreProposeApprovalSingleSelectors.queryExtensionSelector({
          contractAddress: proposalModuleAddress,
          chainId,
          params: [
            {
              msg: {
                reverse_completed_proposals: {
                  start_before: startBefore,
                  limit,
                },
              },
            },
          ],
        })
      ) as PreProposeApprovalSingleProposal[]

      const proposalInfos: CommonProposalListInfo[] = completedProposals.map(
        ({ approval_id: id, status, createdAt }) => ({
          id: `${proposalModulePrefix}*${id}`,
          proposalNumber: id,
          timestamp: createdAt ? new Date(createdAt) : undefined,
          isOpen: false,
          // Hide approved proposals from the list since they show up as normal
          // proposals. No need to show duplicates. But we still want to show
          // rejected pre-propose proposals.
          hideFromList: 'approved' in status,
        })
      )

      return proposalInfos
    },
})

export const depositInfoSelector: (
  info: WithChainId<{
    proposalModuleAddress: string
    version: ContractVersion | null
    preProposeAddress: string | null
  }>
) => DepositInfoSelector = selectorFamily({
  key: 'daoProposalSingleDepositInfo',
  get:
    ({ chainId, preProposeAddress }) =>
    ({ get }) => {
      let depositInfo: CheckedDepositInfo | undefined
      if (preProposeAddress) {
        const config = get(
          DaoPreProposeSingleSelectors.configSelector({
            contractAddress: preProposeAddress,
            chainId,
            params: [],
          })
        )
        if (config.deposit_info) {
          depositInfo = config.deposit_info ?? undefined
        }
      }

      return depositInfo
    },
})

export const anyoneCanProposeSelector = selectorFamily<
  boolean,
  WithChainId<{
    // Null if not v2 or doesn't have pre-propose module.
    preProposeAddress: string | null
  }>
>({
  key: 'daoPreProposeSingleAnyoneCanPropose',
  get:
    ({ chainId, preProposeAddress }) =>
    ({ get }) => {
      if (preProposeAddress) {
        const config = get(
          DaoPreProposeSingleSelectors.configSelector({
            contractAddress: preProposeAddress,
            chainId,
            params: [],
          })
        )

        return config.open_proposal_submission
      }

      return false
    },
})
