import { DepositRefundPolicy } from './common'

export type Uint128 = string
export type DepositToken =
  | {
      token: {
        denom: UncheckedDenom
      }
    }
  | {
      voting_module_token: {
        token_type: VotingModuleTokenType
      }
    }
export type UncheckedDenom =
  | {
      native: string
    }
  | {
      snip20: [string, string]
    }
export type VotingModuleTokenType = 'native' | 'cw20'
export interface InstantiateMsg {
  deposit_info?: UncheckedDepositInfo | null
  extension: Empty
  open_proposal_submission: boolean
  proposal_module_code_hash: string
}
export interface UncheckedDepositInfo {
  amount: Uint128
  denom: DepositToken
  refund_policy: DepositRefundPolicy
}
export interface Empty {}
export type ExecuteMsg =
  | {
      propose: {
        auth: Auth
        msg: ProposeMessage
      }
    }
  | {
      update_config: {
        deposit_info?: UncheckedDepositInfo | null
        open_proposal_submission: boolean
      }
    }
  | {
      withdraw: {
        denom?: UncheckedDenom | null
        key?: string | null
      }
    }
  | {
      extension: {
        msg: Empty
      }
    }
  | {
      add_proposal_submitted_hook: {
        address: string
        code_hash: string
      }
    }
  | {
      remove_proposal_submitted_hook: {
        address: string
        code_hash: string
      }
    }
  | {
      proposal_completed_hook: {
        new_status: Status
        proposal_id: number
      }
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
export type Binary = string
export type ProposeMessage = {
  propose: {
    choices: MultipleChoiceOptions
    description: string
    title: string
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
export type VoteOption = 'yes' | 'no' | 'abstain' | 'no_with_veto'
export type Status =
  | 'open'
  | 'rejected'
  | 'passed'
  | 'executed'
  | 'closed'
  | 'execution_failed'
  | {
      veto_timelock: {
        expiration: Expiration
      }
    }
  | 'vetoed'
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
export interface MultipleChoiceOptions {
  options: MultipleChoiceOption[]
}
export interface MultipleChoiceOption {
  description: string
  msgs: CosmosMsgForEmpty[]
  title: string
}
export interface Coin {
  amount: Uint128
  denom: string
}
export interface IbcTimeout {
  block?: IbcTimeoutBlock | null
  timestamp?: Timestamp | null
}
export interface IbcTimeoutBlock {
  height: number
  revision: number
}
export type QueryMsg =
  | {
      proposal_module: {}
    }
  | {
      dao: {}
    }
  | {
      config: {}
    }
  | {
      deposit_info: {
        proposal_id: number
      }
    }
  | {
      proposal_submitted_hooks: {}
    }
  | {
      query_extension: {
        msg: Empty
      }
    }
export type CheckedDenom =
  | {
      native: string
    }
  | {
      snip20: [Addr, string]
    }
export type Addr = string
export interface Config {
  deposit_info?: CheckedDepositInfo | null
  open_proposal_submission: boolean
}
export interface CheckedDepositInfo {
  amount: Uint128
  denom: CheckedDenom
  refund_policy: DepositRefundPolicy
}
export interface AnyContractInfo {
  addr: Addr
  code_hash: string
}
export interface DepositInfoResponse {
  deposit_info?: CheckedDepositInfo | null
  proposer: Addr
}
export interface HooksResponse {
  hooks: HookItem[]
}
export interface HookItem {
  addr: Addr
  code_hash: string
}
