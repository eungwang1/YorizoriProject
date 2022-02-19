import { atom } from "recoil";

//요리제목
const recipeNameAtom = atom({
  key: "recipeName",
  default: null,
});
//요리소개
const descAtom = atom({
  key: "desc",
  default: null,
});
//종류별
const categoryAtom = atom({
  key: "category",
  default: null,
});
//상황별
const conditionAtom = atom({
  key: "condition",
  default: null,
});
//재료별
const materialAtom = atom({
  key: "material",
  default: null,
});
//방법별
const cookAtom = atom({
  key: "cook",
  default: null,
});
//인원수
const servingsAtom = atom({
  key: "servings",
  default: null,
});
//요리시간
const timeAtom = atom({
  key: "time",
  default: null,
});
//난이도
const difficAtom = atom({
  key: "diffic",
  default: null,
});

//아직 확정아님 재료
const ingredientAtom = atom({
  key: "ingredient",
  default: [],
});

export {
  categoryAtom,
  descAtom,
  conditionAtom,
  materialAtom,
  cookAtom,
  servingsAtom,
  timeAtom,
  difficAtom,
  recipeNameAtom,
  ingredientAtom,
};
