export const Config = {
  blockchain: "binance",
  blockchainToken: "BNB",
  transactionExplorer: "https://bscscan.com/tx/{{TRANSACTION_HASH}}",
  accountExplorer: "https://bscscan.com/address/{{ADDRESS}}",
  contracts: {
    // UNFI: {
    //   address: "0xD",
    //   decimals: 18,
    // },
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
