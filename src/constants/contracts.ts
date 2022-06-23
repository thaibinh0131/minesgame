import { ethers } from "ethers";

export const MULTICALL_CONTRACT = import.meta.env
  .VITE_MULTICALL_CONTRACT as string;

export const MOCK_ETH_ADDRESS = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";
export const DEFAULT_APPROVE_AMOUNT = ethers.constants.MaxInt256.toString();
