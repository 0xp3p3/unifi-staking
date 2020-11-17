import { atom } from "recoil";
import { Config } from "../Config";

type BalanceKeys = "BNB" | string;

export const Balances = atom<{ [K in BalanceKeys]: string }>({
  key: "balance",
  default: {
    BNB: "0",
    [Config.contracts.UNFI.address]: "0",
  },
});
