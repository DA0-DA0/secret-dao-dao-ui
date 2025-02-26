export type GroupContract =
  | {
      existing: {
        address: string
        code_hash: string
      }
    }
  | {
      new: {
        cw4_group_code_hash: string
        cw4_group_code_id: number
        initial_members: Member[]
      }
    }
export interface InstantiateMsg {
  dao_code_hash: string
  group_contract: GroupContract
  query_auth: RawContract
}
export interface Member {
  addr: string
  weight: number
}
export interface RawContract {
  address: string
  code_hash: string
}
export type ExecuteMsg = string
export type QueryMsg =
  | {
      group_contract: {}
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
  | {
      dao: {}
    }
  | {
      info: {}
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
export type Uint128 = string
export type Binary = string
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
export interface MigrateMsg {}
export type Addr = string
export interface AnyContractInfo {
  addr: Addr
  code_hash: string
}
export interface InfoResponse {
  info: ContractVersion
}
export interface ContractVersion {
  contract: string
  version: string
}
export interface TotalPowerAtHeightResponse {
  height: number
  power: Uint128
}
export interface VotingPowerAtHeightResponse {
  height: number
  power: Uint128
}
