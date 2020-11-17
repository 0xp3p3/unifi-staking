import EthAdapter from "./EthAdapter";

export default class BSCAdapter extends EthAdapter {
  constructor() {
    super();
    // this.chainId = "56";
    this.chainId = "97";
    this.nativeTokenName = "BNB";
  }
}
