import { atom, useRecoilState, useSetRecoilState } from "recoil";

export const IngredientListState = atom({
  key: "IngredientListState",
  default: [],
});
