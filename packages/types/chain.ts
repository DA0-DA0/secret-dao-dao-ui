import { Chain } from '@chain-registry/types'

import { Coin } from './contracts'
import { ContractVersion } from './features'
import { GenericToken } from './token'

export type IChainContext = {
  chainId: string
  chain: Chain
  // Chain may not have a native token.
  nativeToken?: GenericToken
  // If defined, this is a configured chain, which means it is supported (DAO
  // DAO is deployed on it) or it has a governance interface.
  base?: BaseChainConfig
  // If defined, this is a supported chain, which means DAO DAO is deployed.
  config?: SupportedChainConfig
}

// Require base chain config.
export type ConfiguredChainContext = Omit<IChainContext, 'base' | 'config'> & {
  config: BaseChainConfig
}

// Require supported chain config.
export type SupportedChainContext = Omit<ConfiguredChainContext, 'config'> & {
  config: SupportedChainConfig
}

export interface Validator {
  address: string
  moniker: string
  website: string
  details: string
  commission: number
  status: string
  tokens: number
}

export interface Delegation {
  validator: Validator
  delegated: Coin
  pendingReward: Coin
}

export interface UnbondingDelegation {
  validator: Validator
  balance: Coin
  startedAtHeight: number
  finishesAt: Date
}

export interface NativeDelegationInfo {
  delegations: Delegation[]
  unbondingDelegations: UnbondingDelegation[]
}

export enum ChainId {
  CosmosHubMainnet = 'cosmoshub-4',
  CosmosHubTestnet = 'theta-testnet-001',
  JunoMainnet = 'juno-1',
  JunoTestnet = 'uni-6',
  OsmosisMainnet = 'osmosis-1',
  OsmosisTestnet = 'osmo-test-5',
  StargazeMainnet = 'stargaze-1',
  StargazeTestnet = 'elgafar-1',
  NeutronMainnet = 'neutron-1',
  NeutronTestnet = 'pion-1',
  TerraMainnet = 'phoenix-1',
  TerraClassicMainnet = 'columbus-5',
  MigalooMainnet = 'migaloo-1',
  MigalooTestnet = 'narwhal-2',
  NobleMainnet = 'noble-1',
  KujiraMainnet = 'kaiyo-1',
  KujiraTestnet = 'harpoon-4',
  ChihuahuaMainnet = 'chihuahua-1',
  OraichainMainnet = 'Oraichain',
  ArchwayMainnet = 'archway-1',
  InjectiveMainnet = 'injective-1',
  SecretMainnet = 'secret-4',
  SecretTestnet = 'pulsar-3',
}

export type BaseChainConfig = {
  /**
   * Chain ID.
   */
  chainId: string
  /**
   * Unique name among chain configs with the same `mainnet` flag. This is used
   * to identify the chain in the native governance UI.
   */
  name: string
  /**
   * Whether or not this should be shown on the mainnet UI. If not, it will be
   * shown in the testnet UI.
   */
  mainnet: boolean
  /**
   * An accent color for using in the UI.
   */
  accentColor: string
  /**
   * Set to true if the chain does not support CosmWasm. If undefined, assumed
   * to be false.
   */
  noCosmWasm?: boolean
  /**
   * Set to true if the chain does not have a gov module so that it doesn't
   * appear in the gov UI. If undefined, assumed to be false.
   */
  noGov?: boolean
  /**
   * Chain explorer URL templates for various external links.
   */
  explorerUrlTemplates?: {
    tx?: string
    gov?: string
    govProp?: string
    wallet?: string
  }
  /**
   * If defined, overrides the default chain image.
   */
  overrideChainImageUrl?: string
}

export type ConfiguredChain = BaseChainConfig & {
  chain: Chain
}

export type SupportedChainConfig = BaseChainConfig & {
  /**
   * The `cw-admin-factory` contract address that instantiates contracts with
   * themselves set as their admin.
   * https://github.com/DA0-DA0/dao-contracts/tree/development/contracts/external/cw-admin-factory
   */
  factoryContractAddress: string
  /**
   * If defined, it means Kado supports fiat deposit on this chain.
   */
  kado?: {
    /**
     * The Kado network identifier.
     */
    network: string
  }
  /**
   * Code IDs stored on this chain that are used throughout the UI.
   */
  codeIds: CodeIdConfig
  /**
   * Whether or not to create DAOs with CW20s. The alternative is to use token
   * factory native tokens. Defaults to false.
   */
  createWithCw20?: boolean
  /**
   * Whether or not to create a DAO through chain governance.
   */
  createViaGovernance?: boolean
  /**
   * Whether or not this chain has an indexer.
   */
  noIndexer?: boolean
  /**
   * Past versions of contracts, in case DAOs need a particular version of a
   * contract.
   */
  historicalCodeIds?: Partial<Record<ContractVersion, Partial<CodeIdConfig>>>
  /**
   * Polytone connections to other chains from this chain.
   */
  polytone?: PolytoneConfig
}

export type SupportedChain = SupportedChainConfig & {
  chain: Chain
}

export type SecretCodeInfo = {
  codeId: number
  codeHash: string
}

export type CodeIdConfig = {
  Cw1Whitelist: SecretCodeInfo
  Cw4Group: SecretCodeInfo

  Snip20Base: SecretCodeInfo
  Snip20Stake: SecretCodeInfo
  Snip721Base: SecretCodeInfo

  // https://github.com/DA0-DA0/dao-contracts
  CwPayrollFactory: SecretCodeInfo
  CwTokenSwap: SecretCodeInfo
  CwVesting: SecretCodeInfo
  DaoCore: SecretCodeInfo
  DaoMigrator: SecretCodeInfo
  DaoPreProposeApprovalSingle: SecretCodeInfo
  DaoPreProposeApprover: SecretCodeInfo
  DaoPreProposeMultiple: SecretCodeInfo
  DaoPreProposeSingle: SecretCodeInfo
  DaoProposalMultiple: SecretCodeInfo
  DaoProposalSingle: SecretCodeInfo
  DaoVotingCw4: SecretCodeInfo
  DaoVotingSnip721Staked: SecretCodeInfo
  DaoVotingSnip20Staked: SecretCodeInfo
}

export type PolytoneConnection = {
  // Contract address of note on the local/current chain.
  note: string
  // Contract address of the note's listener on the local/current chain.
  listener: string
  // Contract address of the note's voice on the remote chain.
  voice: string
  // IBC connection IDs
  localConnection: string
  remoteConnection: string
  // IBC channel IDs
  localChannel: string
  remoteChannel: string
  // Whether or not the user needs to self-relay an execution. This should be
  // true if no relayers are running on the established connection. If using an
  // existing active connection, the relayers will automatically perform the
  // relay.
  needsSelfRelay?: boolean
}

// Map chain ID to polytone connection information.
export type PolytoneConfig = Record<string, PolytoneConnection>

export type WithChainId<T> = T & {
  chainId: string
}

export type DecodedStargateMsg<Value = any> = {
  stargate: {
    typeUrl: string
    value: Value
  }
}

/**
 * Function that creates a cw1-whitelist contract. Used in the
 * `useCreateCw1Whitelist` hook.
 */
export type CreateCw1Whitelist = (
  admins: string[],
  mutable?: boolean
) => Promise<string | undefined>

export type ValidatorSlash = {
  registeredBlockHeight: string
  registeredBlockTimeUnixMs: string
  infractionBlockHeight: string
  // Slash fraction applied to validator's undelegating and redelegating tokens.
  slashFactor: string
  amountSlashed: string
  // Slash fraction applied to validator's current delegations. It may be less
  // than `slashFactor`.
  effectiveFraction: string
  // Amount of tokens slashed from delegations. This should be `amountSlashed`
  // minus the amount slashed from the validator's undelegating and redelegating
  // tokens.
  stakedTokensBurned: string
}
