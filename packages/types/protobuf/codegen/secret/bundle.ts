import * as _335 from "./compute/v1beta1/genesis";
import * as _336 from "./compute/v1beta1/msg";
import * as _337 from "./compute/v1beta1/query";
import * as _338 from "./compute/v1beta1/types";
import * as _339 from "./emergencybutton/v1beta1/genesis";
import * as _340 from "./emergencybutton/v1beta1/params";
import * as _341 from "./emergencybutton/v1beta1/query";
import * as _342 from "./emergencybutton/v1beta1/tx";
import * as _343 from "./intertx/v1beta1/query";
import * as _344 from "./intertx/v1beta1/tx";
import * as _345 from "./registration/v1beta1/genesis";
import * as _346 from "./registration/v1beta1/msg";
import * as _347 from "./registration/v1beta1/query";
import * as _348 from "./registration/v1beta1/types";
import * as _596 from "./compute/v1beta1/msg.amino";
import * as _597 from "./emergencybutton/v1beta1/tx.amino";
import * as _598 from "./intertx/v1beta1/tx.amino";
import * as _599 from "./compute/v1beta1/msg.registry";
import * as _600 from "./emergencybutton/v1beta1/tx.registry";
import * as _601 from "./intertx/v1beta1/tx.registry";
import * as _602 from "./compute/v1beta1/query.rpc.Query";
import * as _603 from "./emergencybutton/v1beta1/query.rpc.Query";
import * as _604 from "./intertx/v1beta1/query.rpc.Query";
import * as _605 from "./registration/v1beta1/query.rpc.Query";
import * as _606 from "./compute/v1beta1/msg.rpc.msg";
import * as _607 from "./emergencybutton/v1beta1/tx.rpc.msg";
import * as _608 from "./intertx/v1beta1/tx.rpc.msg";
import * as _636 from "./rpc.query";
import * as _637 from "./rpc.tx";
export namespace secret {
  export namespace compute {
    export const v1beta1 = {
      ..._335,
      ..._336,
      ..._337,
      ..._338,
      ..._596,
      ..._599,
      ..._602,
      ..._606
    };
  }
  export namespace emergencybutton {
    export const v1beta1 = {
      ..._339,
      ..._340,
      ..._341,
      ..._342,
      ..._597,
      ..._600,
      ..._603,
      ..._607
    };
  }
  export namespace intertx {
    export const v1beta1 = {
      ..._343,
      ..._344,
      ..._598,
      ..._601,
      ..._604,
      ..._608
    };
  }
  export namespace registration {
    export const v1beta1 = {
      ..._345,
      ..._346,
      ..._347,
      ..._348,
      ..._605
    };
  }
  export const ClientFactory = {
    ..._636,
    ..._637
  };
}