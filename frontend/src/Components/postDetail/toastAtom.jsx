import { atom } from "recoil";

export const toastAtom = atom({
  key: "toast",
  default: false,
});

export const messageAtom = atom({
  key: "toast message",
  default: "",
});

export const isLoadingAtom = atom({
    key: "isLoading",
    default: true,
})