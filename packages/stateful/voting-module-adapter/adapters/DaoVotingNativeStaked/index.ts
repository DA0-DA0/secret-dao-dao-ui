import { PeopleAltOutlined, PeopleAltRounded } from '@mui/icons-material'

import { MainDaoInfoCardsTokenLoader } from '@dao-dao/stateless'
import {
  ActionCategoryKey,
  DaoTabId,
  VotingModuleAdapter,
} from '@dao-dao/types'
import {
  DAO_VOTING_NATIVE_STAKED_CONTRACT_NAMES,
  DaoVotingNativeStakedAdapterId,
} from '@dao-dao/utils'

import { makeMintAction } from './actions'
import { MembersTab, ProfileCardMemberInfo, StakingModal } from './components'
import { useCommonGovernanceTokenInfo, useMainDaoInfoCards } from './hooks'

export const DaoVotingNativeStakedAdapter: VotingModuleAdapter = {
  id: DaoVotingNativeStakedAdapterId,
  contractNames: DAO_VOTING_NATIVE_STAKED_CONTRACT_NAMES,

  load: () => ({
    // Hooks
    hooks: {
      useMainDaoInfoCards,
      useVotingModuleRelevantAddresses: () => [],
      useCommonGovernanceTokenInfo,
    },

    // Components
    components: {
      MainDaoInfoCardsLoader: MainDaoInfoCardsTokenLoader,
      ProfileCardMemberInfo,
      StakingModal,

      extraTabs: [
        {
          id: DaoTabId.Members,
          labelI18nKey: 'title.members',
          Component: MembersTab,
          Icon: PeopleAltOutlined,
          IconFilled: PeopleAltRounded,
        },
      ],
    },

    // Functions
    fields: {
      actionCategoryMakers: [
        () => ({
          // Add to DAO Governance category.
          key: ActionCategoryKey.DaoGovernance,
          actionMakers: [makeMintAction],
        }),
      ],
    },
  }),
}
