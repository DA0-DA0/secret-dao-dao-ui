import { useWallet } from '@noahsaso/cosmodal'
import { useCallback } from 'react'
import { constSelector, useRecoilValue, useSetRecoilState } from 'recoil'

import {
  Cw20StakeSelectors,
  CwdVotingCw20StakedSelectors,
  blockHeightSelector,
  refreshClaimsIdAtom,
  refreshWalletBalancesIdAtom,
  useCachedLoadable,
} from '@dao-dao/state'
import { claimAvailable } from '@dao-dao/utils'

import { useVotingModuleAdapterOptions } from '../../../react/context'
import { UseStakingInfoOptions, UseStakingInfoResponse } from '../../../types'

export const useStakingInfo = ({
  fetchClaims = false,
  fetchTotalStakedValue = false,
  fetchWalletStakedValue = false,
}: UseStakingInfoOptions = {}): UseStakingInfoResponse => {
  const { address: walletAddress } = useWallet()
  const { votingModuleAddress } = useVotingModuleAdapterOptions()

  const stakingContractAddress = useRecoilValue(
    CwdVotingCw20StakedSelectors.stakingContractSelector({
      contractAddress: votingModuleAddress,
    })
  )

  const unstakingDuration =
    useRecoilValue(
      Cw20StakeSelectors.getConfigSelector({
        contractAddress: stakingContractAddress,
      })
    ).unstaking_duration ?? undefined

  const setRefreshStakingContractBalancesId = useSetRecoilState(
    refreshWalletBalancesIdAtom(stakingContractAddress)
  )
  const refreshStakingContractBalances = useCallback(
    () => setRefreshStakingContractBalancesId((id) => id + 1),
    [setRefreshStakingContractBalancesId]
  )

  const setRefreshTotalBalancesId = useSetRecoilState(
    refreshWalletBalancesIdAtom(undefined)
  )
  // Refresh totals, mostly for total staked power.
  const refreshTotals = useCallback(
    () => setRefreshTotalBalancesId((id) => id + 1),
    [setRefreshTotalBalancesId]
  )

  /// Optional

  // Claims
  const blockHeightLoadable = useCachedLoadable(
    fetchClaims ? blockHeightSelector : undefined
  )
  const blockHeight =
    blockHeightLoadable.state === 'hasValue' ? blockHeightLoadable.contents : 0

  const _setClaimsId = useSetRecoilState(refreshClaimsIdAtom(walletAddress))
  const refreshClaims = useCallback(
    () => _setClaimsId((id) => id + 1),
    [_setClaimsId]
  )

  const claims = useRecoilValue(
    fetchClaims && walletAddress
      ? Cw20StakeSelectors.claimsSelector({
          contractAddress: stakingContractAddress,
          params: [{ address: walletAddress }],
        })
      : constSelector(undefined)
  )?.claims

  const claimsPending = blockHeight
    ? claims?.filter((c) => !claimAvailable(c, blockHeight))
    : undefined
  const claimsAvailable = blockHeight
    ? claims?.filter((c) => claimAvailable(c, blockHeight))
    : undefined
  const sumClaimsAvailable = claimsAvailable?.reduce(
    (p, c) => p + Number(c.amount),
    0
  )

  // Total staked value
  const totalStakedValue = useRecoilValue(
    fetchTotalStakedValue
      ? Cw20StakeSelectors.totalValueSelector({
          contractAddress: stakingContractAddress,
        })
      : constSelector(undefined)
  )?.total

  // Wallet staked value
  const walletStakedValue = useRecoilValue(
    fetchWalletStakedValue && walletAddress
      ? Cw20StakeSelectors.stakedValueSelector({
          contractAddress: stakingContractAddress,
          params: [{ address: walletAddress }],
        })
      : constSelector(undefined)
  )?.value

  return {
    stakingContractAddress,
    unstakingDuration,
    refreshStakingContractBalances,
    refreshTotals,
    /// Optional
    // Claims
    blockHeight:
      blockHeightLoadable.state === 'hasValue'
        ? blockHeightLoadable.contents
        : 0,
    refreshClaims: fetchClaims ? refreshClaims : undefined,
    claims,
    claimsPending,
    claimsAvailable,
    sumClaimsAvailable,
    // Total staked value
    totalStakedValue: fetchTotalStakedValue
      ? Number(totalStakedValue)
      : undefined,
    // Wallet staked value
    walletStakedValue: fetchWalletStakedValue
      ? Number(walletStakedValue)
      : undefined,
  }
}
