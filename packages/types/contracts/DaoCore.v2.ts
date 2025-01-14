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
export interface InstantiateMsg {
  admin?: string | null
  automatically_add_snip20s: boolean
  automatically_add_snip721s: boolean
  dao_uri?: string | null
  description: string
  image_url?: string | null
  initial_items?: InitialItem[] | null
  name: string
  proposal_modules_instantiate_info: ModuleInstantiateInfo[]
  snip20_code_hash: string
  snip721_code_hash: string
  voting_module_instantiate_info: ModuleInstantiateInfo
}
export interface InitialItem {
  key: string
  value: string
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
export type ExecuteMsg =
  | {
      execute_admin_msgs: {
        msgs: CosmosMsgForEmpty[]
      }
    }
  | {
      execute_proposal_hook: {
        msgs: CosmosMsgForEmpty[]
      }
    }
  | {
      pause: {
        duration: Duration
      }
    }
  | {
      receive: Snip20ReceiveMsg
    }
  | {
      receive_nft: {
        msg?: Binary | null
        sender: Addr
        token_id: string
      }
    }
  | {
      remove_item: {
        key: string
      }
    }
  | {
      set_item: {
        key: string
        value: string
      }
    }
  | {
      nominate_admin: {
        admin?: string | null
      }
    }
  | {
      accept_admin_nomination: {}
    }
  | {
      withdraw_admin_nomination: {}
    }
  | {
      update_config: {
        config: Config
      }
    }
  | {
      update_snip20_list: {
        to_add: string[]
        to_remove: string[]
      }
    }
  | {
      update_snip721_list: {
        to_add: string[]
        to_remove: string[]
      }
    }
  | {
      update_proposal_modules: {
        to_add: ModuleInstantiateInfo[]
        to_disable: string[]
      }
    }
  | {
      update_voting_module: {
        module: ModuleInstantiateInfo
      }
    }
  | {
      update_sub_daos: {
        to_add: SubDao[]
        to_remove: string[]
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
export type Duration =
  | {
      height: number
    }
  | {
      time: number
    }
export type Addr = string
export interface Empty {}
export interface IbcTimeout {
  block?: IbcTimeoutBlock | null
  timestamp?: Timestamp | null
}
export interface IbcTimeoutBlock {
  height: number
  revision: number
}
export interface Snip20ReceiveMsg {
  amount: Uint128
  from: Addr
  memo?: string | null
  msg?: Binary | null
  sender: Addr
}
export interface Config {
  automatically_add_snip20s: boolean
  automatically_add_snip721s: boolean
  dao_uri?: string | null
  description: string
  image_url?: string | null
  name: string
}
export interface SubDao {
  addr: string
  charter?: string | null
  code_hash: string
}
export type QueryMsg =
  | {
      admin: {}
    }
  | {
      admin_nomination: {}
    }
  | {
      config: {}
    }
  | {
      cw20_balances: {
        limit?: number | null
        start_after?: string | null
      }
    }
  | {
      cw20_token_list: {
        limit?: number | null
        start_after?: string | null
      }
    }
  | {
      cw721_token_list: {
        limit?: number | null
        start_after?: string | null
      }
    }
  | {
      dump_state: {}
    }
  | {
      get_item: {
        key: string
      }
    }
  | {
      list_items: {
        limit?: number | null
        start_after?: string | null
      }
    }
  | {
      info: {}
    }
  | {
      proposal_modules: {
        limit?: number | null
        start_after?: string | null
      }
    }
  | {
      active_proposal_modules: {
        limit?: number | null
        start_after?: string | null
      }
    }
  | {
      proposal_module_count: {}
    }
  | {
      pause_info: {}
    }
  | {
      voting_module: {}
    }
  | {
      list_sub_daos: {
        limit?: number | null
        start_after?: string | null
      }
    }
  | {
      dao_u_r_i: {}
    }
  | {
      voting_power_at_height: {
        auth: Auth
        height?: number | null
      }
    }
  | {
      total_power_at_height: {
        height?: number | null
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
export type MigrateMsg =
  | {
      from_v1: {
        dao_uri?: string | null
        params?: MigrateParams | null
      }
    }
  | {
      from_compatible: {}
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
export interface MigrateParams {
  migrator_code_id: number
  params: MigrateV1ToV2
}
export interface MigrateV1ToV2 {
  migration_params: MigrationModuleParams
  sub_daos: SubDao[]
  v1_code_ids_and_hashes: V1CodeIdsAndHashes
  v2_code_ids_and_hashes: V2CodeIdsAndHashes
}
export interface MigrationModuleParams {
  migrate_stake_snip20_manager?: boolean | null
  proposal_params: [string, ProposalParams][]
}
export interface ProposalParams {
  close_proposal_on_execution_failure: boolean
  pre_propose_info: PreProposeInfo
}
export interface V1CodeIdsAndHashes {
  cw4_voting: number
  cw4_voting_code_hash: string
  proposal_single: number
  proposal_single_code_hash: string
  snip20_stake: number
  snip20_stake_code_hash: string
  snip20_staked_balances_code_hash: string
  snip20_staked_balances_voting: number
}
export interface V2CodeIdsAndHashes {
  cw4_voting: number
  cw4_voting_code_hash: string
  proposal_single: number
  proposal_single_code_hash: string
  snip20_stake: number
  snip20_stake_code_hash: string
  snip20_staked_balances_code_hash: string
  snip20_staked_balances_voting: number
}
export type ProposalModuleStatus = 'enabled' | 'disabled'
export type ArrayOfProposalModule = ProposalModule[]
export interface ProposalModule {
  address: Addr
  code_hash: string
  prefix: string
  status: ProposalModuleStatus
}
export interface AdminNominationResponse {
  nomination?: Addr | null
}
export interface Snip20BalanceResponse {
  addr: string
  balance: Uint128
}
export type ArrayOfAddr = Addr[]
export interface DaoURIResponse {
  dao_uri?: string | null
}
export type PauseInfoResponse =
  | {
      paused: {
        expiration: Expiration
      }
    }
  | {
      unpaused: {}
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
export interface DumpStateResponse {
  active_proposal_module_count: number
  admin: Addr
  config: Config
  pause_info: PauseInfoResponse
  proposal_modules: ProposalModule[]
  total_proposal_module_count: number
  version: ContractVersion
  voting_module_address: Addr
  voting_module_code_hash: string
}
export interface ContractVersion {
  contract: string
  version: string
}
export interface GetItemResponse {
  item?: string | null
}
export interface InfoResponse {
  info: ContractVersion
}
export type ArrayOfArrayOfString = [string, string][]
export type ArrayOfSubDao = SubDao[]
export interface ProposalModuleCountResponse {
  active_proposal_module_count: number
  total_proposal_module_count: number
}
export interface TotalPowerAtHeightResponse {
  height: number
  power: Uint128
}
export interface AnyContractInfo {
  addr: Addr
  code_hash: string
}
export interface VotingPowerAtHeightResponse {
  height: number
  power: Uint128
}

export type ProposalModuleWithInfo = ProposalModule & {
  info?: ContractVersion
}
