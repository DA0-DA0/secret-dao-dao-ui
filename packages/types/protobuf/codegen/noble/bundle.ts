import * as _349 from "../tariff/genesis";
import * as _350 from "../tariff/params";
import * as _351 from "../tariff/query";
import * as _609 from "../tariff/query.rpc.Query";
import * as _638 from "./rpc.query";
export namespace noble {
  export const tariff = {
    ..._349,
    ..._350,
    ..._351,
    ..._609
  };
  export const ClientFactory = {
    ..._638
  };
}