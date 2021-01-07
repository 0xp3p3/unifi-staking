import React, { useMemo } from "react";
import { Button } from "../../Components/Button";
import { Stake } from "../../Components/Stake";
import { Unstake } from "../../Components/Unstake";
import { useContract } from "../../Hooks/useContract";
import { localiseNumber } from "../../Utils/BigNumber";
import { formatTime } from "../../Utils/Time";

import "./Home.scss";

export const Home = () => {
  const {
    endTime,
    rewardRate,
    totalClaimed,
    totalStaked,
    pendingClaim,
    totalUserClaimed,
    claim,
  } = useContract();

  const promoFinished = useMemo(() => {
    const currDate = Date.now();
    if (endTime === 0) return false;
    return currDate > endTime;
  }, [endTime]);

  return (
    <div className="Home">
      <div className="Home__items">
        {promoFinished ? <Unstake /> : <Stake />}
        <div className="Home__items__item">
          <div className="Home__items__item__title">Claim</div>
          <div className="Unclaimed">
            <div className="Unclaimed__amount">
              {localiseNumber(pendingClaim)}
            </div>
            <div className="Unclaimed__label">Unclaimed staking rewards</div>
            <div className="Unclaimed__user-total">
              Total claimed rewards: {localiseNumber(totalUserClaimed)}
            </div>
          </div>
          <div className="Home__items__item__submit">
            <Button onClick={claim}>Claim Rewards</Button>
          </div>
        </div>
        <div className="Home__items__item">
          <div className="Home__items__item__title">$UNFI Stats</div>
          <div className="Home__items__item__list">
            <div className="list__li">
              <span>Total deposited</span>
              <span>{localiseNumber(totalStaked)}</span>
            </div>
            <div className="list__li">
              <span>Total claimed</span>
              <span>{localiseNumber(totalClaimed)}</span>
            </div>
            <div className="list__li">
              <span>$UNFI/Block</span>
              <span>{localiseNumber(rewardRate)}</span>
            </div>
            <div className="list__li">
              <span>Promotion end time</span>
              <span>{endTime === 0 ? "-" : formatTime(endTime)}</span>
            </div>
          </div>
          <div className="Home__items__item__submit">
            {/* <Button onClick={() => {}}>Submit</Button> */}
          </div>
        </div>
        {/* <div
          className="Home__items__item"
          onClick={() => {
            window.open("http://unifiprotocol.com/transfer");
          }}
        >
          <div className="Home__items__item__title">
            Transfer your UNFI tokens
          </div>
          <div style={{ textAlign: "center" }}>
            Click here to transfer your UNFI tokens to Ethereum and earn MORE
            staking rewards!
          </div>
          <div className="Home__items__item__submit">
            <Button
              onClick={() => {
                window.open("http://unifiprotocol.com/transfer");
              }}
            >
              Go to Transfer page
            </Button>
          </div>
        </div> */}
      </div>
    </div>
  );
};
