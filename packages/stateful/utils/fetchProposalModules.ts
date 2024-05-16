import { DaoCoreV2QueryClient } from '@dao-dao/state/contracts'
import {
  ChainId,
  ContractVersion,
  Feature,
  ProposalModule,
  ProposalModuleType,
} from '@dao-dao/types'
import { InfoResponse } from '@dao-dao/types/contracts/common'
import { ProposalModuleWithInfo } from '@dao-dao/types/contracts/DaoCore.v2'
import {
  DaoProposalMultipleAdapterId,
  DaoProposalSingleAdapterId,
  NEUTRON_GOVERNANCE_DAO,
  getCosmWasmClientForChainId,
  indexToProposalModulePrefix,
  isFeatureSupportedByVersion,
  parseContractVersion,
} from '@dao-dao/utils'

import { matchAdapter } from '../proposal-module-adapter'

export const fetchProposalModules = async (
  chainId: string,
  coreAddress: string,
  coreVersion: ContractVersion,
  // If already fetched (from indexer), use that.
  activeProposalModules?: ProposalModuleWithInfo[]
): Promise<ProposalModule[]> => {
  if (!activeProposalModules) {
    activeProposalModules = await fetchProposalModulesWithInfoFromChain(
      chainId,
      coreAddress,
      coreVersion
    )
  }

  const proposalModules: ProposalModule[] = await Promise.all(
    activeProposalModules.map(async ({ info, address, prefix }, index) => {
      const version = (info && parseContractVersion(info.version)) ?? null

      // Get adapter for this contract.
      const adapter = info && matchAdapter(info.contract)

      // Get proposal module type from adapter.
      const type: ProposalModuleType =
        adapter?.id === DaoProposalSingleAdapterId
          ? ProposalModuleType.Single
          : adapter?.id === DaoProposalMultipleAdapterId
          ? ProposalModuleType.Multiple
          : ProposalModuleType.Other

      const [prePropose, veto] = await Promise.allSettled([
        // Get pre-propose address if exists.
        adapter?.functions.fetchPrePropose?.(chainId, address, version),
        // Get veto config if exists.
        adapter?.functions.fetchVetoConfig?.(chainId, address, version),
      ])

      return {
        address,
        prefix:
          // Follow Neutron's naming convention. Shift prefix alphabet starting
          // point from A to N.
          chainId === ChainId.NeutronMainnet &&
          coreAddress === NEUTRON_GOVERNANCE_DAO
            ? String.fromCharCode(
                prefix.charCodeAt(0) + ('N'.charCodeAt(0) - 'A'.charCodeAt(0))
              )
            : isFeatureSupportedByVersion(
                Feature.StaticProposalModulePrefixes,
                coreVersion
              )
            ? prefix
            : indexToProposalModulePrefix(index),
        contractName: info?.contract || '',
        version,
        prePropose:
          (prePropose.status === 'fulfilled' && prePropose.value) || null,
        ...(type !== ProposalModuleType.Other
          ? {
              type,
              config: {
                veto: (veto.status === 'fulfilled' && veto.value) || null,
              },
            }
          : {
              type,
            }),
      }
    })
  )

  return proposalModules
}

const LIMIT = 10
export const fetchProposalModulesWithInfoFromChain = async (
  chainId: string,
  coreAddress: string,
  _coreVersion: ContractVersion
): Promise<ProposalModuleWithInfo[]> => {
  const cwClient = await getCosmWasmClientForChainId(chainId)

  let paginationStart: string | undefined

  const proposalModules: ProposalModuleWithInfo[] = []

  const getV2ProposalModules = async () =>
    (
      await new DaoCoreV2QueryClient(
        cwClient,
        coreAddress
      ).activeProposalModules({
        startAfter: paginationStart,
        limit: LIMIT,
      })
    ).map(async (data) => {
      // All InfoResponses are the same, so just use core's.
      const { info }: InfoResponse = await cwClient.queryContractSmart(
        data.address,
        {
          info: {},
        }
      )

      return {
        ...data,
        info,
      }
    })

  while (true) {
    const _proposalModules = await Promise.all(await getV2ProposalModules())
    if (!_proposalModules.length) {
      break
    }

    paginationStart = _proposalModules[_proposalModules.length - 1].address
    proposalModules.push(..._proposalModules)

    if (_proposalModules.length < LIMIT) {
      break
    }
  }

  return proposalModules
}
