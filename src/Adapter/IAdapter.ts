import { ContractMethod } from "./Contract";

type Balance = string;

export type Contract = {
  address: string;
  decimals: number;
};

export type AdapterBalance = { name: string; balance: Balance };

export type ExecutionResponse = {
  success: boolean;
  functionName: ContractMethod;
  value: string;
  hash: string;
  params: ExecutionValueProps;
};

export type ExecutionValueProps = {
  args?: Array<string | number | undefined>;
  callValue?: string | number | undefined;
};

export type ExecutionParams = {
  args: Array<string | number | undefined>;
  callValue: string | number | undefined;
};

export interface IAdapter {
  isConnected(): boolean;
  getAddress(): string;
  getBalances(): Promise<AdapterBalance[]>;

  connect(): Promise<IAdapter>;

  logout(): Promise<void>;

  onConnect(cb: () => void): void;

  execute(
    contractName: string,
    method: ContractMethod,
    values: ExecutionValueProps,
    isWrite: boolean
  ): Promise<ExecutionResponse>;

  getBalanceOf(
    contractAddress: string,
    targetAddress?: string
  ): Promise<AdapterBalance>;
}

export const NON_SUCCESS_RESPONSE = { success: false, value: "", hash: "" };
