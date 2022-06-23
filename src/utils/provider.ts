import { ethers } from "ethers";
import { CHAIN_INFO } from "@/constants/chains";
import type { CHAIN } from "@/types/chain.type";

export const getSimpleRpcProvider = (chainId: CHAIN) => {
  const chainInfo = CHAIN_INFO[chainId];
  return new ethers.providers.StaticJsonRpcProvider(chainInfo.rpcUrl);
};

export const getLibrary = (provider: any) => {
  const library = new ethers.providers.Web3Provider(provider);
  return library;
};
