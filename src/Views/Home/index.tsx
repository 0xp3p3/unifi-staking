import React from "react";
import { Button } from "../../Components/Button";
import { Input } from "../../Components/Input";

import "./Home.scss";

export const Home = () => {
  return (
    <div className="Home">
      <div className="Home__items">
        <div className="Home__items__item">
          <div className="Home__items__item__title">Staking</div>
          <div className="Staking">
            <div className="Staking__amount">{(500.1234).toLocaleString()}</div>
            <div className="Staking__amount-title">UNFI Staked</div>
          </div>
          <div className="Stake">
            <div className="Stake__available">You have 100 UNFI available</div>
            <div className="Stake__input">
              <Input placeholder="Amount" />
            </div>
          </div>
          <div className="Home__items__item__submit">
            <Button onClick={() => {}}>Submit</Button>
          </div>
        </div>
        <div className="Home__items__item">
          <div className="Home__items__item__title">Claim</div>
          <div className="Unclaimed">
            <div className="Unclaimed__amount">2</div>
            <div className="Unclaimed__label">Unclaimed Staking Rewards</div>
          </div>
          <div className="Home__items__item__submit">
            <Button onClick={() => {}}>Claim Rewards</Button>
          </div>
        </div>
        <div className="Home__items__item">
          <div className="Home__items__item__title">$UNFI Stats</div>
          <div className="Home__items__item__list">
            <div className="list__li">
              <span>Total deposited</span>
              <span>{(121321312).toLocaleString()}</span>
            </div>
            <div className="list__li">
              <span>Total claimed</span>
              <span>{(323232).toLocaleString()}</span>
            </div>
            <div className="list__li">
              <span>$UNFI/Block</span>
              <span>5</span>
            </div>
          </div>
          <div className="Home__items__item__submit">
            {/* <Button onClick={() => {}}>Submit</Button> */}
          </div>
        </div>
      </div>
    </div>
  );
};
