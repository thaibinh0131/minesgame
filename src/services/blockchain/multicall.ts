import type { Interface } from "@ethersproject/abi";
import type { Contract } from "ethers";
import { getMultiCallContract } from "@/utils/contract";
import type { Call } from "@/types/multicall.type";
import type { CHAIN } from "@/types/chain.type";

export type CallDataResult = {
  valid: boolean;
  data: Array<any>;
};

const INVALID_RESULT = {
  valid: false,
  blockNumber: undefined,
  data: undefined,
};

const INVALID_CALL_STATE = {
  valid: false,
  result: undefined,
  loading: false,
  syncing: false,
  error: false,
};
export const LOADING_CALL_STATE = {
  valid: true,
  result: undefined,
  loading: true,
  syncing: true,
  error: false,
};

export const calldata = async ({
  itf,
  calls,
  chainId,
}: {
  itf: Interface;
  calls: Call[];
  chainId: CHAIN;
}) => {
  try {
    const multi = getMultiCallContract(chainId);

    const calldata = calls.map((call) => [
      call.address?.toLowerCase(),
      itf?.encodeFunctionData(call.name, call.params),
    ]);
    const { returnData } = await multi.aggregate(calldata);
    return returnData.map((call: any, i: number) => ({
      valid: true,
      data: itf?.decodeFunctionResult(calls[i].name, call),
    }));
  } catch (error) {
    console.error(error);
    return calls.map((item) => INVALID_RESULT);
  }
};

export function toCallState(callResult: any) {
  if (!callResult) return INVALID_CALL_STATE;
  const { valid, data } = callResult;
  if (!valid) return INVALID_CALL_STATE;

  return {
    valid: true,
    loading: false,
    result: data,
  };
}

export const useSingleCallResult = async ({
  contract,
  methodName,
  chainId,
  inputs = [],
}: {
  contract: Contract;
  methodName: string;
  inputs: any[];
  chainId: CHAIN;
}) => {
  const res = await calldata({
    itf: contract?.interface,
    calls: [
      {
        address: contract?.address,
        name: methodName,
        params: inputs,
      },
    ],
    chainId,
  });

  return toCallState(res[0]);
};

export const useMultipleContractSingleData = async ({
  addresses,
  contractInterface,
  methodName,
  inputs,
  chainId,
}: {
  addresses: string[];
  contractInterface: Interface;
  methodName: string;
  inputs: any[];
  chainId: CHAIN;
}) => {
  console.debug({ addresses, contractInterface, methodName, inputs, chainId });
  const res = await calldata({
    itf: contractInterface,
    calls: addresses.map((address) => ({
      address,
      name: methodName,
      params: inputs,
    })),
    chainId,
  });

  return res.map((item: any) => toCallState(item));
};

export const useSingleContractMultipleData = async ({
  contract,
  methodName,
  callInputs,
  chainId,
}: {
  contract: Contract;
  methodName: string;
  callInputs: any[];
  chainId: CHAIN;
}) => {
  const res = await calldata({
    itf: contract?.interface,
    calls: callInputs.map((inputs) => ({
      address: contract?.address,
      name: methodName,
      params: inputs,
    })),
    chainId,
  });

  return res.map((item: any) => toCallState(item));
};

export const useSingleContractMultipleMethods = async ({
  contract,
  methodNames,
  callInputs,
  chainId,
}: {
  contract: Contract;
  methodNames: string[];
  callInputs: any[];
  chainId: CHAIN;
}) => {
  const res = await calldata({
    itf: contract?.interface,
    calls: methodNames.map((method, index: number) => ({
      address: contract?.address,
      name: method,
      params: callInputs[index],
    })),
    chainId,
  });

  return res.map((item: any) => toCallState(item));
};
