import { ActionCategoryKey, ActionCategoryMaker } from '@dao-dao/types'

import { makeCreateCrossChainAccountAction } from './CreateCrossChainAccount'
import { makeCreateDaoAction } from './CreateDao'
import { makeDaoAdminExecAction } from './DaoAdminExec'
import { makeEnableMultipleChoiceAction } from './EnableMultipleChoice'
import { makeManageStorageItemsAction } from './ManageStorageItems'
import { makeManageSubDaoPauseAction } from './ManageSubDaoPause'
import { makeManageSubDaosAction } from './ManageSubDaos'
import { makeManageVetoableDaosAction } from './ManageVetoableDaos'
import { makeNeutronOverruleSubDaoProposalAction } from './NeutronOverruleSubDaoProposal'
import { makeSetUpApproverAction } from './SetUpApprover'
import { makeUpdatePreProposeConfigAction } from './UpdatePreProposeConfig'
import { makeUpdateProposalConfigAction } from './UpdateProposalConfig'
import { makeVetoOrEarlyExecuteDaoProposalAction } from './VetoOrEarlyExecuteDaoProposal'

export const makeDaoGovernanceActionCategory: ActionCategoryMaker = ({
  t,
  context,
}) => ({
  key: ActionCategoryKey.DaoGovernance,
  label: t('actionCategory.daoGovernanceLabel'),
  description: t('actionCategory.daoGovernanceDescription', {
    context: context.type,
  }),
  actionMakers: [
    makeEnableMultipleChoiceAction,
    makeManageSubDaosAction,
    makeManageStorageItemsAction,
    makeDaoAdminExecAction,
    makeCreateCrossChainAccountAction,
    makeSetUpApproverAction,
    makeVetoOrEarlyExecuteDaoProposalAction,
    makeManageVetoableDaosAction,
    makeManageSubDaoPauseAction,
    makeNeutronOverruleSubDaoProposalAction,
    makeUpdateProposalConfigAction,
    makeUpdatePreProposeConfigAction,
    makeCreateDaoAction,
  ],
})
