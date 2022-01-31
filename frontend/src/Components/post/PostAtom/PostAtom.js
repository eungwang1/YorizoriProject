import { atom } from "recoil";

export const stepUrlAtom = atom({
  key: "stepUrl",
  default: null,
});

//요리제목
export const recipeNameAtom = atom({
  key: "recipeName",
  default: null,
});
//요리소개
export const descAtom = atom({
  key: "desc",
  default: null,
});

export const stepOneAtom = atom({
  key: "stepOne",
  default: {
    recipeName: "",
    desc: "",
  },
});
