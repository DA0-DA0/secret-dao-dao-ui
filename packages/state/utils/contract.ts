import { fromUtf8, toUtf8 } from '@cosmjs/encoding'

import {
  ContractVersionInfo,
  PreProposeModule,
  PreProposeModuleType,
  PreProposeModuleTypedConfig,
  SecretAnyContractInfo,
} from '@dao-dao/types'
import {
  ContractName,
  INVALID_CONTRACT_ERROR_SUBSTRINGS,
  extractAddressFromMaybeSecretContractInfo,
  getCosmWasmClientForChainId,
  isSecretNetwork,
  parseContractVersion,
} from '@dao-dao/utils'

import {
  DaoPreProposeApprovalSingleQueryClient,
  DaoPreProposeApproverQueryClient,
  NeutronCwdSubdaoPreProposeSingleQueryClient,
  NeutronCwdSubdaoTimelockSingleQueryClient,
} from '../contracts'

export const fetchContractInfo = async (
  chainId: string,
  contractAddress: string
): Promise<ContractVersionInfo | undefined> => {
  try {
    const client = await getCosmWasmClientForChainId(chainId)

    if (isSecretNetwork(chainId)) {
      // Secret Network does not allow accessing raw state directly, so this
      // will only work if the contract has an `info` query, which all our DAO
      // contracts do, but not all DAO contracts do.
      return (
        await client.queryContractSmart(contractAddress, {
          info: {},
        })
      )?.info
    } else {
      const { data: contractInfo } = await client[
        'forceGetQueryClient'
      ]().wasm.queryContractRaw(contractAddress, toUtf8('contract_info'))
      if (contractInfo) {
        return JSON.parse(fromUtf8(contractInfo))
      }
    }
  } catch (err) {
    if (
      err instanceof Error &&
      INVALID_CONTRACT_ERROR_SUBSTRINGS.some((substring) =>
        (err as Error).message.includes(substring)
      )
    ) {
      // Ignore error.
      console.error(err)
      return undefined
    }

    // Rethrow other errors because it should not have failed.
    throw err
  }
}

export const fetchPreProposeModule = async (
  chainId: string,
  preProposeAddress: string
): Promise<PreProposeModule> => {
  const contractInfo = await fetchContractInfo(chainId, preProposeAddress)
  const contractVersion =
    contractInfo && parseContractVersion(contractInfo.version)

  if (!contractInfo || !contractVersion) {
    throw new Error('Failed to fetch pre propose module info')
  }

  let typedConfig: PreProposeModuleTypedConfig = {
    type: PreProposeModuleType.Other,
  }

  switch (contractInfo.contract) {
    case ContractName.PreProposeApprovalSingle: {
      let approver: string | undefined
      let preProposeApproverContract: string | null = null

      const client = new DaoPreProposeApprovalSingleQueryClient(
        await getCosmWasmClientForChainId(chainId),
        preProposeAddress
      )

      approver = (await client.queryExtension({
        msg: {
          approver: {},
        },
      })) as string

      // Check if approver is an approver contract.
      const approverContractInfo = await fetchContractInfo(chainId, approver)
      if (approverContractInfo?.contract === ContractName.PreProposeApprover) {
        preProposeApproverContract = approver

        // Get DAO address from approver contract.
        const client = new DaoPreProposeApproverQueryClient(
          await getCosmWasmClientForChainId(chainId),
          preProposeApproverContract
        )

        approver = extractAddressFromMaybeSecretContractInfo(await client.dao())
      }

      typedConfig = {
        type: PreProposeModuleType.Approval,
        config: {
          approver,
          preProposeApproverContract,
        },
      }
      break
    }
    case ContractName.PreProposeApprover: {
      const client = new DaoPreProposeApproverQueryClient(
        await getCosmWasmClientForChainId(chainId),
        preProposeAddress
      )

      const preProposeApprovalContract =
        extractAddressFromMaybeSecretContractInfo(
          (await client.queryExtension({
            msg: {
              pre_propose_approval_contract: {},
            },
          })) as string | SecretAnyContractInfo
        )

      const approvalClient = new DaoPreProposeApprovalSingleQueryClient(
        await getCosmWasmClientForChainId(chainId),
        preProposeApprovalContract
      )

      const approvalDao = extractAddressFromMaybeSecretContractInfo(
        await approvalClient.dao()
      )

      typedConfig = {
        type: PreProposeModuleType.Approver,
        config: {
          approvalDao,
          preProposeApprovalContract,
        },
      }
      break
    }
    case ContractName.NeutronCwdSubdaoPreProposeSingle: {
      const client = new NeutronCwdSubdaoPreProposeSingleQueryClient(
        await getCosmWasmClientForChainId(chainId),
        preProposeAddress
      )

      const timelockAddress = (await client.queryExtension({
        msg: {
          timelock_address: {},
        },
      })) as string

      const timelockClient = new NeutronCwdSubdaoTimelockSingleQueryClient(
        await getCosmWasmClientForChainId(chainId),
        timelockAddress
      )

      const config = await timelockClient.config()

      typedConfig = {
        type: PreProposeModuleType.NeutronSubdaoSingle,
        config: {
          timelockAddress,
          timelockConfig: config,
        },
      }
      break
    }
    case ContractName.NeutronCwdPreProposeSingleOverrule:
      typedConfig = {
        type: PreProposeModuleType.NeutronOverruleSingle,
      }
      break
  }

  return {
    contractName: contractInfo.contract,
    version: contractVersion,
    address: preProposeAddress,
    ...typedConfig,
  }
}
