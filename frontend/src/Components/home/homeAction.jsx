import { useSetRecoilState, selector } from "recoil";
// import { authAtom, usersAtom } from "../states";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import React, { useState } from "react";

const baseURL = "http://localhost:8080";
const getFamousPosts = async (startIndex, limit) => {
  const { data } = await axios({
    baseURL,
    method: "get",
    url: "/like/sortByLike",
    responseType: "json",
    params: {
      startIndex: startIndex,
      limit: limit,
    },
  });
  return data.limitedSortedPosts;
};

const getFamousPostLikeUser = async (postId) => {
  const { data } = await axios({
    baseURL,
    method: "get",
    url: `/like/${postId}`,
  });
  return data;
};

const getFamousPostCommentUserCount = async (postId) => {
  const { data } = await axios({
    baseURL,
    method: "get",
    url: `/comment/${postId}/count`,
  });
  return data;
};

export { getFamousPosts, getFamousPostLikeUser, getFamousPostCommentUserCount };
