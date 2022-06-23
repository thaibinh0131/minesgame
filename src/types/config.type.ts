import type { CHAIN } from "./chain.type";

export interface ContractResponse {
  LendingPoolAddressesProvider: string;
  LendingPoolAddressesProviderRegistry: string;
  LendingPool: string;
  LendingPoolConfigurator: string;
  AaveOracle: string;
  LendingRateOracle: string;
  AaveProtocolDataProvider: string;
  PerlifyToken: string;
  MultiFeeDistribution: string;
  ChefIncentivesController: string;
  MasterChef: string;
  DefaultReserveInterestRateStrategy: string;
  WETHGateway: string;
  LendingPoolCollateralManager: string;
  WalletBalanceProvider: string;
  ProtocolOwnedDEXLiquidity: string;
}

export enum AvailableEnvironments {
  DEV = "dev",
  PRE = "pre",
  PROD = "prod",
}
export type ConfigResponse = {
  [x: string]: Record<AvailableEnvironments, ContractResponse>;
};

export type ApiConfigResponse = Record<"data", ConfigResponse>;
