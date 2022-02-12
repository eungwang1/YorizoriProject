import { atom, selector } from "recoil";
import { getFamousPosts, getFamousPostLikeUser, getFamousPostCommentUserCount } from "./homeAction";

//디테일 뷰로 들어갈 때 해당 게시물의 정보를 이 아톰에 넣습니다.
export const datailedPostAtom = atom({
  key: "datailedPostAtom",
  default: null,
});

//해당 포스트를 좋아요한 유저들 데이터가 들어가요
export const detailedPostsLikeUserAtom = atom({
  key: "FamousPostsAtom",
  default: null,
});

export const famousPostsSelector = selector({
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

// export const famousUserPostSelector

export const famousPostLikeUserSelector = selector({
  key: "FamousPostLikeUserSelector",
  get: async ({ get }) => {
    try {
      const famousPosts = get(famousPostsSelector);
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

export const famousPostCommentUserSelector = selector({
  key: "FamousPostCommentUserSelector",
  get: async ({ get }) => {
    try {
      const famousPosts = get(famousPostsSelector);
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
