import { selectorFamily } from 'recoil'

import { GenericTokenBalance, WithChainId } from '@dao-dao/types'

type ContractWithBalance = {
  contractAddress: string
  balance: string
}

// Get CW20 balances for a wallet from the indexer.
export const walletCw20BalancesSelector = selectorFamily<
  GenericTokenBalance[],
  WithChainId<{ walletAddress: string }>
>({
  key: 'walletCw20Balances',
  get:
    ({ walletAddress, chainId }) =>
    ({ get }) => {
      // No indexer on Secret Network.
      return []

      // const id = get(refreshWalletBalancesIdAtom(walletAddress))

      // const cw20Contracts: ContractWithBalance[] =
      //   get(
      //     queryWalletIndexerSelector({
      //       chainId,
      //       walletAddress,
      //       formula: 'tokens/list',
      //       id,
      //       noFallback: true,
      //     })
      //   ) ?? []

      // const tokens = get(
      //   waitForAll(
      //     cw20Contracts.map(({ contractAddress }) =>
      //       genericTokenSelector({
      //         type: TokenType.Cw20,
      //         denomOrAddress: contractAddress,
      //         chainId,
      //       })
      //     )
      //   )
      // )

      // return tokens.map((token, index) => ({
      //   token,
      //   balance: cw20Contracts[index].balance,
      // }))
    },
})

export const walletTokenDaoStakedDenomsSelector = selectorFamily<
  readonly string[],
  WithChainId<{ walletAddress: string }>
>({
  key: 'walletTokenDaoStakedDenoms',
  get:
    ({ walletAddress, chainId }) =>
    ({ get }) => {
      // No indexer on Secret Network.
      return []

      // // Get the DAOs that the wallet is a member of
      // const daos = get(
      //   queryWalletIndexerSelector({
      //     chainId,
      //     walletAddress,
      //     formula: 'daos/memberOf',
      //     noFallback: true,
      //   })
      // )
      // if (!daos || !Array.isArray(daos) || daos.length === 0) {
      //   return []
      // }

      // // Get the token staked voting modules for each DAO
      // const votingModules = get(
      //   waitForAll(
      //     daos.map(({ dao: contractAddress }) =>
      //       votingModuleSelector({
      //         contractAddress,
      //         chainId,
      //         params: [],
      //       })
      //     )
      //   )
      // ).filter((contractAddress) =>
      //   get(
      //     isContractSelector({
      //       contractAddress,
      //       chainId,
      //       names: DAO_VOTING_TOKEN_STAKED_CONTRACT_NAMES,
      //     })
      //   )
      // )

      // if (votingModules.length === 0) {
      //   return []
      // }

      // // Get a list of denoms from the voting modules
      // const denoms = get(
      //   waitForAll(
      //     votingModules.map((contractAddress) =>
      //       DaoVotingTokenStaked.denomSelector({
      //         contractAddress,
      //         chainId,
      //         params: [],
      //       })
      //     )
      //   )
      // )

      // // Create a Set from the denoms to ensure uniqueness
      // const uniqueDenoms = new Set(denoms.map(({ denom }) => denom))

      // // Convert the Set back into an array to return
      // return [...uniqueDenoms]
    },
})
