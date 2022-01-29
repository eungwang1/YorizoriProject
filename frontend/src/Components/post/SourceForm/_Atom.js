import { atom, useRecoilState, useSetRecoilState } from "recoil";

export const SourceListState = atom({
  key: "SourceListState",
  default: [],
});
