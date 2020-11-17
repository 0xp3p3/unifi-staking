import React from "react";
import { Button } from "../../Components/Button";

import "./HomeHeader.scss";

export const HomeHeader = () => {
  return (
    <div className="HomeHeader">
      <div className="HomeHeader__left">
        <div className="HomeHeader__left__title">
          Binance Smart Chain UNFI Staking Promotion
        </div>
        <div className="HomeHeader__left__body">
          UNFI is the first sustainable DeFi token to incorporate Proof of Stake
          elements into its powerful DAO representative governance model. Start
          earning rewards now as we count down to the launch of the
          revolutionary Proof of Stake Global Governance Model powered by UNFI!
          Stake your UNFI today to earn more UNFI rewards. All UNFI rewards can
          be claimed at the conclusion of the promotion.
        </div>
        <div className="HomeHeader__left__more-info">
          <a
            href="https://unifiprotocol.zendesk.com/hc/en-us/articles/360051852432-Global-Governance-Model-GGM-"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button onClick={() => {}}>Global Governance Model</Button>
          </a>
        </div>
      </div>
      <div className="HomeHeader__right"></div>
    </div>
  );
};
