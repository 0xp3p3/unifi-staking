import React from "react";
import { Button } from "../../Components/Button";

import "./HomeHeader.scss";

export const HomeHeader = () => {
  return (
    <div className="HomeHeader">
      <div className="HomeHeader__left">
        <div className="HomeHeader__left__title">
          Staking is now available on Ethereum!
        </div>
        <div className="HomeHeader__left__body">
          <p>
            The Binance Smart Chain staking promotion has ended. Ethereum
            staking is the next step in preparation for the launch of the UNFI{" "}
            <a
              href="https://medium.com/unifiprotocol/unfi-proof-of-stake-3399130ddda3"
              target="_blank"
              rel="noopener noreferrer"
            >
              Proof of Stake Global Governance Model
            </a>{" "}
            (GGM). Staking rewards from BSC can be claimed on this page and then
            transferred to Ethereum via the transfer bridge. This will allow you
            to earn even more staking rewards!
          </p>
          <p>
            Better act quick, there is limited space available for{" "}
            <a
              href="https://medium.com/unifiprotocol/unfi-staking-on-ethereum-first-come-first-serve-januarys-space-is-limited-4624b8a880f4"
              target="_blank"
              rel="noopener noreferrer"
            >
              staking in January
            </a>{" "}
            - once it is full, no additional stake will be allowed! Earn up to
            40% APR and possibly qualify for the{" "}
            <a
              href="https://medium.com/unifiprotocol/unfi-staking-on-ethereum-first-come-first-serve-januarys-space-is-limited-4624b8a880f4"
              target="_blank"
              rel="noopener noreferrer"
            >
              2000 UNFI bonus giveaway
            </a>
            !
          </p>
        </div>
        <div className="HomeHeader__left__more-info">
          <a
            href="http://unifiprotocol.com/transfer"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button onClick={() => {}}>
              Transfer UNFI from BSC to Ethereum
            </Button>
          </a>
        </div>
      </div>
      <div className="HomeHeader__right hide-for-mobile"></div>
    </div>
  );
};
