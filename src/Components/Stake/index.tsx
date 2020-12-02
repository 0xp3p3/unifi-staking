import React from "react";
import { useRecoilValue } from "recoil";
import { Config } from "../../Config";
import { useContract } from "../../Hooks/useContract";
import { Balances } from "../../Store/Balance";
import { localiseNumber } from "../../Utils/BigNumber";
import { Button } from "../Button";
import { Input } from "../Input";

export const Stake = () => {
  const balances = useRecoilValue(Balances);
  const { userStaked, setStakeAmount, stake } = useContract();

  return (
    <div className="Home__items__item">
      <div className="Home__items__item__title">Staking</div>
      <div className="Staking">
        <div className="Staking__amount">{userStaked}</div>
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
  );
};
