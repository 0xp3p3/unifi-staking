import { useRecoilState } from "recoil";
import { Adapter } from "../Store/Adapter";
import BSCAdapter from "../Adapter/BSCAdapter";

export const useAdapter = () => {
  const [, setAdapter] = useRecoilState(Adapter);

  const connect = () => {
    const adapter = new BSCAdapter();
    adapter.connect().then((ins) => {
      setAdapter(ins);
    });
  };

  return {
    connect,
  };
};
