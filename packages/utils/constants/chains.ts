import { ibc } from 'chain-registry'

import {
  BaseChainConfig,
  ChainId,
  PolytoneConfig,
  SupportedChainConfig,
} from '@dao-dao/types'

export { ibc }

// Chains which DAO DAO DAOs exist on.
export const SUPPORTED_CHAINS: SupportedChainConfig[] = [
  {
    chainId: ChainId.SecretTestnet,
    name: 'secret',
    mainnet: false,
    accentColor: '#000000',
    factoryContractAddress: '',
    noIndexer: true,
    createWithCw20: true,
    explorerUrlTemplates: {
      tx: 'https://testnet.ping.pub/secret/tx/REPLACE',
      gov: 'https://testnet.ping.pub/secret/gov',
      govProp: 'https://testnet.ping.pub/secret/gov/REPLACE',
      wallet: 'https://testnet.ping.pub/secret/account/REPLACE',
    },
    codeIds: {
      // TODO(secret-testnet)
      Cw1Whitelist: {
        codeId: -1,
        codeHash: '',
      },
      Cw4Group: {
        codeId: 7518,
        codeHash:
          '9b4855300c6d560b54c1c844ce9b950152b578e35f5d8582c9f3b4eb50ea1c5e',
      },
      Snip20Base: {
        codeId: 7377,
        codeHash:
          '227baa9cec9261ff1f755f142e490f5f3eb72219a5b848653afea8a59c72be1f',
      },
      Snip20Stake: {
        codeId: 7378,
        codeHash:
          '68fc4b624d3dca328d0186b60f6b57a4edb2e644f2e881790dae479b4ee795a9',
      },
      Snip721Base: {
        codeId: 7385,
        codeHash:
          '23ab361490b41023044e507da5163a2853a012ef37e6f7954cdbd003b90e387b',
      },

      // ContractVersion.V242
      CwPayrollFactory: {
        codeId: 7399,
        codeHash:
          '4be504a62bb4c026414a807b322d0efa981da635db4665b0808f4ea324557489',
      },
      CwTokenSwap: {
        codeId: 7400,
        codeHash:
          'ad421c8b105367de770a28f1b12c246d5ad22964ae7ad36f129f9cd91e4a8c87',
      },
      CwVesting: {
        codeId: 7401,
        codeHash:
          '00c1590f5299916294d6810e0bc0c1977c0f97bee307841c06b5641b0a27eecc',
      },
      DaoCore: {
        codeId: 7396,
        codeHash:
          '421ef964200a22a6995532d4fbb9678f4f0e8bb091fbedecbbba37192cb24e21',
      },
      DaoMigrator: {
        codeId: 7402,
        codeHash:
          '63cf4cc424159fb71c2f2cb045d52d11d886025408acc12b271338c4a67d4ceb',
      },
      DaoPreProposeApprovalSingle: {
        codeId: 7393,
        codeHash:
          '8fdb3059a01fae4815c93b5fe0838c9104e628155e6cae02eaa36a0c5955a7df',
      },
      DaoPreProposeApprover: {
        codeId: 7394,
        codeHash:
          '2649364d680598a01631511e1e9152abee44a1e94e22786aa4d8bfb6bb029dab',
      },
      DaoPreProposeMultiple: {
        codeId: 7390,
        codeHash:
          '1065e1ade685d871c0a63829df46e110e155016367054b911a1fd2bc2872b657',
      },
      DaoPreProposeSingle: {
        codeId: 7388,
        codeHash:
          '61ed2d2173cfe98a6971ba633ec87a0765e84654a742624e084e7044f2a73e6b',
      },
      DaoProposalMultiple: {
        codeId: 7391,
        codeHash:
          '84eed1ba1a012189bb8e90cc559fd554bbd01edcace878a0acae458bcb1431f1',
      },
      DaoProposalSingle: {
        codeId: 7389,
        codeHash:
          'cbe5ee7f02949f35879518f1e40dd5ede0281b8682be1f8343c43b72bbd7988b',
      },
      DaoVotingCw4: {
        codeId: 7382,
        codeHash:
          '25e50684eb277a37fbf7e37e4b6003c8bb7a2b43116105744829b307e0758c65',
      },
      DaoVotingSnip20Staked: {
        codeId: 7383,
        codeHash:
          '8996e0f6f1168d0e882399ffa3ff921e6b4b7e89def73919f2a30a9bd26d68e2',
      },
      DaoVotingSnip721Staked: {
        codeId: 7395,
        codeHash:
          '74d92d06d39cd1b974c0b356912089d6265632ef9fc93203a6d54dc7de6a2c86',
      },
    },
  },
]

export const POLYTONE_CONFIG_PER_CHAIN: [ChainId, PolytoneConfig][] =
  SUPPORTED_CHAINS.map(({ chainId, polytone: polytone = {} }) => [
    chainId as ChainId,
    polytone,
  ])

export const CHAIN_ENDPOINTS: Partial<
  Record<
    ChainId,
    {
      rpc: string
      rest: string
    }
  >
> = {
  [ChainId.SecretTestnet]: {
    rpc: 'https://rpc.pulsar.scrttestnet.com',
    rest: 'https://api.pulsar.scrttestnet.com',
  },
}

// All configured chains. Configured chains are either supported chains, which
// DAO DAO is deployed on, or other chains that show up in the governance UI.
export const CONFIGURED_CHAINS: BaseChainConfig[] = [...SUPPORTED_CHAINS]
