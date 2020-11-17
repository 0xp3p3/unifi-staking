import { ethers } from "ethers";
import {
  IAdapter,
  AdapterBalance,
  NON_SUCCESS_RESPONSE,
  ExecutionParams,
} from "./IAdapter";
import { Config } from "Config";
import { ContractMethod } from "./Contract";
import { Emitter, EmitterAction } from "Utils/EventEmitter";
import { BigNumber as BN } from "Utils/BigNumber";
import { getPrecision } from "../Utils/Decimals";
import ERC20ABI from "./ABI/ERC20";
import StakeABI from "./ABI/Stake";

declare global {
  interface Window {
    ethereum: any;
  }
}

export default class EthAdapter implements IAdapter {
  protected etherClient:
    | ethers.providers.JsonRpcProvider
    | ethers.providers.Web3Provider
    | undefined;
  protected onConnectCallback = () => {};
  protected contracts: { [nameContract: string]: ethers.Contract } = {};
  protected address: string | undefined;
  protected nativeTokenName = "ETH";
  protected chainId = 1;
  protected signer:
    | ethers.providers.BaseProvider
    | ethers.Signer
    | undefined = undefined;
  private lastGasLimit: string | undefined;

  isConnected() {
    return this.getAddress() !== undefined && this.etherClient !== undefined;
  }

  getAddress(): string {
    return this.address || "";
  }

  async getBalances() {
    try {
      const ETH = await this.getNativeBalance();
      Emitter.emit(EmitterAction.BALANCE, [ETH]);

      const balances = [];
      for (const cntrct of Object.keys(Config.contracts)) {
        const contract = cntrct as keyof typeof Config.contracts;
        const token = await this.getBalanceOf(
          Config.contracts[contract].address
        );
        balances.push(token);
        Emitter.emit(EmitterAction.BALANCE, [token]);
      }

      return [ETH, ...balances];
    } catch (err) {
      console.error("EthAdapter -> getBalances -> err", err);
      return [];
    }
  }

  async connect(): Promise<EthAdapter> {
    return new Promise(async (resolve) => {
      const performConnection = async () => {
        try {
          const handleEthereum = () => {
            const { ethereum } = window;
            if (ethereum) {
              ethereum
                .request({ method: "eth_requestAccounts" })
                .then(async (accounts: string[]) => {
                  this.etherClient = new ethers.providers.Web3Provider(
                    ethereum
                  );
                  const chainId = parseInt(
                    (this.etherClient as any).provider.chainId
                  );
                  if (chainId === this.chainId) {
                    this.address = accounts[0];
                    this.signer = this.etherClient.getSigner();
                    this.onConnectCallback();
                    this.initializeContracts();
                    resolve(this);
                  }
                });
            } else {
              return false;
            }
          };

          if (window.ethereum) {
            handleEthereum();
          } else {
            window.addEventListener("ethereum#initialized", handleEthereum, {
              once: true,
            });
            setTimeout(handleEthereum, 3000);
          }
        } catch (e) {
          return false;
        }
      };

      setTimeout(async () => {
        await performConnection();
      }, 1000);
    });
  }

  async logout() {}

  onConnect(cb: () => void) {
    this.onConnectCallback = cb;
  }

  initializeContracts() {
    const contracts: { address: string; abi: ethers.ContractInterface }[] = [];

    Object.entries(Config.contracts).forEach(([, { address }]) => {
      if (address !== this.nativeTokenName) {
        contracts.push({ address, abi: ERC20ABI });
      }
    });

    contracts.push({ address: Config.stakeContract.address, abi: StakeABI });

    contracts.forEach((c) => {
      this.contracts[c.address] = new ethers.Contract(
        c.address,
        c.abi,
        this.signer
      );
    });
  }

  async execute(
    contractName: string,
    method: ContractMethod,
    params: ExecutionParams,
    isWrite = false
  ) {
    try {
      const contract = this.contracts[contractName];

      if (isWrite) {
        if (method === ContractMethod.APPROVE) {
          // FIX> APPROVAL AMOUNT * 2
          params["args"][1] = BN(params["args"][1]!)
            .multipliedBy(1.05)
            .decimalPlaces(0)
            .toFixed();
        }

        const gasLimit = await this.getEstimatedGasPrice(
          contract,
          method,
          params
        );

        const contractCall = await contract[method].apply(
          null,
          computeInvocationParams(params, { gasLimit })
        );

        if (method === ContractMethod.APPROVE) {
          await this.etherClient!.waitForTransaction(contractCall.hash);
        }

        if (contractCall && contractCall.hash) {
          return {
            success: true,
            value: "",
            hash: contractCall.hash,
            functionName: method,
            params,
          };
        }
      } else {
        const contractCall = await contract[method].apply(
          null,
          computeInvocationParams(params)
        );
        if (contractCall) {
          const value = contractCall.toString();
          return {
            success: true,
            value,
            hash: "",
            functionName: method,
            params,
          };
        }
      }
      return { ...NON_SUCCESS_RESPONSE, functionName: method, params };
    } catch (err) {
      console.error("EthAdapter -> execute -> err", method, params, err);
      return { ...NON_SUCCESS_RESPONSE, functionName: method, params };
    }
  }

  protected async getNativeBalance(
    targetAddress: string = this.getAddress()
  ): Promise<AdapterBalance> {
    if (!this.isConnected()) {
      return { name: this.nativeTokenName, balance: "0" };
    }
    const balanceOf = await this.etherClient!.getBalance(targetAddress);

    const balance = BN((balanceOf || 0).toString())
      .dividedBy(Config.globalPrecision)
      .toFixed();

    return { name: this.nativeTokenName, balance };
  }

  async getBalanceOf(
    contractAddress: string,
    targetAddress: string = this.getAddress()
  ) {
    if (!this.isConnected()) {
      return { name: contractAddress, balance: "0" };
    }

    if (contractAddress === this.nativeTokenName) {
      return this.getNativeBalance(targetAddress);
    }

    const balanceOf = await this.contracts[contractAddress].balanceOf(
      targetAddress
    );

    const balanceBN = "balance" in balanceOf ? balanceOf.balance : balanceOf;

    const balance = BN((balanceBN || 0).toString())
      .dividedBy(getPrecision(contractAddress))
      .toFixed();
    return { name: contractAddress, balance };
  }

  protected async getEstimatedGasPrice(
    contract: ethers.Contract,
    contractMethod: ContractMethod,
    params: ExecutionParams
  ) {
    try {
      const gasLimit = await contract["estimateGas"][contractMethod]
        .apply(null, computeInvocationParams(params))
        .then((v: ethers.BigNumber) => v.mul(1).toHexString());
      this.lastGasLimit = gasLimit;
      return gasLimit;
    } catch (err) {
      return this.lastGasLimit
        ? "0x" +
            BN(this.lastGasLimit).multipliedBy(2).decimalPlaces(0).toString(16)
        : undefined;
    }
  }
}

export function computeInvocationParams(
  params: ExecutionParams,
  gasOptions: { gasPrice?: string; gasLimit?: string } = {}
) {
  const { args, callValue } = params;
  const reducedContractParameters = [
    ...(args || []),
    callValue ? { value: callValue, ...gasOptions } : { ...gasOptions },
  ];
  return reducedContractParameters;
}
