export const Config = {
  blockchain: "binance",
  blockchainToken: "BNB",
  transactionExplorer: "https://bscscan.com/tx/{{TRANSACTION_HASH}}",
  accountExplorer: "https://bscscan.com/address/{{ADDRESS}}",
  httpProvider: "https://bsc-dataseed.binance.org/",
  stakeContract: {
    address: "0x23F0Fa055B6F622Ae944a3a4De9f643Bc9C5d0c3",
    decimals: 18,
  },
  contracts: {
    UNFI: {
      address: "0x728C5baC3C3e370E372Fc4671f9ef6916b814d8B",
      decimals: 18,
    },
    BNB: {
      address: "BNB",
      decimals: 18,
    },
  },
  globalPrecision: Math.pow(10, 18),
  globalPowerPrecision: 18,
  percentagePrecision: 100000,
  numberLocale: "en-US",
};
