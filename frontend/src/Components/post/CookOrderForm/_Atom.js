import { atom, useRecoilState, useSetRecoilState } from "recoil";

export const CookOrderState = atom({
  key: "CookOrderState",
  default: [],
});
