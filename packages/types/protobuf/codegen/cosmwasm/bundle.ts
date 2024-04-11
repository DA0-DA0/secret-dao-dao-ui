import * as _93 from "./tokenfactory/v1beta1/authorityMetadata";
import * as _94 from "./tokenfactory/v1beta1/genesis";
import * as _95 from "./tokenfactory/v1beta1/params";
import * as _96 from "./tokenfactory/v1beta1/query";
import * as _97 from "./tokenfactory/v1beta1/tx";
import * as _98 from "./wasm/v1/authz";
import * as _99 from "./wasm/v1/genesis";
import * as _100 from "./wasm/v1/ibc";
import * as _101 from "./wasm/v1/proposal";
import * as _102 from "./wasm/v1/query";
import * as _103 from "./wasm/v1/tx";
import * as _104 from "./wasm/v1/types";
import * as _421 from "./tokenfactory/v1beta1/tx.amino";
import * as _422 from "./wasm/v1/tx.amino";
import * as _423 from "./tokenfactory/v1beta1/tx.registry";
import * as _424 from "./wasm/v1/tx.registry";
import * as _425 from "./tokenfactory/v1beta1/query.rpc.Query";
import * as _426 from "./wasm/v1/query.rpc.Query";
import * as _427 from "./tokenfactory/v1beta1/tx.rpc.msg";
import * as _428 from "./wasm/v1/tx.rpc.msg";
import * as _616 from "./rpc.query";
import * as _617 from "./rpc.tx";
export namespace cosmwasm {
  export namespace tokenfactory {
    export const v1beta1 = {
      ..._93,
      ..._94,
      ..._95,
      ..._96,
      ..._97,
      ..._421,
      ..._423,
      ..._425,
      ..._427
    };
  }
  export namespace wasm {
    export const v1 = {
      ..._98,
      ..._99,
      ..._100,
      ..._101,
      ..._102,
      ..._103,
      ..._104,
      ..._422,
      ..._424,
      ..._426,
      ..._428
    };
  }
  export const ClientFactory = {
    ..._616,
    ..._617
  };
}