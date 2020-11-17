import React, { useCallback, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { AdapterBalance } from "../../Adapter/IAdapter";
import { Adapter } from "../../Store/Adapter";
import { Balances } from "../../Store/Balance";
import { Emitter, EmitterAction } from "../../Utils/EventEmitter";

export const Updater = () => {
  const adapter = useRecoilValue(Adapter);
  const [, setBalances] = useRecoilState(Balances);

  const updateBalances = useCallback(
    (balances: AdapterBalance[]) => {
      balances.forEach((b) => {
        setBalances((state) => ({ ...state, [b.name]: b.balance }));
      });
    },
    [setBalances]
  );

  useEffect(() => {
    if (!adapter) return;
    adapter.getBalances();
    Emitter.on(EmitterAction.BALANCE, updateBalances as any);
  }, [adapter, updateBalances]);

  return <></>;
};
