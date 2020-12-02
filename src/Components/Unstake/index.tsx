import React from "react";
import { useContract } from "../../Hooks/useContract";
import { Button } from "../Button";
import { Input } from "../Input";

export const Unstake = () => {
  const { userStaked, setStakeAmount, unstake } = useContract();

  return (
    <div className="Home__items__item">
      <div className="Home__items__item__title">Unstaking</div>
      <div className="Staking">
        <div className="Staking__amount">{userStaked}</div>
        <div className="Staking__amount-title">Your UNFI staked</div>
      </div>
      <div className="Stake">
        <div className="Stake__input">
          <Input
            placeholder="Amount"
            max={userStaked}
            onChange={setStakeAmount}
          />
        </div>
      </div>
      <div className="Home__items__item__submit">
        <Button onClick={unstake}>Submit</Button>
      </div>
    </div>
  );
};
