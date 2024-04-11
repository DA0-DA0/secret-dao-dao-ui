import * as _308 from "./data/v1/events";
import * as _309 from "./data/v1/state";
import * as _310 from "./data/v1/tx";
import * as _311 from "./data/v1/types";
import * as _312 from "./data/v2/events";
import * as _313 from "./data/v2/state";
import * as _314 from "./data/v2/tx";
import * as _315 from "./data/v2/types";
import * as _316 from "./ecocredit/basket/v1/events";
import * as _317 from "./ecocredit/basket/v1/state";
import * as _318 from "./ecocredit/basket/v1/tx";
import * as _319 from "./ecocredit/basket/v1/types";
import * as _320 from "./ecocredit/marketplace/v1/events";
import * as _321 from "./ecocredit/marketplace/v1/state";
import * as _322 from "./ecocredit/marketplace/v1/tx";
import * as _323 from "./ecocredit/marketplace/v1/types";
import * as _324 from "./ecocredit/orderbook/v1alpha1/memory";
import * as _325 from "./ecocredit/v1/events";
import * as _326 from "./ecocredit/v1/state";
import * as _327 from "./ecocredit/v1/tx";
import * as _328 from "./ecocredit/v1/types";
import * as _329 from "./ecocredit/v1alpha1/events";
import * as _330 from "./ecocredit/v1alpha1/genesis";
import * as _331 from "./ecocredit/v1alpha1/tx";
import * as _332 from "./ecocredit/v1alpha1/types";
import * as _333 from "./intertx/v1/query";
import * as _334 from "./intertx/v1/tx";
import * as _574 from "./data/v1/tx.amino";
import * as _575 from "./data/v2/tx.amino";
import * as _576 from "./ecocredit/basket/v1/tx.amino";
import * as _577 from "./ecocredit/marketplace/v1/tx.amino";
import * as _578 from "./ecocredit/v1/tx.amino";
import * as _579 from "./ecocredit/v1alpha1/tx.amino";
import * as _580 from "./intertx/v1/tx.amino";
import * as _581 from "./data/v1/tx.registry";
import * as _582 from "./data/v2/tx.registry";
import * as _583 from "./ecocredit/basket/v1/tx.registry";
import * as _584 from "./ecocredit/marketplace/v1/tx.registry";
import * as _585 from "./ecocredit/v1/tx.registry";
import * as _586 from "./ecocredit/v1alpha1/tx.registry";
import * as _587 from "./intertx/v1/tx.registry";
import * as _588 from "./intertx/v1/query.rpc.Query";
import * as _589 from "./data/v1/tx.rpc.msg";
import * as _590 from "./data/v2/tx.rpc.msg";
import * as _591 from "./ecocredit/basket/v1/tx.rpc.msg";
import * as _592 from "./ecocredit/marketplace/v1/tx.rpc.msg";
import * as _593 from "./ecocredit/v1/tx.rpc.msg";
import * as _594 from "./ecocredit/v1alpha1/tx.rpc.msg";
import * as _595 from "./intertx/v1/tx.rpc.msg";
import * as _634 from "./rpc.query";
import * as _635 from "./rpc.tx";
export namespace regen {
  export namespace data {
    export const v1 = {
      ..._308,
      ..._309,
      ..._310,
      ..._311,
      ..._574,
      ..._581,
      ..._589
    };
    export const v2 = {
      ..._312,
      ..._313,
      ..._314,
      ..._315,
      ..._575,
      ..._582,
      ..._590
    };
  }
  export namespace ecocredit {
    export namespace basket {
      export const v1 = {
        ..._316,
        ..._317,
        ..._318,
        ..._319,
        ..._576,
        ..._583,
        ..._591
      };
    }
    export namespace marketplace {
      export const v1 = {
        ..._320,
        ..._321,
        ..._322,
        ..._323,
        ..._577,
        ..._584,
        ..._592
      };
    }
    export namespace orderbook {
      export const v1alpha1 = {
        ..._324
      };
    }
    export const v1 = {
      ..._325,
      ..._326,
      ..._327,
      ..._328,
      ..._578,
      ..._585,
      ..._593
    };
    export const v1alpha1 = {
      ..._329,
      ..._330,
      ..._331,
      ..._332,
      ..._579,
      ..._586,
      ..._594
    };
  }
  export namespace intertx {
    export const v1 = {
      ..._333,
      ..._334,
      ..._580,
      ..._587,
      ..._588,
      ..._595
    };
  }
  export const ClientFactory = {
    ..._634,
    ..._635
  };
}