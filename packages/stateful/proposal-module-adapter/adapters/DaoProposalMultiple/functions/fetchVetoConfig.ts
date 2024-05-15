import { DaoProposalMultipleQueryClient } from '@dao-dao/state'
import { Feature, FetchVetoConfig } from '@dao-dao/types'
import {
  getCosmWasmClientForChainId,
  isFeatureSupportedByVersion,
} from '@dao-dao/utils'

export const fetchVetoConfig: FetchVetoConfig = async (
  chainId,
  proposalModuleAddress,
  version
) => {
  if (!version || !isFeatureSupportedByVersion(Feature.Veto, version)) {
    return null
  }

  const client = new DaoProposalMultipleQueryClient(
    await getCosmWasmClientForChainId(chainId),
    proposalModuleAddress
  )

  const config = await client.config()
  return config.veto ?? null
}
