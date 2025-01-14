import { ProposalStatus } from './common'

export type Duration =
  | {
      height: number
    }
  | {
      time: number
    }
export type PreProposeInfo =
  | {
      anyone_may_propose: {}
    }
  | {
      module_may_propose: {
        info: ModuleInstantiateInfo
      }
    }
export type Admin =
  | {
      address: {
        addr: string
      }
    }
  | {
      core_module: {}
    }
export type Uint128 = string
export type Binary = string
export type Threshold =
  | {
      absolute_percentage: {
        percentage: PercentageThreshold
      }
    }
  | {
      threshold_quorum: {
        quorum: PercentageThreshold
        threshold: PercentageThreshold
      }
    }
  | {
      absolute_count: {
        threshold: Uint128
      }
    }
export type PercentageThreshold =
  | {
      majority: {}
    }
  | {
      percent: Decimal
    }
export type Decimal = string
export interface InstantiateMsg {
  allow_revoting: boolean
  close_proposal_on_execution_failure: boolean
  dao_code_hash: string
  max_voting_period: Duration
  min_voting_period?: Duration | null
  only_members_execute: boolean
  pre_propose_info: PreProposeInfo
  query_auth: RawContract
  threshold: Threshold
  veto?: VetoConfig | null
}
export interface ModuleInstantiateInfo {
  admin?: Admin | null
  code_hash: string
  code_id: number
  funds: Coin[]
  label: string
  msg: Binary
}
export interface Coin {
  amount: Uint128
  denom: string
}
export interface RawContract {
  address: string
  code_hash: string
}
export interface VetoConfig {
  early_execute: boolean
  timelock_duration: Duration
  veto_before_passed: boolean
  vetoer: string
}
export type ExecuteMsg =
  | {
      propose: SingleChoiceProposeMsg
    }
  | {
      vote: {
        auth: Auth
        proposal_id: number
        rationale?: string | null
        vote: Vote
      }
    }
  | {
      update_rationale: {
        proposal_id: number
        rationale?: string | null
      }
    }
  | {
      execute: {
        auth: Auth
        proposal_id: number
      }
    }
  | {
      veto: {
        proposal_id: number
      }
    }
  | {
      close: {
        proposal_id: number
      }
    }
  | {
      update_config: {
        allow_revoting: boolean
        close_proposal_on_execution_failure: boolean
        code_hash: string
        dao: string
        max_voting_period: Duration
        min_voting_period?: Duration | null
        only_members_execute: boolean
        query_auth: RawContract
        threshold: Threshold
        veto?: VetoConfig | null
      }
    }
  | {
      update_pre_propose_info: {
        info: PreProposeInfo
      }
    }
  | {
      add_proposal_hook: {
        address: string
        code_hash: string
      }
    }
  | {
      remove_proposal_hook: {
        address: string
        code_hash: string
      }
    }
  | {
      add_vote_hook: {
        address: string
        code_hash: string
      }
    }
  | {
      remove_vote_hook: {
        address: string
        code_hash: string
      }
    }
export type CosmosMsgForEmpty =
  | {
      bank: BankMsg
    }
  | {
      custom: Empty
    }
  | {
      staking: StakingMsg
    }
  | {
      distribution: DistributionMsg
    }
  | {
      stargate: {
        type_url: string
        value: Binary
      }
    }
  | {
      ibc: IbcMsg
    }
  | {
      wasm: WasmMsg
    }
  | {
      gov: GovMsg
    }
  | {
      finalize_tx: Empty
    }
export type BankMsg =
  | {
      send: {
        amount: Coin[]
        to_address: string
      }
    }
  | {
      burn: {
        amount: Coin[]
      }
    }
export type StakingMsg =
  | {
      delegate: {
        amount: Coin
        validator: string
      }
    }
  | {
      undelegate: {
        amount: Coin
        validator: string
      }
    }
  | {
      redelegate: {
        amount: Coin
        dst_validator: string
        src_validator: string
      }
    }
export type DistributionMsg =
  | {
      set_withdraw_address: {
        address: string
      }
    }
  | {
      withdraw_delegator_reward: {
        validator: string
      }
    }
export type IbcMsg =
  | {
      transfer: {
        amount: Coin
        channel_id: string
        memo: string
        timeout: IbcTimeout
        to_address: string
      }
    }
  | {
      send_packet: {
        channel_id: string
        data: Binary
        timeout: IbcTimeout
      }
    }
  | {
      close_channel: {
        channel_id: string
      }
    }
export type Timestamp = Uint64
export type Uint64 = string
export type WasmMsg =
  | {
      execute: {
        code_hash: string
        contract_addr: string
        msg: Binary
        send: Coin[]
      }
    }
  | {
      instantiate: {
        admin?: string | null
        code_hash: string
        code_id: number
        label: string
        msg: Binary
        send: Coin[]
      }
    }
  | {
      migrate: {
        code_hash: string
        code_id: number
        contract_addr: string
        msg: Binary
      }
    }
  | {
      update_admin: {
        admin: string
        contract_addr: string
      }
    }
  | {
      clear_admin: {
        contract_addr: string
      }
    }
export type GovMsg = {
  vote: {
    proposal_id: number
    vote: VoteOption
  }
}
export enum VoteOption {
  Yes = 'yes',
  No = 'no',
  Abstain = 'abstain',
  NoWithVeto = 'no_with_veto',
}
export type Auth =
  | {
      viewing_key: {
        address: string
        key: string
      }
    }
  | {
      permit: PermitForPermitData
    }
export enum Vote {
  Yes = 'yes',
  No = 'no',
  Abstain = 'abstain',
}
export interface SingleChoiceProposeMsg {
  description: string
  msgs: CosmosMsgForEmpty[]
  proposer?: string | null
  title: string
}
export interface Empty {}
export interface IbcTimeout {
  block?: IbcTimeoutBlock | null
  timestamp?: Timestamp | null
}
export interface IbcTimeoutBlock {
  height: number
  revision: number
}
export interface PermitForPermitData {
  account_number?: Uint128 | null
  chain_id?: string | null
  memo?: string | null
  params: PermitData
  sequence?: Uint128 | null
  signature: PermitSignature
}
export interface PermitData {
  data: Binary
  key: string
}
export interface PermitSignature {
  pub_key: PubKey
  signature: Binary
}
export interface PubKey {
  type: string
  value: Binary
}
export type QueryMsg =
  | {
      config: {}
    }
  | {
      proposal: {
        proposal_id: number
      }
    }
  | {
      list_proposals: {
        limit?: number | null
        start_after?: number | null
      }
    }
  | {
      reverse_proposals: {
        limit?: number | null
        start_before?: number | null
      }
    }
  | {
      get_vote: {
        auth: Auth
        proposal_id: number
      }
    }
  | {
      list_votes: {
        limit?: number | null
        proposal_id: number
        start_after?: string | null
      }
    }
  | {
      proposal_count: {}
    }
  | {
      proposal_creation_policy: {}
    }
  | {
      proposal_hooks: {}
    }
  | {
      vote_hooks: {}
    }
  | {
      dao: {}
    }
  | {
      info: {}
    }
  | {
      next_proposal_id: {}
    }
export type MigrateMsg =
  | {
      from_v1: {
        close_proposal_on_execution_failure: boolean
        pre_propose_info: PreProposeInfo
        veto?: VetoConfig | null
      }
    }
  | {
      from_compatible: {}
    }
export type Addr = string
export interface Config {
  allow_revoting: boolean
  close_proposal_on_execution_failure: boolean
  max_voting_period: Duration
  min_voting_period?: Duration | null
  only_members_execute: boolean
  query_auth: Contract
  threshold: Threshold
  veto?: VetoConfig | null
}
export interface Contract {
  address: Addr
  code_hash: string
}
export interface VoteResponse {
  vote?: VoteInfo | null
}
export interface VoteInfo {
  power: Uint128
  rationale?: string | null
  vote: Vote
  voter: Addr
}
export interface InfoResponse {
  info: ContractVersion
}
export interface ContractVersion {
  contract: string
  version: string
}
export type Expiration =
  | {
      at_height: number
    }
  | {
      at_time: Timestamp
    }
  | {
      never: {}
    }
export interface ProposalListResponse {
  proposals: ProposalResponse[]
}
export interface ProposalResponse {
  id: number
  proposal: SingleChoiceProposal
}
export interface SingleChoiceProposal {
  allow_revoting: boolean
  description: string
  expiration: Expiration
  min_voting_period?: Expiration | null
  msgs: CosmosMsgForEmpty[]
  proposer: Addr
  start_height: number
  status: ProposalStatus
  threshold: Threshold
  title: string
  total_power: Uint128
  veto?: VetoConfig | null
  votes: Votes
}
export interface Votes {
  abstain: Uint128
  no: Uint128
  yes: Uint128
}
export interface VoteListResponse {
  votes: VoteInfo[]
}
export type ProposalCreationPolicy =
  | {
      anyone: {}
    }
  | {
      module: {
        addr: Addr
        code_hash: string
      }
    }
export interface HooksResponse {
  hooks: HookItem[]
}
export interface HookItem {
  addr: Addr
  code_hash: string
}
