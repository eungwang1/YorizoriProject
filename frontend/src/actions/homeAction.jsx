import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL;

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

export { getFamousPosts, getFamousUsers, getUserPosts, getUser };
