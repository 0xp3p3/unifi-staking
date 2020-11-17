import { atom } from "recoil";
import { IAdapter } from "../Adapter/IAdapter";

export const Adapter = atom<IAdapter | undefined>({
  key: "adapter",
  default: undefined,
  dangerouslyAllowMutability: true,
});
