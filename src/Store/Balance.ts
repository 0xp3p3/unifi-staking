import { atom } from "recoil";

type BalanceKeys = "BNB" | string;

export const Balances = atom<{ [K in BalanceKeys]: string }>({
  key: "balance",
  default: {
    BNB: "0",
    UNFI: "0",
  },
});
