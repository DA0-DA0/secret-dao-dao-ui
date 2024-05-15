import { constSelector } from 'recoil'

import { DaoPreProposeSingleSelectors } from '@dao-dao/state'
import { useCachedLoadable } from '@dao-dao/stateless'
import {
  CheckedDepositInfo,
  LoadingData,
  PreProposeModuleType,
} from '@dao-dao/types'
import { ProposalResponse as ProposalV1Response } from '@dao-dao/types/contracts/CwProposalSingle.v1'
import { DepositInfoResponse as DepositInfoPreProposeResponse } from '@dao-dao/types/contracts/DaoPreProposeSingle'

import { useProposalModuleAdapterOptions } from '../../../react/context'

export const useLoadingDepositInfo = (): LoadingData<
  CheckedDepositInfo | undefined
> => {
  const {
    proposalModule: { prePropose },
    proposalNumber,
    chain: { chain_id: chainId },
  } = useProposalModuleAdapterOptions()

  const selectorValue = useCachedLoadable<
    ProposalV1Response | DepositInfoPreProposeResponse | undefined
  >(
    prePropose &&
      // Approver does not have deposit info.
      prePropose.type !== PreProposeModuleType.Approver
      ? DaoPreProposeSingleSelectors.depositInfoSelector({
          chainId,
          contractAddress: prePropose.address,
          params: [
            {
              proposalId: proposalNumber,
            },
          ],
        })
      : constSelector(undefined)
  )

  if (selectorValue.state !== 'hasValue') {
    return { loading: true }
  }

  // Type-checked below.
  const depositInfoResponse = selectorValue.contents as
    | DepositInfoPreProposeResponse
    | undefined

  const depositInfo = prePropose
    ? depositInfoResponse?.deposit_info ?? undefined
    : undefined

  return {
    loading: false,
    data: depositInfo,
  }
}
