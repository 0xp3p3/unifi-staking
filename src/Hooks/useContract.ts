import { useCallback, useEffect, useMemo, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { ContractMethod } from "../Adapter/Contract";
import { Config } from "../Config";
import { Adapter } from "../Store/Adapter";
import { toHex, BigNumber, isNaN } from "../Utils/BigNumber";
import BSCRO from "Adapter/BSCROAdapter";
import { getPrecision } from "../Utils/Decimals";
import { useInterval } from "../Utils/useInterval";
import { Loading, isLoading as isLoadingReduced } from "../Store/Loading";

export const useContract = () => {
  const [rewardRate, setRewardRate] = useState("0");
  const [totalClaimed, setTotalClaimed] = useState("0");
  const [totalStaked, setTotalStaked] = useState("0");
  const [userStaked, setUserStaked] = useState("0");
  const [stakeAmount, setStakeAmount] = useState("0");
  const [totalUserClaimed, setTotalUserClaimed] = useState("0");
  const [pendingClaim, setPendingClaim] = useState("0");

  const adapter = useRecoilValue(Adapter);
  const [, setLoading] = useRecoilState(Loading);
  const isLoading = useRecoilValue(isLoadingReduced);
  const adapterRO = useMemo(() => BSCRO, []);

  const approval = async (amount: string) => {
    if (!adapter) return;
    const hexAmount = toHex(amount);
    const adapterResponse = await adapter.execute(
      Config.contracts.UNFI.address,
      ContractMethod.APPROVE,
      { args: [Config.stakeContract.address, hexAmount] },
      true
    );
    return adapterResponse;
  };

  const stake = async () => {
    if (!adapter || isLoading) return;
    if (isNaN(stakeAmount)) return;

    setLoading((curr) => ({ ...curr, loading: curr.loading + 1 }));

    const hexAmount = toHex(
      BigNumber(stakeAmount)
        .multipliedBy(getPrecision(Config.contracts.UNFI.address))
        .decimalPlaces(0)
        .toFixed()
    );

    await approval(hexAmount);

    const adapterResponse = await adapter.execute(
      Config.stakeContract.address,
      ContractMethod.STAKE,
      { args: [hexAmount] },
      true
    );

    setLoading((curr) => ({ ...curr, totalRequests: curr.totalRequests + 1 }));

    return adapterResponse;
  };

  const claim = async () => {
    if (!adapter) return;

    setLoading((curr) => ({ ...curr, loading: curr.loading + 1 }));

    const adapterResponse = await adapter.execute(
      Config.stakeContract.address,
      ContractMethod.CLAIM,
      {},
      true
    );

    setLoading((curr) => ({ ...curr, totalRequests: curr.totalRequests + 1 }));

    return adapterResponse;
  };

  const getTotalUserClaimed = useCallback(async () => {
    if (!adapter) return "0";
    const adapterResponse = await adapter.execute(
      Config.stakeContract.address,
      ContractMethod.TOTAL_CLAIMED,
      { args: [adapter.getAddress()], callValue: undefined },
      false
    );
    return BigNumber(adapterResponse.value)
      .dividedBy(getPrecision(Config.stakeContract.address))
      .toFixed();
  }, [adapter]);

  const getPendingClaim = useCallback(async () => {
    if (!adapter) return "0";
    const adapterResponse = await adapter.execute(
      Config.stakeContract.address,
      ContractMethod.PENDING_CLAIM,
      { args: [adapter.getAddress()], callValue: undefined },
      false
    );
    return BigNumber(adapterResponse.value)
      .dividedBy(getPrecision(Config.stakeContract.address))
      .toFixed();
  }, [adapter]);

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
    getTotalStaked().then(setTotalStaked);
    getTotalUserClaimed().then(setTotalUserClaimed);
    getPendingClaim().then(setPendingClaim);
  }, [adapter]);

  useInterval(
    () => {
      getUserStaked().then(setUserStaked);
      getTotalStaked().then(setTotalStaked);
      getTotalUserClaimed().then(setTotalUserClaimed);
      getPendingClaim().then(setPendingClaim);
    },
    adapter ? 5000 : null
  );

  return {
    approval,
    setStakeAmount,
    stake,
    claim,
    rewardRate,
    totalClaimed,
    totalStaked,
    userStaked,
    totalUserClaimed,
    pendingClaim,
  };
};
