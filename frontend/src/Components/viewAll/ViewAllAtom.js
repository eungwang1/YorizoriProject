import { atom } from "recoil";

export const buttonState = atom({
  key: "buttonState",
  default: false,
});

export const randomPostState = atom({
  key: "randomPostState",
  default: {},
});

export const dropDownOptionsState = atom({
  key: "dropDownOptionsState",
  default: { category: "", material: "", condition: "", cook: "" },
});
