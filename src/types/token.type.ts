export interface TokenData {
  address: string;
  name: string;
  decimals: number;
  symbol: string;
  iconURI?: string;
}

export enum TOKEN_TYPE {
  STABLE_COINS = "stable",
  ALL_COINS = "all",
}
