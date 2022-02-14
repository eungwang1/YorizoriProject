import { atom, selector, selectorFamily } from "recoil";
import {
  getFamousPosts,
  // getFamousPostLikeUser,
  // getFamousPostCommentUserCount,
  getFamousUsers,
  getUserPosts,
  getUser,
} from "../actions/homeAction";
import { userIdAtom } from "./auth";

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

//해당 포스트를 좋아요한 유저들 데이터가 들어가요
export const detailedPostsLikeUserAtom = atom({
  key: "FamousPostsAtom",
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
  key: "getFamousListSelector",
  get: async ({ get }) => {
    try {
      const famousList = await getFamousPosts(1, 4);
      return famousList;
    } catch (err) {
      console.error(err);
      throw err;
    }
  },
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
      // const famousUsers = get(famousUsersSelector);
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
});

//함수와 셀렉터 모듈화 작업중
// //인기있는 유저들을 가져오면 그 유저가 작성한 게시물들을 가져옵니다.
// export const famousUsersPostsSelector = selectorFamily({
//   key: "famousUsersPostsSelector",
//   get:
//     (startIndex, limit) =>
//     async ({ get }) => {
//       try {
//         // const famousUsers = get(famousUsersSelector);
//         console.log(1111, typeof startIndex);
//         const famousUserList = await getFamousUsers({ startIndex, limit });
//         const promises = famousUserList.map(async ({ _id }) => {
//           const posts = await getUserPosts(_id, 1, 6);
//           return posts;
//         });
//         const famousUserPosts = await Promise.all(promises);
//         return famousUserPosts;
//       } catch (err) {
//         console.error(err);
//         throw err;
//       }
//     },
// });

// export const famousPostLikeUserSelector = selector({
//   key: "FamousPostLikeUserSelector",
//   get: async ({ get }) => {
//     try {
//       const famousPosts = get(famousPostsSelector);
//       const promises = famousPosts.map(async ({ _id }) => {
//         const user = await getFamousPostLikeUser(_id);
//         return user;
//       });
//       const likeUsers = await Promise.all(promises);
//       // console.log("likeUsers", likeUsers);
//       return likeUsers;
//     } catch (err) {
//       throw err;
//     }
//   },
// });

// export const famousPostCommentUserSelector = selector({
//   key: "FamousPostCommentUserSelector",
//   get: async ({ get }) => {
//     try {
//       const famousPosts = get(famousPostsSelector);
//       const promises = famousPosts.map(async ({ _id }) => {
//         const userCount = await getFamousPostCommentUserCount(_id);
//         return userCount;
//       });
//       const commentUserCounts = await Promise.all(promises);
//       // console.log("commentUserCounts", commentUserCounts);
//       return commentUserCounts;
//     } catch (err) {
//       throw err;
//     }
//   },
// });
