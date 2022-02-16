import axios from "axios";
import { atom, selector, selectorFamily } from "recoil";

export const detailDataAtom = atom({
  key: "detailDataAtom",
  default: null,
});

export const detailLoadingStateAtom = atom({
  key: "detailLodingState",
  default: false,
});

export const delAndAmendBtnStateAtom = atom({
  key: "delAndAmendBtnStateAtom",
  default: false,
});
