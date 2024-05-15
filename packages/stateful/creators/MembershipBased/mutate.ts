import { DaoCreatorMutate } from '@dao-dao/types'
import { InstantiateMsg, Member } from '@dao-dao/types/contracts/DaoVotingCw4'
import { MembershipBasedCreatorId, encodeJsonToBase64 } from '@dao-dao/utils'
import { makeValidateMsg } from '@dao-dao/utils/validation/makeValidateMsg'

import instantiateSchema from './instantiate_schema.json'
import { CreatorData } from './types'

export const mutate: DaoCreatorMutate<CreatorData> = (
  msg,
  { name },
  { tiers },
  t,
  codeIds
) => {
  const initialMembers: Member[] = tiers.flatMap(({ weight, members }) =>
    members.map(({ address }) => ({
      addr: address,
      weight,
    }))
  )

  const votingModuleAdapterInstantiateMsg: InstantiateMsg = {
    dao_code_hash: codeIds.DaoCore.codeHash,
    // TODO(secret): make dao-voting-cw4 query_auth set in contract on init
    query_auth: {},
    group_contract: {
      new: {
        cw4_group_code_id: codeIds.Cw4Group.codeId,
        cw4_group_code_hash: codeIds.Cw4Group.codeHash,
        initial_members: initialMembers,
      },
    },
  }

  // Validate and throw error if invalid according to JSON schema.
  makeValidateMsg<InstantiateMsg>(
    instantiateSchema,
    t
  )(votingModuleAdapterInstantiateMsg)

  msg.voting_module_instantiate_info = {
    admin: { core_module: {} },
    code_id: codeIds.DaoVotingCw4.codeId,
    code_hash: codeIds.DaoVotingCw4.codeHash,
    label: `DAO_${name.trim()}_${MembershipBasedCreatorId}`,
    msg: encodeJsonToBase64(votingModuleAdapterInstantiateMsg),
    funds: [],
  }

  return msg
}
