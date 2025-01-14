//@ts-nocheck
import { Params, ParamsAmino, ParamsSDKType } from "./params";
import { TotalBurnedNeutronsAmount, TotalBurnedNeutronsAmountAmino, TotalBurnedNeutronsAmountSDKType } from "./total_burned_neutrons_amount";
import { BinaryReader, BinaryWriter } from "../../binary";
/** GenesisState defines the feeburner module's genesis state. */
export interface GenesisState {
  params: Params | undefined;
  totalBurnedNeutronsAmount: TotalBurnedNeutronsAmount | undefined;
}
export interface GenesisStateProtoMsg {
  typeUrl: "/neutron.feeburner.GenesisState";
  value: Uint8Array;
}
/** GenesisState defines the feeburner module's genesis state. */
export interface GenesisStateAmino {
  params?: ParamsAmino | undefined;
  total_burned_neutrons_amount?: TotalBurnedNeutronsAmountAmino | undefined;
}
export interface GenesisStateAminoMsg {
  type: "/neutron.feeburner.GenesisState";
  value: GenesisStateAmino;
}
/** GenesisState defines the feeburner module's genesis state. */
export interface GenesisStateSDKType {
  params: ParamsSDKType | undefined;
  total_burned_neutrons_amount: TotalBurnedNeutronsAmountSDKType | undefined;
}
function createBaseGenesisState(): GenesisState {
  return {
    params: Params.fromPartial({}),
    totalBurnedNeutronsAmount: TotalBurnedNeutronsAmount.fromPartial({})
  };
}
export const GenesisState = {
  typeUrl: "/neutron.feeburner.GenesisState",
  encode(message: GenesisState, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    if (message.totalBurnedNeutronsAmount !== undefined) {
      TotalBurnedNeutronsAmount.encode(message.totalBurnedNeutronsAmount, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): GenesisState {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenesisState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.params = Params.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 2:
          message.totalBurnedNeutronsAmount = TotalBurnedNeutronsAmount.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<GenesisState>): GenesisState {
    const message = createBaseGenesisState();
    message.params = object.params !== undefined && object.params !== null ? Params.fromPartial(object.params) : undefined;
    message.totalBurnedNeutronsAmount = object.totalBurnedNeutronsAmount !== undefined && object.totalBurnedNeutronsAmount !== null ? TotalBurnedNeutronsAmount.fromPartial(object.totalBurnedNeutronsAmount) : undefined;
    return message;
  },
  fromAmino(object: GenesisStateAmino): GenesisState {
    const message = createBaseGenesisState();
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromAmino(object.params);
    }
    if (object.total_burned_neutrons_amount !== undefined && object.total_burned_neutrons_amount !== null) {
      message.totalBurnedNeutronsAmount = TotalBurnedNeutronsAmount.fromAmino(object.total_burned_neutrons_amount);
    }
    return message;
  },
  toAmino(message: GenesisState, useInterfaces: boolean = false): GenesisStateAmino {
    const obj: any = {};
    obj.params = message.params ? Params.toAmino(message.params, useInterfaces) : undefined;
    obj.total_burned_neutrons_amount = message.totalBurnedNeutronsAmount ? TotalBurnedNeutronsAmount.toAmino(message.totalBurnedNeutronsAmount, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: GenesisStateAminoMsg): GenesisState {
    return GenesisState.fromAmino(object.value);
  },
  fromProtoMsg(message: GenesisStateProtoMsg, useInterfaces: boolean = false): GenesisState {
    return GenesisState.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: GenesisState): Uint8Array {
    return GenesisState.encode(message).finish();
  },
  toProtoMsg(message: GenesisState): GenesisStateProtoMsg {
    return {
      typeUrl: "/neutron.feeburner.GenesisState",
      value: GenesisState.encode(message).finish()
    };
  }
};