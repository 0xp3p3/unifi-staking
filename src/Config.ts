export const Config = {
  blockchain: "binance",
  blockchainToken: "BNB",
  transactionExplorer: "https://bscscan.com/tx/{{TRANSACTION_HASH}}",
  accountExplorer: "https://bscscan.com/address/{{ADDRESS}}",
  stakeContract: {
    address: "0x65bB9C768E26005FF0CF569FfB21745799f86bee",
    decimals: 18,
  },
  contracts: {
    UNFI: {
      address: "0x363d1aac158a43eac9b217eaa63e4e3345bb92a1",
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
