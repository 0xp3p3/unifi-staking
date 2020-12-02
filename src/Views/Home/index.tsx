import React from "react";
import { useRecoilValue } from "recoil";
import { Button } from "../../Components/Button";
import { Input } from "../../Components/Input";
import { Config } from "../../Config";
import { useContract } from "../../Hooks/useContract";
import { Balances } from "../../Store/Balance";
import { localiseNumber } from "../../Utils/BigNumber";
import { formatTime } from "../../Utils/Time";

import "./Home.scss";

export const Home = () => {
  const balances = useRecoilValue(Balances);
  const {
    endTime,
    rewardRate,
    totalClaimed,
    totalStaked,
    userStaked,
    pendingClaim,
    totalUserClaimed,
    setStakeAmount,
    stake,
    claim,
  } = useContract();

  return (
    <div className="Home">
      <div className="Home__items">
        <div className="Home__items__item">
          <div className="Home__items__item__title">Staking</div>
          <div className="Staking">
            <div className="Staking__amount">{localiseNumber(userStaked)}</div>
            <div className="Staking__amount-title">Your UNFI staked</div>
          </div>
          <div className="Stake">
            <div className="Stake__available">
              You have {localiseNumber(balances[Config.contracts.UNFI.address])}{" "}
              UNFI available
            </div>
            <div className="Stake__input">
              <Input
                placeholder="Amount"
                max={balances[Config.contracts.UNFI.address]}
                onChange={setStakeAmount}
              />
            </div>
          </div>
          <div className="Home__items__item__submit">
            <Button onClick={stake}>Submit</Button>
          </div>
        </div>
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
      </div>
    </div>
  );
};
