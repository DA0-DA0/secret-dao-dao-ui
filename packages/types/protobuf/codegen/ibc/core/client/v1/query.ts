//@ts-nocheck
import { PageRequest, PageRequestAmino, PageRequestSDKType, PageResponse, PageResponseAmino, PageResponseSDKType } from "../../../../cosmos/base/query/v1beta1/pagination";
import { Any, AnyAmino, AnySDKType } from "../../../../google/protobuf/any";
import { Height, HeightAmino, HeightSDKType, IdentifiedClientState, IdentifiedClientStateAmino, IdentifiedClientStateSDKType, ConsensusStateWithHeight, ConsensusStateWithHeightAmino, ConsensusStateWithHeightSDKType, Params, ParamsAmino, ParamsSDKType } from "./client";
import { BinaryReader, BinaryWriter } from "../../../../binary";
import { bytesFromBase64, base64FromBytes } from "../../../../helpers";
/**
 * QueryClientStateRequest is the request type for the Query/ClientState RPC
 * method
 */
export interface QueryClientStateRequest {
  /** client state unique identifier */
  clientId: string;
}
export interface QueryClientStateRequestProtoMsg {
  typeUrl: "/ibc.core.client.v1.QueryClientStateRequest";
  value: Uint8Array;
}
/**
 * QueryClientStateRequest is the request type for the Query/ClientState RPC
 * method
 */
export interface QueryClientStateRequestAmino {
  /** client state unique identifier */
  client_id?: string;
}
export interface QueryClientStateRequestAminoMsg {
  type: "cosmos-sdk/QueryClientStateRequest";
  value: QueryClientStateRequestAmino;
}
/**
 * QueryClientStateRequest is the request type for the Query/ClientState RPC
 * method
 */
export interface QueryClientStateRequestSDKType {
  client_id: string;
}
/**
 * QueryClientStateResponse is the response type for the Query/ClientState RPC
 * method. Besides the client state, it includes a proof and the height from
 * which the proof was retrieved.
 */
export interface QueryClientStateResponse {
  /** client state associated with the request identifier */
  clientState?: Any | undefined;
  /** merkle proof of existence */
  proof: Uint8Array;
  /** height at which the proof was retrieved */
  proofHeight: Height | undefined;
}
export interface QueryClientStateResponseProtoMsg {
  typeUrl: "/ibc.core.client.v1.QueryClientStateResponse";
  value: Uint8Array;
}
/**
 * QueryClientStateResponse is the response type for the Query/ClientState RPC
 * method. Besides the client state, it includes a proof and the height from
 * which the proof was retrieved.
 */
export interface QueryClientStateResponseAmino {
  /** client state associated with the request identifier */
  client_state?: AnyAmino | undefined;
  /** merkle proof of existence */
  proof?: string;
  /** height at which the proof was retrieved */
  proof_height?: HeightAmino | undefined;
}
export interface QueryClientStateResponseAminoMsg {
  type: "cosmos-sdk/QueryClientStateResponse";
  value: QueryClientStateResponseAmino;
}
/**
 * QueryClientStateResponse is the response type for the Query/ClientState RPC
 * method. Besides the client state, it includes a proof and the height from
 * which the proof was retrieved.
 */
export interface QueryClientStateResponseSDKType {
  client_state?: AnySDKType | undefined;
  proof: Uint8Array;
  proof_height: HeightSDKType | undefined;
}
/**
 * QueryClientStatesRequest is the request type for the Query/ClientStates RPC
 * method
 */
export interface QueryClientStatesRequest {
  /** pagination request */
  pagination?: PageRequest | undefined;
}
export interface QueryClientStatesRequestProtoMsg {
  typeUrl: "/ibc.core.client.v1.QueryClientStatesRequest";
  value: Uint8Array;
}
/**
 * QueryClientStatesRequest is the request type for the Query/ClientStates RPC
 * method
 */
export interface QueryClientStatesRequestAmino {
  /** pagination request */
  pagination?: PageRequestAmino | undefined;
}
export interface QueryClientStatesRequestAminoMsg {
  type: "cosmos-sdk/QueryClientStatesRequest";
  value: QueryClientStatesRequestAmino;
}
/**
 * QueryClientStatesRequest is the request type for the Query/ClientStates RPC
 * method
 */
export interface QueryClientStatesRequestSDKType {
  pagination?: PageRequestSDKType | undefined;
}
/**
 * QueryClientStatesResponse is the response type for the Query/ClientStates RPC
 * method.
 */
export interface QueryClientStatesResponse {
  /** list of stored ClientStates of the chain. */
  clientStates: IdentifiedClientState[];
  /** pagination response */
  pagination?: PageResponse | undefined;
}
export interface QueryClientStatesResponseProtoMsg {
  typeUrl: "/ibc.core.client.v1.QueryClientStatesResponse";
  value: Uint8Array;
}
/**
 * QueryClientStatesResponse is the response type for the Query/ClientStates RPC
 * method.
 */
export interface QueryClientStatesResponseAmino {
  /** list of stored ClientStates of the chain. */
  client_states?: IdentifiedClientStateAmino[];
  /** pagination response */
  pagination?: PageResponseAmino | undefined;
}
export interface QueryClientStatesResponseAminoMsg {
  type: "cosmos-sdk/QueryClientStatesResponse";
  value: QueryClientStatesResponseAmino;
}
/**
 * QueryClientStatesResponse is the response type for the Query/ClientStates RPC
 * method.
 */
export interface QueryClientStatesResponseSDKType {
  client_states: IdentifiedClientStateSDKType[];
  pagination?: PageResponseSDKType | undefined;
}
/**
 * QueryConsensusStateRequest is the request type for the Query/ConsensusState
 * RPC method. Besides the consensus state, it includes a proof and the height
 * from which the proof was retrieved.
 */
export interface QueryConsensusStateRequest {
  /** client identifier */
  clientId: string;
  /** consensus state revision number */
  revisionNumber: bigint;
  /** consensus state revision height */
  revisionHeight: bigint;
  /**
   * latest_height overrrides the height field and queries the latest stored
   * ConsensusState
   */
  latestHeight: boolean;
}
export interface QueryConsensusStateRequestProtoMsg {
  typeUrl: "/ibc.core.client.v1.QueryConsensusStateRequest";
  value: Uint8Array;
}
/**
 * QueryConsensusStateRequest is the request type for the Query/ConsensusState
 * RPC method. Besides the consensus state, it includes a proof and the height
 * from which the proof was retrieved.
 */
export interface QueryConsensusStateRequestAmino {
  /** client identifier */
  client_id?: string;
  /** consensus state revision number */
  revision_number?: string;
  /** consensus state revision height */
  revision_height?: string;
  /**
   * latest_height overrrides the height field and queries the latest stored
   * ConsensusState
   */
  latest_height?: boolean;
}
export interface QueryConsensusStateRequestAminoMsg {
  type: "cosmos-sdk/QueryConsensusStateRequest";
  value: QueryConsensusStateRequestAmino;
}
/**
 * QueryConsensusStateRequest is the request type for the Query/ConsensusState
 * RPC method. Besides the consensus state, it includes a proof and the height
 * from which the proof was retrieved.
 */
export interface QueryConsensusStateRequestSDKType {
  client_id: string;
  revision_number: bigint;
  revision_height: bigint;
  latest_height: boolean;
}
/**
 * QueryConsensusStateResponse is the response type for the Query/ConsensusState
 * RPC method
 */
export interface QueryConsensusStateResponse {
  /** consensus state associated with the client identifier at the given height */
  consensusState?: Any | undefined;
  /** merkle proof of existence */
  proof: Uint8Array;
  /** height at which the proof was retrieved */
  proofHeight: Height | undefined;
}
export interface QueryConsensusStateResponseProtoMsg {
  typeUrl: "/ibc.core.client.v1.QueryConsensusStateResponse";
  value: Uint8Array;
}
/**
 * QueryConsensusStateResponse is the response type for the Query/ConsensusState
 * RPC method
 */
export interface QueryConsensusStateResponseAmino {
  /** consensus state associated with the client identifier at the given height */
  consensus_state?: AnyAmino | undefined;
  /** merkle proof of existence */
  proof?: string;
  /** height at which the proof was retrieved */
  proof_height?: HeightAmino | undefined;
}
export interface QueryConsensusStateResponseAminoMsg {
  type: "cosmos-sdk/QueryConsensusStateResponse";
  value: QueryConsensusStateResponseAmino;
}
/**
 * QueryConsensusStateResponse is the response type for the Query/ConsensusState
 * RPC method
 */
export interface QueryConsensusStateResponseSDKType {
  consensus_state?: AnySDKType | undefined;
  proof: Uint8Array;
  proof_height: HeightSDKType | undefined;
}
/**
 * QueryConsensusStatesRequest is the request type for the Query/ConsensusStates
 * RPC method.
 */
export interface QueryConsensusStatesRequest {
  /** client identifier */
  clientId: string;
  /** pagination request */
  pagination?: PageRequest | undefined;
}
export interface QueryConsensusStatesRequestProtoMsg {
  typeUrl: "/ibc.core.client.v1.QueryConsensusStatesRequest";
  value: Uint8Array;
}
/**
 * QueryConsensusStatesRequest is the request type for the Query/ConsensusStates
 * RPC method.
 */
export interface QueryConsensusStatesRequestAmino {
  /** client identifier */
  client_id?: string;
  /** pagination request */
  pagination?: PageRequestAmino | undefined;
}
export interface QueryConsensusStatesRequestAminoMsg {
  type: "cosmos-sdk/QueryConsensusStatesRequest";
  value: QueryConsensusStatesRequestAmino;
}
/**
 * QueryConsensusStatesRequest is the request type for the Query/ConsensusStates
 * RPC method.
 */
export interface QueryConsensusStatesRequestSDKType {
  client_id: string;
  pagination?: PageRequestSDKType | undefined;
}
/**
 * QueryConsensusStatesResponse is the response type for the
 * Query/ConsensusStates RPC method
 */
export interface QueryConsensusStatesResponse {
  /** consensus states associated with the identifier */
  consensusStates: ConsensusStateWithHeight[];
  /** pagination response */
  pagination?: PageResponse | undefined;
}
export interface QueryConsensusStatesResponseProtoMsg {
  typeUrl: "/ibc.core.client.v1.QueryConsensusStatesResponse";
  value: Uint8Array;
}
/**
 * QueryConsensusStatesResponse is the response type for the
 * Query/ConsensusStates RPC method
 */
export interface QueryConsensusStatesResponseAmino {
  /** consensus states associated with the identifier */
  consensus_states?: ConsensusStateWithHeightAmino[];
  /** pagination response */
  pagination?: PageResponseAmino | undefined;
}
export interface QueryConsensusStatesResponseAminoMsg {
  type: "cosmos-sdk/QueryConsensusStatesResponse";
  value: QueryConsensusStatesResponseAmino;
}
/**
 * QueryConsensusStatesResponse is the response type for the
 * Query/ConsensusStates RPC method
 */
export interface QueryConsensusStatesResponseSDKType {
  consensus_states: ConsensusStateWithHeightSDKType[];
  pagination?: PageResponseSDKType | undefined;
}
/**
 * QueryConsensusStateHeightsRequest is the request type for Query/ConsensusStateHeights
 * RPC method.
 */
export interface QueryConsensusStateHeightsRequest {
  /** client identifier */
  clientId: string;
  /** pagination request */
  pagination?: PageRequest | undefined;
}
export interface QueryConsensusStateHeightsRequestProtoMsg {
  typeUrl: "/ibc.core.client.v1.QueryConsensusStateHeightsRequest";
  value: Uint8Array;
}
/**
 * QueryConsensusStateHeightsRequest is the request type for Query/ConsensusStateHeights
 * RPC method.
 */
export interface QueryConsensusStateHeightsRequestAmino {
  /** client identifier */
  client_id?: string;
  /** pagination request */
  pagination?: PageRequestAmino | undefined;
}
export interface QueryConsensusStateHeightsRequestAminoMsg {
  type: "cosmos-sdk/QueryConsensusStateHeightsRequest";
  value: QueryConsensusStateHeightsRequestAmino;
}
/**
 * QueryConsensusStateHeightsRequest is the request type for Query/ConsensusStateHeights
 * RPC method.
 */
export interface QueryConsensusStateHeightsRequestSDKType {
  client_id: string;
  pagination?: PageRequestSDKType | undefined;
}
/**
 * QueryConsensusStateHeightsResponse is the response type for the
 * Query/ConsensusStateHeights RPC method
 */
export interface QueryConsensusStateHeightsResponse {
  /** consensus state heights */
  consensusStateHeights: Height[];
  /** pagination response */
  pagination?: PageResponse | undefined;
}
export interface QueryConsensusStateHeightsResponseProtoMsg {
  typeUrl: "/ibc.core.client.v1.QueryConsensusStateHeightsResponse";
  value: Uint8Array;
}
/**
 * QueryConsensusStateHeightsResponse is the response type for the
 * Query/ConsensusStateHeights RPC method
 */
export interface QueryConsensusStateHeightsResponseAmino {
  /** consensus state heights */
  consensus_state_heights?: HeightAmino[];
  /** pagination response */
  pagination?: PageResponseAmino | undefined;
}
export interface QueryConsensusStateHeightsResponseAminoMsg {
  type: "cosmos-sdk/QueryConsensusStateHeightsResponse";
  value: QueryConsensusStateHeightsResponseAmino;
}
/**
 * QueryConsensusStateHeightsResponse is the response type for the
 * Query/ConsensusStateHeights RPC method
 */
export interface QueryConsensusStateHeightsResponseSDKType {
  consensus_state_heights: HeightSDKType[];
  pagination?: PageResponseSDKType | undefined;
}
/**
 * QueryClientStatusRequest is the request type for the Query/ClientStatus RPC
 * method
 */
export interface QueryClientStatusRequest {
  /** client unique identifier */
  clientId: string;
}
export interface QueryClientStatusRequestProtoMsg {
  typeUrl: "/ibc.core.client.v1.QueryClientStatusRequest";
  value: Uint8Array;
}
/**
 * QueryClientStatusRequest is the request type for the Query/ClientStatus RPC
 * method
 */
export interface QueryClientStatusRequestAmino {
  /** client unique identifier */
  client_id?: string;
}
export interface QueryClientStatusRequestAminoMsg {
  type: "cosmos-sdk/QueryClientStatusRequest";
  value: QueryClientStatusRequestAmino;
}
/**
 * QueryClientStatusRequest is the request type for the Query/ClientStatus RPC
 * method
 */
export interface QueryClientStatusRequestSDKType {
  client_id: string;
}
/**
 * QueryClientStatusResponse is the response type for the Query/ClientStatus RPC
 * method. It returns the current status of the IBC client.
 */
export interface QueryClientStatusResponse {
  status: string;
}
export interface QueryClientStatusResponseProtoMsg {
  typeUrl: "/ibc.core.client.v1.QueryClientStatusResponse";
  value: Uint8Array;
}
/**
 * QueryClientStatusResponse is the response type for the Query/ClientStatus RPC
 * method. It returns the current status of the IBC client.
 */
export interface QueryClientStatusResponseAmino {
  status?: string;
}
export interface QueryClientStatusResponseAminoMsg {
  type: "cosmos-sdk/QueryClientStatusResponse";
  value: QueryClientStatusResponseAmino;
}
/**
 * QueryClientStatusResponse is the response type for the Query/ClientStatus RPC
 * method. It returns the current status of the IBC client.
 */
export interface QueryClientStatusResponseSDKType {
  status: string;
}
/**
 * QueryClientParamsRequest is the request type for the Query/ClientParams RPC
 * method.
 */
export interface QueryClientParamsRequest {}
export interface QueryClientParamsRequestProtoMsg {
  typeUrl: "/ibc.core.client.v1.QueryClientParamsRequest";
  value: Uint8Array;
}
/**
 * QueryClientParamsRequest is the request type for the Query/ClientParams RPC
 * method.
 */
export interface QueryClientParamsRequestAmino {}
export interface QueryClientParamsRequestAminoMsg {
  type: "cosmos-sdk/QueryClientParamsRequest";
  value: QueryClientParamsRequestAmino;
}
/**
 * QueryClientParamsRequest is the request type for the Query/ClientParams RPC
 * method.
 */
export interface QueryClientParamsRequestSDKType {}
/**
 * QueryClientParamsResponse is the response type for the Query/ClientParams RPC
 * method.
 */
export interface QueryClientParamsResponse {
  /** params defines the parameters of the module. */
  params?: Params | undefined;
}
export interface QueryClientParamsResponseProtoMsg {
  typeUrl: "/ibc.core.client.v1.QueryClientParamsResponse";
  value: Uint8Array;
}
/**
 * QueryClientParamsResponse is the response type for the Query/ClientParams RPC
 * method.
 */
export interface QueryClientParamsResponseAmino {
  /** params defines the parameters of the module. */
  params?: ParamsAmino | undefined;
}
export interface QueryClientParamsResponseAminoMsg {
  type: "cosmos-sdk/QueryClientParamsResponse";
  value: QueryClientParamsResponseAmino;
}
/**
 * QueryClientParamsResponse is the response type for the Query/ClientParams RPC
 * method.
 */
export interface QueryClientParamsResponseSDKType {
  params?: ParamsSDKType | undefined;
}
/**
 * QueryUpgradedClientStateRequest is the request type for the
 * Query/UpgradedClientState RPC method
 */
export interface QueryUpgradedClientStateRequest {}
export interface QueryUpgradedClientStateRequestProtoMsg {
  typeUrl: "/ibc.core.client.v1.QueryUpgradedClientStateRequest";
  value: Uint8Array;
}
/**
 * QueryUpgradedClientStateRequest is the request type for the
 * Query/UpgradedClientState RPC method
 */
export interface QueryUpgradedClientStateRequestAmino {}
export interface QueryUpgradedClientStateRequestAminoMsg {
  type: "cosmos-sdk/QueryUpgradedClientStateRequest";
  value: QueryUpgradedClientStateRequestAmino;
}
/**
 * QueryUpgradedClientStateRequest is the request type for the
 * Query/UpgradedClientState RPC method
 */
export interface QueryUpgradedClientStateRequestSDKType {}
/**
 * QueryUpgradedClientStateResponse is the response type for the
 * Query/UpgradedClientState RPC method.
 */
export interface QueryUpgradedClientStateResponse {
  /** client state associated with the request identifier */
  upgradedClientState?: Any | undefined;
}
export interface QueryUpgradedClientStateResponseProtoMsg {
  typeUrl: "/ibc.core.client.v1.QueryUpgradedClientStateResponse";
  value: Uint8Array;
}
/**
 * QueryUpgradedClientStateResponse is the response type for the
 * Query/UpgradedClientState RPC method.
 */
export interface QueryUpgradedClientStateResponseAmino {
  /** client state associated with the request identifier */
  upgraded_client_state?: AnyAmino | undefined;
}
export interface QueryUpgradedClientStateResponseAminoMsg {
  type: "cosmos-sdk/QueryUpgradedClientStateResponse";
  value: QueryUpgradedClientStateResponseAmino;
}
/**
 * QueryUpgradedClientStateResponse is the response type for the
 * Query/UpgradedClientState RPC method.
 */
export interface QueryUpgradedClientStateResponseSDKType {
  upgraded_client_state?: AnySDKType | undefined;
}
/**
 * QueryUpgradedConsensusStateRequest is the request type for the
 * Query/UpgradedConsensusState RPC method
 */
export interface QueryUpgradedConsensusStateRequest {}
export interface QueryUpgradedConsensusStateRequestProtoMsg {
  typeUrl: "/ibc.core.client.v1.QueryUpgradedConsensusStateRequest";
  value: Uint8Array;
}
/**
 * QueryUpgradedConsensusStateRequest is the request type for the
 * Query/UpgradedConsensusState RPC method
 */
export interface QueryUpgradedConsensusStateRequestAmino {}
export interface QueryUpgradedConsensusStateRequestAminoMsg {
  type: "cosmos-sdk/QueryUpgradedConsensusStateRequest";
  value: QueryUpgradedConsensusStateRequestAmino;
}
/**
 * QueryUpgradedConsensusStateRequest is the request type for the
 * Query/UpgradedConsensusState RPC method
 */
export interface QueryUpgradedConsensusStateRequestSDKType {}
/**
 * QueryUpgradedConsensusStateResponse is the response type for the
 * Query/UpgradedConsensusState RPC method.
 */
export interface QueryUpgradedConsensusStateResponse {
  /** Consensus state associated with the request identifier */
  upgradedConsensusState?: Any | undefined;
}
export interface QueryUpgradedConsensusStateResponseProtoMsg {
  typeUrl: "/ibc.core.client.v1.QueryUpgradedConsensusStateResponse";
  value: Uint8Array;
}
/**
 * QueryUpgradedConsensusStateResponse is the response type for the
 * Query/UpgradedConsensusState RPC method.
 */
export interface QueryUpgradedConsensusStateResponseAmino {
  /** Consensus state associated with the request identifier */
  upgraded_consensus_state?: AnyAmino | undefined;
}
export interface QueryUpgradedConsensusStateResponseAminoMsg {
  type: "cosmos-sdk/QueryUpgradedConsensusStateResponse";
  value: QueryUpgradedConsensusStateResponseAmino;
}
/**
 * QueryUpgradedConsensusStateResponse is the response type for the
 * Query/UpgradedConsensusState RPC method.
 */
export interface QueryUpgradedConsensusStateResponseSDKType {
  upgraded_consensus_state?: AnySDKType | undefined;
}
function createBaseQueryClientStateRequest(): QueryClientStateRequest {
  return {
    clientId: ""
  };
}
export const QueryClientStateRequest = {
  typeUrl: "/ibc.core.client.v1.QueryClientStateRequest",
  encode(message: QueryClientStateRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.clientId !== "") {
      writer.uint32(10).string(message.clientId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryClientStateRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryClientStateRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.clientId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryClientStateRequest>): QueryClientStateRequest {
    const message = createBaseQueryClientStateRequest();
    message.clientId = object.clientId ?? "";
    return message;
  },
  fromAmino(object: QueryClientStateRequestAmino): QueryClientStateRequest {
    const message = createBaseQueryClientStateRequest();
    if (object.client_id !== undefined && object.client_id !== null) {
      message.clientId = object.client_id;
    }
    return message;
  },
  toAmino(message: QueryClientStateRequest, useInterfaces: boolean = false): QueryClientStateRequestAmino {
    const obj: any = {};
    obj.client_id = message.clientId;
    return obj;
  },
  fromAminoMsg(object: QueryClientStateRequestAminoMsg): QueryClientStateRequest {
    return QueryClientStateRequest.fromAmino(object.value);
  },
  toAminoMsg(message: QueryClientStateRequest, useInterfaces: boolean = false): QueryClientStateRequestAminoMsg {
    return {
      type: "cosmos-sdk/QueryClientStateRequest",
      value: QueryClientStateRequest.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: QueryClientStateRequestProtoMsg, useInterfaces: boolean = false): QueryClientStateRequest {
    return QueryClientStateRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryClientStateRequest): Uint8Array {
    return QueryClientStateRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryClientStateRequest): QueryClientStateRequestProtoMsg {
    return {
      typeUrl: "/ibc.core.client.v1.QueryClientStateRequest",
      value: QueryClientStateRequest.encode(message).finish()
    };
  }
};
function createBaseQueryClientStateResponse(): QueryClientStateResponse {
  return {
    clientState: undefined,
    proof: new Uint8Array(),
    proofHeight: Height.fromPartial({})
  };
}
export const QueryClientStateResponse = {
  typeUrl: "/ibc.core.client.v1.QueryClientStateResponse",
  encode(message: QueryClientStateResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.clientState !== undefined) {
      Any.encode(message.clientState, writer.uint32(10).fork()).ldelim();
    }
    if (message.proof.length !== 0) {
      writer.uint32(18).bytes(message.proof);
    }
    if (message.proofHeight !== undefined) {
      Height.encode(message.proofHeight, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryClientStateResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryClientStateResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.clientState = Any.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 2:
          message.proof = reader.bytes();
          break;
        case 3:
          message.proofHeight = Height.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryClientStateResponse>): QueryClientStateResponse {
    const message = createBaseQueryClientStateResponse();
    message.clientState = object.clientState !== undefined && object.clientState !== null ? Any.fromPartial(object.clientState) : undefined;
    message.proof = object.proof ?? new Uint8Array();
    message.proofHeight = object.proofHeight !== undefined && object.proofHeight !== null ? Height.fromPartial(object.proofHeight) : undefined;
    return message;
  },
  fromAmino(object: QueryClientStateResponseAmino): QueryClientStateResponse {
    const message = createBaseQueryClientStateResponse();
    if (object.client_state !== undefined && object.client_state !== null) {
      message.clientState = Any.fromAmino(object.client_state);
    }
    if (object.proof !== undefined && object.proof !== null) {
      message.proof = bytesFromBase64(object.proof);
    }
    if (object.proof_height !== undefined && object.proof_height !== null) {
      message.proofHeight = Height.fromAmino(object.proof_height);
    }
    return message;
  },
  toAmino(message: QueryClientStateResponse, useInterfaces: boolean = false): QueryClientStateResponseAmino {
    const obj: any = {};
    obj.client_state = message.clientState ? Any.toAmino(message.clientState, useInterfaces) : undefined;
    obj.proof = message.proof ? base64FromBytes(message.proof) : undefined;
    obj.proof_height = message.proofHeight ? Height.toAmino(message.proofHeight, useInterfaces) : {};
    return obj;
  },
  fromAminoMsg(object: QueryClientStateResponseAminoMsg): QueryClientStateResponse {
    return QueryClientStateResponse.fromAmino(object.value);
  },
  toAminoMsg(message: QueryClientStateResponse, useInterfaces: boolean = false): QueryClientStateResponseAminoMsg {
    return {
      type: "cosmos-sdk/QueryClientStateResponse",
      value: QueryClientStateResponse.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: QueryClientStateResponseProtoMsg, useInterfaces: boolean = false): QueryClientStateResponse {
    return QueryClientStateResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryClientStateResponse): Uint8Array {
    return QueryClientStateResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryClientStateResponse): QueryClientStateResponseProtoMsg {
    return {
      typeUrl: "/ibc.core.client.v1.QueryClientStateResponse",
      value: QueryClientStateResponse.encode(message).finish()
    };
  }
};
function createBaseQueryClientStatesRequest(): QueryClientStatesRequest {
  return {
    pagination: undefined
  };
}
export const QueryClientStatesRequest = {
  typeUrl: "/ibc.core.client.v1.QueryClientStatesRequest",
  encode(message: QueryClientStatesRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryClientStatesRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryClientStatesRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryClientStatesRequest>): QueryClientStatesRequest {
    const message = createBaseQueryClientStatesRequest();
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryClientStatesRequestAmino): QueryClientStatesRequest {
    const message = createBaseQueryClientStatesRequest();
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryClientStatesRequest, useInterfaces: boolean = false): QueryClientStatesRequestAmino {
    const obj: any = {};
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryClientStatesRequestAminoMsg): QueryClientStatesRequest {
    return QueryClientStatesRequest.fromAmino(object.value);
  },
  toAminoMsg(message: QueryClientStatesRequest, useInterfaces: boolean = false): QueryClientStatesRequestAminoMsg {
    return {
      type: "cosmos-sdk/QueryClientStatesRequest",
      value: QueryClientStatesRequest.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: QueryClientStatesRequestProtoMsg, useInterfaces: boolean = false): QueryClientStatesRequest {
    return QueryClientStatesRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryClientStatesRequest): Uint8Array {
    return QueryClientStatesRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryClientStatesRequest): QueryClientStatesRequestProtoMsg {
    return {
      typeUrl: "/ibc.core.client.v1.QueryClientStatesRequest",
      value: QueryClientStatesRequest.encode(message).finish()
    };
  }
};
function createBaseQueryClientStatesResponse(): QueryClientStatesResponse {
  return {
    clientStates: [],
    pagination: undefined
  };
}
export const QueryClientStatesResponse = {
  typeUrl: "/ibc.core.client.v1.QueryClientStatesResponse",
  encode(message: QueryClientStatesResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.clientStates) {
      IdentifiedClientState.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryClientStatesResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryClientStatesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.clientStates.push(IdentifiedClientState.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryClientStatesResponse>): QueryClientStatesResponse {
    const message = createBaseQueryClientStatesResponse();
    message.clientStates = object.clientStates?.map(e => IdentifiedClientState.fromPartial(e)) || [];
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryClientStatesResponseAmino): QueryClientStatesResponse {
    const message = createBaseQueryClientStatesResponse();
    message.clientStates = object.client_states?.map(e => IdentifiedClientState.fromAmino(e)) || [];
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryClientStatesResponse, useInterfaces: boolean = false): QueryClientStatesResponseAmino {
    const obj: any = {};
    if (message.clientStates) {
      obj.client_states = message.clientStates.map(e => e ? IdentifiedClientState.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.client_states = [];
    }
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryClientStatesResponseAminoMsg): QueryClientStatesResponse {
    return QueryClientStatesResponse.fromAmino(object.value);
  },
  toAminoMsg(message: QueryClientStatesResponse, useInterfaces: boolean = false): QueryClientStatesResponseAminoMsg {
    return {
      type: "cosmos-sdk/QueryClientStatesResponse",
      value: QueryClientStatesResponse.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: QueryClientStatesResponseProtoMsg, useInterfaces: boolean = false): QueryClientStatesResponse {
    return QueryClientStatesResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryClientStatesResponse): Uint8Array {
    return QueryClientStatesResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryClientStatesResponse): QueryClientStatesResponseProtoMsg {
    return {
      typeUrl: "/ibc.core.client.v1.QueryClientStatesResponse",
      value: QueryClientStatesResponse.encode(message).finish()
    };
  }
};
function createBaseQueryConsensusStateRequest(): QueryConsensusStateRequest {
  return {
    clientId: "",
    revisionNumber: BigInt(0),
    revisionHeight: BigInt(0),
    latestHeight: false
  };
}
export const QueryConsensusStateRequest = {
  typeUrl: "/ibc.core.client.v1.QueryConsensusStateRequest",
  encode(message: QueryConsensusStateRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.clientId !== "") {
      writer.uint32(10).string(message.clientId);
    }
    if (message.revisionNumber !== BigInt(0)) {
      writer.uint32(16).uint64(message.revisionNumber);
    }
    if (message.revisionHeight !== BigInt(0)) {
      writer.uint32(24).uint64(message.revisionHeight);
    }
    if (message.latestHeight === true) {
      writer.uint32(32).bool(message.latestHeight);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryConsensusStateRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryConsensusStateRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.clientId = reader.string();
          break;
        case 2:
          message.revisionNumber = reader.uint64();
          break;
        case 3:
          message.revisionHeight = reader.uint64();
          break;
        case 4:
          message.latestHeight = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryConsensusStateRequest>): QueryConsensusStateRequest {
    const message = createBaseQueryConsensusStateRequest();
    message.clientId = object.clientId ?? "";
    message.revisionNumber = object.revisionNumber !== undefined && object.revisionNumber !== null ? BigInt(object.revisionNumber.toString()) : BigInt(0);
    message.revisionHeight = object.revisionHeight !== undefined && object.revisionHeight !== null ? BigInt(object.revisionHeight.toString()) : BigInt(0);
    message.latestHeight = object.latestHeight ?? false;
    return message;
  },
  fromAmino(object: QueryConsensusStateRequestAmino): QueryConsensusStateRequest {
    const message = createBaseQueryConsensusStateRequest();
    if (object.client_id !== undefined && object.client_id !== null) {
      message.clientId = object.client_id;
    }
    if (object.revision_number !== undefined && object.revision_number !== null) {
      message.revisionNumber = BigInt(object.revision_number);
    }
    if (object.revision_height !== undefined && object.revision_height !== null) {
      message.revisionHeight = BigInt(object.revision_height);
    }
    if (object.latest_height !== undefined && object.latest_height !== null) {
      message.latestHeight = object.latest_height;
    }
    return message;
  },
  toAmino(message: QueryConsensusStateRequest, useInterfaces: boolean = false): QueryConsensusStateRequestAmino {
    const obj: any = {};
    obj.client_id = message.clientId;
    obj.revision_number = message.revisionNumber ? message.revisionNumber.toString() : undefined;
    obj.revision_height = message.revisionHeight ? message.revisionHeight.toString() : undefined;
    obj.latest_height = message.latestHeight;
    return obj;
  },
  fromAminoMsg(object: QueryConsensusStateRequestAminoMsg): QueryConsensusStateRequest {
    return QueryConsensusStateRequest.fromAmino(object.value);
  },
  toAminoMsg(message: QueryConsensusStateRequest, useInterfaces: boolean = false): QueryConsensusStateRequestAminoMsg {
    return {
      type: "cosmos-sdk/QueryConsensusStateRequest",
      value: QueryConsensusStateRequest.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: QueryConsensusStateRequestProtoMsg, useInterfaces: boolean = false): QueryConsensusStateRequest {
    return QueryConsensusStateRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryConsensusStateRequest): Uint8Array {
    return QueryConsensusStateRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryConsensusStateRequest): QueryConsensusStateRequestProtoMsg {
    return {
      typeUrl: "/ibc.core.client.v1.QueryConsensusStateRequest",
      value: QueryConsensusStateRequest.encode(message).finish()
    };
  }
};
function createBaseQueryConsensusStateResponse(): QueryConsensusStateResponse {
  return {
    consensusState: undefined,
    proof: new Uint8Array(),
    proofHeight: Height.fromPartial({})
  };
}
export const QueryConsensusStateResponse = {
  typeUrl: "/ibc.core.client.v1.QueryConsensusStateResponse",
  encode(message: QueryConsensusStateResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.consensusState !== undefined) {
      Any.encode(message.consensusState, writer.uint32(10).fork()).ldelim();
    }
    if (message.proof.length !== 0) {
      writer.uint32(18).bytes(message.proof);
    }
    if (message.proofHeight !== undefined) {
      Height.encode(message.proofHeight, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryConsensusStateResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryConsensusStateResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.consensusState = Any.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 2:
          message.proof = reader.bytes();
          break;
        case 3:
          message.proofHeight = Height.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryConsensusStateResponse>): QueryConsensusStateResponse {
    const message = createBaseQueryConsensusStateResponse();
    message.consensusState = object.consensusState !== undefined && object.consensusState !== null ? Any.fromPartial(object.consensusState) : undefined;
    message.proof = object.proof ?? new Uint8Array();
    message.proofHeight = object.proofHeight !== undefined && object.proofHeight !== null ? Height.fromPartial(object.proofHeight) : undefined;
    return message;
  },
  fromAmino(object: QueryConsensusStateResponseAmino): QueryConsensusStateResponse {
    const message = createBaseQueryConsensusStateResponse();
    if (object.consensus_state !== undefined && object.consensus_state !== null) {
      message.consensusState = Any.fromAmino(object.consensus_state);
    }
    if (object.proof !== undefined && object.proof !== null) {
      message.proof = bytesFromBase64(object.proof);
    }
    if (object.proof_height !== undefined && object.proof_height !== null) {
      message.proofHeight = Height.fromAmino(object.proof_height);
    }
    return message;
  },
  toAmino(message: QueryConsensusStateResponse, useInterfaces: boolean = false): QueryConsensusStateResponseAmino {
    const obj: any = {};
    obj.consensus_state = message.consensusState ? Any.toAmino(message.consensusState, useInterfaces) : undefined;
    obj.proof = message.proof ? base64FromBytes(message.proof) : undefined;
    obj.proof_height = message.proofHeight ? Height.toAmino(message.proofHeight, useInterfaces) : {};
    return obj;
  },
  fromAminoMsg(object: QueryConsensusStateResponseAminoMsg): QueryConsensusStateResponse {
    return QueryConsensusStateResponse.fromAmino(object.value);
  },
  toAminoMsg(message: QueryConsensusStateResponse, useInterfaces: boolean = false): QueryConsensusStateResponseAminoMsg {
    return {
      type: "cosmos-sdk/QueryConsensusStateResponse",
      value: QueryConsensusStateResponse.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: QueryConsensusStateResponseProtoMsg, useInterfaces: boolean = false): QueryConsensusStateResponse {
    return QueryConsensusStateResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryConsensusStateResponse): Uint8Array {
    return QueryConsensusStateResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryConsensusStateResponse): QueryConsensusStateResponseProtoMsg {
    return {
      typeUrl: "/ibc.core.client.v1.QueryConsensusStateResponse",
      value: QueryConsensusStateResponse.encode(message).finish()
    };
  }
};
function createBaseQueryConsensusStatesRequest(): QueryConsensusStatesRequest {
  return {
    clientId: "",
    pagination: undefined
  };
}
export const QueryConsensusStatesRequest = {
  typeUrl: "/ibc.core.client.v1.QueryConsensusStatesRequest",
  encode(message: QueryConsensusStatesRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.clientId !== "") {
      writer.uint32(10).string(message.clientId);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryConsensusStatesRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryConsensusStatesRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.clientId = reader.string();
          break;
        case 2:
          message.pagination = PageRequest.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryConsensusStatesRequest>): QueryConsensusStatesRequest {
    const message = createBaseQueryConsensusStatesRequest();
    message.clientId = object.clientId ?? "";
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryConsensusStatesRequestAmino): QueryConsensusStatesRequest {
    const message = createBaseQueryConsensusStatesRequest();
    if (object.client_id !== undefined && object.client_id !== null) {
      message.clientId = object.client_id;
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryConsensusStatesRequest, useInterfaces: boolean = false): QueryConsensusStatesRequestAmino {
    const obj: any = {};
    obj.client_id = message.clientId;
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryConsensusStatesRequestAminoMsg): QueryConsensusStatesRequest {
    return QueryConsensusStatesRequest.fromAmino(object.value);
  },
  toAminoMsg(message: QueryConsensusStatesRequest, useInterfaces: boolean = false): QueryConsensusStatesRequestAminoMsg {
    return {
      type: "cosmos-sdk/QueryConsensusStatesRequest",
      value: QueryConsensusStatesRequest.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: QueryConsensusStatesRequestProtoMsg, useInterfaces: boolean = false): QueryConsensusStatesRequest {
    return QueryConsensusStatesRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryConsensusStatesRequest): Uint8Array {
    return QueryConsensusStatesRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryConsensusStatesRequest): QueryConsensusStatesRequestProtoMsg {
    return {
      typeUrl: "/ibc.core.client.v1.QueryConsensusStatesRequest",
      value: QueryConsensusStatesRequest.encode(message).finish()
    };
  }
};
function createBaseQueryConsensusStatesResponse(): QueryConsensusStatesResponse {
  return {
    consensusStates: [],
    pagination: undefined
  };
}
export const QueryConsensusStatesResponse = {
  typeUrl: "/ibc.core.client.v1.QueryConsensusStatesResponse",
  encode(message: QueryConsensusStatesResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.consensusStates) {
      ConsensusStateWithHeight.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryConsensusStatesResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryConsensusStatesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.consensusStates.push(ConsensusStateWithHeight.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryConsensusStatesResponse>): QueryConsensusStatesResponse {
    const message = createBaseQueryConsensusStatesResponse();
    message.consensusStates = object.consensusStates?.map(e => ConsensusStateWithHeight.fromPartial(e)) || [];
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryConsensusStatesResponseAmino): QueryConsensusStatesResponse {
    const message = createBaseQueryConsensusStatesResponse();
    message.consensusStates = object.consensus_states?.map(e => ConsensusStateWithHeight.fromAmino(e)) || [];
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryConsensusStatesResponse, useInterfaces: boolean = false): QueryConsensusStatesResponseAmino {
    const obj: any = {};
    if (message.consensusStates) {
      obj.consensus_states = message.consensusStates.map(e => e ? ConsensusStateWithHeight.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.consensus_states = [];
    }
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryConsensusStatesResponseAminoMsg): QueryConsensusStatesResponse {
    return QueryConsensusStatesResponse.fromAmino(object.value);
  },
  toAminoMsg(message: QueryConsensusStatesResponse, useInterfaces: boolean = false): QueryConsensusStatesResponseAminoMsg {
    return {
      type: "cosmos-sdk/QueryConsensusStatesResponse",
      value: QueryConsensusStatesResponse.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: QueryConsensusStatesResponseProtoMsg, useInterfaces: boolean = false): QueryConsensusStatesResponse {
    return QueryConsensusStatesResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryConsensusStatesResponse): Uint8Array {
    return QueryConsensusStatesResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryConsensusStatesResponse): QueryConsensusStatesResponseProtoMsg {
    return {
      typeUrl: "/ibc.core.client.v1.QueryConsensusStatesResponse",
      value: QueryConsensusStatesResponse.encode(message).finish()
    };
  }
};
function createBaseQueryConsensusStateHeightsRequest(): QueryConsensusStateHeightsRequest {
  return {
    clientId: "",
    pagination: undefined
  };
}
export const QueryConsensusStateHeightsRequest = {
  typeUrl: "/ibc.core.client.v1.QueryConsensusStateHeightsRequest",
  encode(message: QueryConsensusStateHeightsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.clientId !== "") {
      writer.uint32(10).string(message.clientId);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryConsensusStateHeightsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryConsensusStateHeightsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.clientId = reader.string();
          break;
        case 2:
          message.pagination = PageRequest.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryConsensusStateHeightsRequest>): QueryConsensusStateHeightsRequest {
    const message = createBaseQueryConsensusStateHeightsRequest();
    message.clientId = object.clientId ?? "";
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryConsensusStateHeightsRequestAmino): QueryConsensusStateHeightsRequest {
    const message = createBaseQueryConsensusStateHeightsRequest();
    if (object.client_id !== undefined && object.client_id !== null) {
      message.clientId = object.client_id;
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryConsensusStateHeightsRequest, useInterfaces: boolean = false): QueryConsensusStateHeightsRequestAmino {
    const obj: any = {};
    obj.client_id = message.clientId;
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryConsensusStateHeightsRequestAminoMsg): QueryConsensusStateHeightsRequest {
    return QueryConsensusStateHeightsRequest.fromAmino(object.value);
  },
  toAminoMsg(message: QueryConsensusStateHeightsRequest, useInterfaces: boolean = false): QueryConsensusStateHeightsRequestAminoMsg {
    return {
      type: "cosmos-sdk/QueryConsensusStateHeightsRequest",
      value: QueryConsensusStateHeightsRequest.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: QueryConsensusStateHeightsRequestProtoMsg, useInterfaces: boolean = false): QueryConsensusStateHeightsRequest {
    return QueryConsensusStateHeightsRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryConsensusStateHeightsRequest): Uint8Array {
    return QueryConsensusStateHeightsRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryConsensusStateHeightsRequest): QueryConsensusStateHeightsRequestProtoMsg {
    return {
      typeUrl: "/ibc.core.client.v1.QueryConsensusStateHeightsRequest",
      value: QueryConsensusStateHeightsRequest.encode(message).finish()
    };
  }
};
function createBaseQueryConsensusStateHeightsResponse(): QueryConsensusStateHeightsResponse {
  return {
    consensusStateHeights: [],
    pagination: undefined
  };
}
export const QueryConsensusStateHeightsResponse = {
  typeUrl: "/ibc.core.client.v1.QueryConsensusStateHeightsResponse",
  encode(message: QueryConsensusStateHeightsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.consensusStateHeights) {
      Height.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryConsensusStateHeightsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryConsensusStateHeightsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.consensusStateHeights.push(Height.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryConsensusStateHeightsResponse>): QueryConsensusStateHeightsResponse {
    const message = createBaseQueryConsensusStateHeightsResponse();
    message.consensusStateHeights = object.consensusStateHeights?.map(e => Height.fromPartial(e)) || [];
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryConsensusStateHeightsResponseAmino): QueryConsensusStateHeightsResponse {
    const message = createBaseQueryConsensusStateHeightsResponse();
    message.consensusStateHeights = object.consensus_state_heights?.map(e => Height.fromAmino(e)) || [];
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryConsensusStateHeightsResponse, useInterfaces: boolean = false): QueryConsensusStateHeightsResponseAmino {
    const obj: any = {};
    if (message.consensusStateHeights) {
      obj.consensus_state_heights = message.consensusStateHeights.map(e => e ? Height.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.consensus_state_heights = [];
    }
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryConsensusStateHeightsResponseAminoMsg): QueryConsensusStateHeightsResponse {
    return QueryConsensusStateHeightsResponse.fromAmino(object.value);
  },
  toAminoMsg(message: QueryConsensusStateHeightsResponse, useInterfaces: boolean = false): QueryConsensusStateHeightsResponseAminoMsg {
    return {
      type: "cosmos-sdk/QueryConsensusStateHeightsResponse",
      value: QueryConsensusStateHeightsResponse.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: QueryConsensusStateHeightsResponseProtoMsg, useInterfaces: boolean = false): QueryConsensusStateHeightsResponse {
    return QueryConsensusStateHeightsResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryConsensusStateHeightsResponse): Uint8Array {
    return QueryConsensusStateHeightsResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryConsensusStateHeightsResponse): QueryConsensusStateHeightsResponseProtoMsg {
    return {
      typeUrl: "/ibc.core.client.v1.QueryConsensusStateHeightsResponse",
      value: QueryConsensusStateHeightsResponse.encode(message).finish()
    };
  }
};
function createBaseQueryClientStatusRequest(): QueryClientStatusRequest {
  return {
    clientId: ""
  };
}
export const QueryClientStatusRequest = {
  typeUrl: "/ibc.core.client.v1.QueryClientStatusRequest",
  encode(message: QueryClientStatusRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.clientId !== "") {
      writer.uint32(10).string(message.clientId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryClientStatusRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryClientStatusRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.clientId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryClientStatusRequest>): QueryClientStatusRequest {
    const message = createBaseQueryClientStatusRequest();
    message.clientId = object.clientId ?? "";
    return message;
  },
  fromAmino(object: QueryClientStatusRequestAmino): QueryClientStatusRequest {
    const message = createBaseQueryClientStatusRequest();
    if (object.client_id !== undefined && object.client_id !== null) {
      message.clientId = object.client_id;
    }
    return message;
  },
  toAmino(message: QueryClientStatusRequest, useInterfaces: boolean = false): QueryClientStatusRequestAmino {
    const obj: any = {};
    obj.client_id = message.clientId;
    return obj;
  },
  fromAminoMsg(object: QueryClientStatusRequestAminoMsg): QueryClientStatusRequest {
    return QueryClientStatusRequest.fromAmino(object.value);
  },
  toAminoMsg(message: QueryClientStatusRequest, useInterfaces: boolean = false): QueryClientStatusRequestAminoMsg {
    return {
      type: "cosmos-sdk/QueryClientStatusRequest",
      value: QueryClientStatusRequest.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: QueryClientStatusRequestProtoMsg, useInterfaces: boolean = false): QueryClientStatusRequest {
    return QueryClientStatusRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryClientStatusRequest): Uint8Array {
    return QueryClientStatusRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryClientStatusRequest): QueryClientStatusRequestProtoMsg {
    return {
      typeUrl: "/ibc.core.client.v1.QueryClientStatusRequest",
      value: QueryClientStatusRequest.encode(message).finish()
    };
  }
};
function createBaseQueryClientStatusResponse(): QueryClientStatusResponse {
  return {
    status: ""
  };
}
export const QueryClientStatusResponse = {
  typeUrl: "/ibc.core.client.v1.QueryClientStatusResponse",
  encode(message: QueryClientStatusResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.status !== "") {
      writer.uint32(10).string(message.status);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryClientStatusResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryClientStatusResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.status = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryClientStatusResponse>): QueryClientStatusResponse {
    const message = createBaseQueryClientStatusResponse();
    message.status = object.status ?? "";
    return message;
  },
  fromAmino(object: QueryClientStatusResponseAmino): QueryClientStatusResponse {
    const message = createBaseQueryClientStatusResponse();
    if (object.status !== undefined && object.status !== null) {
      message.status = object.status;
    }
    return message;
  },
  toAmino(message: QueryClientStatusResponse, useInterfaces: boolean = false): QueryClientStatusResponseAmino {
    const obj: any = {};
    obj.status = message.status;
    return obj;
  },
  fromAminoMsg(object: QueryClientStatusResponseAminoMsg): QueryClientStatusResponse {
    return QueryClientStatusResponse.fromAmino(object.value);
  },
  toAminoMsg(message: QueryClientStatusResponse, useInterfaces: boolean = false): QueryClientStatusResponseAminoMsg {
    return {
      type: "cosmos-sdk/QueryClientStatusResponse",
      value: QueryClientStatusResponse.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: QueryClientStatusResponseProtoMsg, useInterfaces: boolean = false): QueryClientStatusResponse {
    return QueryClientStatusResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryClientStatusResponse): Uint8Array {
    return QueryClientStatusResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryClientStatusResponse): QueryClientStatusResponseProtoMsg {
    return {
      typeUrl: "/ibc.core.client.v1.QueryClientStatusResponse",
      value: QueryClientStatusResponse.encode(message).finish()
    };
  }
};
function createBaseQueryClientParamsRequest(): QueryClientParamsRequest {
  return {};
}
export const QueryClientParamsRequest = {
  typeUrl: "/ibc.core.client.v1.QueryClientParamsRequest",
  encode(_: QueryClientParamsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryClientParamsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryClientParamsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(_: Partial<QueryClientParamsRequest>): QueryClientParamsRequest {
    const message = createBaseQueryClientParamsRequest();
    return message;
  },
  fromAmino(_: QueryClientParamsRequestAmino): QueryClientParamsRequest {
    const message = createBaseQueryClientParamsRequest();
    return message;
  },
  toAmino(_: QueryClientParamsRequest, useInterfaces: boolean = false): QueryClientParamsRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: QueryClientParamsRequestAminoMsg): QueryClientParamsRequest {
    return QueryClientParamsRequest.fromAmino(object.value);
  },
  toAminoMsg(message: QueryClientParamsRequest, useInterfaces: boolean = false): QueryClientParamsRequestAminoMsg {
    return {
      type: "cosmos-sdk/QueryClientParamsRequest",
      value: QueryClientParamsRequest.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: QueryClientParamsRequestProtoMsg, useInterfaces: boolean = false): QueryClientParamsRequest {
    return QueryClientParamsRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryClientParamsRequest): Uint8Array {
    return QueryClientParamsRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryClientParamsRequest): QueryClientParamsRequestProtoMsg {
    return {
      typeUrl: "/ibc.core.client.v1.QueryClientParamsRequest",
      value: QueryClientParamsRequest.encode(message).finish()
    };
  }
};
function createBaseQueryClientParamsResponse(): QueryClientParamsResponse {
  return {
    params: undefined
  };
}
export const QueryClientParamsResponse = {
  typeUrl: "/ibc.core.client.v1.QueryClientParamsResponse",
  encode(message: QueryClientParamsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryClientParamsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryClientParamsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.params = Params.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryClientParamsResponse>): QueryClientParamsResponse {
    const message = createBaseQueryClientParamsResponse();
    message.params = object.params !== undefined && object.params !== null ? Params.fromPartial(object.params) : undefined;
    return message;
  },
  fromAmino(object: QueryClientParamsResponseAmino): QueryClientParamsResponse {
    const message = createBaseQueryClientParamsResponse();
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromAmino(object.params);
    }
    return message;
  },
  toAmino(message: QueryClientParamsResponse, useInterfaces: boolean = false): QueryClientParamsResponseAmino {
    const obj: any = {};
    obj.params = message.params ? Params.toAmino(message.params, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryClientParamsResponseAminoMsg): QueryClientParamsResponse {
    return QueryClientParamsResponse.fromAmino(object.value);
  },
  toAminoMsg(message: QueryClientParamsResponse, useInterfaces: boolean = false): QueryClientParamsResponseAminoMsg {
    return {
      type: "cosmos-sdk/QueryClientParamsResponse",
      value: QueryClientParamsResponse.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: QueryClientParamsResponseProtoMsg, useInterfaces: boolean = false): QueryClientParamsResponse {
    return QueryClientParamsResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryClientParamsResponse): Uint8Array {
    return QueryClientParamsResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryClientParamsResponse): QueryClientParamsResponseProtoMsg {
    return {
      typeUrl: "/ibc.core.client.v1.QueryClientParamsResponse",
      value: QueryClientParamsResponse.encode(message).finish()
    };
  }
};
function createBaseQueryUpgradedClientStateRequest(): QueryUpgradedClientStateRequest {
  return {};
}
export const QueryUpgradedClientStateRequest = {
  typeUrl: "/ibc.core.client.v1.QueryUpgradedClientStateRequest",
  encode(_: QueryUpgradedClientStateRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryUpgradedClientStateRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryUpgradedClientStateRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(_: Partial<QueryUpgradedClientStateRequest>): QueryUpgradedClientStateRequest {
    const message = createBaseQueryUpgradedClientStateRequest();
    return message;
  },
  fromAmino(_: QueryUpgradedClientStateRequestAmino): QueryUpgradedClientStateRequest {
    const message = createBaseQueryUpgradedClientStateRequest();
    return message;
  },
  toAmino(_: QueryUpgradedClientStateRequest, useInterfaces: boolean = false): QueryUpgradedClientStateRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: QueryUpgradedClientStateRequestAminoMsg): QueryUpgradedClientStateRequest {
    return QueryUpgradedClientStateRequest.fromAmino(object.value);
  },
  toAminoMsg(message: QueryUpgradedClientStateRequest, useInterfaces: boolean = false): QueryUpgradedClientStateRequestAminoMsg {
    return {
      type: "cosmos-sdk/QueryUpgradedClientStateRequest",
      value: QueryUpgradedClientStateRequest.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: QueryUpgradedClientStateRequestProtoMsg, useInterfaces: boolean = false): QueryUpgradedClientStateRequest {
    return QueryUpgradedClientStateRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryUpgradedClientStateRequest): Uint8Array {
    return QueryUpgradedClientStateRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryUpgradedClientStateRequest): QueryUpgradedClientStateRequestProtoMsg {
    return {
      typeUrl: "/ibc.core.client.v1.QueryUpgradedClientStateRequest",
      value: QueryUpgradedClientStateRequest.encode(message).finish()
    };
  }
};
function createBaseQueryUpgradedClientStateResponse(): QueryUpgradedClientStateResponse {
  return {
    upgradedClientState: undefined
  };
}
export const QueryUpgradedClientStateResponse = {
  typeUrl: "/ibc.core.client.v1.QueryUpgradedClientStateResponse",
  encode(message: QueryUpgradedClientStateResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.upgradedClientState !== undefined) {
      Any.encode(message.upgradedClientState, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryUpgradedClientStateResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryUpgradedClientStateResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.upgradedClientState = Any.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryUpgradedClientStateResponse>): QueryUpgradedClientStateResponse {
    const message = createBaseQueryUpgradedClientStateResponse();
    message.upgradedClientState = object.upgradedClientState !== undefined && object.upgradedClientState !== null ? Any.fromPartial(object.upgradedClientState) : undefined;
    return message;
  },
  fromAmino(object: QueryUpgradedClientStateResponseAmino): QueryUpgradedClientStateResponse {
    const message = createBaseQueryUpgradedClientStateResponse();
    if (object.upgraded_client_state !== undefined && object.upgraded_client_state !== null) {
      message.upgradedClientState = Any.fromAmino(object.upgraded_client_state);
    }
    return message;
  },
  toAmino(message: QueryUpgradedClientStateResponse, useInterfaces: boolean = false): QueryUpgradedClientStateResponseAmino {
    const obj: any = {};
    obj.upgraded_client_state = message.upgradedClientState ? Any.toAmino(message.upgradedClientState, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryUpgradedClientStateResponseAminoMsg): QueryUpgradedClientStateResponse {
    return QueryUpgradedClientStateResponse.fromAmino(object.value);
  },
  toAminoMsg(message: QueryUpgradedClientStateResponse, useInterfaces: boolean = false): QueryUpgradedClientStateResponseAminoMsg {
    return {
      type: "cosmos-sdk/QueryUpgradedClientStateResponse",
      value: QueryUpgradedClientStateResponse.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: QueryUpgradedClientStateResponseProtoMsg, useInterfaces: boolean = false): QueryUpgradedClientStateResponse {
    return QueryUpgradedClientStateResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryUpgradedClientStateResponse): Uint8Array {
    return QueryUpgradedClientStateResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryUpgradedClientStateResponse): QueryUpgradedClientStateResponseProtoMsg {
    return {
      typeUrl: "/ibc.core.client.v1.QueryUpgradedClientStateResponse",
      value: QueryUpgradedClientStateResponse.encode(message).finish()
    };
  }
};
function createBaseQueryUpgradedConsensusStateRequest(): QueryUpgradedConsensusStateRequest {
  return {};
}
export const QueryUpgradedConsensusStateRequest = {
  typeUrl: "/ibc.core.client.v1.QueryUpgradedConsensusStateRequest",
  encode(_: QueryUpgradedConsensusStateRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryUpgradedConsensusStateRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryUpgradedConsensusStateRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(_: Partial<QueryUpgradedConsensusStateRequest>): QueryUpgradedConsensusStateRequest {
    const message = createBaseQueryUpgradedConsensusStateRequest();
    return message;
  },
  fromAmino(_: QueryUpgradedConsensusStateRequestAmino): QueryUpgradedConsensusStateRequest {
    const message = createBaseQueryUpgradedConsensusStateRequest();
    return message;
  },
  toAmino(_: QueryUpgradedConsensusStateRequest, useInterfaces: boolean = false): QueryUpgradedConsensusStateRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: QueryUpgradedConsensusStateRequestAminoMsg): QueryUpgradedConsensusStateRequest {
    return QueryUpgradedConsensusStateRequest.fromAmino(object.value);
  },
  toAminoMsg(message: QueryUpgradedConsensusStateRequest, useInterfaces: boolean = false): QueryUpgradedConsensusStateRequestAminoMsg {
    return {
      type: "cosmos-sdk/QueryUpgradedConsensusStateRequest",
      value: QueryUpgradedConsensusStateRequest.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: QueryUpgradedConsensusStateRequestProtoMsg, useInterfaces: boolean = false): QueryUpgradedConsensusStateRequest {
    return QueryUpgradedConsensusStateRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryUpgradedConsensusStateRequest): Uint8Array {
    return QueryUpgradedConsensusStateRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryUpgradedConsensusStateRequest): QueryUpgradedConsensusStateRequestProtoMsg {
    return {
      typeUrl: "/ibc.core.client.v1.QueryUpgradedConsensusStateRequest",
      value: QueryUpgradedConsensusStateRequest.encode(message).finish()
    };
  }
};
function createBaseQueryUpgradedConsensusStateResponse(): QueryUpgradedConsensusStateResponse {
  return {
    upgradedConsensusState: undefined
  };
}
export const QueryUpgradedConsensusStateResponse = {
  typeUrl: "/ibc.core.client.v1.QueryUpgradedConsensusStateResponse",
  encode(message: QueryUpgradedConsensusStateResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.upgradedConsensusState !== undefined) {
      Any.encode(message.upgradedConsensusState, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryUpgradedConsensusStateResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryUpgradedConsensusStateResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.upgradedConsensusState = Any.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryUpgradedConsensusStateResponse>): QueryUpgradedConsensusStateResponse {
    const message = createBaseQueryUpgradedConsensusStateResponse();
    message.upgradedConsensusState = object.upgradedConsensusState !== undefined && object.upgradedConsensusState !== null ? Any.fromPartial(object.upgradedConsensusState) : undefined;
    return message;
  },
  fromAmino(object: QueryUpgradedConsensusStateResponseAmino): QueryUpgradedConsensusStateResponse {
    const message = createBaseQueryUpgradedConsensusStateResponse();
    if (object.upgraded_consensus_state !== undefined && object.upgraded_consensus_state !== null) {
      message.upgradedConsensusState = Any.fromAmino(object.upgraded_consensus_state);
    }
    return message;
  },
  toAmino(message: QueryUpgradedConsensusStateResponse, useInterfaces: boolean = false): QueryUpgradedConsensusStateResponseAmino {
    const obj: any = {};
    obj.upgraded_consensus_state = message.upgradedConsensusState ? Any.toAmino(message.upgradedConsensusState, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryUpgradedConsensusStateResponseAminoMsg): QueryUpgradedConsensusStateResponse {
    return QueryUpgradedConsensusStateResponse.fromAmino(object.value);
  },
  toAminoMsg(message: QueryUpgradedConsensusStateResponse, useInterfaces: boolean = false): QueryUpgradedConsensusStateResponseAminoMsg {
    return {
      type: "cosmos-sdk/QueryUpgradedConsensusStateResponse",
      value: QueryUpgradedConsensusStateResponse.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: QueryUpgradedConsensusStateResponseProtoMsg, useInterfaces: boolean = false): QueryUpgradedConsensusStateResponse {
    return QueryUpgradedConsensusStateResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryUpgradedConsensusStateResponse): Uint8Array {
    return QueryUpgradedConsensusStateResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryUpgradedConsensusStateResponse): QueryUpgradedConsensusStateResponseProtoMsg {
    return {
      typeUrl: "/ibc.core.client.v1.QueryUpgradedConsensusStateResponse",
      value: QueryUpgradedConsensusStateResponse.encode(message).finish()
    };
  }
};