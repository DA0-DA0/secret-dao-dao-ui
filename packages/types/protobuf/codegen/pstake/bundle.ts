import * as _269 from "./liquidstake/v1beta1/genesis";
import * as _270 from "./liquidstake/v1beta1/liquidstake";
import * as _271 from "./liquidstake/v1beta1/query";
import * as _272 from "./liquidstake/v1beta1/tx";
import * as _273 from "./liquidstakeibc/v1beta1/genesis";
import * as _274 from "./liquidstakeibc/v1beta1/liquidstakeibc";
import * as _275 from "./liquidstakeibc/v1beta1/msgs";
import * as _276 from "./liquidstakeibc/v1beta1/params";
import * as _277 from "./liquidstakeibc/v1beta1/query";
import * as _278 from "./lscosmos/v1beta1/genesis";
import * as _279 from "./lscosmos/v1beta1/governance_proposal";
import * as _280 from "./lscosmos/v1beta1/lscosmos";
import * as _281 from "./lscosmos/v1beta1/msgs";
import * as _282 from "./lscosmos/v1beta1/params";
import * as _283 from "./lscosmos/v1beta1/query";
import * as _284 from "./ratesync/v1beta1/contract";
import * as _285 from "./ratesync/v1beta1/genesis";
import * as _286 from "./ratesync/v1beta1/params";
import * as _287 from "./ratesync/v1beta1/query";
import * as _288 from "./ratesync/v1beta1/ratesync";
import * as _289 from "./ratesync/v1beta1/tx";
import * as _545 from "./liquidstake/v1beta1/tx.amino";
import * as _546 from "./liquidstakeibc/v1beta1/msgs.amino";
import * as _547 from "./lscosmos/v1beta1/msgs.amino";
import * as _548 from "./ratesync/v1beta1/tx.amino";
import * as _549 from "./liquidstake/v1beta1/tx.registry";
import * as _550 from "./liquidstakeibc/v1beta1/msgs.registry";
import * as _551 from "./lscosmos/v1beta1/msgs.registry";
import * as _552 from "./ratesync/v1beta1/tx.registry";
import * as _553 from "./liquidstake/v1beta1/query.rpc.Query";
import * as _554 from "./liquidstakeibc/v1beta1/query.rpc.Query";
import * as _555 from "./lscosmos/v1beta1/query.rpc.Query";
import * as _556 from "./ratesync/v1beta1/query.rpc.Query";
import * as _557 from "./liquidstake/v1beta1/tx.rpc.msg";
import * as _558 from "./liquidstakeibc/v1beta1/msgs.rpc.msg";
import * as _559 from "./lscosmos/v1beta1/msgs.rpc.msg";
import * as _560 from "./ratesync/v1beta1/tx.rpc.msg";
import * as _630 from "./rpc.query";
import * as _631 from "./rpc.tx";
export namespace pstake {
  export namespace liquidstake {
    export const v1beta1 = {
      ..._269,
      ..._270,
      ..._271,
      ..._272,
      ..._545,
      ..._549,
      ..._553,
      ..._557
    };
  }
  export namespace liquidstakeibc {
    export const v1beta1 = {
      ..._273,
      ..._274,
      ..._275,
      ..._276,
      ..._277,
      ..._546,
      ..._550,
      ..._554,
      ..._558
    };
  }
  export namespace lscosmos {
    export const v1beta1 = {
      ..._278,
      ..._279,
      ..._280,
      ..._281,
      ..._282,
      ..._283,
      ..._547,
      ..._551,
      ..._555,
      ..._559
    };
  }
  export namespace ratesync {
    export const v1beta1 = {
      ..._284,
      ..._285,
      ..._286,
      ..._287,
      ..._288,
      ..._289,
      ..._548,
      ..._552,
      ..._556,
      ..._560
    };
  }
  export const ClientFactory = {
    ..._630,
    ..._631
  };
}