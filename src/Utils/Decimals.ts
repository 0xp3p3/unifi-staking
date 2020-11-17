import { Config } from "Config";

const powerDictionary: {
  [key: string]: { precision: number; decimals: number };
} = {};

(() => {
  Object.keys(Config.contracts).forEach((c) => {
    const contractName = c as keyof typeof Config.contracts;
    const contract = Config.contracts[contractName];
    powerDictionary[contractName] = {
      decimals: contract.decimals,
      precision: Math.pow(10, contract.decimals),
    };
    powerDictionary[contract.address] = {
      decimals: contract.decimals,
      precision: Math.pow(10, contract.decimals),
    };
  });
  powerDictionary[Config.stakeContract.address] = {
    decimals: Config.stakeContract.decimals,
    precision: Math.pow(10, Config.stakeContract.decimals),
  };
})();

export const getPrecision = (tokenOrContract: string) => {
  return powerDictionary[tokenOrContract]
    ? powerDictionary[tokenOrContract]["precision"]
    : Config.globalPrecision;
};

export const getDecimals = (tokenOrContract: string) => {
  return powerDictionary[tokenOrContract]
    ? powerDictionary[tokenOrContract]["decimals"]
    : Config.globalPowerPrecision;
};
