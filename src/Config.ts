export const Config = {
  blockchain: "binance",
  blockchainToken: "BNB",
  transactionExplorer: "https://bscscan.com/tx/{{TRANSACTION_HASH}}",
  accountExplorer: "https://bscscan.com/address/{{ADDRESS}}",
  httpProvider: "https://data-seed-prebsc-1-s1.binance.org:8545/",
  stakeContract: {
    address: "0x5DD835057c6a378559325EBCC5b41c41329343c0",
    decimals: 18,
  },
  contracts: {
    UNFI: {
      address: "0x363D1AAc158a43eAc9b217eAa63e4E3345Bb92A1",
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
