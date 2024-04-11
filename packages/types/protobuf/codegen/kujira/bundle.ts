import * as _146 from "./denom/authorityMetadata";
import * as _147 from "./denom/genesis";
import * as _148 from "./denom/params";
import * as _149 from "./denom/query";
import * as _150 from "./denom/tx";
import * as _151 from "./oracle/genesis";
import * as _152 from "./oracle/oracle";
import * as _153 from "./oracle/query";
import * as _154 from "./oracle/tx";
import * as _155 from "./scheduler/genesis";
import * as _156 from "./scheduler/hook";
import * as _157 from "./scheduler/params";
import * as _158 from "./scheduler/proposal";
import * as _159 from "./scheduler/query";
import * as _461 from "./denom/tx.amino";
import * as _462 from "./oracle/tx.amino";
import * as _463 from "./denom/tx.registry";
import * as _464 from "./oracle/tx.registry";
import * as _465 from "./denom/query.rpc.Query";
import * as _466 from "./oracle/query.rpc.Query";
import * as _467 from "./scheduler/query.rpc.Query";
import * as _468 from "./denom/tx.rpc.msg";
import * as _469 from "./oracle/tx.rpc.msg";
import * as _624 from "./rpc.query";
import * as _625 from "./rpc.tx";
export namespace kujira {
  export const denom = {
    ..._146,
    ..._147,
    ..._148,
    ..._149,
    ..._150,
    ..._461,
    ..._463,
    ..._465,
    ..._468
  };
  export const oracle = {
    ..._151,
    ..._152,
    ..._153,
    ..._154,
    ..._462,
    ..._464,
    ..._466,
    ..._469
  };
  export const scheduler = {
    ..._155,
    ..._156,
    ..._157,
    ..._158,
    ..._159,
    ..._467
  };
  export const ClientFactory = {
    ..._624,
    ..._625
  };
}