import {
  atomFamily,
  noWait,
  selectorFamily,
  waitForAll,
  waitForAny,
} from 'recoil'

import {
  accountsSelector,
  nativeBalancesSelector,
  nativeDelegatedBalanceSelector,
  refreshHiddenBalancesAtom,
  refreshSavedTxsAtom,
  refreshWalletBalancesIdAtom,
} from '@dao-dao/state/recoil'
import {
  AccountTxSave,
  LazyDaoCardProps,
  LazyNftCardInfo,
  TokenCardInfo,
  WithChainId,
} from '@dao-dao/types'
import {
  HIDDEN_BALANCE_PREFIX,
  KVPK_API_BASE,
  ME_SAVED_TX_PREFIX,
  convertMicroDenomToDenomWithDecimals,
  getNativeTokenForChainId,
  loadableToLoadingData,
} from '@dao-dao/utils'

import { lazyDaoCardPropsSelector } from './dao'
import { followingDaosSelector } from './dao/following'
import {
  walletLazyNftCardInfosSelector,
  walletStakedLazyNftCardInfosSelector,
} from './nft'
import { tokenCardLazyInfoSelector } from './token'

// This doesn't update right away due to Cloudflare KV Store latency, so this
// serves to keep track of all successful updates for the current session. This
// will be reset on page refresh. Set this right away so the UI can update
// immediately even if the API takes up to a minute or two. Though likely it
// only takes 10 seconds or so.
//
// Takes wallet public key as a parameter.
export const temporarySavedTxsAtom = atomFamily<
  Record<string, AccountTxSave | null>,
  string
>({
  key: 'temporarySavedTxs',
  default: {},
})

// Takes wallet public key as a parameter.
export const savedTxsSelector = selectorFamily<AccountTxSave[], string>({
  key: 'savedTxs',
  get:
    (walletPublicKey) =>
    async ({ get }) => {
      get(refreshSavedTxsAtom)

      const temporary = get(temporarySavedTxsAtom(walletPublicKey))

      const response = await fetch(
        KVPK_API_BASE + `/list/${walletPublicKey}/${ME_SAVED_TX_PREFIX}`
      )

      if (response.ok) {
        const { items } = (await response.json()) as {
          items: {
            key: string
            value: AccountTxSave
          }[]
        }

        const savedItems = Object.entries(temporary)
        // Add any items that are in the KV store but not in the temporary map.
        items.forEach(({ key, value }) => {
          if (!(key in temporary)) {
            savedItems.push([key, value])
          }
        })

        const saves = savedItems
          .map(([, value]) => value)
          // If the save is null, it came from the temporary map and means it
          // was deleted, so we need to remove it from the list.
          .filter((save): save is AccountTxSave => !!save)
          .sort((a, b) => a.name.localeCompare(b.name))

        return saves
      } else {
        throw new Error(
          `Failed to fetch tx saves: ${response.status}/${
            response.statusText
          } ${await response.text().catch(() => '')}`.trim()
        )
      }
    },
})

// This doesn't update right away due to Cloudflare KV Store latency, so this
// serves to keep track of all successful updates for the current session. This
// will be reset on page refresh. Set this right away so the UI can update
// immediately even if the API takes up to a minute or two. Though likely it
// only takes 10 seconds or so.
//
// Takes wallet public key as a parameter.
export const temporaryHiddenBalancesAtom = atomFamily<
  Record<string, number | null>,
  string
>({
  key: 'temporaryHiddenBalances',
  default: {},
})

// Takes wallet public key as a parameter. Return list of token denomOrAddress
// fields that are hidden.
export const hiddenBalancesSelector = selectorFamily<string[], string>({
  key: 'hiddenBalances',
  get:
    (walletPublicKey) =>
    async ({ get }) => {
      get(refreshHiddenBalancesAtom)

      const temporary = get(temporaryHiddenBalancesAtom(walletPublicKey))

      const response = await fetch(
        KVPK_API_BASE + `/list/${walletPublicKey}/${HIDDEN_BALANCE_PREFIX}`
      )

      if (response.ok) {
        const { items } = (await response.json()) as {
          items: {
            key: string
            value: number | null
          }[]
        }

        const hiddenBalances = Object.entries(temporary)
        // Add any items that are in the KV store but not in the temporary map.
        items.forEach(({ key, value }) => {
          if (!(key in temporary)) {
            hiddenBalances.push([key, value])
          }
        })

        const hidden = hiddenBalances
          .filter(([, value]) => value !== null)
          // Remove prefix so it's just the token's denomOrAddress.
          .map(([key]) => key.replace(HIDDEN_BALANCE_PREFIX, ''))

        return hidden
      } else {
        throw new Error(
          `Failed to fetch hidden balances: ${response.status}/${
            response.statusText
          } ${await response.text().catch(() => '')}`.trim()
        )
      }
    },
})

// lazyInfo must be loaded in the component separately, since it refreshes on a
// timer and we don't want this whole selector to reevaluate and load when that
// refreshes. Use `tokenCardLazyInfoSelector`.
export const walletTokenCardInfosSelector = selectorFamily<
  TokenCardInfo[],
  WithChainId<{
    walletAddress: string
  }>
>({
  key: 'walletTokenCardInfos',
  get:
    ({ walletAddress, chainId }) =>
    ({ get }) => {
      get(refreshWalletBalancesIdAtom(walletAddress))

      const allAccounts = get(
        accountsSelector({
          chainId,
          address: walletAddress,
        })
      )

      const nativeBalances = get(
        waitForAll(
          allAccounts.map(({ chainId, address }) =>
            nativeBalancesSelector({
              address,
              chainId,
            })
          )
        )
      )

      // No indexer on Secret Network so can't load SNIP20s.

      const infos: TokenCardInfo[] = [
        ...nativeBalances.flatMap((accountBalances, accountIndex) =>
          accountBalances.map(({ token, balance }) => {
            const unstakedBalance = convertMicroDenomToDenomWithDecimals(
              balance,
              token.decimals
            )

            // Staking info only exists for native token.
            const hasStakingInfo =
              token.denomOrAddress ===
                getNativeTokenForChainId(chainId).denomOrAddress &&
              // Check if anything staked.
              Number(
                get(
                  nativeDelegatedBalanceSelector({
                    address: walletAddress,
                    chainId,
                  })
                ).amount
              ) > 0

            const owner = allAccounts[accountIndex]

            const lazyInfo = get(
              noWait(
                tokenCardLazyInfoSelector({
                  owner: owner.address,
                  token,
                  unstakedBalance,
                })
              )
            )

            const info: TokenCardInfo = {
              owner,
              token,
              isGovernanceToken: false,
              unstakedBalance,
              hasStakingInfo,
              lazyInfo: loadableToLoadingData(lazyInfo, {
                usdUnitPrice: undefined,
                stakingInfo: undefined,
                totalBalance: unstakedBalance,
              }),
            }

            return info
          })
        ),
      ]

      return infos
    },
})

// Get NFTs for a wallet on many chains.
export const allWalletNftsSelector = selectorFamily<
  LazyNftCardInfo[],
  {
    chainId: string
    walletAddress: string
  }[]
>({
  key: 'allWalletNfts',
  get:
    (chainWallets) =>
    ({ get }) => {
      const nativeNfts = get(
        waitForAll(
          chainWallets.map(({ chainId, walletAddress }) =>
            walletLazyNftCardInfosSelector({
              chainId,
              walletAddress,
            })
          )
        )
      ).reduce(
        (acc, nftCardInfos) => [
          ...acc,
          ...Object.values(nftCardInfos).flatMap((data) =>
            !data || data.loading || data.errored ? [] : data.data
          ),
        ],
        [] as LazyNftCardInfo[]
      )

      const nativeStakedNfts = get(
        waitForAll(
          chainWallets.map(({ chainId, walletAddress }) =>
            walletStakedLazyNftCardInfosSelector({
              chainId,
              walletAddress,
            })
          )
        )
      ).flat()

      return [...nativeNfts, ...nativeStakedNfts]
    },
})

// Get lazy card info for DAOs this wallet is a member of.
export const lazyWalletDaosSelector = selectorFamily<
  LazyDaoCardProps[],
  WithChainId<{ address: string }>
>({
  key: 'lazyWalletDaos',
  get:
    ({ chainId, address }) =>
    ({ get }) => {
      // No indexer on Secret Network.
      return []

      // const daos: {
      //   dao: string
      //   info: ContractVersionInfo
      //   config: Config
      //   proposalCount: number
      // }[] = get(
      //   queryWalletIndexerSelector({
      //     chainId,
      //     walletAddress: address,
      //     formula: 'daos/memberOf',
      //     noFallback: true,
      //   })
      // )
      // if (!daos || !Array.isArray(daos)) {
      //   return []
      // }

      // const lazyDaoCards = daos.map(
      //   ({ dao, info, config, proposalCount }): LazyDaoCardProps => ({
      //     chainId,
      //     coreAddress: dao,
      //     coreVersion:
      //       parseContractVersion(info.version) || ContractVersion.Unknown,
      //     name: config.name,
      //     description: config.description,
      //     imageUrl: config.image_url || getFallbackImage(dao),
      //     isInactive:
      //       INACTIVE_DAO_NAMES.includes(config.name) || proposalCount === 0,
      //   })
      // )

      // return lazyDaoCards
    },
})

// Get lazy card info for DAOs this wallet is following.
export const lazyWalletFollowingDaosSelector = selectorFamily<
  LazyDaoCardProps[],
  { walletPublicKey: string }
>({
  key: 'lazyWalletFollowingDaos',
  get:
    ({ walletPublicKey }) =>
    ({ get }) => {
      const daos = get(
        followingDaosSelector({
          walletPublicKey,
        })
      )

      return daos.length > 0
        ? get(
            waitForAny(daos.map((dao) => lazyDaoCardPropsSelector(dao)))
          ).flatMap((loadable) => loadable.valueMaybe() || [])
        : []
    },
})
