export type Addr = string
export type Binary = string
export interface Coin {
  amount: Uint128
  denom: string
}
export type Decimal = string
export type Duration =
  | {
      height: number
    }
  | {
      time: number
    }
export interface Empty {}
export type Uint128 = string
export type Uint64 = string
export type Timestamp = Uint64
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

export type CosmosMsgFor_Empty =
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
  | StargateMsg
export type CosmosMsgForEmpty = CosmosMsgFor_Empty

export type VoteOption = 'yes' | 'no' | 'abstain' | 'no_with_veto'
export type GovMsg = {
  vote: {
    proposal_id: number
    vote: VoteOption
  }
}
/**
 * The message types of the bank module.
 *
 * See https://github.com/cosmos/cosmos-sdk/blob/v0.40.0/proto/cosmos/bank/v1beta1/tx.proto
 */
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
/**
 * The message types of the staking module.
 *
 * See https://github.com/cosmos/cosmos-sdk/blob/v0.40.0/proto/cosmos/staking/v1beta1/tx.proto
 */
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
/**
 * The message types of the distribution module.
 *
 * See https://github.com/cosmos/cosmos-sdk/blob/v0.42.4/proto/cosmos/distribution/v1beta1/tx.proto
 */
export type DistributionMsg =
  | {
      set_withdraw_address: {
        /**
         * The `withdraw_address`
         */
        address: string
      }
    }
  | {
      withdraw_delegator_reward: {
        /**
         * The `validator_address`
         */
        validator: string
      }
    }
/**
 * The message type representing generic protobuf messages in CosmWasm.
 */
export type StargateMsg = {
  stargate: {
    type_url: string
    value: Binary
  }
}
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

export interface IbcTimeout {
  block?: IbcTimeoutBlock | null
  timestamp?: Timestamp | null
}
export interface IbcTimeoutBlock {
  height: number
  revision: number
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

// V2
export type Admin =
  | {
      address: {
        addr: string
      }
    }
  | {
      core_module: {}
    }

export type ModuleInstantiateInfo = {
  admin?: Admin | null
  code_hash: string
  code_id: number
  funds: Coin[]
  label: string
  msg: Binary
}

export interface ContractVersionInfo {
  contract: string
  version: string
}
export interface InfoResponse {
  info: ContractVersionInfo
}

// Pre-propose stuff.
export type CheckedDenom =
  | {
      native: string
    }
  | {
      snip20: [Addr, string]
    }
export enum DepositRefundPolicy {
  Always = 'always',
  OnlyPassed = 'only_passed',
  Never = 'never',
}
export interface CheckedDepositInfo {
  amount: Uint128
  denom: CheckedDenom
  refund_policy: DepositRefundPolicy
}

/**
 * The proposal status enum variants that can be represented as strings. This
 * excludes enums containing values since they are objects.
 */
export enum ProposalStatusEnum {
  Open = 'open',
  Rejected = 'rejected',
  Passed = 'passed',
  Executed = 'executed',
  ExecutionFailed = 'execution_failed',
  Closed = 'closed',
  Vetoed = 'vetoed',
  // Neutron timelocked statuses.
  NeutronTimelocked = 'neutron_timelocked',
  NeutronOverruled = 'neutron_overruled',
}
/**
 * The `VetoTimelock` proposal status enum variant that is represented as an
 * object since it contains values.
 */
export type ProposalStatusVetoTimelock = {
  veto_timelock: {
    expiration: Expiration
  }
}
/**
 * The full proposal status type with all enum variants.
 *
 * Used by both DaoProposalSingle and DaoProposalMultiple.
 */
export type ProposalStatus = ProposalStatusEnum | ProposalStatusVetoTimelock
/**
 * The flattened set of proposal status keys that can be represented as strings.
 * This uses the strings as-is and the key of the object enum variants.
 */
export type ProposalStatusKey =
  | ProposalStatusEnum
  | keyof ProposalStatusVetoTimelock

export type ActiveThreshold =
  | {
      absolute_count: {
        count: Uint128
      }
    }
  | {
      percentage: {
        percent: Decimal
      }
    }

// Secret Network

export type SecretAnyContractInfo = {
  addr: Addr
  code_hash: string
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
