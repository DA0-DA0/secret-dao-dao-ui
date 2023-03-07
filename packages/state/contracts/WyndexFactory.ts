/**
 * This file was automatically generated by @cosmwasm/ts-codegen@0.17.0.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run the @cosmwasm/ts-codegen generate command to regenerate this file.
 */

import { Coin, StdFee } from '@cosmjs/amino'
import {
  CosmWasmClient,
  ExecuteResult,
  SigningCosmWasmClient,
} from '@cosmjs/cosmwasm-stargate'

import { Binary } from '@dao-dao/types'
import {
  ArrayOfAddr,
  ArrayOfPairType,
  AssetInfo,
  ConfigResponse,
  DistributionFlow,
  FeeConfig,
  FeeInfoResponse,
  PairConfig,
  PairInfo,
  PairType,
  PairsResponse,
  PartialStakeConfig,
} from '@dao-dao/types/contracts/WyndexFactory'

export interface WyndexFactoryReadOnlyInterface {
  contractAddress: string
  config: () => Promise<ConfigResponse>
  pair: ({ assetInfos }: { assetInfos: AssetInfo[] }) => Promise<PairInfo>
  pairs: ({
    limit,
    startAfter,
  }: {
    limit?: number
    startAfter?: AssetInfo[]
  }) => Promise<PairsResponse>
  feeInfo: ({ pairType }: { pairType: PairType }) => Promise<FeeInfoResponse>
  blacklistedPairTypes: () => Promise<ArrayOfPairType>
  pairsToMigrate: () => Promise<ArrayOfAddr>
  validateStakingAddress: ({ address }: { address: string }) => Promise<Boolean>
}
export class WyndexFactoryQueryClient
  implements WyndexFactoryReadOnlyInterface
{
  client: CosmWasmClient
  contractAddress: string

  constructor(client: CosmWasmClient, contractAddress: string) {
    this.client = client
    this.contractAddress = contractAddress
    this.config = this.config.bind(this)
    this.pair = this.pair.bind(this)
    this.pairs = this.pairs.bind(this)
    this.feeInfo = this.feeInfo.bind(this)
    this.blacklistedPairTypes = this.blacklistedPairTypes.bind(this)
    this.pairsToMigrate = this.pairsToMigrate.bind(this)
    this.validateStakingAddress = this.validateStakingAddress.bind(this)
  }

  config = async (): Promise<ConfigResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      config: {},
    })
  }
  pair = async ({
    assetInfos,
  }: {
    assetInfos: AssetInfo[]
  }): Promise<PairInfo> => {
    return this.client.queryContractSmart(this.contractAddress, {
      pair: {
        asset_infos: assetInfos,
      },
    })
  }
  pairs = async ({
    limit,
    startAfter,
  }: {
    limit?: number
    startAfter?: AssetInfo[]
  }): Promise<PairsResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      pairs: {
        limit,
        start_after: startAfter,
      },
    })
  }
  feeInfo = async ({
    pairType,
  }: {
    pairType: PairType
  }): Promise<FeeInfoResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      fee_info: {
        pair_type: pairType,
      },
    })
  }
  blacklistedPairTypes = async (): Promise<ArrayOfPairType> => {
    return this.client.queryContractSmart(this.contractAddress, {
      blacklisted_pair_types: {},
    })
  }
  pairsToMigrate = async (): Promise<ArrayOfAddr> => {
    return this.client.queryContractSmart(this.contractAddress, {
      pairs_to_migrate: {},
    })
  }
  validateStakingAddress = async ({
    address,
  }: {
    address: string
  }): Promise<Boolean> => {
    return this.client.queryContractSmart(this.contractAddress, {
      validate_staking_address: {
        address,
      },
    })
  }
}
export interface WyndexFactoryInterface extends WyndexFactoryReadOnlyInterface {
  contractAddress: string
  sender: string
  updateConfig: (
    {
      feeAddress,
      onlyOwnerCanCreatePairs,
      tokenCodeId,
    }: {
      feeAddress?: string
      onlyOwnerCanCreatePairs?: boolean
      tokenCodeId?: number
    },
    fee?: number | StdFee | 'auto',
    memo?: string,
    funds?: Coin[]
  ) => Promise<ExecuteResult>
  updatePairConfig: (
    {
      config,
    }: {
      config: PairConfig
    },
    fee?: number | StdFee | 'auto',
    memo?: string,
    funds?: Coin[]
  ) => Promise<ExecuteResult>
  createPair: (
    {
      assetInfos,
      initParams,
      pairType,
      stakingConfig,
      totalFeeBps,
    }: {
      assetInfos: AssetInfo[]
      initParams?: Binary
      pairType: PairType
      stakingConfig?: PartialStakeConfig
      totalFeeBps?: number
    },
    fee?: number | StdFee | 'auto',
    memo?: string,
    funds?: Coin[]
  ) => Promise<ExecuteResult>
  updatePairFees: (
    {
      assetInfos,
      feeConfig,
    }: {
      assetInfos: AssetInfo[]
      feeConfig: FeeConfig
    },
    fee?: number | StdFee | 'auto',
    memo?: string,
    funds?: Coin[]
  ) => Promise<ExecuteResult>
  deregister: (
    {
      assetInfos,
    }: {
      assetInfos: AssetInfo[]
    },
    fee?: number | StdFee | 'auto',
    memo?: string,
    funds?: Coin[]
  ) => Promise<ExecuteResult>
  proposeNewOwner: (
    {
      expiresIn,
      owner,
    }: {
      expiresIn: number
      owner: string
    },
    fee?: number | StdFee | 'auto',
    memo?: string,
    funds?: Coin[]
  ) => Promise<ExecuteResult>
  dropOwnershipProposal: (
    fee?: number | StdFee | 'auto',
    memo?: string,
    funds?: Coin[]
  ) => Promise<ExecuteResult>
  claimOwnership: (
    fee?: number | StdFee | 'auto',
    memo?: string,
    funds?: Coin[]
  ) => Promise<ExecuteResult>
  markAsMigrated: (
    {
      pairs,
    }: {
      pairs: string[]
    },
    fee?: number | StdFee | 'auto',
    memo?: string,
    funds?: Coin[]
  ) => Promise<ExecuteResult>
  createPairAndDistributionFlows: (
    {
      assetInfos,
      distributionFlows,
      initParams,
      pairType,
      stakingConfig,
      totalFeeBps,
    }: {
      assetInfos: AssetInfo[]
      distributionFlows: DistributionFlow[]
      initParams?: Binary
      pairType: PairType
      stakingConfig?: PartialStakeConfig
      totalFeeBps?: number
    },
    fee?: number | StdFee | 'auto',
    memo?: string,
    funds?: Coin[]
  ) => Promise<ExecuteResult>
  createDistributionFlow: (
    {
      asset,
      assetInfos,
      rewards,
    }: {
      asset: AssetInfo
      assetInfos: AssetInfo[]
      rewards: number[][]
    },
    fee?: number | StdFee | 'auto',
    memo?: string,
    funds?: Coin[]
  ) => Promise<ExecuteResult>
}
export class WyndexFactoryClient
  extends WyndexFactoryQueryClient
  implements WyndexFactoryInterface
{
  client: SigningCosmWasmClient
  sender: string
  contractAddress: string

  constructor(
    client: SigningCosmWasmClient,
    sender: string,
    contractAddress: string
  ) {
    super(client, contractAddress)
    this.client = client
    this.sender = sender
    this.contractAddress = contractAddress
    this.updateConfig = this.updateConfig.bind(this)
    this.updatePairConfig = this.updatePairConfig.bind(this)
    this.createPair = this.createPair.bind(this)
    this.updatePairFees = this.updatePairFees.bind(this)
    this.deregister = this.deregister.bind(this)
    this.proposeNewOwner = this.proposeNewOwner.bind(this)
    this.dropOwnershipProposal = this.dropOwnershipProposal.bind(this)
    this.claimOwnership = this.claimOwnership.bind(this)
    this.markAsMigrated = this.markAsMigrated.bind(this)
    this.createPairAndDistributionFlows =
      this.createPairAndDistributionFlows.bind(this)
    this.createDistributionFlow = this.createDistributionFlow.bind(this)
  }

  updateConfig = async (
    {
      feeAddress,
      onlyOwnerCanCreatePairs,
      tokenCodeId,
    }: {
      feeAddress?: string
      onlyOwnerCanCreatePairs?: boolean
      tokenCodeId?: number
    },
    fee: number | StdFee | 'auto' = 'auto',
    memo?: string,
    funds?: Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        update_config: {
          fee_address: feeAddress,
          only_owner_can_create_pairs: onlyOwnerCanCreatePairs,
          token_code_id: tokenCodeId,
        },
      },
      fee,
      memo,
      funds
    )
  }
  updatePairConfig = async (
    {
      config,
    }: {
      config: PairConfig
    },
    fee: number | StdFee | 'auto' = 'auto',
    memo?: string,
    funds?: Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        update_pair_config: {
          config,
        },
      },
      fee,
      memo,
      funds
    )
  }
  createPair = async (
    {
      assetInfos,
      initParams,
      pairType,
      stakingConfig,
      totalFeeBps,
    }: {
      assetInfos: AssetInfo[]
      initParams?: Binary
      pairType: PairType
      stakingConfig?: PartialStakeConfig
      totalFeeBps?: number
    },
    fee: number | StdFee | 'auto' = 'auto',
    memo?: string,
    funds?: Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        create_pair: {
          asset_infos: assetInfos,
          init_params: initParams,
          pair_type: pairType,
          staking_config: stakingConfig,
          total_fee_bps: totalFeeBps,
        },
      },
      fee,
      memo,
      funds
    )
  }
  updatePairFees = async (
    {
      assetInfos,
      feeConfig,
    }: {
      assetInfos: AssetInfo[]
      feeConfig: FeeConfig
    },
    fee: number | StdFee | 'auto' = 'auto',
    memo?: string,
    funds?: Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        update_pair_fees: {
          asset_infos: assetInfos,
          fee_config: feeConfig,
        },
      },
      fee,
      memo,
      funds
    )
  }
  deregister = async (
    {
      assetInfos,
    }: {
      assetInfos: AssetInfo[]
    },
    fee: number | StdFee | 'auto' = 'auto',
    memo?: string,
    funds?: Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        deregister: {
          asset_infos: assetInfos,
        },
      },
      fee,
      memo,
      funds
    )
  }
  proposeNewOwner = async (
    {
      expiresIn,
      owner,
    }: {
      expiresIn: number
      owner: string
    },
    fee: number | StdFee | 'auto' = 'auto',
    memo?: string,
    funds?: Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        propose_new_owner: {
          expires_in: expiresIn,
          owner,
        },
      },
      fee,
      memo,
      funds
    )
  }
  dropOwnershipProposal = async (
    fee: number | StdFee | 'auto' = 'auto',
    memo?: string,
    funds?: Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        drop_ownership_proposal: {},
      },
      fee,
      memo,
      funds
    )
  }
  claimOwnership = async (
    fee: number | StdFee | 'auto' = 'auto',
    memo?: string,
    funds?: Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        claim_ownership: {},
      },
      fee,
      memo,
      funds
    )
  }
  markAsMigrated = async (
    {
      pairs,
    }: {
      pairs: string[]
    },
    fee: number | StdFee | 'auto' = 'auto',
    memo?: string,
    funds?: Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        mark_as_migrated: {
          pairs,
        },
      },
      fee,
      memo,
      funds
    )
  }
  createPairAndDistributionFlows = async (
    {
      assetInfos,
      distributionFlows,
      initParams,
      pairType,
      stakingConfig,
      totalFeeBps,
    }: {
      assetInfos: AssetInfo[]
      distributionFlows: DistributionFlow[]
      initParams?: Binary
      pairType: PairType
      stakingConfig?: PartialStakeConfig
      totalFeeBps?: number
    },
    fee: number | StdFee | 'auto' = 'auto',
    memo?: string,
    funds?: Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        create_pair_and_distribution_flows: {
          asset_infos: assetInfos,
          distribution_flows: distributionFlows,
          init_params: initParams,
          pair_type: pairType,
          staking_config: stakingConfig,
          total_fee_bps: totalFeeBps,
        },
      },
      fee,
      memo,
      funds
    )
  }
  createDistributionFlow = async (
    {
      asset,
      assetInfos,
      rewards,
    }: {
      asset: AssetInfo
      assetInfos: AssetInfo[]
      rewards: number[][]
    },
    fee: number | StdFee | 'auto' = 'auto',
    memo?: string,
    funds?: Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        create_distribution_flow: {
          asset,
          asset_infos: assetInfos,
          rewards,
        },
      },
      fee,
      memo,
      funds
    )
  }
}