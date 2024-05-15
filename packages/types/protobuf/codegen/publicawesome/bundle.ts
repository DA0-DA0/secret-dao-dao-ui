import * as _290 from "./stargaze/alloc/v1beta1/genesis";
import * as _291 from "./stargaze/alloc/v1beta1/params";
import * as _292 from "./stargaze/alloc/v1beta1/query";
import * as _293 from "./stargaze/alloc/v1beta1/tx";
import * as _294 from "./stargaze/cron/v1/cron";
import * as _295 from "./stargaze/cron/v1/genesis";
import * as _296 from "./stargaze/cron/v1/proposal";
import * as _297 from "./stargaze/cron/v1/query";
import * as _298 from "./stargaze/cron/v1/tx";
import * as _299 from "./stargaze/globalfee/v1/genesis";
import * as _300 from "./stargaze/globalfee/v1/globalfee";
import * as _301 from "./stargaze/globalfee/v1/proposal";
import * as _302 from "./stargaze/globalfee/v1/query";
import * as _303 from "./stargaze/globalfee/v1/tx";
import * as _304 from "./stargaze/mint/v1beta1/genesis";
import * as _305 from "./stargaze/mint/v1beta1/mint";
import * as _306 from "./stargaze/mint/v1beta1/query";
import * as _307 from "./stargaze/mint/v1beta1/tx";
import * as _561 from "./stargaze/alloc/v1beta1/tx.amino";
import * as _562 from "./stargaze/cron/v1/tx.amino";
import * as _563 from "./stargaze/globalfee/v1/tx.amino";
import * as _564 from "./stargaze/alloc/v1beta1/tx.registry";
import * as _565 from "./stargaze/cron/v1/tx.registry";
import * as _566 from "./stargaze/globalfee/v1/tx.registry";
import * as _567 from "./stargaze/alloc/v1beta1/query.rpc.Query";
import * as _568 from "./stargaze/cron/v1/query.rpc.Query";
import * as _569 from "./stargaze/globalfee/v1/query.rpc.Query";
import * as _570 from "./stargaze/mint/v1beta1/query.rpc.Query";
import * as _571 from "./stargaze/alloc/v1beta1/tx.rpc.msg";
import * as _572 from "./stargaze/cron/v1/tx.rpc.msg";
import * as _573 from "./stargaze/globalfee/v1/tx.rpc.msg";
import * as _632 from "./rpc.query";
import * as _633 from "./rpc.tx";
export namespace publicawesome {
  export namespace stargaze {
    export namespace alloc {
      export const v1beta1 = {
        ..._290,
        ..._291,
        ..._292,
        ..._293,
        ..._561,
        ..._564,
        ..._567,
        ..._571
      };
    }
    export namespace cron {
      export const v1 = {
        ..._294,
        ..._295,
        ..._296,
        ..._297,
        ..._298,
        ..._562,
        ..._565,
        ..._568,
        ..._572
      };
    }
    export namespace globalfee {
      export const v1 = {
        ..._299,
        ..._300,
        ..._301,
        ..._302,
        ..._303,
        ..._563,
        ..._566,
        ..._569,
        ..._573
      };
    }
    export namespace mint {
      export const v1beta1 = {
        ..._304,
        ..._305,
        ..._306,
        ..._307,
        ..._570
      };
    }
  }
  export const ClientFactory = {
    ..._632,
    ..._633
  };
}