import { fromBase64, fromBech32, toBase64 } from '@cosmjs/encoding'
import { useCallback } from 'react'
import { Trans } from 'react-i18next'

import {
  ComputerDiskEmoji,
  DaoSupportedChainPickerInput,
} from '@dao-dao/stateless'
import { makeStargateMessage } from '@dao-dao/types'
import {
  ActionComponent,
  ActionContextType,
  ActionKey,
  ActionMaker,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/types/actions'
import { MsgStoreCode } from '@dao-dao/types/protobuf/codegen/cosmwasm/wasm/v1/tx'
import { AccessType } from '@dao-dao/types/protobuf/codegen/cosmwasm/wasm/v1/types'
import { MsgStoreCode as SecretMsgStoreCode } from '@dao-dao/types/protobuf/codegen/secret/compute/v1beta1/msg'
import {
  decodePolytoneExecuteMsg,
  getChainAddressForActionOptions,
  isDecodedStargateMsg,
  isSecretNetwork,
  maybeMakePolytoneExecuteMessage,
} from '@dao-dao/utils'

import { AddressInput } from '../../../../components'
import { useActionOptions } from '../../../react'
import { UploadCodeComponent, UploadCodeData } from './Component'

const Component: ActionComponent = (props) => {
  const { context } = useActionOptions()

  return (
    <>
      {context.type === ActionContextType.Dao && (
        <DaoSupportedChainPickerInput
          disabled={!props.isCreating}
          fieldName={props.fieldNamePrefix + 'chainId'}
        />
      )}

      <UploadCodeComponent
        {...props}
        options={{
          Trans,
          AddressInput,
        }}
      />
    </>
  )
}

export const makeUploadCodeAction: ActionMaker<UploadCodeData> = (options) => {
  const {
    t,
    address,
    chain: { chain_id: currentChainId },
    context,
  } = options

  const useDefaults: UseDefaults<UploadCodeData> = () => ({
    chainId: currentChainId,
    accessType: AccessType.ACCESS_TYPE_EVERYBODY,
    allowedAddresses: [{ address }],
  })

  const useTransformToCosmos: UseTransformToCosmos<UploadCodeData> = () =>
    useCallback(
      ({ chainId, data, accessType, allowedAddresses }: UploadCodeData) => {
        if (!data) {
          return
        }

        const isSecret = isSecretNetwork(chainId)
        const sender = getChainAddressForActionOptions(options, chainId) || ''

        return maybeMakePolytoneExecuteMessage(
          currentChainId,
          chainId,
          makeStargateMessage({
            stargate: {
              typeUrl: isSecret
                ? SecretMsgStoreCode.typeUrl
                : MsgStoreCode.typeUrl,
              value: {
                sender: isSecret ? fromBech32(sender).data : address,
                wasmByteCode: fromBase64(data),
                instantiatePermission: {
                  permission: accessType,
                  addresses:
                    accessType === AccessType.ACCESS_TYPE_ANY_OF_ADDRESSES
                      ? allowedAddresses.map(({ address }) => address)
                      : [],
                },
              },
            },
          })
        )
      },
      []
    )

  const useDecodedCosmosMsg: UseDecodedCosmosMsg<UploadCodeData> = (
    msg: Record<string, any>
  ) => {
    let chainId = currentChainId
    const decodedPolytone = decodePolytoneExecuteMsg(chainId, msg)
    if (decodedPolytone.match) {
      chainId = decodedPolytone.chainId
      msg = decodedPolytone.msg
    }

    if (
      !isDecodedStargateMsg(msg) ||
      (msg.stargate.typeUrl !== MsgStoreCode.typeUrl &&
        msg.stargate.typeUrl !== SecretMsgStoreCode.typeUrl)
    ) {
      return {
        match: false,
      }
    }

    return {
      match: true,
      data: {
        chainId,
        data: toBase64(msg.stargate.value.wasmByteCode),
        accessType:
          msg.stargate.value.instantiatePermission?.permission ??
          AccessType.UNRECOGNIZED,
        allowedAddresses:
          msg.stargate.value.instantiatePermission?.addresses?.map(
            (address: string) => ({ address })
          ) ?? [],
      },
    }
  }

  return {
    key: ActionKey.UploadCode,
    Icon: ComputerDiskEmoji,
    label: t('title.uploadSmartContractCode'),
    description: t('info.uploadSmartContractCodeActionDescription'),
    Component,
    useDefaults,
    useTransformToCosmos,
    useDecodedCosmosMsg,
    // DAO proposal modules limit the sizes of proposals such that uploading
    // almost any wasm file is impossible. Until we figure out a workaround,
    // hide it from being selected in a DAO. Wallets and chain governance
    // proposals can still use this.
    hideFromPicker: context.type === ActionContextType.Dao,
  }
}
