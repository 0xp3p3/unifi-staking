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
import { Balances } from "../Store/Balance";
import { Emitter, EmitterAction } from "../Utils/EventEmitter";

export const useContract = () => {
  const [rewardRate, setRewardRate] = useState("0");
  const [totalClaimed, setTotalClaimed] = useState("0");
  const [totalStaked, setTotalStaked] = useState("0");
  const [userStaked, setUserStaked] = useState("0");
  const [stakeAmount, setStakeAmount] = useState("0");
  const [totalUserClaimed, setTotalUserClaimed] = useState("0");
  const [pendingClaim, setPendingClaim] = useState("0");

  const adapter = useRecoilValue(Adapter);
  const balances = useRecoilValue(Balances);
  const [, setLoading] = useRecoilState(Loading);
  const isLoading = useRecoilValue(isLoadingReduced);
  const adapterRO = useMemo(() => BSCRO, []);

  const approval = async (amount: string) => {
    if (!adapter) return { success: false };
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
    try {
      if (isLoading) return;
      setLoading((curr) => ({ ...curr, loading: curr.loading + 1 }));

      if (!adapter) {
        Emitter.emit(EmitterAction.NOTIFICATION, {
          notification: "NO_WALLET",
          type: "info",
        });
        return;
      }
      if (!BigNumber(stakeAmount).isGreaterThan(0)) return;
      console.log("useContract -> isNaN(stakeAmount)", isNaN(stakeAmount));
      if (
        isNaN(stakeAmount) ||
        BigNumber(stakeAmount).isGreaterThan(
          balances[Config.contracts.UNFI.address]
        )
      ) {
        Emitter.emit(EmitterAction.NOTIFICATION, {
          notification: "INVALID_AMOUNT",
          type: "warning",
        });
        return;
      }

      const hexAmount = toHex(
        BigNumber(stakeAmount)
          .multipliedBy(getPrecision(Config.contracts.UNFI.address))
          .decimalPlaces(0)
          .toFixed()
      );

      const approvalResponse = await approval(hexAmount);
      if (approvalResponse.success === false) {
        Emitter.emit(EmitterAction.NOTIFICATION, {
          notification: "STAKE_FAILED",
          type: "error",
        });
        return;
      }

      const adapterResponse = await adapter.execute(
        Config.stakeContract.address,
        ContractMethod.STAKE,
        { args: [hexAmount] },
        true
      );

      if (adapterResponse.success === false) {
        Emitter.emit(EmitterAction.NOTIFICATION, {
          notification: "STAKE_FAILED",
          type: "error",
        });
        return;
      }

      Emitter.emit(EmitterAction.NOTIFICATION, {
        notification: "STAKE_SUCCESSFUL",
        type: "success",
      });
      return adapterResponse;
    } catch (err) {
      Emitter.emit(EmitterAction.NOTIFICATION, {
        notification: "STAKE_FAILED",
        type: "error",
      });
    } finally {
      setLoading((curr) => ({
        ...curr,
        totalRequests: curr.totalRequests + 1,
      }));
    }
  };

  const claim = async () => {
    try {
      if (isLoading) return;
      setLoading((curr) => ({ ...curr, loading: curr.loading + 1 }));

      if (!adapter) {
        Emitter.emit(EmitterAction.NOTIFICATION, {
          notification: "NO_WALLET",
          type: "info",
        });
        return;
      }
      if (!BigNumber(pendingClaim).isGreaterThan(0)) return;

      const adapterResponse = await adapter.execute(
        Config.stakeContract.address,
        ContractMethod.CLAIM,
        {},
        true
      );

      if (adapterResponse.success === false) {
        Emitter.emit(EmitterAction.NOTIFICATION, {
          notification: "CLAIM_FAILED",
          type: "error",
        });
        return;
      }

      Emitter.emit(EmitterAction.NOTIFICATION, {
        notification: "CLAIM_SUCCESSFUL",
        type: "success",
      });
      return adapterResponse;
    } catch (err) {
      Emitter.emit(EmitterAction.NOTIFICATION, {
        notification: "CLAIM_FAILED",
        type: "error",
      });
    } finally {
      setLoading((curr) => ({
        ...curr,
        totalRequests: curr.totalRequests + 1,
      }));
    }
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
    // eslint-disable-next-line
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
