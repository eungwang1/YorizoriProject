import { atom } from "recoil";

//검색을 한 레시피명이 들어가요.
export const searchAtom = atom({
  key: "searchAtom",
  default: "",
});
