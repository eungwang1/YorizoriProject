import { atom } from "recoil";

export const stepUrlAtom = atom({
  key: "stepUrl",
  default: null,
});

export const IngredientsListAtom = atom({
  key: "IngredientListState",
  default: ["waqeqcasdcq"],
});

// export const IngredientAtom = atom({
//   key: "Ingredient",
//   default: [],
// });

export const SourceListAtom = atom({
  key: "SourceListState",
  default: ["dqwcdqwcdzx"],
});

export const OrderListAtom = atom({
  key: "OrderListState",
  default: ["cdsacqwecasd"],
});

export const MainImageStateAtom = atom({
  key: "MainImageState",
  default: {
    file: [],
    state: false,
    preview: "",
  },
});

export const SubImageStateAtom = atom({
  key: "SubImageState",
  default: {
    file: Array.from({ length: 100 }, () => 0),
    state: false,
    preview: Array.from({ length: 100 }, () => 0),
  },
});

export const SubModalStateAtom = atom({
  key: "SubModalState",
  default: {
    state: false,
    index: "",
  },
});

export const PreviewRefAtom = atom({
  key: "PreviewRef",
  default: null,
});

export const DeleteIndexAtom = atom({
  key: "deleteIndex",
  default: 0,
});

export const postPageStateAtom = atom({
  key: "postPageState",
  default: 1,
});

export const cookInfoAtom = atom({
  key: "cookInfo",
  default: {},
});

export const categoryAtom = atom({
  key: "category",
  default: {},
});

export const InvalidationAtom = atom({
  key: "invalidation",
  default: false,
});
