import numeral from "numeral";
import { BigNumber, compare } from "@/utils/bignumber";
import type { TokenData, ANumber } from "@/types";

export const shortenAddress = (address: string) => {
  if (!address) {
    return "";
  }
  return `${address.substring(0, 4)}...${address.substring(
    address.length - 4
  )}`;
};
export const toCurrency = (
  value: ANumber,
  decimal = 6,
  displayZero = false,
  displayLowerThan = false,
  valueLowerThan = 0.01
) => {
  if (!value || !Number(value)) {
    if (displayZero) return "0";
    return "---";
  }

  if (compare("lt")(value)(valueLowerThan) && displayLowerThan) {
    return `< ${valueLowerThan}`;
  }

  value = new BigNumber(value || 0);

  const roundingMode = BigNumber.ROUND_DOWN;
  const output = new BigNumber(value)
    .toFormat(decimal, roundingMode)
    .toString();

  const replacedOutput = output.replace(/(\.[0-9]*[1-9])0+$|\.0*$/, "$1");
  if (new BigNumber(value).gt(0) && replacedOutput === "0") {
    return `≈ ${replacedOutput}`;
  }
  return replacedOutput;
};

export const toPercent = (val: string | number, decimals = 2) => {
  if (val && Number(val)) {
    const roundingMode = BigNumber.ROUND_DOWN;
    const percent = new BigNumber(val)
      .times(100)
      .toFormat(decimals, roundingMode)
      .toString();
    const replacedOutput = percent.replace(/(\.[0-9]*[1-9])0+$|\.0*$/, "$1");
    return `${replacedOutput}%`;
  }
  return "---";
};

export const toNumberUnits = (
  val: string | number,
  key = "short",
  emptyFormat = "---"
) => {
  console.debug({ val });
  if (compare("eq")(val)(0)) return emptyFormat;
  const formattedVal = new BigNumber(val).dp(6).toString();
  let format = "0,000.[0000]";
  if (compare("gt")(formattedVal)(10000)) format = "0.[00]a";
  if (compare("lt")(formattedVal)(1)) format = "0.[000000]";
  if (key === "long") {
    format = "0,000.[00]";
    if (compare("lt")(formattedVal)(1)) format = "0.[000000]";
  }
  return numeral(formattedVal).format(format).toUpperCase();
};

export const unWrapToken = (token: TokenData) => {
  const splittedName = token.name.split(" ");
  const splicedSymbol = token.symbol.substring(1, token.symbol.length);
  return {
    ...token,
    name: splittedName[1],
    symbol: splicedSymbol,
  };
};
