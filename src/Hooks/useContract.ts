import { useRecoilValue } from "recoil";
import { ContractMethod } from "../Adapter/Contract";
import { Config } from "../Config";
import { Adapter } from "../Store/Adapter";
import { toHex } from "../Utils/BigNumber";

export const useContract = () => {
  const adapter = useRecoilValue(Adapter);

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

  return { approval };
};
