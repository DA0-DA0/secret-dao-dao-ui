//@ts-nocheck
import { PageRequest, PageRequestAmino, PageRequestSDKType, PageResponse, PageResponseAmino, PageResponseSDKType } from "../../../cosmos/base/query/v1beta1/pagination";
import { Params, ParamsAmino, ParamsSDKType } from "./params";
import { Attester, AttesterAmino, AttesterSDKType } from "./attester";
import { PerMessageBurnLimit, PerMessageBurnLimitAmino, PerMessageBurnLimitSDKType } from "./per_message_burn_limit";
import { BurningAndMintingPaused, BurningAndMintingPausedAmino, BurningAndMintingPausedSDKType } from "./burning_and_minting_paused";
import { SendingAndReceivingMessagesPaused, SendingAndReceivingMessagesPausedAmino, SendingAndReceivingMessagesPausedSDKType } from "./sending_and_receiving_messages_paused";
import { MaxMessageBodySize, MaxMessageBodySizeAmino, MaxMessageBodySizeSDKType } from "./max_message_body_size";
import { Nonce, NonceAmino, NonceSDKType } from "./nonce";
import { SignatureThreshold, SignatureThresholdAmino, SignatureThresholdSDKType } from "./signature_threshold";
import { TokenPair, TokenPairAmino, TokenPairSDKType } from "./token_pair";
import { RemoteTokenMessenger, RemoteTokenMessengerAmino, RemoteTokenMessengerSDKType } from "./remote_token_messenger";
import { BinaryReader, BinaryWriter } from "../../../binary";
/** QueryParamsRequest is the request type for the Query/Params RPC method. */
export interface QueryParamsRequest {}
export interface QueryParamsRequestProtoMsg {
  typeUrl: "/circle.cctp.v1.QueryParamsRequest";
  value: Uint8Array;
}
/** QueryParamsRequest is the request type for the Query/Params RPC method. */
export interface QueryParamsRequestAmino {}
export interface QueryParamsRequestAminoMsg {
  type: "/circle.cctp.v1.QueryParamsRequest";
  value: QueryParamsRequestAmino;
}
/** QueryParamsRequest is the request type for the Query/Params RPC method. */
export interface QueryParamsRequestSDKType {}
/** QueryParamsResponse is the response type for the Query/Params RPC method. */
export interface QueryParamsResponse {
  /** params holds all the parameters of this module. */
  params: Params | undefined;
}
export interface QueryParamsResponseProtoMsg {
  typeUrl: "/circle.cctp.v1.QueryParamsResponse";
  value: Uint8Array;
}
/** QueryParamsResponse is the response type for the Query/Params RPC method. */
export interface QueryParamsResponseAmino {
  /** params holds all the parameters of this module. */
  params?: ParamsAmino | undefined;
}
export interface QueryParamsResponseAminoMsg {
  type: "/circle.cctp.v1.QueryParamsResponse";
  value: QueryParamsResponseAmino;
}
/** QueryParamsResponse is the response type for the Query/Params RPC method. */
export interface QueryParamsResponseSDKType {
  params: ParamsSDKType | undefined;
}
/** QueryRolesRequest is the request type for the Query/Roles RPC method. */
export interface QueryRolesRequest {}
export interface QueryRolesRequestProtoMsg {
  typeUrl: "/circle.cctp.v1.QueryRolesRequest";
  value: Uint8Array;
}
/** QueryRolesRequest is the request type for the Query/Roles RPC method. */
export interface QueryRolesRequestAmino {}
export interface QueryRolesRequestAminoMsg {
  type: "/circle.cctp.v1.QueryRolesRequest";
  value: QueryRolesRequestAmino;
}
/** QueryRolesRequest is the request type for the Query/Roles RPC method. */
export interface QueryRolesRequestSDKType {}
/** QueryRolesResponse is the response type for the Query/Roles RPC method. */
export interface QueryRolesResponse {
  owner: string;
  attesterManager: string;
  pauser: string;
  tokenController: string;
}
export interface QueryRolesResponseProtoMsg {
  typeUrl: "/circle.cctp.v1.QueryRolesResponse";
  value: Uint8Array;
}
/** QueryRolesResponse is the response type for the Query/Roles RPC method. */
export interface QueryRolesResponseAmino {
  owner?: string;
  attester_manager?: string;
  pauser?: string;
  token_controller?: string;
}
export interface QueryRolesResponseAminoMsg {
  type: "/circle.cctp.v1.QueryRolesResponse";
  value: QueryRolesResponseAmino;
}
/** QueryRolesResponse is the response type for the Query/Roles RPC method. */
export interface QueryRolesResponseSDKType {
  owner: string;
  attester_manager: string;
  pauser: string;
  token_controller: string;
}
/** QueryAttestersRequest is the request type for the Query/Attester RPC method. */
export interface QueryGetAttesterRequest {
  attester: string;
}
export interface QueryGetAttesterRequestProtoMsg {
  typeUrl: "/circle.cctp.v1.QueryGetAttesterRequest";
  value: Uint8Array;
}
/** QueryAttestersRequest is the request type for the Query/Attester RPC method. */
export interface QueryGetAttesterRequestAmino {
  attester?: string;
}
export interface QueryGetAttesterRequestAminoMsg {
  type: "/circle.cctp.v1.QueryGetAttesterRequest";
  value: QueryGetAttesterRequestAmino;
}
/** QueryAttestersRequest is the request type for the Query/Attester RPC method. */
export interface QueryGetAttesterRequestSDKType {
  attester: string;
}
/**
 * QueryAttestersResponse is the response type for the Query/Attester RPC
 * method.
 */
export interface QueryGetAttesterResponse {
  attester: Attester | undefined;
}
export interface QueryGetAttesterResponseProtoMsg {
  typeUrl: "/circle.cctp.v1.QueryGetAttesterResponse";
  value: Uint8Array;
}
/**
 * QueryAttestersResponse is the response type for the Query/Attester RPC
 * method.
 */
export interface QueryGetAttesterResponseAmino {
  attester?: AttesterAmino | undefined;
}
export interface QueryGetAttesterResponseAminoMsg {
  type: "/circle.cctp.v1.QueryGetAttesterResponse";
  value: QueryGetAttesterResponseAmino;
}
/**
 * QueryAttestersResponse is the response type for the Query/Attester RPC
 * method.
 */
export interface QueryGetAttesterResponseSDKType {
  attester: AttesterSDKType | undefined;
}
/**
 * QueryAllAttestersRequest is the request type for the Query/Attesters RPC
 * method.
 */
export interface QueryAllAttestersRequest {
  pagination?: PageRequest | undefined;
}
export interface QueryAllAttestersRequestProtoMsg {
  typeUrl: "/circle.cctp.v1.QueryAllAttestersRequest";
  value: Uint8Array;
}
/**
 * QueryAllAttestersRequest is the request type for the Query/Attesters RPC
 * method.
 */
export interface QueryAllAttestersRequestAmino {
  pagination?: PageRequestAmino | undefined;
}
export interface QueryAllAttestersRequestAminoMsg {
  type: "/circle.cctp.v1.QueryAllAttestersRequest";
  value: QueryAllAttestersRequestAmino;
}
/**
 * QueryAllAttestersRequest is the request type for the Query/Attesters RPC
 * method.
 */
export interface QueryAllAttestersRequestSDKType {
  pagination?: PageRequestSDKType | undefined;
}
/**
 * QueryAllAttestersResponse is the response type for the Query/Attesters RPC
 * method.
 */
export interface QueryAllAttestersResponse {
  attesters: Attester[];
  pagination?: PageResponse | undefined;
}
export interface QueryAllAttestersResponseProtoMsg {
  typeUrl: "/circle.cctp.v1.QueryAllAttestersResponse";
  value: Uint8Array;
}
/**
 * QueryAllAttestersResponse is the response type for the Query/Attesters RPC
 * method.
 */
export interface QueryAllAttestersResponseAmino {
  attesters?: AttesterAmino[];
  pagination?: PageResponseAmino | undefined;
}
export interface QueryAllAttestersResponseAminoMsg {
  type: "/circle.cctp.v1.QueryAllAttestersResponse";
  value: QueryAllAttestersResponseAmino;
}
/**
 * QueryAllAttestersResponse is the response type for the Query/Attesters RPC
 * method.
 */
export interface QueryAllAttestersResponseSDKType {
  attesters: AttesterSDKType[];
  pagination?: PageResponseSDKType | undefined;
}
/**
 * QueryPerMessageBurnLimitRequest is the request type for the
 * Query/PerMessageBurnLimit RPC method.
 */
export interface QueryGetPerMessageBurnLimitRequest {
  denom: string;
}
export interface QueryGetPerMessageBurnLimitRequestProtoMsg {
  typeUrl: "/circle.cctp.v1.QueryGetPerMessageBurnLimitRequest";
  value: Uint8Array;
}
/**
 * QueryPerMessageBurnLimitRequest is the request type for the
 * Query/PerMessageBurnLimit RPC method.
 */
export interface QueryGetPerMessageBurnLimitRequestAmino {
  denom?: string;
}
export interface QueryGetPerMessageBurnLimitRequestAminoMsg {
  type: "/circle.cctp.v1.QueryGetPerMessageBurnLimitRequest";
  value: QueryGetPerMessageBurnLimitRequestAmino;
}
/**
 * QueryPerMessageBurnLimitRequest is the request type for the
 * Query/PerMessageBurnLimit RPC method.
 */
export interface QueryGetPerMessageBurnLimitRequestSDKType {
  denom: string;
}
/**
 * QueryPerMessageBurnLimitResponse is the response type for the
 * Query/PerMessageBurnLimit RPC method.
 */
export interface QueryGetPerMessageBurnLimitResponse {
  burnLimit: PerMessageBurnLimit | undefined;
}
export interface QueryGetPerMessageBurnLimitResponseProtoMsg {
  typeUrl: "/circle.cctp.v1.QueryGetPerMessageBurnLimitResponse";
  value: Uint8Array;
}
/**
 * QueryPerMessageBurnLimitResponse is the response type for the
 * Query/PerMessageBurnLimit RPC method.
 */
export interface QueryGetPerMessageBurnLimitResponseAmino {
  burn_limit?: PerMessageBurnLimitAmino | undefined;
}
export interface QueryGetPerMessageBurnLimitResponseAminoMsg {
  type: "/circle.cctp.v1.QueryGetPerMessageBurnLimitResponse";
  value: QueryGetPerMessageBurnLimitResponseAmino;
}
/**
 * QueryPerMessageBurnLimitResponse is the response type for the
 * Query/PerMessageBurnLimit RPC method.
 */
export interface QueryGetPerMessageBurnLimitResponseSDKType {
  burn_limit: PerMessageBurnLimitSDKType | undefined;
}
/**
 * QueryAllPerMessageBurnLimitsRequest is the response type for the
 * Query/PerMessageBurnLimit RPC method.
 */
export interface QueryAllPerMessageBurnLimitsRequest {
  pagination?: PageRequest | undefined;
}
export interface QueryAllPerMessageBurnLimitsRequestProtoMsg {
  typeUrl: "/circle.cctp.v1.QueryAllPerMessageBurnLimitsRequest";
  value: Uint8Array;
}
/**
 * QueryAllPerMessageBurnLimitsRequest is the response type for the
 * Query/PerMessageBurnLimit RPC method.
 */
export interface QueryAllPerMessageBurnLimitsRequestAmino {
  pagination?: PageRequestAmino | undefined;
}
export interface QueryAllPerMessageBurnLimitsRequestAminoMsg {
  type: "/circle.cctp.v1.QueryAllPerMessageBurnLimitsRequest";
  value: QueryAllPerMessageBurnLimitsRequestAmino;
}
/**
 * QueryAllPerMessageBurnLimitsRequest is the response type for the
 * Query/PerMessageBurnLimit RPC method.
 */
export interface QueryAllPerMessageBurnLimitsRequestSDKType {
  pagination?: PageRequestSDKType | undefined;
}
/**
 * QueryAllPerMessageBurnLimitsRequest is the response type for the
 * Query/PerMessageBurnLimit RPC method.
 */
export interface QueryAllPerMessageBurnLimitsResponse {
  burnLimits: PerMessageBurnLimit[];
  pagination?: PageResponse | undefined;
}
export interface QueryAllPerMessageBurnLimitsResponseProtoMsg {
  typeUrl: "/circle.cctp.v1.QueryAllPerMessageBurnLimitsResponse";
  value: Uint8Array;
}
/**
 * QueryAllPerMessageBurnLimitsRequest is the response type for the
 * Query/PerMessageBurnLimit RPC method.
 */
export interface QueryAllPerMessageBurnLimitsResponseAmino {
  burn_limits?: PerMessageBurnLimitAmino[];
  pagination?: PageResponseAmino | undefined;
}
export interface QueryAllPerMessageBurnLimitsResponseAminoMsg {
  type: "/circle.cctp.v1.QueryAllPerMessageBurnLimitsResponse";
  value: QueryAllPerMessageBurnLimitsResponseAmino;
}
/**
 * QueryAllPerMessageBurnLimitsRequest is the response type for the
 * Query/PerMessageBurnLimit RPC method.
 */
export interface QueryAllPerMessageBurnLimitsResponseSDKType {
  burn_limits: PerMessageBurnLimitSDKType[];
  pagination?: PageResponseSDKType | undefined;
}
/**
 * QueryBurningAndMintingPausedRequest is the request type for the
 * Query/BurningAndMintingPaused RPC method.
 */
export interface QueryGetBurningAndMintingPausedRequest {}
export interface QueryGetBurningAndMintingPausedRequestProtoMsg {
  typeUrl: "/circle.cctp.v1.QueryGetBurningAndMintingPausedRequest";
  value: Uint8Array;
}
/**
 * QueryBurningAndMintingPausedRequest is the request type for the
 * Query/BurningAndMintingPaused RPC method.
 */
export interface QueryGetBurningAndMintingPausedRequestAmino {}
export interface QueryGetBurningAndMintingPausedRequestAminoMsg {
  type: "/circle.cctp.v1.QueryGetBurningAndMintingPausedRequest";
  value: QueryGetBurningAndMintingPausedRequestAmino;
}
/**
 * QueryBurningAndMintingPausedRequest is the request type for the
 * Query/BurningAndMintingPaused RPC method.
 */
export interface QueryGetBurningAndMintingPausedRequestSDKType {}
/**
 * QueryBurningAndMintingPausedResponse is the response type for the
 * Query/BurningAndMintingPaused RPC method.
 */
export interface QueryGetBurningAndMintingPausedResponse {
  paused: BurningAndMintingPaused | undefined;
}
export interface QueryGetBurningAndMintingPausedResponseProtoMsg {
  typeUrl: "/circle.cctp.v1.QueryGetBurningAndMintingPausedResponse";
  value: Uint8Array;
}
/**
 * QueryBurningAndMintingPausedResponse is the response type for the
 * Query/BurningAndMintingPaused RPC method.
 */
export interface QueryGetBurningAndMintingPausedResponseAmino {
  paused?: BurningAndMintingPausedAmino | undefined;
}
export interface QueryGetBurningAndMintingPausedResponseAminoMsg {
  type: "/circle.cctp.v1.QueryGetBurningAndMintingPausedResponse";
  value: QueryGetBurningAndMintingPausedResponseAmino;
}
/**
 * QueryBurningAndMintingPausedResponse is the response type for the
 * Query/BurningAndMintingPaused RPC method.
 */
export interface QueryGetBurningAndMintingPausedResponseSDKType {
  paused: BurningAndMintingPausedSDKType | undefined;
}
/**
 * QuerySendingAndReceivingPausedRequest is the request type for the
 * Query/SendingAndReceivingPaused RPC method.
 */
export interface QueryGetSendingAndReceivingMessagesPausedRequest {}
export interface QueryGetSendingAndReceivingMessagesPausedRequestProtoMsg {
  typeUrl: "/circle.cctp.v1.QueryGetSendingAndReceivingMessagesPausedRequest";
  value: Uint8Array;
}
/**
 * QuerySendingAndReceivingPausedRequest is the request type for the
 * Query/SendingAndReceivingPaused RPC method.
 */
export interface QueryGetSendingAndReceivingMessagesPausedRequestAmino {}
export interface QueryGetSendingAndReceivingMessagesPausedRequestAminoMsg {
  type: "/circle.cctp.v1.QueryGetSendingAndReceivingMessagesPausedRequest";
  value: QueryGetSendingAndReceivingMessagesPausedRequestAmino;
}
/**
 * QuerySendingAndReceivingPausedRequest is the request type for the
 * Query/SendingAndReceivingPaused RPC method.
 */
export interface QueryGetSendingAndReceivingMessagesPausedRequestSDKType {}
/**
 * QuerySendingAndReceivingPausedResponse is the response type for the
 * Query/SendingAndReceivingPaused RPC method.
 */
export interface QueryGetSendingAndReceivingMessagesPausedResponse {
  paused: SendingAndReceivingMessagesPaused | undefined;
}
export interface QueryGetSendingAndReceivingMessagesPausedResponseProtoMsg {
  typeUrl: "/circle.cctp.v1.QueryGetSendingAndReceivingMessagesPausedResponse";
  value: Uint8Array;
}
/**
 * QuerySendingAndReceivingPausedResponse is the response type for the
 * Query/SendingAndReceivingPaused RPC method.
 */
export interface QueryGetSendingAndReceivingMessagesPausedResponseAmino {
  paused?: SendingAndReceivingMessagesPausedAmino | undefined;
}
export interface QueryGetSendingAndReceivingMessagesPausedResponseAminoMsg {
  type: "/circle.cctp.v1.QueryGetSendingAndReceivingMessagesPausedResponse";
  value: QueryGetSendingAndReceivingMessagesPausedResponseAmino;
}
/**
 * QuerySendingAndReceivingPausedResponse is the response type for the
 * Query/SendingAndReceivingPaused RPC method.
 */
export interface QueryGetSendingAndReceivingMessagesPausedResponseSDKType {
  paused: SendingAndReceivingMessagesPausedSDKType | undefined;
}
/**
 * QueryMaxMessageBodySizeRequest is the request type for the
 * Query/MaxMessageBodySize RPC method.
 */
export interface QueryGetMaxMessageBodySizeRequest {}
export interface QueryGetMaxMessageBodySizeRequestProtoMsg {
  typeUrl: "/circle.cctp.v1.QueryGetMaxMessageBodySizeRequest";
  value: Uint8Array;
}
/**
 * QueryMaxMessageBodySizeRequest is the request type for the
 * Query/MaxMessageBodySize RPC method.
 */
export interface QueryGetMaxMessageBodySizeRequestAmino {}
export interface QueryGetMaxMessageBodySizeRequestAminoMsg {
  type: "/circle.cctp.v1.QueryGetMaxMessageBodySizeRequest";
  value: QueryGetMaxMessageBodySizeRequestAmino;
}
/**
 * QueryMaxMessageBodySizeRequest is the request type for the
 * Query/MaxMessageBodySize RPC method.
 */
export interface QueryGetMaxMessageBodySizeRequestSDKType {}
/**
 * QueryMaxMessageBodySizeResponse is the response type for the
 * Query/MaxMessageBodySize RPC method.
 */
export interface QueryGetMaxMessageBodySizeResponse {
  amount: MaxMessageBodySize | undefined;
}
export interface QueryGetMaxMessageBodySizeResponseProtoMsg {
  typeUrl: "/circle.cctp.v1.QueryGetMaxMessageBodySizeResponse";
  value: Uint8Array;
}
/**
 * QueryMaxMessageBodySizeResponse is the response type for the
 * Query/MaxMessageBodySize RPC method.
 */
export interface QueryGetMaxMessageBodySizeResponseAmino {
  amount?: MaxMessageBodySizeAmino | undefined;
}
export interface QueryGetMaxMessageBodySizeResponseAminoMsg {
  type: "/circle.cctp.v1.QueryGetMaxMessageBodySizeResponse";
  value: QueryGetMaxMessageBodySizeResponseAmino;
}
/**
 * QueryMaxMessageBodySizeResponse is the response type for the
 * Query/MaxMessageBodySize RPC method.
 */
export interface QueryGetMaxMessageBodySizeResponseSDKType {
  amount: MaxMessageBodySizeSDKType | undefined;
}
/**
 * QueryGetNextAvailableNonceRequest is the request type for the
 * Query/NextAvailableNonce RPC method.
 */
export interface QueryGetNextAvailableNonceRequest {}
export interface QueryGetNextAvailableNonceRequestProtoMsg {
  typeUrl: "/circle.cctp.v1.QueryGetNextAvailableNonceRequest";
  value: Uint8Array;
}
/**
 * QueryGetNextAvailableNonceRequest is the request type for the
 * Query/NextAvailableNonce RPC method.
 */
export interface QueryGetNextAvailableNonceRequestAmino {}
export interface QueryGetNextAvailableNonceRequestAminoMsg {
  type: "/circle.cctp.v1.QueryGetNextAvailableNonceRequest";
  value: QueryGetNextAvailableNonceRequestAmino;
}
/**
 * QueryGetNextAvailableNonceRequest is the request type for the
 * Query/NextAvailableNonce RPC method.
 */
export interface QueryGetNextAvailableNonceRequestSDKType {}
/**
 * Query QueryGetNextAvailableNonceResponse is the response type for the
 * Query/NextAvailableNonce RPC method.
 */
export interface QueryGetNextAvailableNonceResponse {
  nonce: Nonce | undefined;
}
export interface QueryGetNextAvailableNonceResponseProtoMsg {
  typeUrl: "/circle.cctp.v1.QueryGetNextAvailableNonceResponse";
  value: Uint8Array;
}
/**
 * Query QueryGetNextAvailableNonceResponse is the response type for the
 * Query/NextAvailableNonce RPC method.
 */
export interface QueryGetNextAvailableNonceResponseAmino {
  nonce?: NonceAmino | undefined;
}
export interface QueryGetNextAvailableNonceResponseAminoMsg {
  type: "/circle.cctp.v1.QueryGetNextAvailableNonceResponse";
  value: QueryGetNextAvailableNonceResponseAmino;
}
/**
 * Query QueryGetNextAvailableNonceResponse is the response type for the
 * Query/NextAvailableNonce RPC method.
 */
export interface QueryGetNextAvailableNonceResponseSDKType {
  nonce: NonceSDKType | undefined;
}
/**
 * QuerySignatureThresholdRequest is the request type for the
 * Query/SignatureThreshold RPC method.
 */
export interface QueryGetSignatureThresholdRequest {}
export interface QueryGetSignatureThresholdRequestProtoMsg {
  typeUrl: "/circle.cctp.v1.QueryGetSignatureThresholdRequest";
  value: Uint8Array;
}
/**
 * QuerySignatureThresholdRequest is the request type for the
 * Query/SignatureThreshold RPC method.
 */
export interface QueryGetSignatureThresholdRequestAmino {}
export interface QueryGetSignatureThresholdRequestAminoMsg {
  type: "/circle.cctp.v1.QueryGetSignatureThresholdRequest";
  value: QueryGetSignatureThresholdRequestAmino;
}
/**
 * QuerySignatureThresholdRequest is the request type for the
 * Query/SignatureThreshold RPC method.
 */
export interface QueryGetSignatureThresholdRequestSDKType {}
/**
 * QuerySignatureThresholdResponse is the response type for the
 * Query/SignatureThreshold RPC method.
 */
export interface QueryGetSignatureThresholdResponse {
  amount: SignatureThreshold | undefined;
}
export interface QueryGetSignatureThresholdResponseProtoMsg {
  typeUrl: "/circle.cctp.v1.QueryGetSignatureThresholdResponse";
  value: Uint8Array;
}
/**
 * QuerySignatureThresholdResponse is the response type for the
 * Query/SignatureThreshold RPC method.
 */
export interface QueryGetSignatureThresholdResponseAmino {
  amount?: SignatureThresholdAmino | undefined;
}
export interface QueryGetSignatureThresholdResponseAminoMsg {
  type: "/circle.cctp.v1.QueryGetSignatureThresholdResponse";
  value: QueryGetSignatureThresholdResponseAmino;
}
/**
 * QuerySignatureThresholdResponse is the response type for the
 * Query/SignatureThreshold RPC method.
 */
export interface QueryGetSignatureThresholdResponseSDKType {
  amount: SignatureThresholdSDKType | undefined;
}
/**
 * QueryGetTokenPairRequest is the request type for the Query/TokenPair RPC
 * method.
 */
export interface QueryGetTokenPairRequest {
  remoteDomain: number;
  remoteToken: string;
}
export interface QueryGetTokenPairRequestProtoMsg {
  typeUrl: "/circle.cctp.v1.QueryGetTokenPairRequest";
  value: Uint8Array;
}
/**
 * QueryGetTokenPairRequest is the request type for the Query/TokenPair RPC
 * method.
 */
export interface QueryGetTokenPairRequestAmino {
  remote_domain?: number;
  remote_token?: string;
}
export interface QueryGetTokenPairRequestAminoMsg {
  type: "/circle.cctp.v1.QueryGetTokenPairRequest";
  value: QueryGetTokenPairRequestAmino;
}
/**
 * QueryGetTokenPairRequest is the request type for the Query/TokenPair RPC
 * method.
 */
export interface QueryGetTokenPairRequestSDKType {
  remote_domain: number;
  remote_token: string;
}
/**
 * QueryGetTokenPairResponse is the response type for the Query/TokenPair RPC
 * method.
 */
export interface QueryGetTokenPairResponse {
  pair: TokenPair | undefined;
}
export interface QueryGetTokenPairResponseProtoMsg {
  typeUrl: "/circle.cctp.v1.QueryGetTokenPairResponse";
  value: Uint8Array;
}
/**
 * QueryGetTokenPairResponse is the response type for the Query/TokenPair RPC
 * method.
 */
export interface QueryGetTokenPairResponseAmino {
  pair?: TokenPairAmino | undefined;
}
export interface QueryGetTokenPairResponseAminoMsg {
  type: "/circle.cctp.v1.QueryGetTokenPairResponse";
  value: QueryGetTokenPairResponseAmino;
}
/**
 * QueryGetTokenPairResponse is the response type for the Query/TokenPair RPC
 * method.
 */
export interface QueryGetTokenPairResponseSDKType {
  pair: TokenPairSDKType | undefined;
}
/**
 * QueryAllTokenPairsRequest is the request type for the Query/TokenPairs RPC
 * method.
 */
export interface QueryAllTokenPairsRequest {
  pagination?: PageRequest | undefined;
}
export interface QueryAllTokenPairsRequestProtoMsg {
  typeUrl: "/circle.cctp.v1.QueryAllTokenPairsRequest";
  value: Uint8Array;
}
/**
 * QueryAllTokenPairsRequest is the request type for the Query/TokenPairs RPC
 * method.
 */
export interface QueryAllTokenPairsRequestAmino {
  pagination?: PageRequestAmino | undefined;
}
export interface QueryAllTokenPairsRequestAminoMsg {
  type: "/circle.cctp.v1.QueryAllTokenPairsRequest";
  value: QueryAllTokenPairsRequestAmino;
}
/**
 * QueryAllTokenPairsRequest is the request type for the Query/TokenPairs RPC
 * method.
 */
export interface QueryAllTokenPairsRequestSDKType {
  pagination?: PageRequestSDKType | undefined;
}
/**
 * QueryAllTokenPairsResponse is the response type for the Query/TokenPairs RPC
 * method.
 */
export interface QueryAllTokenPairsResponse {
  tokenPairs: TokenPair[];
  pagination?: PageResponse | undefined;
}
export interface QueryAllTokenPairsResponseProtoMsg {
  typeUrl: "/circle.cctp.v1.QueryAllTokenPairsResponse";
  value: Uint8Array;
}
/**
 * QueryAllTokenPairsResponse is the response type for the Query/TokenPairs RPC
 * method.
 */
export interface QueryAllTokenPairsResponseAmino {
  token_pairs?: TokenPairAmino[];
  pagination?: PageResponseAmino | undefined;
}
export interface QueryAllTokenPairsResponseAminoMsg {
  type: "/circle.cctp.v1.QueryAllTokenPairsResponse";
  value: QueryAllTokenPairsResponseAmino;
}
/**
 * QueryAllTokenPairsResponse is the response type for the Query/TokenPairs RPC
 * method.
 */
export interface QueryAllTokenPairsResponseSDKType {
  token_pairs: TokenPairSDKType[];
  pagination?: PageResponseSDKType | undefined;
}
/**
 * QueryGetUsedNonceRequest is the request type for the Query/UsedNonce RPC
 * method.
 */
export interface QueryGetUsedNonceRequest {
  sourceDomain: number;
  nonce: bigint;
}
export interface QueryGetUsedNonceRequestProtoMsg {
  typeUrl: "/circle.cctp.v1.QueryGetUsedNonceRequest";
  value: Uint8Array;
}
/**
 * QueryGetUsedNonceRequest is the request type for the Query/UsedNonce RPC
 * method.
 */
export interface QueryGetUsedNonceRequestAmino {
  source_domain?: number;
  nonce?: string;
}
export interface QueryGetUsedNonceRequestAminoMsg {
  type: "/circle.cctp.v1.QueryGetUsedNonceRequest";
  value: QueryGetUsedNonceRequestAmino;
}
/**
 * QueryGetUsedNonceRequest is the request type for the Query/UsedNonce RPC
 * method.
 */
export interface QueryGetUsedNonceRequestSDKType {
  source_domain: number;
  nonce: bigint;
}
/**
 * QueryGetUsedNonceResponse is the response type for the Query/UsedNonce RPC
 * method.
 */
export interface QueryGetUsedNonceResponse {
  nonce: Nonce | undefined;
}
export interface QueryGetUsedNonceResponseProtoMsg {
  typeUrl: "/circle.cctp.v1.QueryGetUsedNonceResponse";
  value: Uint8Array;
}
/**
 * QueryGetUsedNonceResponse is the response type for the Query/UsedNonce RPC
 * method.
 */
export interface QueryGetUsedNonceResponseAmino {
  nonce?: NonceAmino | undefined;
}
export interface QueryGetUsedNonceResponseAminoMsg {
  type: "/circle.cctp.v1.QueryGetUsedNonceResponse";
  value: QueryGetUsedNonceResponseAmino;
}
/**
 * QueryGetUsedNonceResponse is the response type for the Query/UsedNonce RPC
 * method.
 */
export interface QueryGetUsedNonceResponseSDKType {
  nonce: NonceSDKType | undefined;
}
/**
 * QueryAllUsedNonceRequest is the request type for the Query/UsedNonces RPC
 * method.
 */
export interface QueryAllUsedNoncesRequest {
  pagination?: PageRequest | undefined;
}
export interface QueryAllUsedNoncesRequestProtoMsg {
  typeUrl: "/circle.cctp.v1.QueryAllUsedNoncesRequest";
  value: Uint8Array;
}
/**
 * QueryAllUsedNonceRequest is the request type for the Query/UsedNonces RPC
 * method.
 */
export interface QueryAllUsedNoncesRequestAmino {
  pagination?: PageRequestAmino | undefined;
}
export interface QueryAllUsedNoncesRequestAminoMsg {
  type: "/circle.cctp.v1.QueryAllUsedNoncesRequest";
  value: QueryAllUsedNoncesRequestAmino;
}
/**
 * QueryAllUsedNonceRequest is the request type for the Query/UsedNonces RPC
 * method.
 */
export interface QueryAllUsedNoncesRequestSDKType {
  pagination?: PageRequestSDKType | undefined;
}
/**
 * QueryAllUsedNonceResponse is the response type for the Query/UsedNonces RPC
 * method.
 */
export interface QueryAllUsedNoncesResponse {
  usedNonces: Nonce[];
  pagination?: PageResponse | undefined;
}
export interface QueryAllUsedNoncesResponseProtoMsg {
  typeUrl: "/circle.cctp.v1.QueryAllUsedNoncesResponse";
  value: Uint8Array;
}
/**
 * QueryAllUsedNonceResponse is the response type for the Query/UsedNonces RPC
 * method.
 */
export interface QueryAllUsedNoncesResponseAmino {
  used_nonces?: NonceAmino[];
  pagination?: PageResponseAmino | undefined;
}
export interface QueryAllUsedNoncesResponseAminoMsg {
  type: "/circle.cctp.v1.QueryAllUsedNoncesResponse";
  value: QueryAllUsedNoncesResponseAmino;
}
/**
 * QueryAllUsedNonceResponse is the response type for the Query/UsedNonces RPC
 * method.
 */
export interface QueryAllUsedNoncesResponseSDKType {
  used_nonces: NonceSDKType[];
  pagination?: PageResponseSDKType | undefined;
}
/**
 * QueryRemoteTokenMessengerRequest is the request type for the
 * Query/RemoteTokenMessenger RPC method.
 */
export interface QueryRemoteTokenMessengerRequest {
  domainId: number;
}
export interface QueryRemoteTokenMessengerRequestProtoMsg {
  typeUrl: "/circle.cctp.v1.QueryRemoteTokenMessengerRequest";
  value: Uint8Array;
}
/**
 * QueryRemoteTokenMessengerRequest is the request type for the
 * Query/RemoteTokenMessenger RPC method.
 */
export interface QueryRemoteTokenMessengerRequestAmino {
  domain_id?: number;
}
export interface QueryRemoteTokenMessengerRequestAminoMsg {
  type: "/circle.cctp.v1.QueryRemoteTokenMessengerRequest";
  value: QueryRemoteTokenMessengerRequestAmino;
}
/**
 * QueryRemoteTokenMessengerRequest is the request type for the
 * Query/RemoteTokenMessenger RPC method.
 */
export interface QueryRemoteTokenMessengerRequestSDKType {
  domain_id: number;
}
/**
 * QueryRemoteTokenMessengerResponse is the response type for the
 * Query/RemoteTokenMessenger RPC method.
 */
export interface QueryRemoteTokenMessengerResponse {
  remoteTokenMessenger: RemoteTokenMessenger | undefined;
}
export interface QueryRemoteTokenMessengerResponseProtoMsg {
  typeUrl: "/circle.cctp.v1.QueryRemoteTokenMessengerResponse";
  value: Uint8Array;
}
/**
 * QueryRemoteTokenMessengerResponse is the response type for the
 * Query/RemoteTokenMessenger RPC method.
 */
export interface QueryRemoteTokenMessengerResponseAmino {
  remote_token_messenger?: RemoteTokenMessengerAmino | undefined;
}
export interface QueryRemoteTokenMessengerResponseAminoMsg {
  type: "/circle.cctp.v1.QueryRemoteTokenMessengerResponse";
  value: QueryRemoteTokenMessengerResponseAmino;
}
/**
 * QueryRemoteTokenMessengerResponse is the response type for the
 * Query/RemoteTokenMessenger RPC method.
 */
export interface QueryRemoteTokenMessengerResponseSDKType {
  remote_token_messenger: RemoteTokenMessengerSDKType | undefined;
}
/**
 * QueryRemoteTokenMessengersRequest is the request type for the
 * Query/RemoteTokenMessengers RPC method.
 */
export interface QueryRemoteTokenMessengersRequest {
  pagination?: PageRequest | undefined;
}
export interface QueryRemoteTokenMessengersRequestProtoMsg {
  typeUrl: "/circle.cctp.v1.QueryRemoteTokenMessengersRequest";
  value: Uint8Array;
}
/**
 * QueryRemoteTokenMessengersRequest is the request type for the
 * Query/RemoteTokenMessengers RPC method.
 */
export interface QueryRemoteTokenMessengersRequestAmino {
  pagination?: PageRequestAmino | undefined;
}
export interface QueryRemoteTokenMessengersRequestAminoMsg {
  type: "/circle.cctp.v1.QueryRemoteTokenMessengersRequest";
  value: QueryRemoteTokenMessengersRequestAmino;
}
/**
 * QueryRemoteTokenMessengersRequest is the request type for the
 * Query/RemoteTokenMessengers RPC method.
 */
export interface QueryRemoteTokenMessengersRequestSDKType {
  pagination?: PageRequestSDKType | undefined;
}
/**
 * QueryRemoteTokenMessengersResponse is the response type for the
 * Query/RemoteTokenMessengers RPC method.
 */
export interface QueryRemoteTokenMessengersResponse {
  remoteTokenMessengers: RemoteTokenMessenger[];
  pagination?: PageResponse | undefined;
}
export interface QueryRemoteTokenMessengersResponseProtoMsg {
  typeUrl: "/circle.cctp.v1.QueryRemoteTokenMessengersResponse";
  value: Uint8Array;
}
/**
 * QueryRemoteTokenMessengersResponse is the response type for the
 * Query/RemoteTokenMessengers RPC method.
 */
export interface QueryRemoteTokenMessengersResponseAmino {
  remote_token_messengers?: RemoteTokenMessengerAmino[];
  pagination?: PageResponseAmino | undefined;
}
export interface QueryRemoteTokenMessengersResponseAminoMsg {
  type: "/circle.cctp.v1.QueryRemoteTokenMessengersResponse";
  value: QueryRemoteTokenMessengersResponseAmino;
}
/**
 * QueryRemoteTokenMessengersResponse is the response type for the
 * Query/RemoteTokenMessengers RPC method.
 */
export interface QueryRemoteTokenMessengersResponseSDKType {
  remote_token_messengers: RemoteTokenMessengerSDKType[];
  pagination?: PageResponseSDKType | undefined;
}
/**
 * QueryBurnMessageVersionRequest is the request type for the
 * Query/BurnMessageVersion RPC method.
 */
export interface QueryBurnMessageVersionRequest {}
export interface QueryBurnMessageVersionRequestProtoMsg {
  typeUrl: "/circle.cctp.v1.QueryBurnMessageVersionRequest";
  value: Uint8Array;
}
/**
 * QueryBurnMessageVersionRequest is the request type for the
 * Query/BurnMessageVersion RPC method.
 */
export interface QueryBurnMessageVersionRequestAmino {}
export interface QueryBurnMessageVersionRequestAminoMsg {
  type: "/circle.cctp.v1.QueryBurnMessageVersionRequest";
  value: QueryBurnMessageVersionRequestAmino;
}
/**
 * QueryBurnMessageVersionRequest is the request type for the
 * Query/BurnMessageVersion RPC method.
 */
export interface QueryBurnMessageVersionRequestSDKType {}
/**
 * QueryBurnMessageVersionResponse is the response type for the
 * Query/BurnMessageVersion RPC method.
 */
export interface QueryBurnMessageVersionResponse {
  /** version is the burn message version of the local domain. */
  version: number;
}
export interface QueryBurnMessageVersionResponseProtoMsg {
  typeUrl: "/circle.cctp.v1.QueryBurnMessageVersionResponse";
  value: Uint8Array;
}
/**
 * QueryBurnMessageVersionResponse is the response type for the
 * Query/BurnMessageVersion RPC method.
 */
export interface QueryBurnMessageVersionResponseAmino {
  /** version is the burn message version of the local domain. */
  version?: number;
}
export interface QueryBurnMessageVersionResponseAminoMsg {
  type: "/circle.cctp.v1.QueryBurnMessageVersionResponse";
  value: QueryBurnMessageVersionResponseAmino;
}
/**
 * QueryBurnMessageVersionResponse is the response type for the
 * Query/BurnMessageVersion RPC method.
 */
export interface QueryBurnMessageVersionResponseSDKType {
  version: number;
}
/**
 * QueryLocalMessageVersionRequest is the request type for the
 * Query/LocalMessageVersion RPC method.
 */
export interface QueryLocalMessageVersionRequest {}
export interface QueryLocalMessageVersionRequestProtoMsg {
  typeUrl: "/circle.cctp.v1.QueryLocalMessageVersionRequest";
  value: Uint8Array;
}
/**
 * QueryLocalMessageVersionRequest is the request type for the
 * Query/LocalMessageVersion RPC method.
 */
export interface QueryLocalMessageVersionRequestAmino {}
export interface QueryLocalMessageVersionRequestAminoMsg {
  type: "/circle.cctp.v1.QueryLocalMessageVersionRequest";
  value: QueryLocalMessageVersionRequestAmino;
}
/**
 * QueryLocalMessageVersionRequest is the request type for the
 * Query/LocalMessageVersion RPC method.
 */
export interface QueryLocalMessageVersionRequestSDKType {}
/**
 * QueryLocalMessageVersionResponse is the response type for the
 * Query/LocalMessageVersion RPC method.
 */
export interface QueryLocalMessageVersionResponse {
  /** version is the message version of the local domain. */
  version: number;
}
export interface QueryLocalMessageVersionResponseProtoMsg {
  typeUrl: "/circle.cctp.v1.QueryLocalMessageVersionResponse";
  value: Uint8Array;
}
/**
 * QueryLocalMessageVersionResponse is the response type for the
 * Query/LocalMessageVersion RPC method.
 */
export interface QueryLocalMessageVersionResponseAmino {
  /** version is the message version of the local domain. */
  version?: number;
}
export interface QueryLocalMessageVersionResponseAminoMsg {
  type: "/circle.cctp.v1.QueryLocalMessageVersionResponse";
  value: QueryLocalMessageVersionResponseAmino;
}
/**
 * QueryLocalMessageVersionResponse is the response type for the
 * Query/LocalMessageVersion RPC method.
 */
export interface QueryLocalMessageVersionResponseSDKType {
  version: number;
}
/**
 * QueryLocalDomainRequest is the request type for the Query/LocalDomain RPC
 * method.
 */
export interface QueryLocalDomainRequest {}
export interface QueryLocalDomainRequestProtoMsg {
  typeUrl: "/circle.cctp.v1.QueryLocalDomainRequest";
  value: Uint8Array;
}
/**
 * QueryLocalDomainRequest is the request type for the Query/LocalDomain RPC
 * method.
 */
export interface QueryLocalDomainRequestAmino {}
export interface QueryLocalDomainRequestAminoMsg {
  type: "/circle.cctp.v1.QueryLocalDomainRequest";
  value: QueryLocalDomainRequestAmino;
}
/**
 * QueryLocalDomainRequest is the request type for the Query/LocalDomain RPC
 * method.
 */
export interface QueryLocalDomainRequestSDKType {}
/**
 * QueryLocalDomainResponse is the response type for the Query/LocalDomain RPC
 * method.
 */
export interface QueryLocalDomainResponse {
  /** domain_id is the id of the local domain. */
  domainId: number;
}
export interface QueryLocalDomainResponseProtoMsg {
  typeUrl: "/circle.cctp.v1.QueryLocalDomainResponse";
  value: Uint8Array;
}
/**
 * QueryLocalDomainResponse is the response type for the Query/LocalDomain RPC
 * method.
 */
export interface QueryLocalDomainResponseAmino {
  /** domain_id is the id of the local domain. */
  domain_id?: number;
}
export interface QueryLocalDomainResponseAminoMsg {
  type: "/circle.cctp.v1.QueryLocalDomainResponse";
  value: QueryLocalDomainResponseAmino;
}
/**
 * QueryLocalDomainResponse is the response type for the Query/LocalDomain RPC
 * method.
 */
export interface QueryLocalDomainResponseSDKType {
  domain_id: number;
}
function createBaseQueryParamsRequest(): QueryParamsRequest {
  return {};
}
export const QueryParamsRequest = {
  typeUrl: "/circle.cctp.v1.QueryParamsRequest",
  encode(_: QueryParamsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryParamsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryParamsRequest();
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
  fromPartial(_: Partial<QueryParamsRequest>): QueryParamsRequest {
    const message = createBaseQueryParamsRequest();
    return message;
  },
  fromAmino(_: QueryParamsRequestAmino): QueryParamsRequest {
    const message = createBaseQueryParamsRequest();
    return message;
  },
  toAmino(_: QueryParamsRequest, useInterfaces: boolean = false): QueryParamsRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: QueryParamsRequestAminoMsg): QueryParamsRequest {
    return QueryParamsRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryParamsRequestProtoMsg, useInterfaces: boolean = false): QueryParamsRequest {
    return QueryParamsRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryParamsRequest): Uint8Array {
    return QueryParamsRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryParamsRequest): QueryParamsRequestProtoMsg {
    return {
      typeUrl: "/circle.cctp.v1.QueryParamsRequest",
      value: QueryParamsRequest.encode(message).finish()
    };
  }
};
function createBaseQueryParamsResponse(): QueryParamsResponse {
  return {
    params: Params.fromPartial({})
  };
}
export const QueryParamsResponse = {
  typeUrl: "/circle.cctp.v1.QueryParamsResponse",
  encode(message: QueryParamsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryParamsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryParamsResponse();
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
  fromPartial(object: Partial<QueryParamsResponse>): QueryParamsResponse {
    const message = createBaseQueryParamsResponse();
    message.params = object.params !== undefined && object.params !== null ? Params.fromPartial(object.params) : undefined;
    return message;
  },
  fromAmino(object: QueryParamsResponseAmino): QueryParamsResponse {
    const message = createBaseQueryParamsResponse();
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromAmino(object.params);
    }
    return message;
  },
  toAmino(message: QueryParamsResponse, useInterfaces: boolean = false): QueryParamsResponseAmino {
    const obj: any = {};
    obj.params = message.params ? Params.toAmino(message.params, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryParamsResponseAminoMsg): QueryParamsResponse {
    return QueryParamsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryParamsResponseProtoMsg, useInterfaces: boolean = false): QueryParamsResponse {
    return QueryParamsResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryParamsResponse): Uint8Array {
    return QueryParamsResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryParamsResponse): QueryParamsResponseProtoMsg {
    return {
      typeUrl: "/circle.cctp.v1.QueryParamsResponse",
      value: QueryParamsResponse.encode(message).finish()
    };
  }
};
function createBaseQueryRolesRequest(): QueryRolesRequest {
  return {};
}
export const QueryRolesRequest = {
  typeUrl: "/circle.cctp.v1.QueryRolesRequest",
  encode(_: QueryRolesRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryRolesRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryRolesRequest();
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
  fromPartial(_: Partial<QueryRolesRequest>): QueryRolesRequest {
    const message = createBaseQueryRolesRequest();
    return message;
  },
  fromAmino(_: QueryRolesRequestAmino): QueryRolesRequest {
    const message = createBaseQueryRolesRequest();
    return message;
  },
  toAmino(_: QueryRolesRequest, useInterfaces: boolean = false): QueryRolesRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: QueryRolesRequestAminoMsg): QueryRolesRequest {
    return QueryRolesRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryRolesRequestProtoMsg, useInterfaces: boolean = false): QueryRolesRequest {
    return QueryRolesRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryRolesRequest): Uint8Array {
    return QueryRolesRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryRolesRequest): QueryRolesRequestProtoMsg {
    return {
      typeUrl: "/circle.cctp.v1.QueryRolesRequest",
      value: QueryRolesRequest.encode(message).finish()
    };
  }
};
function createBaseQueryRolesResponse(): QueryRolesResponse {
  return {
    owner: "",
    attesterManager: "",
    pauser: "",
    tokenController: ""
  };
}
export const QueryRolesResponse = {
  typeUrl: "/circle.cctp.v1.QueryRolesResponse",
  encode(message: QueryRolesResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.owner !== "") {
      writer.uint32(10).string(message.owner);
    }
    if (message.attesterManager !== "") {
      writer.uint32(18).string(message.attesterManager);
    }
    if (message.pauser !== "") {
      writer.uint32(26).string(message.pauser);
    }
    if (message.tokenController !== "") {
      writer.uint32(34).string(message.tokenController);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryRolesResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryRolesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.owner = reader.string();
          break;
        case 2:
          message.attesterManager = reader.string();
          break;
        case 3:
          message.pauser = reader.string();
          break;
        case 4:
          message.tokenController = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryRolesResponse>): QueryRolesResponse {
    const message = createBaseQueryRolesResponse();
    message.owner = object.owner ?? "";
    message.attesterManager = object.attesterManager ?? "";
    message.pauser = object.pauser ?? "";
    message.tokenController = object.tokenController ?? "";
    return message;
  },
  fromAmino(object: QueryRolesResponseAmino): QueryRolesResponse {
    const message = createBaseQueryRolesResponse();
    if (object.owner !== undefined && object.owner !== null) {
      message.owner = object.owner;
    }
    if (object.attester_manager !== undefined && object.attester_manager !== null) {
      message.attesterManager = object.attester_manager;
    }
    if (object.pauser !== undefined && object.pauser !== null) {
      message.pauser = object.pauser;
    }
    if (object.token_controller !== undefined && object.token_controller !== null) {
      message.tokenController = object.token_controller;
    }
    return message;
  },
  toAmino(message: QueryRolesResponse, useInterfaces: boolean = false): QueryRolesResponseAmino {
    const obj: any = {};
    obj.owner = message.owner;
    obj.attester_manager = message.attesterManager;
    obj.pauser = message.pauser;
    obj.token_controller = message.tokenController;
    return obj;
  },
  fromAminoMsg(object: QueryRolesResponseAminoMsg): QueryRolesResponse {
    return QueryRolesResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryRolesResponseProtoMsg, useInterfaces: boolean = false): QueryRolesResponse {
    return QueryRolesResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryRolesResponse): Uint8Array {
    return QueryRolesResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryRolesResponse): QueryRolesResponseProtoMsg {
    return {
      typeUrl: "/circle.cctp.v1.QueryRolesResponse",
      value: QueryRolesResponse.encode(message).finish()
    };
  }
};
function createBaseQueryGetAttesterRequest(): QueryGetAttesterRequest {
  return {
    attester: ""
  };
}
export const QueryGetAttesterRequest = {
  typeUrl: "/circle.cctp.v1.QueryGetAttesterRequest",
  encode(message: QueryGetAttesterRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.attester !== "") {
      writer.uint32(10).string(message.attester);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryGetAttesterRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetAttesterRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.attester = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryGetAttesterRequest>): QueryGetAttesterRequest {
    const message = createBaseQueryGetAttesterRequest();
    message.attester = object.attester ?? "";
    return message;
  },
  fromAmino(object: QueryGetAttesterRequestAmino): QueryGetAttesterRequest {
    const message = createBaseQueryGetAttesterRequest();
    if (object.attester !== undefined && object.attester !== null) {
      message.attester = object.attester;
    }
    return message;
  },
  toAmino(message: QueryGetAttesterRequest, useInterfaces: boolean = false): QueryGetAttesterRequestAmino {
    const obj: any = {};
    obj.attester = message.attester;
    return obj;
  },
  fromAminoMsg(object: QueryGetAttesterRequestAminoMsg): QueryGetAttesterRequest {
    return QueryGetAttesterRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryGetAttesterRequestProtoMsg, useInterfaces: boolean = false): QueryGetAttesterRequest {
    return QueryGetAttesterRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryGetAttesterRequest): Uint8Array {
    return QueryGetAttesterRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryGetAttesterRequest): QueryGetAttesterRequestProtoMsg {
    return {
      typeUrl: "/circle.cctp.v1.QueryGetAttesterRequest",
      value: QueryGetAttesterRequest.encode(message).finish()
    };
  }
};
function createBaseQueryGetAttesterResponse(): QueryGetAttesterResponse {
  return {
    attester: Attester.fromPartial({})
  };
}
export const QueryGetAttesterResponse = {
  typeUrl: "/circle.cctp.v1.QueryGetAttesterResponse",
  encode(message: QueryGetAttesterResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.attester !== undefined) {
      Attester.encode(message.attester, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryGetAttesterResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetAttesterResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.attester = Attester.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryGetAttesterResponse>): QueryGetAttesterResponse {
    const message = createBaseQueryGetAttesterResponse();
    message.attester = object.attester !== undefined && object.attester !== null ? Attester.fromPartial(object.attester) : undefined;
    return message;
  },
  fromAmino(object: QueryGetAttesterResponseAmino): QueryGetAttesterResponse {
    const message = createBaseQueryGetAttesterResponse();
    if (object.attester !== undefined && object.attester !== null) {
      message.attester = Attester.fromAmino(object.attester);
    }
    return message;
  },
  toAmino(message: QueryGetAttesterResponse, useInterfaces: boolean = false): QueryGetAttesterResponseAmino {
    const obj: any = {};
    obj.attester = message.attester ? Attester.toAmino(message.attester, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryGetAttesterResponseAminoMsg): QueryGetAttesterResponse {
    return QueryGetAttesterResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryGetAttesterResponseProtoMsg, useInterfaces: boolean = false): QueryGetAttesterResponse {
    return QueryGetAttesterResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryGetAttesterResponse): Uint8Array {
    return QueryGetAttesterResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryGetAttesterResponse): QueryGetAttesterResponseProtoMsg {
    return {
      typeUrl: "/circle.cctp.v1.QueryGetAttesterResponse",
      value: QueryGetAttesterResponse.encode(message).finish()
    };
  }
};
function createBaseQueryAllAttestersRequest(): QueryAllAttestersRequest {
  return {
    pagination: undefined
  };
}
export const QueryAllAttestersRequest = {
  typeUrl: "/circle.cctp.v1.QueryAllAttestersRequest",
  encode(message: QueryAllAttestersRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryAllAttestersRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllAttestersRequest();
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
  fromPartial(object: Partial<QueryAllAttestersRequest>): QueryAllAttestersRequest {
    const message = createBaseQueryAllAttestersRequest();
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryAllAttestersRequestAmino): QueryAllAttestersRequest {
    const message = createBaseQueryAllAttestersRequest();
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryAllAttestersRequest, useInterfaces: boolean = false): QueryAllAttestersRequestAmino {
    const obj: any = {};
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryAllAttestersRequestAminoMsg): QueryAllAttestersRequest {
    return QueryAllAttestersRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAllAttestersRequestProtoMsg, useInterfaces: boolean = false): QueryAllAttestersRequest {
    return QueryAllAttestersRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryAllAttestersRequest): Uint8Array {
    return QueryAllAttestersRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryAllAttestersRequest): QueryAllAttestersRequestProtoMsg {
    return {
      typeUrl: "/circle.cctp.v1.QueryAllAttestersRequest",
      value: QueryAllAttestersRequest.encode(message).finish()
    };
  }
};
function createBaseQueryAllAttestersResponse(): QueryAllAttestersResponse {
  return {
    attesters: [],
    pagination: undefined
  };
}
export const QueryAllAttestersResponse = {
  typeUrl: "/circle.cctp.v1.QueryAllAttestersResponse",
  encode(message: QueryAllAttestersResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.attesters) {
      Attester.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryAllAttestersResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllAttestersResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.attesters.push(Attester.decode(reader, reader.uint32(), useInterfaces));
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
  fromPartial(object: Partial<QueryAllAttestersResponse>): QueryAllAttestersResponse {
    const message = createBaseQueryAllAttestersResponse();
    message.attesters = object.attesters?.map(e => Attester.fromPartial(e)) || [];
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryAllAttestersResponseAmino): QueryAllAttestersResponse {
    const message = createBaseQueryAllAttestersResponse();
    message.attesters = object.attesters?.map(e => Attester.fromAmino(e)) || [];
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryAllAttestersResponse, useInterfaces: boolean = false): QueryAllAttestersResponseAmino {
    const obj: any = {};
    if (message.attesters) {
      obj.attesters = message.attesters.map(e => e ? Attester.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.attesters = [];
    }
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryAllAttestersResponseAminoMsg): QueryAllAttestersResponse {
    return QueryAllAttestersResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAllAttestersResponseProtoMsg, useInterfaces: boolean = false): QueryAllAttestersResponse {
    return QueryAllAttestersResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryAllAttestersResponse): Uint8Array {
    return QueryAllAttestersResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryAllAttestersResponse): QueryAllAttestersResponseProtoMsg {
    return {
      typeUrl: "/circle.cctp.v1.QueryAllAttestersResponse",
      value: QueryAllAttestersResponse.encode(message).finish()
    };
  }
};
function createBaseQueryGetPerMessageBurnLimitRequest(): QueryGetPerMessageBurnLimitRequest {
  return {
    denom: ""
  };
}
export const QueryGetPerMessageBurnLimitRequest = {
  typeUrl: "/circle.cctp.v1.QueryGetPerMessageBurnLimitRequest",
  encode(message: QueryGetPerMessageBurnLimitRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.denom !== "") {
      writer.uint32(10).string(message.denom);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryGetPerMessageBurnLimitRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetPerMessageBurnLimitRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.denom = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryGetPerMessageBurnLimitRequest>): QueryGetPerMessageBurnLimitRequest {
    const message = createBaseQueryGetPerMessageBurnLimitRequest();
    message.denom = object.denom ?? "";
    return message;
  },
  fromAmino(object: QueryGetPerMessageBurnLimitRequestAmino): QueryGetPerMessageBurnLimitRequest {
    const message = createBaseQueryGetPerMessageBurnLimitRequest();
    if (object.denom !== undefined && object.denom !== null) {
      message.denom = object.denom;
    }
    return message;
  },
  toAmino(message: QueryGetPerMessageBurnLimitRequest, useInterfaces: boolean = false): QueryGetPerMessageBurnLimitRequestAmino {
    const obj: any = {};
    obj.denom = message.denom;
    return obj;
  },
  fromAminoMsg(object: QueryGetPerMessageBurnLimitRequestAminoMsg): QueryGetPerMessageBurnLimitRequest {
    return QueryGetPerMessageBurnLimitRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryGetPerMessageBurnLimitRequestProtoMsg, useInterfaces: boolean = false): QueryGetPerMessageBurnLimitRequest {
    return QueryGetPerMessageBurnLimitRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryGetPerMessageBurnLimitRequest): Uint8Array {
    return QueryGetPerMessageBurnLimitRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryGetPerMessageBurnLimitRequest): QueryGetPerMessageBurnLimitRequestProtoMsg {
    return {
      typeUrl: "/circle.cctp.v1.QueryGetPerMessageBurnLimitRequest",
      value: QueryGetPerMessageBurnLimitRequest.encode(message).finish()
    };
  }
};
function createBaseQueryGetPerMessageBurnLimitResponse(): QueryGetPerMessageBurnLimitResponse {
  return {
    burnLimit: PerMessageBurnLimit.fromPartial({})
  };
}
export const QueryGetPerMessageBurnLimitResponse = {
  typeUrl: "/circle.cctp.v1.QueryGetPerMessageBurnLimitResponse",
  encode(message: QueryGetPerMessageBurnLimitResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.burnLimit !== undefined) {
      PerMessageBurnLimit.encode(message.burnLimit, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryGetPerMessageBurnLimitResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetPerMessageBurnLimitResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.burnLimit = PerMessageBurnLimit.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryGetPerMessageBurnLimitResponse>): QueryGetPerMessageBurnLimitResponse {
    const message = createBaseQueryGetPerMessageBurnLimitResponse();
    message.burnLimit = object.burnLimit !== undefined && object.burnLimit !== null ? PerMessageBurnLimit.fromPartial(object.burnLimit) : undefined;
    return message;
  },
  fromAmino(object: QueryGetPerMessageBurnLimitResponseAmino): QueryGetPerMessageBurnLimitResponse {
    const message = createBaseQueryGetPerMessageBurnLimitResponse();
    if (object.burn_limit !== undefined && object.burn_limit !== null) {
      message.burnLimit = PerMessageBurnLimit.fromAmino(object.burn_limit);
    }
    return message;
  },
  toAmino(message: QueryGetPerMessageBurnLimitResponse, useInterfaces: boolean = false): QueryGetPerMessageBurnLimitResponseAmino {
    const obj: any = {};
    obj.burn_limit = message.burnLimit ? PerMessageBurnLimit.toAmino(message.burnLimit, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryGetPerMessageBurnLimitResponseAminoMsg): QueryGetPerMessageBurnLimitResponse {
    return QueryGetPerMessageBurnLimitResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryGetPerMessageBurnLimitResponseProtoMsg, useInterfaces: boolean = false): QueryGetPerMessageBurnLimitResponse {
    return QueryGetPerMessageBurnLimitResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryGetPerMessageBurnLimitResponse): Uint8Array {
    return QueryGetPerMessageBurnLimitResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryGetPerMessageBurnLimitResponse): QueryGetPerMessageBurnLimitResponseProtoMsg {
    return {
      typeUrl: "/circle.cctp.v1.QueryGetPerMessageBurnLimitResponse",
      value: QueryGetPerMessageBurnLimitResponse.encode(message).finish()
    };
  }
};
function createBaseQueryAllPerMessageBurnLimitsRequest(): QueryAllPerMessageBurnLimitsRequest {
  return {
    pagination: undefined
  };
}
export const QueryAllPerMessageBurnLimitsRequest = {
  typeUrl: "/circle.cctp.v1.QueryAllPerMessageBurnLimitsRequest",
  encode(message: QueryAllPerMessageBurnLimitsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryAllPerMessageBurnLimitsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllPerMessageBurnLimitsRequest();
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
  fromPartial(object: Partial<QueryAllPerMessageBurnLimitsRequest>): QueryAllPerMessageBurnLimitsRequest {
    const message = createBaseQueryAllPerMessageBurnLimitsRequest();
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryAllPerMessageBurnLimitsRequestAmino): QueryAllPerMessageBurnLimitsRequest {
    const message = createBaseQueryAllPerMessageBurnLimitsRequest();
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryAllPerMessageBurnLimitsRequest, useInterfaces: boolean = false): QueryAllPerMessageBurnLimitsRequestAmino {
    const obj: any = {};
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryAllPerMessageBurnLimitsRequestAminoMsg): QueryAllPerMessageBurnLimitsRequest {
    return QueryAllPerMessageBurnLimitsRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAllPerMessageBurnLimitsRequestProtoMsg, useInterfaces: boolean = false): QueryAllPerMessageBurnLimitsRequest {
    return QueryAllPerMessageBurnLimitsRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryAllPerMessageBurnLimitsRequest): Uint8Array {
    return QueryAllPerMessageBurnLimitsRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryAllPerMessageBurnLimitsRequest): QueryAllPerMessageBurnLimitsRequestProtoMsg {
    return {
      typeUrl: "/circle.cctp.v1.QueryAllPerMessageBurnLimitsRequest",
      value: QueryAllPerMessageBurnLimitsRequest.encode(message).finish()
    };
  }
};
function createBaseQueryAllPerMessageBurnLimitsResponse(): QueryAllPerMessageBurnLimitsResponse {
  return {
    burnLimits: [],
    pagination: undefined
  };
}
export const QueryAllPerMessageBurnLimitsResponse = {
  typeUrl: "/circle.cctp.v1.QueryAllPerMessageBurnLimitsResponse",
  encode(message: QueryAllPerMessageBurnLimitsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.burnLimits) {
      PerMessageBurnLimit.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryAllPerMessageBurnLimitsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllPerMessageBurnLimitsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.burnLimits.push(PerMessageBurnLimit.decode(reader, reader.uint32(), useInterfaces));
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
  fromPartial(object: Partial<QueryAllPerMessageBurnLimitsResponse>): QueryAllPerMessageBurnLimitsResponse {
    const message = createBaseQueryAllPerMessageBurnLimitsResponse();
    message.burnLimits = object.burnLimits?.map(e => PerMessageBurnLimit.fromPartial(e)) || [];
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryAllPerMessageBurnLimitsResponseAmino): QueryAllPerMessageBurnLimitsResponse {
    const message = createBaseQueryAllPerMessageBurnLimitsResponse();
    message.burnLimits = object.burn_limits?.map(e => PerMessageBurnLimit.fromAmino(e)) || [];
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryAllPerMessageBurnLimitsResponse, useInterfaces: boolean = false): QueryAllPerMessageBurnLimitsResponseAmino {
    const obj: any = {};
    if (message.burnLimits) {
      obj.burn_limits = message.burnLimits.map(e => e ? PerMessageBurnLimit.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.burn_limits = [];
    }
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryAllPerMessageBurnLimitsResponseAminoMsg): QueryAllPerMessageBurnLimitsResponse {
    return QueryAllPerMessageBurnLimitsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAllPerMessageBurnLimitsResponseProtoMsg, useInterfaces: boolean = false): QueryAllPerMessageBurnLimitsResponse {
    return QueryAllPerMessageBurnLimitsResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryAllPerMessageBurnLimitsResponse): Uint8Array {
    return QueryAllPerMessageBurnLimitsResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryAllPerMessageBurnLimitsResponse): QueryAllPerMessageBurnLimitsResponseProtoMsg {
    return {
      typeUrl: "/circle.cctp.v1.QueryAllPerMessageBurnLimitsResponse",
      value: QueryAllPerMessageBurnLimitsResponse.encode(message).finish()
    };
  }
};
function createBaseQueryGetBurningAndMintingPausedRequest(): QueryGetBurningAndMintingPausedRequest {
  return {};
}
export const QueryGetBurningAndMintingPausedRequest = {
  typeUrl: "/circle.cctp.v1.QueryGetBurningAndMintingPausedRequest",
  encode(_: QueryGetBurningAndMintingPausedRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryGetBurningAndMintingPausedRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetBurningAndMintingPausedRequest();
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
  fromPartial(_: Partial<QueryGetBurningAndMintingPausedRequest>): QueryGetBurningAndMintingPausedRequest {
    const message = createBaseQueryGetBurningAndMintingPausedRequest();
    return message;
  },
  fromAmino(_: QueryGetBurningAndMintingPausedRequestAmino): QueryGetBurningAndMintingPausedRequest {
    const message = createBaseQueryGetBurningAndMintingPausedRequest();
    return message;
  },
  toAmino(_: QueryGetBurningAndMintingPausedRequest, useInterfaces: boolean = false): QueryGetBurningAndMintingPausedRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: QueryGetBurningAndMintingPausedRequestAminoMsg): QueryGetBurningAndMintingPausedRequest {
    return QueryGetBurningAndMintingPausedRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryGetBurningAndMintingPausedRequestProtoMsg, useInterfaces: boolean = false): QueryGetBurningAndMintingPausedRequest {
    return QueryGetBurningAndMintingPausedRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryGetBurningAndMintingPausedRequest): Uint8Array {
    return QueryGetBurningAndMintingPausedRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryGetBurningAndMintingPausedRequest): QueryGetBurningAndMintingPausedRequestProtoMsg {
    return {
      typeUrl: "/circle.cctp.v1.QueryGetBurningAndMintingPausedRequest",
      value: QueryGetBurningAndMintingPausedRequest.encode(message).finish()
    };
  }
};
function createBaseQueryGetBurningAndMintingPausedResponse(): QueryGetBurningAndMintingPausedResponse {
  return {
    paused: BurningAndMintingPaused.fromPartial({})
  };
}
export const QueryGetBurningAndMintingPausedResponse = {
  typeUrl: "/circle.cctp.v1.QueryGetBurningAndMintingPausedResponse",
  encode(message: QueryGetBurningAndMintingPausedResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.paused !== undefined) {
      BurningAndMintingPaused.encode(message.paused, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryGetBurningAndMintingPausedResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetBurningAndMintingPausedResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.paused = BurningAndMintingPaused.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryGetBurningAndMintingPausedResponse>): QueryGetBurningAndMintingPausedResponse {
    const message = createBaseQueryGetBurningAndMintingPausedResponse();
    message.paused = object.paused !== undefined && object.paused !== null ? BurningAndMintingPaused.fromPartial(object.paused) : undefined;
    return message;
  },
  fromAmino(object: QueryGetBurningAndMintingPausedResponseAmino): QueryGetBurningAndMintingPausedResponse {
    const message = createBaseQueryGetBurningAndMintingPausedResponse();
    if (object.paused !== undefined && object.paused !== null) {
      message.paused = BurningAndMintingPaused.fromAmino(object.paused);
    }
    return message;
  },
  toAmino(message: QueryGetBurningAndMintingPausedResponse, useInterfaces: boolean = false): QueryGetBurningAndMintingPausedResponseAmino {
    const obj: any = {};
    obj.paused = message.paused ? BurningAndMintingPaused.toAmino(message.paused, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryGetBurningAndMintingPausedResponseAminoMsg): QueryGetBurningAndMintingPausedResponse {
    return QueryGetBurningAndMintingPausedResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryGetBurningAndMintingPausedResponseProtoMsg, useInterfaces: boolean = false): QueryGetBurningAndMintingPausedResponse {
    return QueryGetBurningAndMintingPausedResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryGetBurningAndMintingPausedResponse): Uint8Array {
    return QueryGetBurningAndMintingPausedResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryGetBurningAndMintingPausedResponse): QueryGetBurningAndMintingPausedResponseProtoMsg {
    return {
      typeUrl: "/circle.cctp.v1.QueryGetBurningAndMintingPausedResponse",
      value: QueryGetBurningAndMintingPausedResponse.encode(message).finish()
    };
  }
};
function createBaseQueryGetSendingAndReceivingMessagesPausedRequest(): QueryGetSendingAndReceivingMessagesPausedRequest {
  return {};
}
export const QueryGetSendingAndReceivingMessagesPausedRequest = {
  typeUrl: "/circle.cctp.v1.QueryGetSendingAndReceivingMessagesPausedRequest",
  encode(_: QueryGetSendingAndReceivingMessagesPausedRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryGetSendingAndReceivingMessagesPausedRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetSendingAndReceivingMessagesPausedRequest();
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
  fromPartial(_: Partial<QueryGetSendingAndReceivingMessagesPausedRequest>): QueryGetSendingAndReceivingMessagesPausedRequest {
    const message = createBaseQueryGetSendingAndReceivingMessagesPausedRequest();
    return message;
  },
  fromAmino(_: QueryGetSendingAndReceivingMessagesPausedRequestAmino): QueryGetSendingAndReceivingMessagesPausedRequest {
    const message = createBaseQueryGetSendingAndReceivingMessagesPausedRequest();
    return message;
  },
  toAmino(_: QueryGetSendingAndReceivingMessagesPausedRequest, useInterfaces: boolean = false): QueryGetSendingAndReceivingMessagesPausedRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: QueryGetSendingAndReceivingMessagesPausedRequestAminoMsg): QueryGetSendingAndReceivingMessagesPausedRequest {
    return QueryGetSendingAndReceivingMessagesPausedRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryGetSendingAndReceivingMessagesPausedRequestProtoMsg, useInterfaces: boolean = false): QueryGetSendingAndReceivingMessagesPausedRequest {
    return QueryGetSendingAndReceivingMessagesPausedRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryGetSendingAndReceivingMessagesPausedRequest): Uint8Array {
    return QueryGetSendingAndReceivingMessagesPausedRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryGetSendingAndReceivingMessagesPausedRequest): QueryGetSendingAndReceivingMessagesPausedRequestProtoMsg {
    return {
      typeUrl: "/circle.cctp.v1.QueryGetSendingAndReceivingMessagesPausedRequest",
      value: QueryGetSendingAndReceivingMessagesPausedRequest.encode(message).finish()
    };
  }
};
function createBaseQueryGetSendingAndReceivingMessagesPausedResponse(): QueryGetSendingAndReceivingMessagesPausedResponse {
  return {
    paused: SendingAndReceivingMessagesPaused.fromPartial({})
  };
}
export const QueryGetSendingAndReceivingMessagesPausedResponse = {
  typeUrl: "/circle.cctp.v1.QueryGetSendingAndReceivingMessagesPausedResponse",
  encode(message: QueryGetSendingAndReceivingMessagesPausedResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.paused !== undefined) {
      SendingAndReceivingMessagesPaused.encode(message.paused, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryGetSendingAndReceivingMessagesPausedResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetSendingAndReceivingMessagesPausedResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.paused = SendingAndReceivingMessagesPaused.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryGetSendingAndReceivingMessagesPausedResponse>): QueryGetSendingAndReceivingMessagesPausedResponse {
    const message = createBaseQueryGetSendingAndReceivingMessagesPausedResponse();
    message.paused = object.paused !== undefined && object.paused !== null ? SendingAndReceivingMessagesPaused.fromPartial(object.paused) : undefined;
    return message;
  },
  fromAmino(object: QueryGetSendingAndReceivingMessagesPausedResponseAmino): QueryGetSendingAndReceivingMessagesPausedResponse {
    const message = createBaseQueryGetSendingAndReceivingMessagesPausedResponse();
    if (object.paused !== undefined && object.paused !== null) {
      message.paused = SendingAndReceivingMessagesPaused.fromAmino(object.paused);
    }
    return message;
  },
  toAmino(message: QueryGetSendingAndReceivingMessagesPausedResponse, useInterfaces: boolean = false): QueryGetSendingAndReceivingMessagesPausedResponseAmino {
    const obj: any = {};
    obj.paused = message.paused ? SendingAndReceivingMessagesPaused.toAmino(message.paused, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryGetSendingAndReceivingMessagesPausedResponseAminoMsg): QueryGetSendingAndReceivingMessagesPausedResponse {
    return QueryGetSendingAndReceivingMessagesPausedResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryGetSendingAndReceivingMessagesPausedResponseProtoMsg, useInterfaces: boolean = false): QueryGetSendingAndReceivingMessagesPausedResponse {
    return QueryGetSendingAndReceivingMessagesPausedResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryGetSendingAndReceivingMessagesPausedResponse): Uint8Array {
    return QueryGetSendingAndReceivingMessagesPausedResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryGetSendingAndReceivingMessagesPausedResponse): QueryGetSendingAndReceivingMessagesPausedResponseProtoMsg {
    return {
      typeUrl: "/circle.cctp.v1.QueryGetSendingAndReceivingMessagesPausedResponse",
      value: QueryGetSendingAndReceivingMessagesPausedResponse.encode(message).finish()
    };
  }
};
function createBaseQueryGetMaxMessageBodySizeRequest(): QueryGetMaxMessageBodySizeRequest {
  return {};
}
export const QueryGetMaxMessageBodySizeRequest = {
  typeUrl: "/circle.cctp.v1.QueryGetMaxMessageBodySizeRequest",
  encode(_: QueryGetMaxMessageBodySizeRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryGetMaxMessageBodySizeRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetMaxMessageBodySizeRequest();
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
  fromPartial(_: Partial<QueryGetMaxMessageBodySizeRequest>): QueryGetMaxMessageBodySizeRequest {
    const message = createBaseQueryGetMaxMessageBodySizeRequest();
    return message;
  },
  fromAmino(_: QueryGetMaxMessageBodySizeRequestAmino): QueryGetMaxMessageBodySizeRequest {
    const message = createBaseQueryGetMaxMessageBodySizeRequest();
    return message;
  },
  toAmino(_: QueryGetMaxMessageBodySizeRequest, useInterfaces: boolean = false): QueryGetMaxMessageBodySizeRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: QueryGetMaxMessageBodySizeRequestAminoMsg): QueryGetMaxMessageBodySizeRequest {
    return QueryGetMaxMessageBodySizeRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryGetMaxMessageBodySizeRequestProtoMsg, useInterfaces: boolean = false): QueryGetMaxMessageBodySizeRequest {
    return QueryGetMaxMessageBodySizeRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryGetMaxMessageBodySizeRequest): Uint8Array {
    return QueryGetMaxMessageBodySizeRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryGetMaxMessageBodySizeRequest): QueryGetMaxMessageBodySizeRequestProtoMsg {
    return {
      typeUrl: "/circle.cctp.v1.QueryGetMaxMessageBodySizeRequest",
      value: QueryGetMaxMessageBodySizeRequest.encode(message).finish()
    };
  }
};
function createBaseQueryGetMaxMessageBodySizeResponse(): QueryGetMaxMessageBodySizeResponse {
  return {
    amount: MaxMessageBodySize.fromPartial({})
  };
}
export const QueryGetMaxMessageBodySizeResponse = {
  typeUrl: "/circle.cctp.v1.QueryGetMaxMessageBodySizeResponse",
  encode(message: QueryGetMaxMessageBodySizeResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.amount !== undefined) {
      MaxMessageBodySize.encode(message.amount, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryGetMaxMessageBodySizeResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetMaxMessageBodySizeResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.amount = MaxMessageBodySize.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryGetMaxMessageBodySizeResponse>): QueryGetMaxMessageBodySizeResponse {
    const message = createBaseQueryGetMaxMessageBodySizeResponse();
    message.amount = object.amount !== undefined && object.amount !== null ? MaxMessageBodySize.fromPartial(object.amount) : undefined;
    return message;
  },
  fromAmino(object: QueryGetMaxMessageBodySizeResponseAmino): QueryGetMaxMessageBodySizeResponse {
    const message = createBaseQueryGetMaxMessageBodySizeResponse();
    if (object.amount !== undefined && object.amount !== null) {
      message.amount = MaxMessageBodySize.fromAmino(object.amount);
    }
    return message;
  },
  toAmino(message: QueryGetMaxMessageBodySizeResponse, useInterfaces: boolean = false): QueryGetMaxMessageBodySizeResponseAmino {
    const obj: any = {};
    obj.amount = message.amount ? MaxMessageBodySize.toAmino(message.amount, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryGetMaxMessageBodySizeResponseAminoMsg): QueryGetMaxMessageBodySizeResponse {
    return QueryGetMaxMessageBodySizeResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryGetMaxMessageBodySizeResponseProtoMsg, useInterfaces: boolean = false): QueryGetMaxMessageBodySizeResponse {
    return QueryGetMaxMessageBodySizeResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryGetMaxMessageBodySizeResponse): Uint8Array {
    return QueryGetMaxMessageBodySizeResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryGetMaxMessageBodySizeResponse): QueryGetMaxMessageBodySizeResponseProtoMsg {
    return {
      typeUrl: "/circle.cctp.v1.QueryGetMaxMessageBodySizeResponse",
      value: QueryGetMaxMessageBodySizeResponse.encode(message).finish()
    };
  }
};
function createBaseQueryGetNextAvailableNonceRequest(): QueryGetNextAvailableNonceRequest {
  return {};
}
export const QueryGetNextAvailableNonceRequest = {
  typeUrl: "/circle.cctp.v1.QueryGetNextAvailableNonceRequest",
  encode(_: QueryGetNextAvailableNonceRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryGetNextAvailableNonceRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetNextAvailableNonceRequest();
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
  fromPartial(_: Partial<QueryGetNextAvailableNonceRequest>): QueryGetNextAvailableNonceRequest {
    const message = createBaseQueryGetNextAvailableNonceRequest();
    return message;
  },
  fromAmino(_: QueryGetNextAvailableNonceRequestAmino): QueryGetNextAvailableNonceRequest {
    const message = createBaseQueryGetNextAvailableNonceRequest();
    return message;
  },
  toAmino(_: QueryGetNextAvailableNonceRequest, useInterfaces: boolean = false): QueryGetNextAvailableNonceRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: QueryGetNextAvailableNonceRequestAminoMsg): QueryGetNextAvailableNonceRequest {
    return QueryGetNextAvailableNonceRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryGetNextAvailableNonceRequestProtoMsg, useInterfaces: boolean = false): QueryGetNextAvailableNonceRequest {
    return QueryGetNextAvailableNonceRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryGetNextAvailableNonceRequest): Uint8Array {
    return QueryGetNextAvailableNonceRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryGetNextAvailableNonceRequest): QueryGetNextAvailableNonceRequestProtoMsg {
    return {
      typeUrl: "/circle.cctp.v1.QueryGetNextAvailableNonceRequest",
      value: QueryGetNextAvailableNonceRequest.encode(message).finish()
    };
  }
};
function createBaseQueryGetNextAvailableNonceResponse(): QueryGetNextAvailableNonceResponse {
  return {
    nonce: Nonce.fromPartial({})
  };
}
export const QueryGetNextAvailableNonceResponse = {
  typeUrl: "/circle.cctp.v1.QueryGetNextAvailableNonceResponse",
  encode(message: QueryGetNextAvailableNonceResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.nonce !== undefined) {
      Nonce.encode(message.nonce, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryGetNextAvailableNonceResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetNextAvailableNonceResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.nonce = Nonce.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryGetNextAvailableNonceResponse>): QueryGetNextAvailableNonceResponse {
    const message = createBaseQueryGetNextAvailableNonceResponse();
    message.nonce = object.nonce !== undefined && object.nonce !== null ? Nonce.fromPartial(object.nonce) : undefined;
    return message;
  },
  fromAmino(object: QueryGetNextAvailableNonceResponseAmino): QueryGetNextAvailableNonceResponse {
    const message = createBaseQueryGetNextAvailableNonceResponse();
    if (object.nonce !== undefined && object.nonce !== null) {
      message.nonce = Nonce.fromAmino(object.nonce);
    }
    return message;
  },
  toAmino(message: QueryGetNextAvailableNonceResponse, useInterfaces: boolean = false): QueryGetNextAvailableNonceResponseAmino {
    const obj: any = {};
    obj.nonce = message.nonce ? Nonce.toAmino(message.nonce, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryGetNextAvailableNonceResponseAminoMsg): QueryGetNextAvailableNonceResponse {
    return QueryGetNextAvailableNonceResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryGetNextAvailableNonceResponseProtoMsg, useInterfaces: boolean = false): QueryGetNextAvailableNonceResponse {
    return QueryGetNextAvailableNonceResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryGetNextAvailableNonceResponse): Uint8Array {
    return QueryGetNextAvailableNonceResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryGetNextAvailableNonceResponse): QueryGetNextAvailableNonceResponseProtoMsg {
    return {
      typeUrl: "/circle.cctp.v1.QueryGetNextAvailableNonceResponse",
      value: QueryGetNextAvailableNonceResponse.encode(message).finish()
    };
  }
};
function createBaseQueryGetSignatureThresholdRequest(): QueryGetSignatureThresholdRequest {
  return {};
}
export const QueryGetSignatureThresholdRequest = {
  typeUrl: "/circle.cctp.v1.QueryGetSignatureThresholdRequest",
  encode(_: QueryGetSignatureThresholdRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryGetSignatureThresholdRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetSignatureThresholdRequest();
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
  fromPartial(_: Partial<QueryGetSignatureThresholdRequest>): QueryGetSignatureThresholdRequest {
    const message = createBaseQueryGetSignatureThresholdRequest();
    return message;
  },
  fromAmino(_: QueryGetSignatureThresholdRequestAmino): QueryGetSignatureThresholdRequest {
    const message = createBaseQueryGetSignatureThresholdRequest();
    return message;
  },
  toAmino(_: QueryGetSignatureThresholdRequest, useInterfaces: boolean = false): QueryGetSignatureThresholdRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: QueryGetSignatureThresholdRequestAminoMsg): QueryGetSignatureThresholdRequest {
    return QueryGetSignatureThresholdRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryGetSignatureThresholdRequestProtoMsg, useInterfaces: boolean = false): QueryGetSignatureThresholdRequest {
    return QueryGetSignatureThresholdRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryGetSignatureThresholdRequest): Uint8Array {
    return QueryGetSignatureThresholdRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryGetSignatureThresholdRequest): QueryGetSignatureThresholdRequestProtoMsg {
    return {
      typeUrl: "/circle.cctp.v1.QueryGetSignatureThresholdRequest",
      value: QueryGetSignatureThresholdRequest.encode(message).finish()
    };
  }
};
function createBaseQueryGetSignatureThresholdResponse(): QueryGetSignatureThresholdResponse {
  return {
    amount: SignatureThreshold.fromPartial({})
  };
}
export const QueryGetSignatureThresholdResponse = {
  typeUrl: "/circle.cctp.v1.QueryGetSignatureThresholdResponse",
  encode(message: QueryGetSignatureThresholdResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.amount !== undefined) {
      SignatureThreshold.encode(message.amount, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryGetSignatureThresholdResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetSignatureThresholdResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.amount = SignatureThreshold.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryGetSignatureThresholdResponse>): QueryGetSignatureThresholdResponse {
    const message = createBaseQueryGetSignatureThresholdResponse();
    message.amount = object.amount !== undefined && object.amount !== null ? SignatureThreshold.fromPartial(object.amount) : undefined;
    return message;
  },
  fromAmino(object: QueryGetSignatureThresholdResponseAmino): QueryGetSignatureThresholdResponse {
    const message = createBaseQueryGetSignatureThresholdResponse();
    if (object.amount !== undefined && object.amount !== null) {
      message.amount = SignatureThreshold.fromAmino(object.amount);
    }
    return message;
  },
  toAmino(message: QueryGetSignatureThresholdResponse, useInterfaces: boolean = false): QueryGetSignatureThresholdResponseAmino {
    const obj: any = {};
    obj.amount = message.amount ? SignatureThreshold.toAmino(message.amount, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryGetSignatureThresholdResponseAminoMsg): QueryGetSignatureThresholdResponse {
    return QueryGetSignatureThresholdResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryGetSignatureThresholdResponseProtoMsg, useInterfaces: boolean = false): QueryGetSignatureThresholdResponse {
    return QueryGetSignatureThresholdResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryGetSignatureThresholdResponse): Uint8Array {
    return QueryGetSignatureThresholdResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryGetSignatureThresholdResponse): QueryGetSignatureThresholdResponseProtoMsg {
    return {
      typeUrl: "/circle.cctp.v1.QueryGetSignatureThresholdResponse",
      value: QueryGetSignatureThresholdResponse.encode(message).finish()
    };
  }
};
function createBaseQueryGetTokenPairRequest(): QueryGetTokenPairRequest {
  return {
    remoteDomain: 0,
    remoteToken: ""
  };
}
export const QueryGetTokenPairRequest = {
  typeUrl: "/circle.cctp.v1.QueryGetTokenPairRequest",
  encode(message: QueryGetTokenPairRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.remoteDomain !== 0) {
      writer.uint32(8).uint32(message.remoteDomain);
    }
    if (message.remoteToken !== "") {
      writer.uint32(18).string(message.remoteToken);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryGetTokenPairRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetTokenPairRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.remoteDomain = reader.uint32();
          break;
        case 2:
          message.remoteToken = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryGetTokenPairRequest>): QueryGetTokenPairRequest {
    const message = createBaseQueryGetTokenPairRequest();
    message.remoteDomain = object.remoteDomain ?? 0;
    message.remoteToken = object.remoteToken ?? "";
    return message;
  },
  fromAmino(object: QueryGetTokenPairRequestAmino): QueryGetTokenPairRequest {
    const message = createBaseQueryGetTokenPairRequest();
    if (object.remote_domain !== undefined && object.remote_domain !== null) {
      message.remoteDomain = object.remote_domain;
    }
    if (object.remote_token !== undefined && object.remote_token !== null) {
      message.remoteToken = object.remote_token;
    }
    return message;
  },
  toAmino(message: QueryGetTokenPairRequest, useInterfaces: boolean = false): QueryGetTokenPairRequestAmino {
    const obj: any = {};
    obj.remote_domain = message.remoteDomain;
    obj.remote_token = message.remoteToken;
    return obj;
  },
  fromAminoMsg(object: QueryGetTokenPairRequestAminoMsg): QueryGetTokenPairRequest {
    return QueryGetTokenPairRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryGetTokenPairRequestProtoMsg, useInterfaces: boolean = false): QueryGetTokenPairRequest {
    return QueryGetTokenPairRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryGetTokenPairRequest): Uint8Array {
    return QueryGetTokenPairRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryGetTokenPairRequest): QueryGetTokenPairRequestProtoMsg {
    return {
      typeUrl: "/circle.cctp.v1.QueryGetTokenPairRequest",
      value: QueryGetTokenPairRequest.encode(message).finish()
    };
  }
};
function createBaseQueryGetTokenPairResponse(): QueryGetTokenPairResponse {
  return {
    pair: TokenPair.fromPartial({})
  };
}
export const QueryGetTokenPairResponse = {
  typeUrl: "/circle.cctp.v1.QueryGetTokenPairResponse",
  encode(message: QueryGetTokenPairResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.pair !== undefined) {
      TokenPair.encode(message.pair, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryGetTokenPairResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetTokenPairResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pair = TokenPair.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryGetTokenPairResponse>): QueryGetTokenPairResponse {
    const message = createBaseQueryGetTokenPairResponse();
    message.pair = object.pair !== undefined && object.pair !== null ? TokenPair.fromPartial(object.pair) : undefined;
    return message;
  },
  fromAmino(object: QueryGetTokenPairResponseAmino): QueryGetTokenPairResponse {
    const message = createBaseQueryGetTokenPairResponse();
    if (object.pair !== undefined && object.pair !== null) {
      message.pair = TokenPair.fromAmino(object.pair);
    }
    return message;
  },
  toAmino(message: QueryGetTokenPairResponse, useInterfaces: boolean = false): QueryGetTokenPairResponseAmino {
    const obj: any = {};
    obj.pair = message.pair ? TokenPair.toAmino(message.pair, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryGetTokenPairResponseAminoMsg): QueryGetTokenPairResponse {
    return QueryGetTokenPairResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryGetTokenPairResponseProtoMsg, useInterfaces: boolean = false): QueryGetTokenPairResponse {
    return QueryGetTokenPairResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryGetTokenPairResponse): Uint8Array {
    return QueryGetTokenPairResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryGetTokenPairResponse): QueryGetTokenPairResponseProtoMsg {
    return {
      typeUrl: "/circle.cctp.v1.QueryGetTokenPairResponse",
      value: QueryGetTokenPairResponse.encode(message).finish()
    };
  }
};
function createBaseQueryAllTokenPairsRequest(): QueryAllTokenPairsRequest {
  return {
    pagination: undefined
  };
}
export const QueryAllTokenPairsRequest = {
  typeUrl: "/circle.cctp.v1.QueryAllTokenPairsRequest",
  encode(message: QueryAllTokenPairsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryAllTokenPairsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllTokenPairsRequest();
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
  fromPartial(object: Partial<QueryAllTokenPairsRequest>): QueryAllTokenPairsRequest {
    const message = createBaseQueryAllTokenPairsRequest();
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryAllTokenPairsRequestAmino): QueryAllTokenPairsRequest {
    const message = createBaseQueryAllTokenPairsRequest();
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryAllTokenPairsRequest, useInterfaces: boolean = false): QueryAllTokenPairsRequestAmino {
    const obj: any = {};
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryAllTokenPairsRequestAminoMsg): QueryAllTokenPairsRequest {
    return QueryAllTokenPairsRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAllTokenPairsRequestProtoMsg, useInterfaces: boolean = false): QueryAllTokenPairsRequest {
    return QueryAllTokenPairsRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryAllTokenPairsRequest): Uint8Array {
    return QueryAllTokenPairsRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryAllTokenPairsRequest): QueryAllTokenPairsRequestProtoMsg {
    return {
      typeUrl: "/circle.cctp.v1.QueryAllTokenPairsRequest",
      value: QueryAllTokenPairsRequest.encode(message).finish()
    };
  }
};
function createBaseQueryAllTokenPairsResponse(): QueryAllTokenPairsResponse {
  return {
    tokenPairs: [],
    pagination: undefined
  };
}
export const QueryAllTokenPairsResponse = {
  typeUrl: "/circle.cctp.v1.QueryAllTokenPairsResponse",
  encode(message: QueryAllTokenPairsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.tokenPairs) {
      TokenPair.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryAllTokenPairsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllTokenPairsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.tokenPairs.push(TokenPair.decode(reader, reader.uint32(), useInterfaces));
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
  fromPartial(object: Partial<QueryAllTokenPairsResponse>): QueryAllTokenPairsResponse {
    const message = createBaseQueryAllTokenPairsResponse();
    message.tokenPairs = object.tokenPairs?.map(e => TokenPair.fromPartial(e)) || [];
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryAllTokenPairsResponseAmino): QueryAllTokenPairsResponse {
    const message = createBaseQueryAllTokenPairsResponse();
    message.tokenPairs = object.token_pairs?.map(e => TokenPair.fromAmino(e)) || [];
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryAllTokenPairsResponse, useInterfaces: boolean = false): QueryAllTokenPairsResponseAmino {
    const obj: any = {};
    if (message.tokenPairs) {
      obj.token_pairs = message.tokenPairs.map(e => e ? TokenPair.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.token_pairs = [];
    }
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryAllTokenPairsResponseAminoMsg): QueryAllTokenPairsResponse {
    return QueryAllTokenPairsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAllTokenPairsResponseProtoMsg, useInterfaces: boolean = false): QueryAllTokenPairsResponse {
    return QueryAllTokenPairsResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryAllTokenPairsResponse): Uint8Array {
    return QueryAllTokenPairsResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryAllTokenPairsResponse): QueryAllTokenPairsResponseProtoMsg {
    return {
      typeUrl: "/circle.cctp.v1.QueryAllTokenPairsResponse",
      value: QueryAllTokenPairsResponse.encode(message).finish()
    };
  }
};
function createBaseQueryGetUsedNonceRequest(): QueryGetUsedNonceRequest {
  return {
    sourceDomain: 0,
    nonce: BigInt(0)
  };
}
export const QueryGetUsedNonceRequest = {
  typeUrl: "/circle.cctp.v1.QueryGetUsedNonceRequest",
  encode(message: QueryGetUsedNonceRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.sourceDomain !== 0) {
      writer.uint32(8).uint32(message.sourceDomain);
    }
    if (message.nonce !== BigInt(0)) {
      writer.uint32(16).uint64(message.nonce);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryGetUsedNonceRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetUsedNonceRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sourceDomain = reader.uint32();
          break;
        case 2:
          message.nonce = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryGetUsedNonceRequest>): QueryGetUsedNonceRequest {
    const message = createBaseQueryGetUsedNonceRequest();
    message.sourceDomain = object.sourceDomain ?? 0;
    message.nonce = object.nonce !== undefined && object.nonce !== null ? BigInt(object.nonce.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: QueryGetUsedNonceRequestAmino): QueryGetUsedNonceRequest {
    const message = createBaseQueryGetUsedNonceRequest();
    if (object.source_domain !== undefined && object.source_domain !== null) {
      message.sourceDomain = object.source_domain;
    }
    if (object.nonce !== undefined && object.nonce !== null) {
      message.nonce = BigInt(object.nonce);
    }
    return message;
  },
  toAmino(message: QueryGetUsedNonceRequest, useInterfaces: boolean = false): QueryGetUsedNonceRequestAmino {
    const obj: any = {};
    obj.source_domain = message.sourceDomain;
    obj.nonce = message.nonce ? message.nonce.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryGetUsedNonceRequestAminoMsg): QueryGetUsedNonceRequest {
    return QueryGetUsedNonceRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryGetUsedNonceRequestProtoMsg, useInterfaces: boolean = false): QueryGetUsedNonceRequest {
    return QueryGetUsedNonceRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryGetUsedNonceRequest): Uint8Array {
    return QueryGetUsedNonceRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryGetUsedNonceRequest): QueryGetUsedNonceRequestProtoMsg {
    return {
      typeUrl: "/circle.cctp.v1.QueryGetUsedNonceRequest",
      value: QueryGetUsedNonceRequest.encode(message).finish()
    };
  }
};
function createBaseQueryGetUsedNonceResponse(): QueryGetUsedNonceResponse {
  return {
    nonce: Nonce.fromPartial({})
  };
}
export const QueryGetUsedNonceResponse = {
  typeUrl: "/circle.cctp.v1.QueryGetUsedNonceResponse",
  encode(message: QueryGetUsedNonceResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.nonce !== undefined) {
      Nonce.encode(message.nonce, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryGetUsedNonceResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetUsedNonceResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.nonce = Nonce.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryGetUsedNonceResponse>): QueryGetUsedNonceResponse {
    const message = createBaseQueryGetUsedNonceResponse();
    message.nonce = object.nonce !== undefined && object.nonce !== null ? Nonce.fromPartial(object.nonce) : undefined;
    return message;
  },
  fromAmino(object: QueryGetUsedNonceResponseAmino): QueryGetUsedNonceResponse {
    const message = createBaseQueryGetUsedNonceResponse();
    if (object.nonce !== undefined && object.nonce !== null) {
      message.nonce = Nonce.fromAmino(object.nonce);
    }
    return message;
  },
  toAmino(message: QueryGetUsedNonceResponse, useInterfaces: boolean = false): QueryGetUsedNonceResponseAmino {
    const obj: any = {};
    obj.nonce = message.nonce ? Nonce.toAmino(message.nonce, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryGetUsedNonceResponseAminoMsg): QueryGetUsedNonceResponse {
    return QueryGetUsedNonceResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryGetUsedNonceResponseProtoMsg, useInterfaces: boolean = false): QueryGetUsedNonceResponse {
    return QueryGetUsedNonceResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryGetUsedNonceResponse): Uint8Array {
    return QueryGetUsedNonceResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryGetUsedNonceResponse): QueryGetUsedNonceResponseProtoMsg {
    return {
      typeUrl: "/circle.cctp.v1.QueryGetUsedNonceResponse",
      value: QueryGetUsedNonceResponse.encode(message).finish()
    };
  }
};
function createBaseQueryAllUsedNoncesRequest(): QueryAllUsedNoncesRequest {
  return {
    pagination: undefined
  };
}
export const QueryAllUsedNoncesRequest = {
  typeUrl: "/circle.cctp.v1.QueryAllUsedNoncesRequest",
  encode(message: QueryAllUsedNoncesRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryAllUsedNoncesRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllUsedNoncesRequest();
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
  fromPartial(object: Partial<QueryAllUsedNoncesRequest>): QueryAllUsedNoncesRequest {
    const message = createBaseQueryAllUsedNoncesRequest();
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryAllUsedNoncesRequestAmino): QueryAllUsedNoncesRequest {
    const message = createBaseQueryAllUsedNoncesRequest();
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryAllUsedNoncesRequest, useInterfaces: boolean = false): QueryAllUsedNoncesRequestAmino {
    const obj: any = {};
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryAllUsedNoncesRequestAminoMsg): QueryAllUsedNoncesRequest {
    return QueryAllUsedNoncesRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAllUsedNoncesRequestProtoMsg, useInterfaces: boolean = false): QueryAllUsedNoncesRequest {
    return QueryAllUsedNoncesRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryAllUsedNoncesRequest): Uint8Array {
    return QueryAllUsedNoncesRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryAllUsedNoncesRequest): QueryAllUsedNoncesRequestProtoMsg {
    return {
      typeUrl: "/circle.cctp.v1.QueryAllUsedNoncesRequest",
      value: QueryAllUsedNoncesRequest.encode(message).finish()
    };
  }
};
function createBaseQueryAllUsedNoncesResponse(): QueryAllUsedNoncesResponse {
  return {
    usedNonces: [],
    pagination: undefined
  };
}
export const QueryAllUsedNoncesResponse = {
  typeUrl: "/circle.cctp.v1.QueryAllUsedNoncesResponse",
  encode(message: QueryAllUsedNoncesResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.usedNonces) {
      Nonce.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryAllUsedNoncesResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllUsedNoncesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.usedNonces.push(Nonce.decode(reader, reader.uint32(), useInterfaces));
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
  fromPartial(object: Partial<QueryAllUsedNoncesResponse>): QueryAllUsedNoncesResponse {
    const message = createBaseQueryAllUsedNoncesResponse();
    message.usedNonces = object.usedNonces?.map(e => Nonce.fromPartial(e)) || [];
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryAllUsedNoncesResponseAmino): QueryAllUsedNoncesResponse {
    const message = createBaseQueryAllUsedNoncesResponse();
    message.usedNonces = object.used_nonces?.map(e => Nonce.fromAmino(e)) || [];
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryAllUsedNoncesResponse, useInterfaces: boolean = false): QueryAllUsedNoncesResponseAmino {
    const obj: any = {};
    if (message.usedNonces) {
      obj.used_nonces = message.usedNonces.map(e => e ? Nonce.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.used_nonces = [];
    }
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryAllUsedNoncesResponseAminoMsg): QueryAllUsedNoncesResponse {
    return QueryAllUsedNoncesResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAllUsedNoncesResponseProtoMsg, useInterfaces: boolean = false): QueryAllUsedNoncesResponse {
    return QueryAllUsedNoncesResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryAllUsedNoncesResponse): Uint8Array {
    return QueryAllUsedNoncesResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryAllUsedNoncesResponse): QueryAllUsedNoncesResponseProtoMsg {
    return {
      typeUrl: "/circle.cctp.v1.QueryAllUsedNoncesResponse",
      value: QueryAllUsedNoncesResponse.encode(message).finish()
    };
  }
};
function createBaseQueryRemoteTokenMessengerRequest(): QueryRemoteTokenMessengerRequest {
  return {
    domainId: 0
  };
}
export const QueryRemoteTokenMessengerRequest = {
  typeUrl: "/circle.cctp.v1.QueryRemoteTokenMessengerRequest",
  encode(message: QueryRemoteTokenMessengerRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.domainId !== 0) {
      writer.uint32(8).uint32(message.domainId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryRemoteTokenMessengerRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryRemoteTokenMessengerRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.domainId = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryRemoteTokenMessengerRequest>): QueryRemoteTokenMessengerRequest {
    const message = createBaseQueryRemoteTokenMessengerRequest();
    message.domainId = object.domainId ?? 0;
    return message;
  },
  fromAmino(object: QueryRemoteTokenMessengerRequestAmino): QueryRemoteTokenMessengerRequest {
    const message = createBaseQueryRemoteTokenMessengerRequest();
    if (object.domain_id !== undefined && object.domain_id !== null) {
      message.domainId = object.domain_id;
    }
    return message;
  },
  toAmino(message: QueryRemoteTokenMessengerRequest, useInterfaces: boolean = false): QueryRemoteTokenMessengerRequestAmino {
    const obj: any = {};
    obj.domain_id = message.domainId;
    return obj;
  },
  fromAminoMsg(object: QueryRemoteTokenMessengerRequestAminoMsg): QueryRemoteTokenMessengerRequest {
    return QueryRemoteTokenMessengerRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryRemoteTokenMessengerRequestProtoMsg, useInterfaces: boolean = false): QueryRemoteTokenMessengerRequest {
    return QueryRemoteTokenMessengerRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryRemoteTokenMessengerRequest): Uint8Array {
    return QueryRemoteTokenMessengerRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryRemoteTokenMessengerRequest): QueryRemoteTokenMessengerRequestProtoMsg {
    return {
      typeUrl: "/circle.cctp.v1.QueryRemoteTokenMessengerRequest",
      value: QueryRemoteTokenMessengerRequest.encode(message).finish()
    };
  }
};
function createBaseQueryRemoteTokenMessengerResponse(): QueryRemoteTokenMessengerResponse {
  return {
    remoteTokenMessenger: RemoteTokenMessenger.fromPartial({})
  };
}
export const QueryRemoteTokenMessengerResponse = {
  typeUrl: "/circle.cctp.v1.QueryRemoteTokenMessengerResponse",
  encode(message: QueryRemoteTokenMessengerResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.remoteTokenMessenger !== undefined) {
      RemoteTokenMessenger.encode(message.remoteTokenMessenger, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryRemoteTokenMessengerResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryRemoteTokenMessengerResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.remoteTokenMessenger = RemoteTokenMessenger.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryRemoteTokenMessengerResponse>): QueryRemoteTokenMessengerResponse {
    const message = createBaseQueryRemoteTokenMessengerResponse();
    message.remoteTokenMessenger = object.remoteTokenMessenger !== undefined && object.remoteTokenMessenger !== null ? RemoteTokenMessenger.fromPartial(object.remoteTokenMessenger) : undefined;
    return message;
  },
  fromAmino(object: QueryRemoteTokenMessengerResponseAmino): QueryRemoteTokenMessengerResponse {
    const message = createBaseQueryRemoteTokenMessengerResponse();
    if (object.remote_token_messenger !== undefined && object.remote_token_messenger !== null) {
      message.remoteTokenMessenger = RemoteTokenMessenger.fromAmino(object.remote_token_messenger);
    }
    return message;
  },
  toAmino(message: QueryRemoteTokenMessengerResponse, useInterfaces: boolean = false): QueryRemoteTokenMessengerResponseAmino {
    const obj: any = {};
    obj.remote_token_messenger = message.remoteTokenMessenger ? RemoteTokenMessenger.toAmino(message.remoteTokenMessenger, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryRemoteTokenMessengerResponseAminoMsg): QueryRemoteTokenMessengerResponse {
    return QueryRemoteTokenMessengerResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryRemoteTokenMessengerResponseProtoMsg, useInterfaces: boolean = false): QueryRemoteTokenMessengerResponse {
    return QueryRemoteTokenMessengerResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryRemoteTokenMessengerResponse): Uint8Array {
    return QueryRemoteTokenMessengerResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryRemoteTokenMessengerResponse): QueryRemoteTokenMessengerResponseProtoMsg {
    return {
      typeUrl: "/circle.cctp.v1.QueryRemoteTokenMessengerResponse",
      value: QueryRemoteTokenMessengerResponse.encode(message).finish()
    };
  }
};
function createBaseQueryRemoteTokenMessengersRequest(): QueryRemoteTokenMessengersRequest {
  return {
    pagination: undefined
  };
}
export const QueryRemoteTokenMessengersRequest = {
  typeUrl: "/circle.cctp.v1.QueryRemoteTokenMessengersRequest",
  encode(message: QueryRemoteTokenMessengersRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryRemoteTokenMessengersRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryRemoteTokenMessengersRequest();
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
  fromPartial(object: Partial<QueryRemoteTokenMessengersRequest>): QueryRemoteTokenMessengersRequest {
    const message = createBaseQueryRemoteTokenMessengersRequest();
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryRemoteTokenMessengersRequestAmino): QueryRemoteTokenMessengersRequest {
    const message = createBaseQueryRemoteTokenMessengersRequest();
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryRemoteTokenMessengersRequest, useInterfaces: boolean = false): QueryRemoteTokenMessengersRequestAmino {
    const obj: any = {};
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryRemoteTokenMessengersRequestAminoMsg): QueryRemoteTokenMessengersRequest {
    return QueryRemoteTokenMessengersRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryRemoteTokenMessengersRequestProtoMsg, useInterfaces: boolean = false): QueryRemoteTokenMessengersRequest {
    return QueryRemoteTokenMessengersRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryRemoteTokenMessengersRequest): Uint8Array {
    return QueryRemoteTokenMessengersRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryRemoteTokenMessengersRequest): QueryRemoteTokenMessengersRequestProtoMsg {
    return {
      typeUrl: "/circle.cctp.v1.QueryRemoteTokenMessengersRequest",
      value: QueryRemoteTokenMessengersRequest.encode(message).finish()
    };
  }
};
function createBaseQueryRemoteTokenMessengersResponse(): QueryRemoteTokenMessengersResponse {
  return {
    remoteTokenMessengers: [],
    pagination: undefined
  };
}
export const QueryRemoteTokenMessengersResponse = {
  typeUrl: "/circle.cctp.v1.QueryRemoteTokenMessengersResponse",
  encode(message: QueryRemoteTokenMessengersResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.remoteTokenMessengers) {
      RemoteTokenMessenger.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryRemoteTokenMessengersResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryRemoteTokenMessengersResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.remoteTokenMessengers.push(RemoteTokenMessenger.decode(reader, reader.uint32(), useInterfaces));
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
  fromPartial(object: Partial<QueryRemoteTokenMessengersResponse>): QueryRemoteTokenMessengersResponse {
    const message = createBaseQueryRemoteTokenMessengersResponse();
    message.remoteTokenMessengers = object.remoteTokenMessengers?.map(e => RemoteTokenMessenger.fromPartial(e)) || [];
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryRemoteTokenMessengersResponseAmino): QueryRemoteTokenMessengersResponse {
    const message = createBaseQueryRemoteTokenMessengersResponse();
    message.remoteTokenMessengers = object.remote_token_messengers?.map(e => RemoteTokenMessenger.fromAmino(e)) || [];
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryRemoteTokenMessengersResponse, useInterfaces: boolean = false): QueryRemoteTokenMessengersResponseAmino {
    const obj: any = {};
    if (message.remoteTokenMessengers) {
      obj.remote_token_messengers = message.remoteTokenMessengers.map(e => e ? RemoteTokenMessenger.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.remote_token_messengers = [];
    }
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryRemoteTokenMessengersResponseAminoMsg): QueryRemoteTokenMessengersResponse {
    return QueryRemoteTokenMessengersResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryRemoteTokenMessengersResponseProtoMsg, useInterfaces: boolean = false): QueryRemoteTokenMessengersResponse {
    return QueryRemoteTokenMessengersResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryRemoteTokenMessengersResponse): Uint8Array {
    return QueryRemoteTokenMessengersResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryRemoteTokenMessengersResponse): QueryRemoteTokenMessengersResponseProtoMsg {
    return {
      typeUrl: "/circle.cctp.v1.QueryRemoteTokenMessengersResponse",
      value: QueryRemoteTokenMessengersResponse.encode(message).finish()
    };
  }
};
function createBaseQueryBurnMessageVersionRequest(): QueryBurnMessageVersionRequest {
  return {};
}
export const QueryBurnMessageVersionRequest = {
  typeUrl: "/circle.cctp.v1.QueryBurnMessageVersionRequest",
  encode(_: QueryBurnMessageVersionRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryBurnMessageVersionRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryBurnMessageVersionRequest();
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
  fromPartial(_: Partial<QueryBurnMessageVersionRequest>): QueryBurnMessageVersionRequest {
    const message = createBaseQueryBurnMessageVersionRequest();
    return message;
  },
  fromAmino(_: QueryBurnMessageVersionRequestAmino): QueryBurnMessageVersionRequest {
    const message = createBaseQueryBurnMessageVersionRequest();
    return message;
  },
  toAmino(_: QueryBurnMessageVersionRequest, useInterfaces: boolean = false): QueryBurnMessageVersionRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: QueryBurnMessageVersionRequestAminoMsg): QueryBurnMessageVersionRequest {
    return QueryBurnMessageVersionRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryBurnMessageVersionRequestProtoMsg, useInterfaces: boolean = false): QueryBurnMessageVersionRequest {
    return QueryBurnMessageVersionRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryBurnMessageVersionRequest): Uint8Array {
    return QueryBurnMessageVersionRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryBurnMessageVersionRequest): QueryBurnMessageVersionRequestProtoMsg {
    return {
      typeUrl: "/circle.cctp.v1.QueryBurnMessageVersionRequest",
      value: QueryBurnMessageVersionRequest.encode(message).finish()
    };
  }
};
function createBaseQueryBurnMessageVersionResponse(): QueryBurnMessageVersionResponse {
  return {
    version: 0
  };
}
export const QueryBurnMessageVersionResponse = {
  typeUrl: "/circle.cctp.v1.QueryBurnMessageVersionResponse",
  encode(message: QueryBurnMessageVersionResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.version !== 0) {
      writer.uint32(8).uint32(message.version);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryBurnMessageVersionResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryBurnMessageVersionResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.version = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryBurnMessageVersionResponse>): QueryBurnMessageVersionResponse {
    const message = createBaseQueryBurnMessageVersionResponse();
    message.version = object.version ?? 0;
    return message;
  },
  fromAmino(object: QueryBurnMessageVersionResponseAmino): QueryBurnMessageVersionResponse {
    const message = createBaseQueryBurnMessageVersionResponse();
    if (object.version !== undefined && object.version !== null) {
      message.version = object.version;
    }
    return message;
  },
  toAmino(message: QueryBurnMessageVersionResponse, useInterfaces: boolean = false): QueryBurnMessageVersionResponseAmino {
    const obj: any = {};
    obj.version = message.version;
    return obj;
  },
  fromAminoMsg(object: QueryBurnMessageVersionResponseAminoMsg): QueryBurnMessageVersionResponse {
    return QueryBurnMessageVersionResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryBurnMessageVersionResponseProtoMsg, useInterfaces: boolean = false): QueryBurnMessageVersionResponse {
    return QueryBurnMessageVersionResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryBurnMessageVersionResponse): Uint8Array {
    return QueryBurnMessageVersionResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryBurnMessageVersionResponse): QueryBurnMessageVersionResponseProtoMsg {
    return {
      typeUrl: "/circle.cctp.v1.QueryBurnMessageVersionResponse",
      value: QueryBurnMessageVersionResponse.encode(message).finish()
    };
  }
};
function createBaseQueryLocalMessageVersionRequest(): QueryLocalMessageVersionRequest {
  return {};
}
export const QueryLocalMessageVersionRequest = {
  typeUrl: "/circle.cctp.v1.QueryLocalMessageVersionRequest",
  encode(_: QueryLocalMessageVersionRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryLocalMessageVersionRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryLocalMessageVersionRequest();
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
  fromPartial(_: Partial<QueryLocalMessageVersionRequest>): QueryLocalMessageVersionRequest {
    const message = createBaseQueryLocalMessageVersionRequest();
    return message;
  },
  fromAmino(_: QueryLocalMessageVersionRequestAmino): QueryLocalMessageVersionRequest {
    const message = createBaseQueryLocalMessageVersionRequest();
    return message;
  },
  toAmino(_: QueryLocalMessageVersionRequest, useInterfaces: boolean = false): QueryLocalMessageVersionRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: QueryLocalMessageVersionRequestAminoMsg): QueryLocalMessageVersionRequest {
    return QueryLocalMessageVersionRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryLocalMessageVersionRequestProtoMsg, useInterfaces: boolean = false): QueryLocalMessageVersionRequest {
    return QueryLocalMessageVersionRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryLocalMessageVersionRequest): Uint8Array {
    return QueryLocalMessageVersionRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryLocalMessageVersionRequest): QueryLocalMessageVersionRequestProtoMsg {
    return {
      typeUrl: "/circle.cctp.v1.QueryLocalMessageVersionRequest",
      value: QueryLocalMessageVersionRequest.encode(message).finish()
    };
  }
};
function createBaseQueryLocalMessageVersionResponse(): QueryLocalMessageVersionResponse {
  return {
    version: 0
  };
}
export const QueryLocalMessageVersionResponse = {
  typeUrl: "/circle.cctp.v1.QueryLocalMessageVersionResponse",
  encode(message: QueryLocalMessageVersionResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.version !== 0) {
      writer.uint32(8).uint32(message.version);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryLocalMessageVersionResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryLocalMessageVersionResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.version = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryLocalMessageVersionResponse>): QueryLocalMessageVersionResponse {
    const message = createBaseQueryLocalMessageVersionResponse();
    message.version = object.version ?? 0;
    return message;
  },
  fromAmino(object: QueryLocalMessageVersionResponseAmino): QueryLocalMessageVersionResponse {
    const message = createBaseQueryLocalMessageVersionResponse();
    if (object.version !== undefined && object.version !== null) {
      message.version = object.version;
    }
    return message;
  },
  toAmino(message: QueryLocalMessageVersionResponse, useInterfaces: boolean = false): QueryLocalMessageVersionResponseAmino {
    const obj: any = {};
    obj.version = message.version;
    return obj;
  },
  fromAminoMsg(object: QueryLocalMessageVersionResponseAminoMsg): QueryLocalMessageVersionResponse {
    return QueryLocalMessageVersionResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryLocalMessageVersionResponseProtoMsg, useInterfaces: boolean = false): QueryLocalMessageVersionResponse {
    return QueryLocalMessageVersionResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryLocalMessageVersionResponse): Uint8Array {
    return QueryLocalMessageVersionResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryLocalMessageVersionResponse): QueryLocalMessageVersionResponseProtoMsg {
    return {
      typeUrl: "/circle.cctp.v1.QueryLocalMessageVersionResponse",
      value: QueryLocalMessageVersionResponse.encode(message).finish()
    };
  }
};
function createBaseQueryLocalDomainRequest(): QueryLocalDomainRequest {
  return {};
}
export const QueryLocalDomainRequest = {
  typeUrl: "/circle.cctp.v1.QueryLocalDomainRequest",
  encode(_: QueryLocalDomainRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryLocalDomainRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryLocalDomainRequest();
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
  fromPartial(_: Partial<QueryLocalDomainRequest>): QueryLocalDomainRequest {
    const message = createBaseQueryLocalDomainRequest();
    return message;
  },
  fromAmino(_: QueryLocalDomainRequestAmino): QueryLocalDomainRequest {
    const message = createBaseQueryLocalDomainRequest();
    return message;
  },
  toAmino(_: QueryLocalDomainRequest, useInterfaces: boolean = false): QueryLocalDomainRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: QueryLocalDomainRequestAminoMsg): QueryLocalDomainRequest {
    return QueryLocalDomainRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryLocalDomainRequestProtoMsg, useInterfaces: boolean = false): QueryLocalDomainRequest {
    return QueryLocalDomainRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryLocalDomainRequest): Uint8Array {
    return QueryLocalDomainRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryLocalDomainRequest): QueryLocalDomainRequestProtoMsg {
    return {
      typeUrl: "/circle.cctp.v1.QueryLocalDomainRequest",
      value: QueryLocalDomainRequest.encode(message).finish()
    };
  }
};
function createBaseQueryLocalDomainResponse(): QueryLocalDomainResponse {
  return {
    domainId: 0
  };
}
export const QueryLocalDomainResponse = {
  typeUrl: "/circle.cctp.v1.QueryLocalDomainResponse",
  encode(message: QueryLocalDomainResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.domainId !== 0) {
      writer.uint32(8).uint32(message.domainId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryLocalDomainResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryLocalDomainResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.domainId = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryLocalDomainResponse>): QueryLocalDomainResponse {
    const message = createBaseQueryLocalDomainResponse();
    message.domainId = object.domainId ?? 0;
    return message;
  },
  fromAmino(object: QueryLocalDomainResponseAmino): QueryLocalDomainResponse {
    const message = createBaseQueryLocalDomainResponse();
    if (object.domain_id !== undefined && object.domain_id !== null) {
      message.domainId = object.domain_id;
    }
    return message;
  },
  toAmino(message: QueryLocalDomainResponse, useInterfaces: boolean = false): QueryLocalDomainResponseAmino {
    const obj: any = {};
    obj.domain_id = message.domainId;
    return obj;
  },
  fromAminoMsg(object: QueryLocalDomainResponseAminoMsg): QueryLocalDomainResponse {
    return QueryLocalDomainResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryLocalDomainResponseProtoMsg, useInterfaces: boolean = false): QueryLocalDomainResponse {
    return QueryLocalDomainResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryLocalDomainResponse): Uint8Array {
    return QueryLocalDomainResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryLocalDomainResponse): QueryLocalDomainResponseProtoMsg {
    return {
      typeUrl: "/circle.cctp.v1.QueryLocalDomainResponse",
      value: QueryLocalDomainResponse.encode(message).finish()
    };
  }
};