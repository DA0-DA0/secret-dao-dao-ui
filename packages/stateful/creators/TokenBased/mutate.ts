import { ActiveThreshold, DaoCreatorMutate } from '@dao-dao/types'
import { InstantiateMsg as DaoVotingCw20StakedInstantiateMsg } from '@dao-dao/types/contracts/DaoVotingCw20Staked'
import {
  InstantiateMsg as DaoVotingTokenStakedInstantiateMsg,
  InitialBalance,
} from '@dao-dao/types/contracts/DaoVotingTokenStaked'
import {
  NEW_DAO_TOKEN_DECIMALS,
  TokenBasedCreatorId,
  convertDenomToMicroDenomStringWithDecimals,
  convertDenomToMicroDenomWithDecimals,
  convertDurationWithUnitsToDuration,
  encodeJsonToBase64,
  mustGetSupportedChainConfig,
} from '@dao-dao/utils'
import { makeValidateMsg } from '@dao-dao/utils/validation/makeValidateMsg'

import instantiateSchemaCw20 from './instantiate_schema_cw20.json'
import instantiateSchemaNative from './instantiate_schema_native.json'
import { CreatorData, GovernanceTokenType } from './types'

export const mutate: DaoCreatorMutate<CreatorData> = (
  msg,
  { chainId, name: daoName },
  {
    tiers,
    tokenType,
    newInfo: { initialSupply, imageUrl, symbol, name },
    existingTokenDenomOrAddress,
    unstakingDuration,
    customStakingAddress,
    activeThreshold,
    tokenFactoryDenomCreationFee,
  },
  t,
  codeIds
) => {
  const isNative = !mustGetSupportedChainConfig(chainId)?.createWithCw20

  let votingModuleAdapterInstantiateMsg: DaoVotingCw20StakedInstantiateMsg

  const active_threshold: ActiveThreshold | null = activeThreshold?.enabled
    ? !activeThreshold.type || activeThreshold.type === 'percent'
      ? {
          percentage: {
            percent: (activeThreshold.value / 100).toString(),
          },
        }
      : {
          absolute_count: {
            count: BigInt(activeThreshold.value).toString(),
          },
        }
    : null

  if (tokenType === GovernanceTokenType.New) {
    const microInitialBalances: InitialBalance[] = tiers.flatMap(
      ({ weight, members }) =>
        members.map(({ address }) => ({
          address,
          amount: convertDenomToMicroDenomStringWithDecimals(
            // Governance Token-based DAOs distribute tier weights evenly
            // amongst members.
            (weight / members.length / 100) * initialSupply,
            NEW_DAO_TOKEN_DECIMALS
          ),
        }))
    )
    // To prevent rounding issues, treasury balance becomes the remaining tokens
    // after the member weights are distributed.
    const microInitialTreasuryBalance = BigInt(
      convertDenomToMicroDenomWithDecimals(
        initialSupply,
        NEW_DAO_TOKEN_DECIMALS
      ) -
        microInitialBalances.reduce(
          (acc, { amount }) => acc + Number(amount),
          0
        )
    ).toString()

    votingModuleAdapterInstantiateMsg = {
      active_threshold,
      token_info: {
        new: {
          code_id: codeIds.Snip20Base.codeId,
          decimals: NEW_DAO_TOKEN_DECIMALS,
          initial_balances: microInitialBalances,
          initial_dao_balance: microInitialTreasuryBalance,
          label: name,
          marketing: imageUrl ? { logo: { url: imageUrl } } : null,
          name,
          staking_code_id: codeIds.Snip20Stake.codeId,
          symbol,
          unstaking_duration:
            convertDurationWithUnitsToDuration(unstakingDuration),
        },
      },
    }
  } else {
    if (!existingTokenDenomOrAddress) {
      throw new Error(t('error.missingGovernanceTokenDenom'))
    }

    votingModuleAdapterInstantiateMsg = {
      active_threshold,
      token_info: {
        existing: {
          address: existingTokenDenomOrAddress,
          staking_contract:
            customStakingAddress !== undefined
              ? {
                  existing: {
                    staking_contract_address: customStakingAddress,
                  },
                }
              : {
                  new: {
                    staking_code_id: codeIds.Snip20Stake.codeId,
                    unstaking_duration:
                      convertDurationWithUnitsToDuration(unstakingDuration),
                  },
                },
        },
      },
    }
  }

  // Validate and throw error if invalid according to JSON schema.
  makeValidateMsg<
    DaoVotingTokenStakedInstantiateMsg | DaoVotingCw20StakedInstantiateMsg
  >(
    isNative ? instantiateSchemaNative : instantiateSchemaCw20,
    t
  )(votingModuleAdapterInstantiateMsg)

  msg.voting_module_instantiate_info = {
    admin: { core_module: {} },
    code_id: codeIds.DaoVotingSnip20Staked.codeId,
    code_hash: codeIds.DaoVotingSnip20Staked.codeHash,
    label: `DAO_${daoName.trim()}_${TokenBasedCreatorId}_${
      isNative ? 'native' : 'cw20'
    }`,
    msg: encodeJsonToBase64(votingModuleAdapterInstantiateMsg),
    funds: tokenFactoryDenomCreationFee || [],
  }

  return msg
}
