import { atom, selector } from "recoil";
import { getFamousPosts, getFamousPostLikeUser, getFamousPostCommentUserCount } from "./homeAction";

export const datailedPostAtom = atom({
  key: "datailedPostAtom",
  default: null,
});

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
