import React, { useCallback, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { AdapterBalance } from "../../Adapter/IAdapter";
import { Adapter } from "../../Store/Adapter";
import { Balances } from "../../Store/Balance";
import { useToasts } from "react-toast-notifications";
import { Emitter, EmitterAction } from "../../Utils/EventEmitter";
import { Notification, NotificationType } from "../Notifications";
import { useInterval } from "../../Utils/useInterval";

export const Updater = () => {
  const adapter = useRecoilValue(Adapter);
  const [, setBalances] = useRecoilState(Balances);
  const { addToast } = useToasts();

  const updateStateBalances = useCallback(
    (balances: AdapterBalance[]) => {
      balances.forEach((b) => {
        setBalances((state) => ({ ...state, [b.name]: b.balance }));
      });
    },
    [setBalances]
  );

  const fetchBalances = useCallback(() => {
    if (!adapter) return;
    adapter.getBalances();
  }, [adapter]);

  useEffect(() => {
    fetchBalances();
    Emitter.on(EmitterAction.BALANCE, updateStateBalances as any);
    Emitter.on(EmitterAction.REFRESH_BALANCES, fetchBalances as any);
  }, [adapter, updateStateBalances, fetchBalances]);

  useEffect(() => {
    const cb = (payload: {
      notification: NotificationType;
      type: "error" | "warning" | "success";
    }) => {
      addToast(<div>{Notification[payload.notification]}</div>, {
        appearance: payload.type,
      });
    };
    Emitter.on(EmitterAction.NOTIFICATION, cb as any);
    return () => {
      Emitter.off(EmitterAction.NOTIFICATION, cb);
    };
  }, [addToast]);

  useInterval(
    () => {
      Emitter.emit(EmitterAction.REFRESH_BALANCES);
    },
    adapter ? 5000 : null
  );

  return <></>;
};
