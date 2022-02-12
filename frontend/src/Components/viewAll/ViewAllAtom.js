import { atom } from "recoil";

export const randomButtonState = atom({
  key: "randomButtonState",
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
