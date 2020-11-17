import { useRecoilState } from "recoil";
import { Adapter } from "../Store/Adapter";
import BSCAdapter from "../Adapter/BSCAdapter";
import { Emitter, EmitterAction } from "../Utils/EventEmitter";

export const useAdapter = () => {
  const [, setAdapter] = useRecoilState(Adapter);

  const connect = () => {
    const adapter = new BSCAdapter();
    adapter.connect().then((ins) => {
      setAdapter(ins);
      Emitter.emit(EmitterAction.NOTIFICATION, {
        notification: "CONNECTED",
        type: "info",
      });
    });
  };

  return {
    connect,
  };
};
