import { constSelector, useRecoilValueLoadable, waitForAll } from 'recoil'

import { indexerFeaturedDaosSelector } from '@dao-dao/state/recoil'
import { useCachedLoadable } from '@dao-dao/stateless'
import { DaoCardInfo, DaoSource, LoadingData } from '@dao-dao/types'
import { getSupportedChains } from '@dao-dao/utils'

import { daoCardInfoSelector, followingDaosSelector } from '../recoil'
import { useProfile } from './useProfile'

export const useLoadingDaoCardInfos = (
  daos: LoadingData<DaoSource[]>,
  alphabetize = false
): LoadingData<DaoCardInfo[]> => {
  // If `coreAddresses` is undefined, we're still loading DAOs.
  const daoCardInfosLoadable = useCachedLoadable(
    !daos.loading
      ? waitForAll(
          daos.data.map(({ chainId, coreAddress }) =>
            daoCardInfoSelector({
              chainId,
              coreAddress,
            })
          )
        )
      : undefined
  )

  return daoCardInfosLoadable.state !== 'hasValue'
    ? { loading: true }
    : {
        loading: false,
        updating: daoCardInfosLoadable.updating,
        data: (
          daoCardInfosLoadable.contents.filter(Boolean) as DaoCardInfo[]
        ).sort((a, b) => (alphabetize ? a.name.localeCompare(b.name) : 0)),
      }
}

export const useLoadingFeaturedDaoCardInfos = (
  // If passed, will only load DAOs from this chain. Otherwise, will load
  // from all chains.
  chainId?: string
): LoadingData<DaoCardInfo[]> => {
  const chains = getSupportedChains().filter(
    ({ chain: { chain_id } }) => !chainId || chain_id === chainId
  )
  const featuredDaos = useRecoilValueLoadable(
    waitForAll(
      chains.map(({ chain }) => indexerFeaturedDaosSelector(chain.chain_id))
    )
  )

  return useLoadingDaoCardInfos(
    featuredDaos.state === 'loading'
      ? { loading: true }
      : featuredDaos.state === 'hasError'
      ? { loading: false, data: [] }
      : {
          loading: false,
          data: chains
            .flatMap(
              ({ chain }, index) =>
                featuredDaos.contents[index]?.map(
                  ({ address: coreAddress, order }) => ({
                    chainId: chain.chain_id,
                    coreAddress,
                    order,
                  })
                ) || []
            )
            .sort((a, b) => a.order - b.order),
        }
  )
}

export const useLoadingFollowingDaoCardInfos = (
  // If passed, will only load DAOs from this chain. Otherwise, will load from
  // all chains.
  chainId?: string
): LoadingData<DaoCardInfo[]> => {
  const { uniquePublicKeys } = useProfile()

  const followingDaosLoading = useRecoilValueLoadable(
    !uniquePublicKeys.loading
      ? waitForAll(
          uniquePublicKeys.data.map(({ publicKey }) =>
            followingDaosSelector({
              walletPublicKey: publicKey,
            })
          )
        )
      : constSelector([])
  )

  return useLoadingDaoCardInfos(
    followingDaosLoading.state === 'loading'
      ? { loading: true }
      : followingDaosLoading.state === 'hasError'
      ? { loading: false, data: [] }
      : {
          loading: false,
          data: followingDaosLoading.contents.flatMap((following) =>
            following.filter((f) => !chainId || f.chainId === chainId)
          ),
        },
    // Alphabetize.
    true
  )
}
