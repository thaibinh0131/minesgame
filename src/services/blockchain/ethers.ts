import type { PopulatedTransaction, Contract } from "ethers";
import type { TransactionResponse } from "@ethersproject/abstract-provider";
import { BigNumber } from "@/utils/bignumber";
import type { CHAIN } from "@/types/chain.type";
import {
  DEFAULT_GAS_LIMIT,
  GAS_LIMIT_BUFFER_RATIO,
  GAS_PRICE_BUFFER_RATIO,
} from "@/constants/common";
import { getSimpleRpcProvider } from "@/utils/provider";

export const getGasPrice = async (chainId: CHAIN) => {
  try {
    const provider = getSimpleRpcProvider(chainId);

    const rawGasPrice = new BigNumber(
      (await provider.getGasPrice()).toString()
    );
    return new BigNumber(rawGasPrice)
      .plus(rawGasPrice.times(GAS_PRICE_BUFFER_RATIO))
      .toString();
  } catch (error) {
    console.error(error);
    return;
  }
};

export const estimateGasLimit = async ({
  options,
  contract,
  action,
  params,
  account,
  gasPrice,
}: {
  options: PopulatedTransaction | any;
  contract: Contract;
  action: string;
  params: any[];
  account: string;
  gasPrice?: string;
}) => {
  try {
    const rawGasLimit = new BigNumber(
      (
        await contract.estimateGas[action](...params, {
          ...options,
          from: account,
          gasPrice,
        })
      ).toString()
    );
    return new BigNumber(rawGasLimit)
      .plus(rawGasLimit.times(GAS_LIMIT_BUFFER_RATIO))
      .dp(0)
      .toString();
  } catch (error) {
    console.error("Estimate gas error", error);
    return DEFAULT_GAS_LIMIT;
  }
};

export const sendRawTx = async ({
  account,
  action,
  params,
  chainId,
  contract,
  getTxHashCallback,
  options = {},
}: {
  account: string;
  action: string;
  params: any[];
  chainId: CHAIN;
  contract: Contract;
  getTxHashCallback?: Function;
  options?: any;
}) => {
  const gasPrice = await getGasPrice(chainId);
  const gasLimit = await estimateGasLimit({
    options,
    account,
    action,
    params,
    contract,
    gasPrice,
  });
  const rs: TransactionResponse = await contract[action](...params, {
    from: account,
    ...options,
    gasPrice,
    gasLimit,
  });
  if (getTxHashCallback) getTxHashCallback(rs.hash);
  return await rs.wait();
};
