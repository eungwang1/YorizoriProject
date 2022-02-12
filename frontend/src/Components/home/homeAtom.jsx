import { atom, selector } from "recoil";
import { getFamousPosts, getFamousPostLikeUser, getFamousPostCommentUserCount } from "./homeAction";

//post shcema에 유저 populate 한 데이터 들어갑니다
export const datailedPostAtom = atom({
  key: "datailedPostAtom",
  default: null,
});

//해당 포스트를 좋아요한 유저들 데이터가 들어가요
export const detailedPostsLikeUserAtom = atom({
  key: "FamousPostsAtom",
  default: null,
});

export const FamousPostsSelector = selector({
  key: "getFamousListSelector",
  get: async ({ get }) => {
    try {
      const famousList = await getFamousPosts(1, 4);
      return famousList;
    } catch (err) {
      throw err;
    }
  },
});

export const FamousPostLikeUserSelector = selector({
  key: "FamousPostLikeUserSelector",
  get: async ({ get }) => {
    try {
      const famousPosts = get(FamousPostsSelector);
      const promises = famousPosts.map(async ({ _id }) => {
        const user = await getFamousPostLikeUser(_id);
        return user;
      });
      const likeUsers = await Promise.all(promises);
      // console.log("likeUsers", likeUsers);
      return likeUsers;
    } catch (err) {
      throw err;
    }
  },
});

export const FamousPostCommentUserSelector = selector({
  key: "FamousPostCommentUserSelector",
  get: async ({ get }) => {
    try {
      const famousPosts = get(FamousPostsSelector);
      const promises = famousPosts.map(async ({ _id }) => {
        const userCount = await getFamousPostCommentUserCount(_id);
        return userCount;
      });
      const commentUserCounts = await Promise.all(promises);
      // console.log("commentUserCounts", commentUserCounts);
      return commentUserCounts;
    } catch (err) {
      throw err;
    }
  },
});
