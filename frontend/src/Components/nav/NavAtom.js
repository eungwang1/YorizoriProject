import { atom } from "recoil";

//검색을 한 레시피명이 들어가요.
export const searchAtom = atom({
  key: "searchAtom",
  default: "",
});

//데이터 상태설정
export const dataAtom = atom({
  key: "dataAtom",
  default: "",
});
