import * as _198 from "./accum/v1beta1/accum";
import * as _199 from "./concentratedliquidity/params";
import * as _200 from "./cosmwasmpool/v1beta1/genesis";
import * as _201 from "./cosmwasmpool/v1beta1/gov";
import * as _202 from "./cosmwasmpool/v1beta1/model/instantiate_msg";
import * as _203 from "./cosmwasmpool/v1beta1/model/module_query_msg";
import * as _204 from "./cosmwasmpool/v1beta1/model/module_sudo_msg";
import * as _205 from "./cosmwasmpool/v1beta1/model/pool_query_msg";
import * as _206 from "./cosmwasmpool/v1beta1/model/pool";
import * as _207 from "./cosmwasmpool/v1beta1/model/transmuter_msgs";
import * as _208 from "./cosmwasmpool/v1beta1/model/tx";
import * as _209 from "./cosmwasmpool/v1beta1/params";
import * as _210 from "./cosmwasmpool/v1beta1/query";
import * as _211 from "./cosmwasmpool/v1beta1/tx";
import * as _212 from "./gamm/pool-models/balancer/balancerPool";
import * as _213 from "./gamm/v1beta1/genesis";
import * as _214 from "./gamm/v1beta1/gov";
import * as _215 from "./gamm/v1beta1/query";
import * as _216 from "./gamm/v1beta1/shared";
import * as _217 from "./gamm/v1beta1/tx";
import * as _218 from "./gamm/pool-models/balancer/tx/tx";
import * as _219 from "./gamm/pool-models/stableswap/stableswap_pool";
import * as _220 from "./gamm/pool-models/stableswap/tx";
import * as _221 from "./incentives/gauge";
import * as _222 from "./incentives/genesis";
import * as _223 from "./incentives/gov";
import * as _224 from "./incentives/group";
import * as _225 from "./incentives/params";
import * as _226 from "./incentives/query";
import * as _227 from "./incentives/tx";
import * as _228 from "./lockup/genesis";
import * as _229 from "./lockup/lock";
import * as _230 from "./lockup/params";
import * as _231 from "./lockup/query";
import * as _232 from "./lockup/tx";
import * as _233 from "./pool-incentives/v1beta1/genesis";
import * as _234 from "./pool-incentives/v1beta1/gov";
import * as _235 from "./pool-incentives/v1beta1/incentives";
import * as _236 from "./pool-incentives/v1beta1/query";
import * as _237 from "./pool-incentives/v1beta1/shared";
import * as _238 from "./poolmanager/v1beta1/genesis";
import * as _239 from "./poolmanager/v1beta1/gov";
import * as _240 from "./poolmanager/v1beta1/module_route";
import * as _241 from "./poolmanager/v1beta1/query";
import * as _242 from "./poolmanager/v1beta1/swap_route";
import * as _243 from "./poolmanager/v1beta1/tx";
import * as _244 from "./protorev/v1beta1/genesis";
import * as _245 from "./protorev/v1beta1/gov";
import * as _246 from "./protorev/v1beta1/params";
import * as _247 from "./protorev/v1beta1/protorev";
import * as _248 from "./protorev/v1beta1/query";
import * as _249 from "./protorev/v1beta1/tx";
import * as _250 from "./superfluid/genesis";
import * as _251 from "./superfluid/params";
import * as _252 from "./superfluid/query";
import * as _253 from "./superfluid/superfluid";
import * as _254 from "./superfluid/tx";
import * as _255 from "./tokenfactory/v1beta1/authorityMetadata";
import * as _256 from "./tokenfactory/v1beta1/genesis";
import * as _257 from "./tokenfactory/v1beta1/params";
import * as _258 from "./tokenfactory/v1beta1/query";
import * as _259 from "./tokenfactory/v1beta1/tx";
import * as _260 from "./txfees/v1beta1/feetoken";
import * as _261 from "./txfees/v1beta1/genesis";
import * as _262 from "./txfees/v1beta1/gov";
import * as _263 from "./txfees/v1beta1/params";
import * as _264 from "./txfees/v1beta1/query";
import * as _265 from "./txfees/v1beta1/tx";
import * as _266 from "./valset-pref/v1beta1/query";
import * as _267 from "./valset-pref/v1beta1/state";
import * as _268 from "./valset-pref/v1beta1/tx";
import * as _494 from "./concentratedliquidity/poolmodel/concentrated/v1beta1/tx.amino";
import * as _495 from "./concentratedliquidity/v1beta1/tx.amino";
import * as _496 from "./gamm/pool-models/balancer/tx/tx.amino";
import * as _497 from "./gamm/pool-models/stableswap/tx.amino";
import * as _498 from "./gamm/v1beta1/tx.amino";
import * as _499 from "./incentives/tx.amino";
import * as _500 from "./lockup/tx.amino";
import * as _501 from "./poolmanager/v1beta1/tx.amino";
import * as _502 from "./protorev/v1beta1/tx.amino";
import * as _503 from "./superfluid/tx.amino";
import * as _504 from "./tokenfactory/v1beta1/tx.amino";
import * as _505 from "./txfees/v1beta1/tx.amino";
import * as _506 from "./valset-pref/v1beta1/tx.amino";
import * as _507 from "./concentratedliquidity/poolmodel/concentrated/v1beta1/tx.registry";
import * as _508 from "./concentratedliquidity/v1beta1/tx.registry";
import * as _509 from "./gamm/pool-models/balancer/tx/tx.registry";
import * as _510 from "./gamm/pool-models/stableswap/tx.registry";
import * as _511 from "./gamm/v1beta1/tx.registry";
import * as _512 from "./incentives/tx.registry";
import * as _513 from "./lockup/tx.registry";
import * as _514 from "./poolmanager/v1beta1/tx.registry";
import * as _515 from "./protorev/v1beta1/tx.registry";
import * as _516 from "./superfluid/tx.registry";
import * as _517 from "./tokenfactory/v1beta1/tx.registry";
import * as _518 from "./txfees/v1beta1/tx.registry";
import * as _519 from "./valset-pref/v1beta1/tx.registry";
import * as _520 from "./concentratedliquidity/v1beta1/query.rpc.Query";
import * as _521 from "./cosmwasmpool/v1beta1/query.rpc.Query";
import * as _522 from "./gamm/v1beta1/query.rpc.Query";
import * as _523 from "./incentives/query.rpc.Query";
import * as _524 from "./lockup/query.rpc.Query";
import * as _525 from "./pool-incentives/v1beta1/query.rpc.Query";
import * as _526 from "./poolmanager/v1beta1/query.rpc.Query";
import * as _527 from "./protorev/v1beta1/query.rpc.Query";
import * as _528 from "./superfluid/query.rpc.Query";
import * as _529 from "./tokenfactory/v1beta1/query.rpc.Query";
import * as _530 from "./txfees/v1beta1/query.rpc.Query";
import * as _531 from "./valset-pref/v1beta1/query.rpc.Query";
import * as _532 from "./concentratedliquidity/poolmodel/concentrated/v1beta1/tx.rpc.msg";
import * as _533 from "./concentratedliquidity/v1beta1/tx.rpc.msg";
import * as _534 from "./gamm/pool-models/balancer/tx/tx.rpc.msg";
import * as _535 from "./gamm/pool-models/stableswap/tx.rpc.msg";
import * as _536 from "./gamm/v1beta1/tx.rpc.msg";
import * as _537 from "./incentives/tx.rpc.msg";
import * as _538 from "./lockup/tx.rpc.msg";
import * as _539 from "./poolmanager/v1beta1/tx.rpc.msg";
import * as _540 from "./protorev/v1beta1/tx.rpc.msg";
import * as _541 from "./superfluid/tx.rpc.msg";
import * as _542 from "./tokenfactory/v1beta1/tx.rpc.msg";
import * as _543 from "./txfees/v1beta1/tx.rpc.msg";
import * as _544 from "./valset-pref/v1beta1/tx.rpc.msg";
import * as _628 from "./rpc.query";
import * as _629 from "./rpc.tx";
export namespace osmosis {
  export namespace accum {
    export const v1beta1 = {
      ..._198
    };
  }
  export const concentratedliquidity = {
    ..._199,
    poolmodel: {
      concentrated: {
        v1beta1: {
          ..._494,
          ..._507,
          ..._532
        }
      }
    },
    v1beta1: {
      ..._495,
      ..._508,
      ..._520,
      ..._533
    }
  };
  export namespace cosmwasmpool {
    export const v1beta1 = {
      ..._200,
      ..._201,
      ..._202,
      ..._203,
      ..._204,
      ..._205,
      ..._206,
      ..._207,
      ..._208,
      ..._209,
      ..._210,
      ..._211,
      ..._521
    };
  }
  export namespace gamm {
    export const v1beta1 = {
      ..._212,
      ..._213,
      ..._214,
      ..._215,
      ..._216,
      ..._217,
      ..._498,
      ..._511,
      ..._522,
      ..._536
    };
    export namespace poolmodels {
      export namespace balancer {
        export const v1beta1 = {
          ..._218,
          ..._496,
          ..._509,
          ..._534
        };
      }
      export namespace stableswap {
        export const v1beta1 = {
          ..._219,
          ..._220,
          ..._497,
          ..._510,
          ..._535
        };
      }
    }
  }
  export const incentives = {
    ..._221,
    ..._222,
    ..._223,
    ..._224,
    ..._225,
    ..._226,
    ..._227,
    ..._499,
    ..._512,
    ..._523,
    ..._537
  };
  export const lockup = {
    ..._228,
    ..._229,
    ..._230,
    ..._231,
    ..._232,
    ..._500,
    ..._513,
    ..._524,
    ..._538
  };
  export namespace poolincentives {
    export const v1beta1 = {
      ..._233,
      ..._234,
      ..._235,
      ..._236,
      ..._237,
      ..._525
    };
  }
  export namespace poolmanager {
    export const v1beta1 = {
      ..._238,
      ..._239,
      ..._240,
      ..._241,
      ..._242,
      ..._243,
      ..._501,
      ..._514,
      ..._526,
      ..._539
    };
  }
  export namespace protorev {
    export const v1beta1 = {
      ..._244,
      ..._245,
      ..._246,
      ..._247,
      ..._248,
      ..._249,
      ..._502,
      ..._515,
      ..._527,
      ..._540
    };
  }
  export const superfluid = {
    ..._250,
    ..._251,
    ..._252,
    ..._253,
    ..._254,
    ..._503,
    ..._516,
    ..._528,
    ..._541
  };
  export namespace tokenfactory {
    export const v1beta1 = {
      ..._255,
      ..._256,
      ..._257,
      ..._258,
      ..._259,
      ..._504,
      ..._517,
      ..._529,
      ..._542
    };
  }
  export namespace txfees {
    export const v1beta1 = {
      ..._260,
      ..._261,
      ..._262,
      ..._263,
      ..._264,
      ..._265,
      ..._505,
      ..._518,
      ..._530,
      ..._543
    };
  }
  export namespace valsetpref {
    export const v1beta1 = {
      ..._266,
      ..._267,
      ..._268,
      ..._506,
      ..._519,
      ..._531,
      ..._544
    };
  }
  export const ClientFactory = {
    ..._628,
    ..._629
  };
}