import { Rpc } from "../../../../helpers";
import { BinaryReader } from "../../../../binary";
import { MsgCreateClient, MsgCreateClientResponse, MsgUpdateClient, MsgUpdateClientResponse, MsgUpgradeClient, MsgUpgradeClientResponse, MsgSubmitMisbehaviour, MsgSubmitMisbehaviourResponse, MsgUpdateParams, MsgUpdateParamsResponse } from "./tx";
/** Msg defines the ibc/client Msg service. */
export interface Msg {
  /** CreateClient defines a rpc handler method for MsgCreateClient. */
  createClient(request: MsgCreateClient): Promise<MsgCreateClientResponse>;
  /** UpdateClient defines a rpc handler method for MsgUpdateClient. */
  updateClient(request: MsgUpdateClient): Promise<MsgUpdateClientResponse>;
  /** UpgradeClient defines a rpc handler method for MsgUpgradeClient. */
  upgradeClient(request: MsgUpgradeClient): Promise<MsgUpgradeClientResponse>;
  /** SubmitMisbehaviour defines a rpc handler method for MsgSubmitMisbehaviour. */
  submitMisbehaviour(request: MsgSubmitMisbehaviour): Promise<MsgSubmitMisbehaviourResponse>;
  /** UpdateClientParams defines a rpc handler method for MsgUpdateParams. */
  updateClientParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse>;
}
export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.createClient = this.createClient.bind(this);
    this.updateClient = this.updateClient.bind(this);
    this.upgradeClient = this.upgradeClient.bind(this);
    this.submitMisbehaviour = this.submitMisbehaviour.bind(this);
    this.updateClientParams = this.updateClientParams.bind(this);
  }
  createClient(request: MsgCreateClient, useInterfaces: boolean = true): Promise<MsgCreateClientResponse> {
    const data = MsgCreateClient.encode(request).finish();
    const promise = this.rpc.request("ibc.core.client.v1.Msg", "CreateClient", data);
    return promise.then(data => MsgCreateClientResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  updateClient(request: MsgUpdateClient, useInterfaces: boolean = true): Promise<MsgUpdateClientResponse> {
    const data = MsgUpdateClient.encode(request).finish();
    const promise = this.rpc.request("ibc.core.client.v1.Msg", "UpdateClient", data);
    return promise.then(data => MsgUpdateClientResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  upgradeClient(request: MsgUpgradeClient, useInterfaces: boolean = true): Promise<MsgUpgradeClientResponse> {
    const data = MsgUpgradeClient.encode(request).finish();
    const promise = this.rpc.request("ibc.core.client.v1.Msg", "UpgradeClient", data);
    return promise.then(data => MsgUpgradeClientResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  submitMisbehaviour(request: MsgSubmitMisbehaviour, useInterfaces: boolean = true): Promise<MsgSubmitMisbehaviourResponse> {
    const data = MsgSubmitMisbehaviour.encode(request).finish();
    const promise = this.rpc.request("ibc.core.client.v1.Msg", "SubmitMisbehaviour", data);
    return promise.then(data => MsgSubmitMisbehaviourResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  updateClientParams(request: MsgUpdateParams, useInterfaces: boolean = true): Promise<MsgUpdateParamsResponse> {
    const data = MsgUpdateParams.encode(request).finish();
    const promise = this.rpc.request("ibc.core.client.v1.Msg", "UpdateClientParams", data);
    return promise.then(data => MsgUpdateParamsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
}