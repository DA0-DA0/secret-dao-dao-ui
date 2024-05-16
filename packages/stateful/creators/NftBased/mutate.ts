import { DaoCreatorMutate } from '@dao-dao/types'
import { InstantiateMsg } from '@dao-dao/types/contracts/DaoVotingCw721Staked'
import {
  NftBasedCreatorId,
  convertDurationWithUnitsToDuration,
  encodeJsonToBase64,
} from '@dao-dao/utils'
import { makeValidateMsg } from '@dao-dao/utils/validation/makeValidateMsg'

import instantiateSchema from './instantiate_schema.json'
import { CreatorData } from './types'

export const mutate: DaoCreatorMutate<CreatorData> = (
  msg,
  { name: daoName },
  { existingGovernanceTokenDenomOrAddress, unstakingDuration },
  t,
  codeIds
) => {
  if (!existingGovernanceTokenDenomOrAddress) {
    throw new Error(t('error.missingGovernanceTokenAddress'))
  }

  const votingModuleAdapterInstantiateMsg: InstantiateMsg = {
    nft_contract: {
      existing: {
        address: existingGovernanceTokenDenomOrAddress,
      },
    },
    unstaking_duration: convertDurationWithUnitsToDuration(unstakingDuration),
  }

  // Validate and throw error if invalid according to JSON schema.
  makeValidateMsg<InstantiateMsg>(
    instantiateSchema,
    t
  )(votingModuleAdapterInstantiateMsg)

  msg.voting_module_instantiate_info = {
    admin: { core_module: {} },
    code_id: codeIds.DaoVotingSnip721Staked.codeId,
    code_hash: codeIds.DaoVotingSnip721Staked.codeHash,
    label: `DAO_${daoName.trim()}_${NftBasedCreatorId}`,
    msg: encodeJsonToBase64(votingModuleAdapterInstantiateMsg),
    funds: [],
  }

  return msg
}
