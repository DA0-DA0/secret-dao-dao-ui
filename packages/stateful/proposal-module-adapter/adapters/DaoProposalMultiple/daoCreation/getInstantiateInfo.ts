import { ContractVersion, DaoCreationGetInstantiateInfo } from '@dao-dao/types'
import { InstantiateMsg as DaoPreProposeMultipleInstantiateMsg } from '@dao-dao/types/contracts/DaoPreProposeMultiple'
import { InstantiateMsg as DaoProposalMultipleInstantiateMsg } from '@dao-dao/types/contracts/DaoProposalMultiple'
import {
  DaoProposalMultipleAdapterId,
  convertDenomToMicroDenomStringWithDecimals,
  convertDurationWithUnitsToDuration,
  convertVetoConfigToCosmos,
  encodeJsonToBase64,
} from '@dao-dao/utils'
import { makeValidateMsg } from '@dao-dao/utils/validation/makeValidateMsg'

import { DaoCreationExtraVotingConfig } from '../types'
import { convertPercentOrMajorityValueToPercentageThreshold } from '../utils'
import instantiateSchema from './instantiate_schema.json'
import preProposeInstantiateSchema from './pre_propose_instantiate_schema.json'

export const getInstantiateInfo: DaoCreationGetInstantiateInfo<
  DaoCreationExtraVotingConfig
> = (
  { createWithCw20, codeIds, historicalCodeIds },
  {
    name,
    votingConfig: {
      quorum,
      votingDuration,
      proposalDeposit,
      anyoneCanPropose,
      allowRevoting,
      veto,
    },
  },
  { moduleInstantiateFundsUnsupported },
  t
) => {
  const decimals = proposalDeposit.token?.decimals ?? 0

  const preProposeMultipleInstantiateMsg: DaoPreProposeMultipleInstantiateMsg =
    {
      deposit_info: proposalDeposit.enabled
        ? {
            amount: convertDenomToMicroDenomStringWithDecimals(
              proposalDeposit.amount,
              decimals
            ),
            denom:
              proposalDeposit.type === 'voting_module_token'
                ? {
                    voting_module_token: {
                      token_type: createWithCw20 ? 'cw20' : 'native',
                    },
                  }
                : {
                    token: {
                      denom:
                        proposalDeposit.type === 'native'
                          ? {
                              native: proposalDeposit.denomOrAddress,
                            }
                          : // proposalDeposit.type === 'cw20'
                            {
                              snip20: [
                                proposalDeposit.denomOrAddress,
                                proposalDeposit.token?.snip20CodeHash || '',
                              ],
                            },
                    },
                  },
            refund_policy: proposalDeposit.refundPolicy,
          }
        : null,
      extension: {},
      open_proposal_submission: anyoneCanPropose,
      proposal_module_code_hash: codeIds.DaoProposalMultiple.codeHash,
    }

  // Validate and throw error if invalid according to JSON schema.
  makeValidateMsg<DaoPreProposeMultipleInstantiateMsg>(
    preProposeInstantiateSchema,
    t
  )(preProposeMultipleInstantiateMsg)

  const codeIdsToUse = {
    ...codeIds,
    // If module instantiation funds are unsupported, use the v2.1.0 contracts
    // which are the last ones that did not support funds.
    ...(moduleInstantiateFundsUnsupported &&
      historicalCodeIds?.[ContractVersion.V210]),
  }

  const msg: DaoProposalMultipleInstantiateMsg = {
    allow_revoting: allowRevoting,
    close_proposal_on_execution_failure: true,
    max_voting_period: convertDurationWithUnitsToDuration(votingDuration),
    min_voting_period: null,
    only_members_execute: true,
    pre_propose_info: {
      module_may_propose: {
        info: {
          admin: { core_module: {} },
          code_id: codeIdsToUse.DaoPreProposeMultiple.codeId,
          code_hash: codeIdsToUse.DaoPreProposeMultiple.codeHash,
          label: `DAO_${name.trim()}_pre-propose-${DaoProposalMultipleAdapterId}`,
          msg: encodeJsonToBase64(preProposeMultipleInstantiateMsg),
          funds: [],
        },
      },
    },
    voting_strategy: {
      single_choice: {
        quorum: convertPercentOrMajorityValueToPercentageThreshold(quorum),
      },
    },
    veto: convertVetoConfigToCosmos(veto),
    dao_code_hash: codeIds.DaoCore.codeHash,
    // TODO(secret): add query_auth
    query_auth: {},
  }

  // Validate and throw error if invalid according to JSON schema.
  makeValidateMsg<DaoProposalMultipleInstantiateMsg>(instantiateSchema, t)(msg)

  return {
    admin: { core_module: {} },
    code_id: codeIdsToUse.DaoProposalMultiple.codeId,
    code_hash: codeIdsToUse.DaoProposalMultiple.codeHash,
    label: `DAO_${name.trim()}_${DaoProposalMultipleAdapterId}`,
    msg: encodeJsonToBase64(msg),
    funds: [],
  }
}
