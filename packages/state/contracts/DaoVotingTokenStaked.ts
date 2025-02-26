import { Coin, StdFee } from '@cosmjs/amino'
import {
  CosmWasmClient,
  ExecuteResult,
  SigningCosmWasmClient,
} from '@cosmjs/cosmwasm-stargate'

import {
  ActiveThreshold,
  Addr,
  Duration,
  Uint128,
} from '@dao-dao/types/contracts/common'
import {
  ActiveThresholdResponse,
  Boolean,
  ClaimsResponse,
  Config,
  DenomResponse,
  GetHooksResponse,
  InfoResponse,
  ListStakersResponse,
  NullableAddr,
  TotalPowerAtHeightResponse,
  VotingPowerAtHeightResponse,
} from '@dao-dao/types/contracts/DaoVotingTokenStaked'
export interface DaoVotingTokenStakedReadOnlyInterface {
  contractAddress: string
  getConfig: () => Promise<Config>
  denom: () => Promise<DenomResponse>
  claims: ({ address }: { address: string }) => Promise<ClaimsResponse>
  listStakers: ({
    limit,
    startAfter,
  }: {
    limit?: number
    startAfter?: string
  }) => Promise<ListStakersResponse>
  activeThreshold: () => Promise<ActiveThresholdResponse>
  getHooks: () => Promise<GetHooksResponse>
  tokenContract: () => Promise<NullableAddr>
  isActive: () => Promise<Boolean>
  votingPowerAtHeight: ({
    address,
    height,
  }: {
    address: string
    height?: number
  }) => Promise<VotingPowerAtHeightResponse>
  totalPowerAtHeight: ({
    height,
  }: {
    height?: number
  }) => Promise<TotalPowerAtHeightResponse>
  dao: () => Promise<Addr>
  info: () => Promise<InfoResponse>
}
export class DaoVotingTokenStakedQueryClient
  implements DaoVotingTokenStakedReadOnlyInterface
{
  client: CosmWasmClient
  contractAddress: string

  constructor(client: CosmWasmClient, contractAddress: string) {
    this.client = client
    this.contractAddress = contractAddress
    this.getConfig = this.getConfig.bind(this)
    this.denom = this.denom.bind(this)
    this.claims = this.claims.bind(this)
    this.listStakers = this.listStakers.bind(this)
    this.activeThreshold = this.activeThreshold.bind(this)
    this.getHooks = this.getHooks.bind(this)
    this.tokenContract = this.tokenContract.bind(this)
    this.isActive = this.isActive.bind(this)
    this.votingPowerAtHeight = this.votingPowerAtHeight.bind(this)
    this.totalPowerAtHeight = this.totalPowerAtHeight.bind(this)
    this.dao = this.dao.bind(this)
    this.info = this.info.bind(this)
  }

  getConfig = async (): Promise<Config> => {
    return this.client.queryContractSmart(this.contractAddress, {
      get_config: {},
    })
  }
  denom = async (): Promise<DenomResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      denom: {},
    })
  }
  claims = async ({
    address,
  }: {
    address: string
  }): Promise<ClaimsResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      claims: {
        address,
      },
    })
  }
  listStakers = async ({
    limit,
    startAfter,
  }: {
    limit?: number
    startAfter?: string
  }): Promise<ListStakersResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      list_stakers: {
        limit,
        start_after: startAfter,
      },
    })
  }
  activeThreshold = async (): Promise<ActiveThresholdResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      active_threshold: {},
    })
  }
  getHooks = async (): Promise<GetHooksResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      get_hooks: {},
    })
  }
  tokenContract = async (): Promise<NullableAddr> => {
    return this.client.queryContractSmart(this.contractAddress, {
      token_contract: {},
    })
  }
  isActive = async (): Promise<Boolean> => {
    return this.client.queryContractSmart(this.contractAddress, {
      is_active: {},
    })
  }
  votingPowerAtHeight = async ({
    address,
    height,
  }: {
    address: string
    height?: number
  }): Promise<VotingPowerAtHeightResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      voting_power_at_height: {
        address,
        height,
      },
    })
  }
  totalPowerAtHeight = async ({
    height,
  }: {
    height?: number
  }): Promise<TotalPowerAtHeightResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      total_power_at_height: {
        height,
      },
    })
  }
  dao = async (): Promise<Addr> => {
    return this.client.queryContractSmart(this.contractAddress, {
      dao: {},
    })
  }
  info = async (): Promise<InfoResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      info: {},
    })
  }
}
export interface DaoVotingTokenStakedInterface
  extends DaoVotingTokenStakedReadOnlyInterface {
  contractAddress: string
  sender: string
  stake: (
    fee?: number | StdFee | 'auto',
    memo?: string,
    _funds?: Coin[]
  ) => Promise<ExecuteResult>
  unstake: (
    {
      amount,
    }: {
      amount: Uint128
    },
    fee?: number | StdFee | 'auto',
    memo?: string,
    _funds?: Coin[]
  ) => Promise<ExecuteResult>
  updateConfig: (
    {
      duration,
    }: {
      duration?: Duration
    },
    fee?: number | StdFee | 'auto',
    memo?: string,
    _funds?: Coin[]
  ) => Promise<ExecuteResult>
  claim: (
    fee?: number | StdFee | 'auto',
    memo?: string,
    _funds?: Coin[]
  ) => Promise<ExecuteResult>
  updateActiveThreshold: (
    {
      newThreshold,
    }: {
      newThreshold?: ActiveThreshold
    },
    fee?: number | StdFee | 'auto',
    memo?: string,
    _funds?: Coin[]
  ) => Promise<ExecuteResult>
  addHook: (
    {
      addr,
    }: {
      addr: string
    },
    fee?: number | StdFee | 'auto',
    memo?: string,
    _funds?: Coin[]
  ) => Promise<ExecuteResult>
  removeHook: (
    {
      addr,
    }: {
      addr: string
    },
    fee?: number | StdFee | 'auto',
    memo?: string,
    _funds?: Coin[]
  ) => Promise<ExecuteResult>
}
export class DaoVotingTokenStakedClient
  extends DaoVotingTokenStakedQueryClient
  implements DaoVotingTokenStakedInterface
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
    this.stake = this.stake.bind(this)
    this.unstake = this.unstake.bind(this)
    this.updateConfig = this.updateConfig.bind(this)
    this.claim = this.claim.bind(this)
    this.updateActiveThreshold = this.updateActiveThreshold.bind(this)
    this.addHook = this.addHook.bind(this)
    this.removeHook = this.removeHook.bind(this)
  }

  stake = async (
    fee: number | StdFee | 'auto' = 'auto',
    memo?: string,
    _funds?: Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        stake: {},
      },
      fee,
      memo,
      _funds
    )
  }
  unstake = async (
    {
      amount,
    }: {
      amount: Uint128
    },
    fee: number | StdFee | 'auto' = 'auto',
    memo?: string,
    _funds?: Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        unstake: {
          amount,
        },
      },
      fee,
      memo,
      _funds
    )
  }
  updateConfig = async (
    {
      duration,
    }: {
      duration?: Duration
    },
    fee: number | StdFee | 'auto' = 'auto',
    memo?: string,
    _funds?: Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        update_config: {
          duration,
        },
      },
      fee,
      memo,
      _funds
    )
  }
  claim = async (
    fee: number | StdFee | 'auto' = 'auto',
    memo?: string,
    _funds?: Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        claim: {},
      },
      fee,
      memo,
      _funds
    )
  }
  updateActiveThreshold = async (
    {
      newThreshold,
    }: {
      newThreshold?: ActiveThreshold
    },
    fee: number | StdFee | 'auto' = 'auto',
    memo?: string,
    _funds?: Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        update_active_threshold: {
          new_threshold: newThreshold,
        },
      },
      fee,
      memo,
      _funds
    )
  }
  addHook = async (
    {
      addr,
    }: {
      addr: string
    },
    fee: number | StdFee | 'auto' = 'auto',
    memo?: string,
    _funds?: Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        add_hook: {
          addr,
        },
      },
      fee,
      memo,
      _funds
    )
  }
  removeHook = async (
    {
      addr,
    }: {
      addr: string
    },
    fee: number | StdFee | 'auto' = 'auto',
    memo?: string,
    _funds?: Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        remove_hook: {
          addr,
        },
      },
      fee,
      memo,
      _funds
    )
  }
}
