import Recoil, { atom, selector, selectorFamily } from "recoil";
import { getFamousPosts, getFamousUsers, getUserPosts, getUser } from "../actions/homeAction";

import { userIdAtom } from "./auth";

export const homeResetTrigger = atom({
  key: "homeResetTrigger",
  default: 0,
});

//디테일 뷰로 들어갈 때 해당 게시물의 정보를 이 아톰에 넣습니다.
export const detailedPostAtom = atom({
  key: "datailedPostAtom",
  default: null,
});

//로그인한 유저 정보를 받습니다.
export const loginUserAtom = atom({
  key: "loginUserAtom",
  default: null,
});

export const detailedUserAtom = atom({
  key: "detailedUserAtom",
  default: null,
});

export const loginUserSelector = selector({
  key: "loginUserSelector",
  get: async ({ get }) => {
    try {
      const uid = get(userIdAtom);
      if (!uid) return null;
      const loginUser = await getUser(uid);
      return loginUser;
    } catch (err) {
      console.error(err);
      throw err;
    }
  },
  set: ({ set, get }, newValue) => {
    const loginUser = get(loginUserAtom);
    if (loginUser) return;
    set(loginUserAtom, newValue);
  },
});

//인기있는 게시글들을 가져옵니다.
export const famousPostsSelector = selector({
  key: "famousPostsSelector",
  get: async ({ get }) => {
    try {
      // get(homeResetTrigger);
      const famousList = await getFamousPosts(1, 4);
      return famousList;
    } catch (err) {
      console.error(err);
      throw err;
    }
  },
  // set: ({ set }, value) => {
  //   if (value instanceof Recoil.DefaultValue) {
  //     set(homeResetTrigger, (v) => v + 1);
  //   }
  // },
});

//인기있는 유저들을 가져옵니다.
export const famousUsersSelector = selector({
  key: "famousUsersSelector",
  get: async ({ get }) => {
    try {
      const famousUserList = await getFamousUsers(1, 4);
      return famousUserList;
    } catch (err) {
      console.error(err);
      throw err;
    }
  },
});

//인기있는 유저들을 가져오면 그 유저가 작성한 게시물들을 가져옵니다.
export const famousUsersPostsSelector = selector({
  key: "famousUsersPostsSelector",
  get: async ({ get }) => {
    try {
      // get(homeResetTrigger);
      const famousUserList = await getFamousUsers(1, 4);
      const promises = famousUserList.map(async ({ _id }) => {
        const posts = await getUserPosts(_id, 1, 6);
        return posts;
      });
      const famousUserPosts = await Promise.all(promises);
      return famousUserPosts;
    } catch (err) {
      console.error(err);
      throw err;
    }
  },
  // set: ({ set }, value) => {
  //   if (value instanceof Recoil.DefaultValue) {
  //     set(homeResetTrigger, (v) => v + 1);
  //   }
  // },
});
