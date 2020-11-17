import { ethers } from "ethers";
import { Config } from "../Config";
import EthAdapter from "./EthAdapter";

class BSCROAdapter extends EthAdapter {
  constructor() {
    super();
    // this.chainId = "56";
    this.chainId = 97;
    this.nativeTokenName = "BNB";
    this.etherClient = new ethers.providers.JsonRpcProvider(
      Config.httpProvider
    );
    this.initializeContracts();
  }

  connect() {
    return Promise.resolve(this);
  }
}

const BSCRO = new BSCROAdapter();

export default BSCRO;
