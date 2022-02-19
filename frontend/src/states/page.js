import { atom } from "recoil";

const pageStateAtom = atom({
  key: "pageState",
  default: "",
});

export { pageStateAtom };
