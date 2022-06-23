export interface ConnectorResponse {
  provider: any;
  chainId: number;
  id: string;
  account: string;
  connect: Function;
}

export enum AvailableConnectors {
  METAMASK = "metamask",
  WALLET_CONNECt = "walletconnect",
}
