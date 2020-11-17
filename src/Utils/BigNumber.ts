import BN from "bignumber.js";
import { Config } from "Config";

export const BigNumber = (arg: BN.Value, base?: number) => new BN(arg, base);

export const isNumber = (num: string | number) => !BigNumber(num).isNaN();

export const isNumberAndNonZero = (n: string | number) => {
  const num = BigNumber(n);
  return !num.isNaN() && !num.isZero();
};

export const areNumbers = (numbers: Array<string | number>) =>
  numbers.every(isNumber);

export const localiseNumber = (num: string | number) =>
  BigNumber(num).toNumber().toLocaleString(Config.numberLocale);

export const truncate = (num: string | number) =>
  Math.trunc(BigNumber(num).toNumber()).toString(10);

export const toNumber = (num: string | number) => BigNumber(num).toNumber();

export const toBNFixed = (num: string | number) => BigNumber(num).toFixed();

export const toHex = (num: string | number) =>
  "0x" + BigNumber(num).toString(16);

export const truncateDecimals = (
  num: string | number,
  decimalPlaces = Config.globalPowerPrecision
) => {
  if (typeof num === "string" && /\.(0{0,})?$/.test(num)) return num;
  return BigNumber(num).decimalPlaces(decimalPlaces).toFixed();
};

export const isNaN = (num: string) => {
  return BigNumber(num).isNaN();
};
