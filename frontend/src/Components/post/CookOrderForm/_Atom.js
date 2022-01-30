import { atom, useRecoilState, useSetRecoilState } from "recoil";

export const CookOrderState = atom({
  key: "CookOrderState",
  default: [],
});

export const modalStateAtom = atom({
  key: "modalState",
  default: false,
});
