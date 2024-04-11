import * as _28 from "./adminmodule/adminmodule/genesis";
import * as _29 from "./adminmodule/adminmodule/query";
import * as _30 from "./adminmodule/adminmodule/tx";
import * as _31 from "./auth/v1beta1/auth";
import * as _32 from "./auth/v1beta1/genesis";
import * as _33 from "./auth/v1beta1/query";
import * as _34 from "./auth/v1beta1/tx";
import * as _35 from "./authz/v1beta1/authz";
import * as _36 from "./authz/v1beta1/event";
import * as _37 from "./authz/v1beta1/genesis";
import * as _38 from "./authz/v1beta1/query";
import * as _39 from "./authz/v1beta1/tx";
import * as _40 from "./bank/v1beta1/authz";
import * as _41 from "./bank/v1beta1/bank";
import * as _42 from "./bank/v1beta1/genesis";
import * as _43 from "./bank/v1beta1/query";
import * as _44 from "./bank/v1beta1/tx";
import * as _45 from "./base/abci/v1beta1/abci";
import * as _46 from "./base/query/v1beta1/pagination";
import * as _47 from "./base/tendermint/v1beta1/query";
import * as _48 from "./base/tendermint/v1beta1/types";
import * as _49 from "./base/v1beta1/coin";
import * as _50 from "./crypto/ed25519/keys";
import * as _51 from "./crypto/multisig/keys";
import * as _52 from "./crypto/secp256k1/keys";
import * as _53 from "./distribution/v1beta1/distribution";
import * as _54 from "./distribution/v1beta1/genesis";
import * as _55 from "./distribution/v1beta1/query";
import * as _56 from "./distribution/v1beta1/tx";
import * as _57 from "./feegrant/v1beta1/feegrant";
import * as _58 from "./feegrant/v1beta1/genesis";
import * as _59 from "./feegrant/v1beta1/query";
import * as _60 from "./feegrant/v1beta1/tx";
import * as _61 from "./gov/v1/genesis";
import * as _62 from "./gov/v1/gov";
import * as _63 from "./gov/v1/query";
import * as _64 from "./gov/v1/tx";
import * as _65 from "./gov/v1beta1/genesis";
import * as _66 from "./gov/v1beta1/gov";
import * as _67 from "./gov/v1beta1/query";
import * as _68 from "./gov/v1beta1/tx";
import * as _69 from "./mint/v1beta1/genesis";
import * as _70 from "./mint/v1beta1/mint";
import * as _71 from "./mint/v1beta1/query";
import * as _72 from "./mint/v1beta1/tx";
import * as _73 from "./msg/v1/msg";
import * as _74 from "./orm/v1/orm";
import * as _75 from "./params/v1beta1/params";
import * as _76 from "./params/v1beta1/query";
import * as _77 from "./query/v1/query";
import * as _78 from "./slashing/v1beta1/genesis";
import * as _79 from "./slashing/v1beta1/query";
import * as _80 from "./slashing/v1beta1/slashing";
import * as _81 from "./slashing/v1beta1/tx";
import * as _82 from "./staking/v1beta1/authz";
import * as _83 from "./staking/v1beta1/genesis";
import * as _84 from "./staking/v1beta1/query";
import * as _85 from "./staking/v1beta1/staking";
import * as _86 from "./staking/v1beta1/tx";
import * as _87 from "./tx/signing/v1beta1/signing";
import * as _88 from "./tx/v1beta1/service";
import * as _89 from "./tx/v1beta1/tx";
import * as _90 from "./upgrade/v1beta1/query";
import * as _91 from "./upgrade/v1beta1/tx";
import * as _92 from "./upgrade/v1beta1/upgrade";
import * as _370 from "./adminmodule/adminmodule/tx.amino";
import * as _371 from "./auth/v1beta1/tx.amino";
import * as _372 from "./authz/v1beta1/tx.amino";
import * as _373 from "./bank/v1beta1/tx.amino";
import * as _374 from "./distribution/v1beta1/tx.amino";
import * as _375 from "./feegrant/v1beta1/tx.amino";
import * as _376 from "./gov/v1/tx.amino";
import * as _377 from "./gov/v1beta1/tx.amino";
import * as _378 from "./mint/v1beta1/tx.amino";
import * as _379 from "./slashing/v1beta1/tx.amino";
import * as _380 from "./staking/v1beta1/tx.amino";
import * as _381 from "./upgrade/v1beta1/tx.amino";
import * as _382 from "./adminmodule/adminmodule/tx.registry";
import * as _383 from "./auth/v1beta1/tx.registry";
import * as _384 from "./authz/v1beta1/tx.registry";
import * as _385 from "./bank/v1beta1/tx.registry";
import * as _386 from "./distribution/v1beta1/tx.registry";
import * as _387 from "./feegrant/v1beta1/tx.registry";
import * as _388 from "./gov/v1/tx.registry";
import * as _389 from "./gov/v1beta1/tx.registry";
import * as _390 from "./mint/v1beta1/tx.registry";
import * as _391 from "./slashing/v1beta1/tx.registry";
import * as _392 from "./staking/v1beta1/tx.registry";
import * as _393 from "./upgrade/v1beta1/tx.registry";
import * as _394 from "./adminmodule/adminmodule/query.rpc.Query";
import * as _395 from "./auth/v1beta1/query.rpc.Query";
import * as _396 from "./authz/v1beta1/query.rpc.Query";
import * as _397 from "./bank/v1beta1/query.rpc.Query";
import * as _398 from "./base/tendermint/v1beta1/query.rpc.Service";
import * as _399 from "./distribution/v1beta1/query.rpc.Query";
import * as _400 from "./feegrant/v1beta1/query.rpc.Query";
import * as _401 from "./gov/v1/query.rpc.Query";
import * as _402 from "./gov/v1beta1/query.rpc.Query";
import * as _403 from "./mint/v1beta1/query.rpc.Query";
import * as _404 from "./params/v1beta1/query.rpc.Query";
import * as _405 from "./slashing/v1beta1/query.rpc.Query";
import * as _406 from "./staking/v1beta1/query.rpc.Query";
import * as _407 from "./tx/v1beta1/service.rpc.Service";
import * as _408 from "./upgrade/v1beta1/query.rpc.Query";
import * as _409 from "./adminmodule/adminmodule/tx.rpc.msg";
import * as _410 from "./auth/v1beta1/tx.rpc.msg";
import * as _411 from "./authz/v1beta1/tx.rpc.msg";
import * as _412 from "./bank/v1beta1/tx.rpc.msg";
import * as _413 from "./distribution/v1beta1/tx.rpc.msg";
import * as _414 from "./feegrant/v1beta1/tx.rpc.msg";
import * as _415 from "./gov/v1/tx.rpc.msg";
import * as _416 from "./gov/v1beta1/tx.rpc.msg";
import * as _417 from "./mint/v1beta1/tx.rpc.msg";
import * as _418 from "./slashing/v1beta1/tx.rpc.msg";
import * as _419 from "./staking/v1beta1/tx.rpc.msg";
import * as _420 from "./upgrade/v1beta1/tx.rpc.msg";
import * as _614 from "./rpc.query";
import * as _615 from "./rpc.tx";
export namespace cosmos {
  export namespace adminmodule {
    export const adminmodule = {
      ..._28,
      ..._29,
      ..._30,
      ..._370,
      ..._382,
      ..._394,
      ..._409
    };
  }
  export namespace auth {
    export const v1beta1 = {
      ..._31,
      ..._32,
      ..._33,
      ..._34,
      ..._371,
      ..._383,
      ..._395,
      ..._410
    };
  }
  export namespace authz {
    export const v1beta1 = {
      ..._35,
      ..._36,
      ..._37,
      ..._38,
      ..._39,
      ..._372,
      ..._384,
      ..._396,
      ..._411
    };
  }
  export namespace bank {
    export const v1beta1 = {
      ..._40,
      ..._41,
      ..._42,
      ..._43,
      ..._44,
      ..._373,
      ..._385,
      ..._397,
      ..._412
    };
  }
  export namespace base {
    export namespace abci {
      export const v1beta1 = {
        ..._45
      };
    }
    export namespace query {
      export const v1beta1 = {
        ..._46
      };
    }
    export namespace tendermint {
      export const v1beta1 = {
        ..._47,
        ..._48,
        ..._398
      };
    }
    export const v1beta1 = {
      ..._49
    };
  }
  export namespace crypto {
    export const ed25519 = {
      ..._50
    };
    export const multisig = {
      ..._51
    };
    export const secp256k1 = {
      ..._52
    };
  }
  export namespace distribution {
    export const v1beta1 = {
      ..._53,
      ..._54,
      ..._55,
      ..._56,
      ..._374,
      ..._386,
      ..._399,
      ..._413
    };
  }
  export namespace feegrant {
    export const v1beta1 = {
      ..._57,
      ..._58,
      ..._59,
      ..._60,
      ..._375,
      ..._387,
      ..._400,
      ..._414
    };
  }
  export namespace gov {
    export const v1 = {
      ..._61,
      ..._62,
      ..._63,
      ..._64,
      ..._376,
      ..._388,
      ..._401,
      ..._415
    };
    export const v1beta1 = {
      ..._65,
      ..._66,
      ..._67,
      ..._68,
      ..._377,
      ..._389,
      ..._402,
      ..._416
    };
  }
  export namespace mint {
    export const v1beta1 = {
      ..._69,
      ..._70,
      ..._71,
      ..._72,
      ..._378,
      ..._390,
      ..._403,
      ..._417
    };
  }
  export namespace msg {
    export const v1 = {
      ..._73
    };
  }
  export namespace orm {
    export const v1 = {
      ..._74
    };
  }
  export namespace params {
    export const v1beta1 = {
      ..._75,
      ..._76,
      ..._404
    };
  }
  export namespace query {
    export const v1 = {
      ..._77
    };
  }
  export namespace slashing {
    export const v1beta1 = {
      ..._78,
      ..._79,
      ..._80,
      ..._81,
      ..._379,
      ..._391,
      ..._405,
      ..._418
    };
  }
  export namespace staking {
    export const v1beta1 = {
      ..._82,
      ..._83,
      ..._84,
      ..._85,
      ..._86,
      ..._380,
      ..._392,
      ..._406,
      ..._419
    };
  }
  export namespace tx {
    export namespace signing {
      export const v1beta1 = {
        ..._87
      };
    }
    export const v1beta1 = {
      ..._88,
      ..._89,
      ..._407
    };
  }
  export namespace upgrade {
    export const v1beta1 = {
      ..._90,
      ..._91,
      ..._92,
      ..._381,
      ..._393,
      ..._408,
      ..._420
    };
  }
  export const ClientFactory = {
    ..._614,
    ..._615
  };
}