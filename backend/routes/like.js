const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("./middlewares");
const { Like, Post } = require("../models/");
const User = require("../models/User");
const asyncHandler = require("../utils/asyncHandler");

//좋아요 눌렀을 때 post
router.post(
  "/",
  isLoggedIn,
  asyncHandler(async (req, res, next) => {
    const { postId } = req.body; // body에서 postId 받고 ,
    const { id: userId } = req.user; //req.user 에서 userId 꺼내고

    //만약 이미 좋아요를 누른 게시물이라면 에러를 던짐 ... 이 부분을 서버에서 검증해야 할까요?
    const currentLike = await Like.findOne({ postId, userId, isUnliked: false });
    if (currentLike) {
      throw Error("이미 좋아요 한 게시글입니다.");
      return;
    }
    await Like.create({ userId, postId }); //새로운 좋아요 데이터 생성

    // post 스키마에 likeCount 나 commentsCount 같은 카운팅 프로퍼티는 빼는 게 나을 것 같습니다.
    // post.likesCount += 1; 해당 포스트에 좋아요 횟수 하나 추가
    // await post.save();
    res.status(200).json({ message: "좋아요 한 목록에 추가되었습니다." });
  })
);

//게시글에 눌린 좋아요를 조회하는 경우 좋아요를 누른 유저들을 배열로 보내줍니다.
router.get(
  "/:postId",
  isLoggedIn,
  asyncHandler(async (req, res, next) => {
    const { postId } = req.params; //url에서 postId 받고
    const likeUserList = await Like.find({ postId, isUnliked: false }).populate("userId"); //해당 포스트의 좋아요만 필터링하고 각각 좋아요를 누른 유저의 정보를 받아옴
    const newList = likeUserList.map(({ userId: { password, ...restUserInfo }, ...restInfo }) => ({
      user: { ...restUserInfo },
      ...restInfo,
    })); // 유저가 담긴 배열에서 passport를 제외한 정보 , 그리고 나머지 정보들을 뽑아서 정리된 배열을 만듦
    res.status(200).json(newList); //좋아요를 누른 유저 정보가 담긴 배열을 응답
  })
);

//좋아요 삭제 기능 ... db에서 아예 지우는 것이 아니라 isUnliked 값을 true로 바꾸무
router.delete(
  "/",
  isLoggedIn,
  asyncHandler(async (req, res, next) => {
    const { postId } = req.body;
    const { id: userId } = req.user;
    const currentLike = await Like.findOne({ postId, userId, isUnliked: false }); //
    if (!currentLike) {
      throw new Error("좋아요 한 게시글이 없습니다."); // 종아요한 게시글이 없으면 에러 던짐
      return;
    }
    currentLike.isUnliked = true;
    currentLike.save();
    res.status(200).json({ message: "좋아요 한 목록에서 삭제되었습니다." });
  })
);

module.exports = router;
