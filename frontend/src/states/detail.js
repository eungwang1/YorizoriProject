import axios from "axios";
import { atom, selector, selectorFamily } from "recoil";

export const detailDataAtom = atom({
  key: "detailDataAtom",
  default: null,
});
