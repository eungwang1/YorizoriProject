import { atom } from "recoil";

const authAtom = atom({
  key: "auth",
  // get initial state from local storage to enable user to stay logged in
  default: JSON.parse(localStorage.getItem("user")),
});

export const userIdAtom = atom({
  key: "uid",
  default: JSON.parse(localStorage.getItem("user"))?.uid,
})

export const userImage = atom({
  key: "uImg",
  default: JSON.parse(localStorage.getItem("user"))?.uimg,
})

export { authAtom };
