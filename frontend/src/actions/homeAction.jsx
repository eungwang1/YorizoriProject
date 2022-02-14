import { useSetRecoilState, selector } from "recoil";
// import { authAtom, usersAtom } from "../states";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import React, { useState } from "react";

const baseURL = "http://localhost:8080";

const getUser = async (userId) => {
  const { data } = await axios({
    baseURL,
    method: "get",
    url: `/user/${userId}/profile`,
  });
  return data.user;
};

const getFamousPosts = async (startIndex, limit) => {
  const { data } = await axios({
    baseURL,
    method: "get",
    url: "/post/sortByLike",
    responseType: "json",
    params: {
      startIndex,
      limit,
    },
  });
  return data.limitedSortedPosts;
};

const getFamousUsers = async (startIndex, limit) => {
  const { data } = await axios({
    baseURL,
    method: "get",
    url: "/user/sortByFollowees",
    params: {
      startIndex,
      limit,
      hasPost: true,
    },
  });
  return data.limitedSortedUsers;
};

const getUserPosts = async (userId, startIndex, limit) => {
  const { data } = await axios({
    baseURL,
    method: "get",
    url: `/user/${userId}/post`,
    params: {
      startIndex,
      limit,
    },
  });
  return data.userPosts;
};

// const getFamousPostLikeUser = async (postId) => {
//   const { data } = await axios({
//     baseURL,
//     method: "get",
//     url: `/like/${postId}`,
//   });
//   return data;
// };

// const getFamousPostCommentUserCount = async (postId) => {
//   const { data } = await axios({
//     baseURL,
//     method: "get",
//     url: `/comment/${postId}/count`,
//   });
//   return data;
// };

export {
  getFamousPosts,
  // getFamousPostLikeUser,
  // getFamousPostCommentUserCount,
  getFamousUsers,
  getUserPosts,
  getUser,
};
