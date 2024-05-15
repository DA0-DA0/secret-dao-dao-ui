import {
  DaoProposalSingleV2QueryClient,
  fetchPreProposeModule,
} from '@dao-dao/state'
import { Feature, FetchPreProposeFunction } from '@dao-dao/types'
import {
  getCosmWasmClientForChainId,
  isFeatureSupportedByVersion,
} from '@dao-dao/utils'

export const fetchPrePropose: FetchPreProposeFunction = async (
  chainId,
  proposalModuleAddress,
  version
) => {
  if (!version || !isFeatureSupportedByVersion(Feature.PrePropose, version)) {
    return null
  }

  const client = new DaoProposalSingleV2QueryClient(
    await getCosmWasmClientForChainId(chainId),
    proposalModuleAddress
  )

  const creationPolicy = await client.proposalCreationPolicy()

  const preProposeAddress =
    creationPolicy && 'module' in creationPolicy && creationPolicy.module.addr
      ? creationPolicy.module.addr
      : null

  if (!preProposeAddress) {
    return null
  }

  return await fetchPreProposeModule(chainId, preProposeAddress)
}
