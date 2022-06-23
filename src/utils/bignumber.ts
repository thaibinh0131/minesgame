import BigNumber from "bignumber.js";
import type { ANumber } from "@/types/helper.type";

BigNumber.set({
  ROUNDING_MODE: BigNumber.ROUND_DOWN,
  EXPONENTIAL_AT: [-50, 50],
  RANGE: 800,
});

const compare =
  (method: "gt" | "gte" | "lt" | "lte" | "eq") =>
  (inputA: ANumber) =>
  (inputB: ANumber) =>
    new BigNumber(inputA)[method](inputB);

const shift = (
  number: string | BigNumber | number,
  decimals: number | string | BigNumber
) => {
  const dec = new BigNumber(decimals).toNumber();
  return new BigNumber(number).shiftedBy(dec).toString();
};
const unshift = (
  number: string | BigNumber | number,
  decimals: number | string | BigNumber
) => {
  const dec = new BigNumber(decimals).toNumber();
  return new BigNumber(number).shiftedBy(-dec).toString();
};
export { BigNumber, compare, shift, unshift };
