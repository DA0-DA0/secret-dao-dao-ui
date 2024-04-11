import * as _105 from "./globalfee/v1beta1/genesis";
import * as _106 from "./globalfee/v1beta1/query";
import * as _107 from "./globalfee/v1beta1/tx";
import * as _429 from "./globalfee/v1beta1/tx.amino";
import * as _430 from "./globalfee/v1beta1/tx.registry";
import * as _431 from "./globalfee/v1beta1/query.rpc.Query";
import * as _432 from "./globalfee/v1beta1/tx.rpc.msg";
import * as _618 from "./rpc.query";
import * as _619 from "./rpc.tx";
export namespace gaia {
  export namespace globalfee {
    export const v1beta1 = {
      ..._105,
      ..._106,
      ..._107,
      ..._429,
      ..._430,
      ..._431,
      ..._432
    };
  }
  export const ClientFactory = {
    ..._618,
    ..._619
  };
}