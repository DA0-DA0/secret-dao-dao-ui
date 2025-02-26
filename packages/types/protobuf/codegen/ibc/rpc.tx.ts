import { Rpc } from "../helpers";
export const createRPCMsgClient = async ({
  rpc
}: {
  rpc: Rpc;
}) => ({
  cosmos: {
    adminmodule: {
      adminmodule: new (await import("../cosmos/adminmodule/adminmodule/tx.rpc.msg")).MsgClientImpl(rpc)
    },
    auth: {
      v1beta1: new (await import("../cosmos/auth/v1beta1/tx.rpc.msg")).MsgClientImpl(rpc)
    },
    authz: {
      v1beta1: new (await import("../cosmos/authz/v1beta1/tx.rpc.msg")).MsgClientImpl(rpc)
    },
    bank: {
      v1beta1: new (await import("../cosmos/bank/v1beta1/tx.rpc.msg")).MsgClientImpl(rpc)
    },
    distribution: {
      v1beta1: new (await import("../cosmos/distribution/v1beta1/tx.rpc.msg")).MsgClientImpl(rpc)
    },
    feegrant: {
      v1beta1: new (await import("../cosmos/feegrant/v1beta1/tx.rpc.msg")).MsgClientImpl(rpc)
    },
    gov: {
      v1: new (await import("../cosmos/gov/v1/tx.rpc.msg")).MsgClientImpl(rpc),
      v1beta1: new (await import("../cosmos/gov/v1beta1/tx.rpc.msg")).MsgClientImpl(rpc)
    },
    mint: {
      v1beta1: new (await import("../cosmos/mint/v1beta1/tx.rpc.msg")).MsgClientImpl(rpc)
    },
    slashing: {
      v1beta1: new (await import("../cosmos/slashing/v1beta1/tx.rpc.msg")).MsgClientImpl(rpc)
    },
    staking: {
      v1beta1: new (await import("../cosmos/staking/v1beta1/tx.rpc.msg")).MsgClientImpl(rpc)
    },
    upgrade: {
      v1beta1: new (await import("../cosmos/upgrade/v1beta1/tx.rpc.msg")).MsgClientImpl(rpc)
    }
  },
  ibc: {
    applications: {
      interchain_accounts: {
        controller: {
          v1: new (await import("./applications/interchain_accounts/controller/v1/tx.rpc.msg")).MsgClientImpl(rpc)
        },
        host: {
          v1: new (await import("./applications/interchain_accounts/host/v1/tx.rpc.msg")).MsgClientImpl(rpc)
        }
      },
      transfer: {
        v1: new (await import("./applications/transfer/v1/tx.rpc.msg")).MsgClientImpl(rpc)
      }
    },
    core: {
      channel: {
        v1: new (await import("./core/channel/v1/tx.rpc.msg")).MsgClientImpl(rpc)
      },
      client: {
        v1: new (await import("./core/client/v1/tx.rpc.msg")).MsgClientImpl(rpc)
      }
    }
  }
});