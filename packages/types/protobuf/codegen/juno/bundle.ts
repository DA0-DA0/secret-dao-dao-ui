import * as _138 from "./feeshare/v1/feeshare";
import * as _139 from "./feeshare/v1/genesis";
import * as _140 from "./feeshare/v1/query";
import * as _141 from "./feeshare/v1/tx";
import * as _142 from "./mint/genesis";
import * as _143 from "./mint/mint";
import * as _144 from "./mint/query";
import * as _145 from "./mint/tx";
import * as _453 from "./feeshare/v1/tx.amino";
import * as _454 from "./mint/tx.amino";
import * as _455 from "./feeshare/v1/tx.registry";
import * as _456 from "./mint/tx.registry";
import * as _457 from "./feeshare/v1/query.rpc.Query";
import * as _458 from "./mint/query.rpc.Query";
import * as _459 from "./feeshare/v1/tx.rpc.msg";
import * as _460 from "./mint/tx.rpc.msg";
import * as _622 from "./rpc.query";
import * as _623 from "./rpc.tx";
export namespace juno {
  export namespace feeshare {
    export const v1 = {
      ..._138,
      ..._139,
      ..._140,
      ..._141,
      ..._453,
      ..._455,
      ..._457,
      ..._459
    };
  }
  export const mint = {
    ..._142,
    ..._143,
    ..._144,
    ..._145,
    ..._454,
    ..._456,
    ..._458,
    ..._460
  };
  export const ClientFactory = {
    ..._622,
    ..._623
  };
}