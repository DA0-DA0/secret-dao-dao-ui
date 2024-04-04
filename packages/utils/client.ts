import { CosmWasmClient } from '@cosmjs/cosmwasm-stargate'
import { Event, StargateClient } from '@cosmjs/stargate'
import {
  Comet38Client,
  HttpBatchClient,
  Tendermint34Client,
  Tendermint37Client,
  connectComet,
} from '@cosmjs/tendermint-rpc'

import { getLcdForChainId, getRpcForChainId, isSecretNetwork } from './chain'
import { retry } from './network'
import { SecretCosmWasmClient } from './secret'

type ChainClientRoutes<T> = {
  [rpcEndpoint: string]: T
}

type HandleConnect<T, P> = (rpcEndpoint: string, ...args: P[]) => Promise<T>

/*
 * This is a workaround for `@cosmjs` clients to avoid connecting to the chain more than once.
 *
 * @example
 * export const stargateClientRouter = new ChainClientRouter({
 *   handleConnect: (rpcEndpoint: string) => StargateClient.connect(rpcEndpoint),
 * })
 *
 * const client = await stargateClientRouter.connect(RPC_ENDPOINT);
 *
 * const queryResponse = await client.queryContractSmart(...);
 *  */
export class ChainClientRouter<T, P> {
  private readonly handleConnect: HandleConnect<T, P>
  private instances: ChainClientRoutes<T> = {}

  constructor({ handleConnect }: { handleConnect: HandleConnect<T, P> }) {
    this.handleConnect = handleConnect
  }

  /*
   * Connect to the chain and return the client
   * or return an existing instance of the client.
   *  */
  async connect(rpcEndpoint: string, ...args: P[]) {
    if (!this.getClientInstance(rpcEndpoint)) {
      const instance = await this.handleConnect(rpcEndpoint, ...args)
      this.setClientInstance(rpcEndpoint, instance)
    }

    return this.getClientInstance(rpcEndpoint)
  }

  private getClientInstance(rpcEndpoint: string) {
    return this.instances[rpcEndpoint]
  }

  private setClientInstance(rpcEndpoint: string, client: T) {
    this.instances[rpcEndpoint] = client
  }
}

/*
 * Router for connecting to `CosmWasmClient`.
 */
export const cosmWasmClientRouter = new ChainClientRouter({
  handleConnect: async (rpcEndpoint: string) => {
    const httpClient = new HttpBatchClient(rpcEndpoint)
    const tmClient = await (
      (
        await connectComet(rpcEndpoint)
      ).constructor as
        | typeof Tendermint34Client
        | typeof Tendermint37Client
        | typeof Comet38Client
    ).create(httpClient)

    return await CosmWasmClient.create(tmClient)
  },
})

/*
 * Router for connecting to `StargateClient`.
 */
export const stargateClientRouter = new ChainClientRouter({
  handleConnect: async (rpcEndpoint: string) => {
    const httpClient = new HttpBatchClient(rpcEndpoint)
    const tmClient = await (
      (
        await connectComet(rpcEndpoint)
      ).constructor as
        | typeof Tendermint34Client
        | typeof Tendermint37Client
        | typeof Comet38Client
    ).create(httpClient)

    return await StargateClient.create(tmClient, {})
  },
})

/*
 * Router for connecting to `SecretCosmWasmClient`.
 */
export const secretCosmWasmClientRouter = new ChainClientRouter({
  handleConnect: async (
    rpcEndpoint: string,
    options: { chainId: string; apiEndpoint: string }
  ) =>
    await SecretCosmWasmClient.secretConnect(rpcEndpoint, {
      chainId: options.chainId,
      url: options.apiEndpoint,
    }),
})

/**
 * Get CosmWasmClient for the appropriate chain.
 *
 * Uses SecretCosmWasmClient for Secret Network mainnet and testnet.
 *
 * Defaults to CosmWasmClient for all other chains.
 */
export const getCosmWasmClientForChainId = async (
  chainId: string
): Promise<CosmWasmClient> =>
  await retry(10, async (attempt) =>
    isSecretNetwork(chainId)
      ? await secretCosmWasmClientRouter.connect(
          getRpcForChainId(chainId, attempt - 1),
          {
            chainId,
            apiEndpoint: getLcdForChainId(chainId, attempt - 1),
          }
        )
      : await cosmWasmClientRouter.connect(
          getRpcForChainId(chainId, attempt - 1)
        )
  )

/**
 * In response events from a transaction with a wasm event, gets the attribute
 * key for a given contract address.
 */
export const findWasmAttributeValue = (
  events: readonly Event[],
  contractAddress: string,
  attributeKey: string
): string | undefined => {
  const wasmEvent = events.find(
    ({ type, attributes }) =>
      type === 'wasm' &&
      attributes.some(
        ({ key, value }) =>
          key === '_contract_address' && value === contractAddress
      ) &&
      attributes.some(({ key }) => key === attributeKey)
  )
  return wasmEvent?.attributes.find(({ key }) => key === attributeKey)!.value
}

/**
 * In response events from a transaction, gets the first attribute value for an
 * attribute key in the first event of a given type.
 */
export const findEventsAttributeValue = (
  events: readonly Event[],
  eventType: string,
  attributeKey: string
): string | undefined =>
  events.flatMap(
    ({ type, attributes }) =>
      (type === eventType &&
        attributes.find(({ key }) => key === attributeKey)) ||
      []
  )[0]?.value
