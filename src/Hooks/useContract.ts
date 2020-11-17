import { useCallback, useEffect, useMemo, useState } from "react";
import { useRecoilValue } from "recoil";
import { ContractMethod } from "../Adapter/Contract";
import { Config } from "../Config";
import { Adapter } from "../Store/Adapter";
import { toHex, BigNumber } from "../Utils/BigNumber";
import BSCRO from "Adapter/BSCROAdapter";
import { getPrecision } from "../Utils/Decimals";

export const useContract = () => {
  const [rewardRate, setRewardRate] = useState("0");
  const [totalClaimed, setTotalClaimed] = useState("0");
  const [totalStaked, setTotalStaked] = useState("0");
  const [userStaked, setUserStaked] = useState("0");

  const adapter = useRecoilValue(Adapter);
  const adapterRO = useMemo(() => BSCRO, []);

  const approval = async (amount: string) => {
    if (!adapter) return;
    const hexAmount = toHex(amount);
    const adapterResponse = await adapter.execute(
      Config.contracts.UNFI.address,
      ContractMethod.APPROVE,
      { callValue: hexAmount },
      true
    );
    return adapterResponse;
  };

  const getUserStaked = useCallback(async () => {
    if (!adapter) return "0";
    const adapterResponse = await adapter.execute(
      Config.stakeContract.address,
      ContractMethod.USER_STAKE_AMOUNT,
      { args: [adapter.getAddress()], callValue: undefined },
      false
    );
    return BigNumber(adapterResponse.value)
      .dividedBy(getPrecision(Config.stakeContract.address))
      .toFixed();
  }, [adapter]);

  const getRewardRate = useCallback(async () => {
    const adapterResponse = await adapterRO.execute(
      Config.stakeContract.address,
      ContractMethod.REWARD_RATE,
      { args: [], callValue: undefined }
    );
    return BigNumber(adapterResponse.value)
      .dividedBy(getPrecision(Config.stakeContract.address))
      .toFixed();
  }, [adapterRO]);

  const getTotalClaimed = useCallback(async () => {
    const adapterResponse = await adapterRO.execute(
      Config.stakeContract.address,
      ContractMethod.CONTRACT_TOTAL_CLAIMED,
      { args: [], callValue: undefined }
    );
    return BigNumber(adapterResponse.value)
      .dividedBy(getPrecision(Config.stakeContract.address))
      .toFixed();
  }, [adapterRO]);

  const getTotalStaked = useCallback(async () => {
    const adapterResponse = await adapterRO.execute(
      Config.stakeContract.address,
      ContractMethod.TOTAL_STAKE_AMOUNT,
      { args: [], callValue: undefined }
    );
    return BigNumber(adapterResponse.value)
      .dividedBy(getPrecision(Config.stakeContract.address))
      .toFixed();
  }, [adapterRO]);

  useEffect(() => {
    getRewardRate().then(setRewardRate);
  }, [getRewardRate]);

  useEffect(() => {
    getTotalClaimed().then(setTotalClaimed);
  }, [getTotalClaimed]);

  useEffect(() => {
    getTotalStaked().then(setTotalStaked);
  }, [getTotalStaked]);

  useEffect(() => {
    getUserStaked().then(setUserStaked);
  }, [getUserStaked]);

  return { approval, rewardRate, totalClaimed, totalStaked, userStaked };
};
