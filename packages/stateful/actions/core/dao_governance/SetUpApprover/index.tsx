import { useCallback, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { waitForAll } from 'recoil'

import {
  DaoCoreV2Selectors,
  DaoPreProposeApprovalSingleSelectors,
  DaoProposalSingleV2Selectors,
} from '@dao-dao/state/recoil'
import {
  PersonRaisingHandEmoji,
  useCachedLoading,
  useCachedLoadingWithError,
} from '@dao-dao/stateless'
import { Feature, ModuleInstantiateInfo } from '@dao-dao/types'
import {
  ActionChainContextType,
  ActionComponent,
  ActionContextType,
  ActionKey,
  ActionMaker,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/types/actions'
import { InstantiateMsg as DaoPreProposeApproverInstantiateMsg } from '@dao-dao/types/contracts/DaoPreProposeApprover'
import { InstantiateMsg as DaoProposalSingleInstantiateMsg } from '@dao-dao/types/contracts/DaoProposalSingle.v2'
import {
  DaoProposalSingleAdapterId,
  decodeJsonFromBase64,
  encodeJsonToBase64,
  makeWasmMessage,
  objectMatchesStructure,
} from '@dao-dao/utils'

import { EntityDisplay } from '../../../../components/EntityDisplay'
import { DaoProposalSingleAdapter } from '../../../../proposal-module-adapter/adapters/DaoProposalSingle'
import { useActionOptions } from '../../../react'
import {
  SetUpApproverData,
  SetUpApproverComponent as StatelessComponent,
} from './Component'

const useDefaults: UseDefaults<SetUpApproverData> = () => ({
  address: '',
})

const useDecodedCosmosMsg: UseDecodedCosmosMsg<SetUpApproverData> = (
  msg: Record<string, any>
) => {
  if (
    !objectMatchesStructure(msg, {
      wasm: {
        execute: {
          contract_addr: {},
          funds: {},
          msg: {
            update_proposal_modules: {
              to_add: {},
            },
          },
        },
      },
    }) ||
    msg.wasm.execute.msg.update_proposal_modules.to_add.length !== 1
  ) {
    return {
      match: false,
    }
  }

  const info = msg.wasm.execute.msg.update_proposal_modules.to_add[0]
  if (
    !objectMatchesStructure(info, {
      admin: {},
      code_id: {},
      label: {},
      msg: {},
    })
  ) {
    return {
      match: false,
    }
  }

  const parsedMsg = decodeJsonFromBase64(info.msg, true)
  if (
    !info.label.endsWith(`${DaoProposalSingleAdapterId}_approver`) ||
    !objectMatchesStructure(parsedMsg, {
      pre_propose_info: {
        module_may_propose: {
          info: {
            msg: {},
          },
        },
      },
    }) ||
    !parsedMsg.pre_propose_info.module_may_propose.info.label.includes(
      'approver'
    )
  ) {
    return {
      match: false,
    }
  }

  const parsedPreProposeMsg = decodeJsonFromBase64(
    parsedMsg.pre_propose_info.module_may_propose.info.msg,
    true
  )
  if (
    !objectMatchesStructure(parsedPreProposeMsg, {
      pre_propose_approval_contract: {},
    })
  ) {
    return {
      match: false,
    }
  }

  return {
    match: true,
    data: {
      address: parsedPreProposeMsg.pre_propose_approval_contract,
    },
  }
}

const Component: ActionComponent = (props) => {
  const {
    address,
    chain: { chain_id: chainId },
  } = useActionOptions()

  const { watch, setValue } = useFormContext<SetUpApproverData>()
  const preProposeApprovalSingle = watch(
    (props.fieldNamePrefix + 'address') as 'address'
  )
  // When creating, load DAO address from pre-propose module address.
  const dao = useCachedLoading(
    !props.isCreating && preProposeApprovalSingle
      ? DaoPreProposeApprovalSingleSelectors.daoSelector({
          chainId,
          contractAddress: preProposeApprovalSingle,
          params: [],
        })
      : undefined,
    undefined
  )
  useEffect(() => {
    if (!props.isCreating && !dao.loading && dao.data) {
      setValue((props.fieldNamePrefix + 'dao') as 'dao', dao.data)
    }
  }, [dao, props.fieldNamePrefix, props.isCreating, setValue])

  const options = useCachedLoading(
    DaoCoreV2Selectors.approvalDaosSelector({
      chainId,
      contractAddress: address,
    }),
    []
  )

  return (
    <StatelessComponent
      {...props}
      options={{
        options,
        EntityDisplay,
      }}
    />
  )
}

export const makeSetUpApproverAction: ActionMaker<SetUpApproverData> = ({
  t,
  address,
  context,
  chain: { chain_id: chainId },
  chainContext,
}) => {
  if (
    context.type !== ActionContextType.Dao ||
    !context.info.supportedFeatures[Feature.Approval] ||
    // Type-check since we need code IDs, implied by DAO check.
    chainContext.type !== ActionChainContextType.Supported
  ) {
    return null
  }

  const useTransformToCosmos: UseTransformToCosmos<SetUpApproverData> = () => {
    const singleChoiceProposal = context.info.proposalModules.find(
      ({ contractName }) =>
        DaoProposalSingleAdapter.contractNames.some((name) =>
          contractName.includes(name)
        )
    )
    if (!singleChoiceProposal) {
      throw new Error('No single choice proposal module found')
    }

    const configLoading = useCachedLoadingWithError(
      waitForAll([
        DaoProposalSingleV2Selectors.configSelector({
          contractAddress: singleChoiceProposal.address,
          chainId,
        }),
        DaoProposalSingleV2Selectors.daoSelector({
          contractAddress: singleChoiceProposal.address,
          chainId,
          params: [],
        }),
      ])
    )

    return useCallback(
      ({ address: preProposeApprovalContract }) => {
        if (configLoading.loading) {
          return
        }
        if (configLoading.errored) {
          throw configLoading.error
        }
        const [config, dao] = configLoading.data

        const info: ModuleInstantiateInfo = {
          admin: { core_module: {} },
          code_id: chainContext.config.codeIds.DaoProposalSingle.codeId,
          code_hash: chainContext.config.codeIds.DaoProposalSingle.codeHash,
          label: `DAO_${context.info.name.trim()}_${DaoProposalSingleAdapterId}_approver`,
          msg: encodeJsonToBase64({
            threshold: config.threshold,
            allow_revoting: config.allow_revoting,
            close_proposal_on_execution_failure:
              'close_proposal_on_execution_failure' in config
                ? config.close_proposal_on_execution_failure
                : true,
            min_voting_period:
              'min_voting_period' in config
                ? config.min_voting_period
                : undefined,
            max_voting_period: config.max_voting_period,
            only_members_execute: config.only_members_execute,
            veto: 'veto' in config ? config.veto : undefined,
            query_auth: config.query_auth,
            dao_code_hash: dao.code_hash,
            pre_propose_info: {
              module_may_propose: {
                info: {
                  admin: { core_module: {} },
                  code_id:
                    chainContext.config.codeIds.DaoPreProposeApprover.codeId,
                  code_hash:
                    chainContext.config.codeIds.DaoPreProposeApprover.codeHash,
                  label: `DAO_${context.info.name.trim()}_pre-propose${DaoProposalSingleAdapterId}_approver`,
                  msg: encodeJsonToBase64({
                    pre_propose_approval_contract: preProposeApprovalContract,
                  } as DaoPreProposeApproverInstantiateMsg),
                  funds: [],
                },
              },
            },
          } as DaoProposalSingleInstantiateMsg),
          funds: [],
        }

        return makeWasmMessage({
          wasm: {
            execute: {
              contract_addr: address,
              funds: [],
              msg: {
                update_proposal_modules: {
                  to_add: [info],
                  to_disable: [],
                },
              },
            },
          },
        })
      },
      [configLoading]
    )
  }

  return {
    key: ActionKey.SetUpApprover,
    Icon: PersonRaisingHandEmoji,
    label: t('title.setUpApprover'),
    description: t('info.setUpApproverDescription'),
    Component,
    useDefaults,
    useTransformToCosmos,
    useDecodedCosmosMsg,
  }
}
