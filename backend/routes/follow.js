const express = require("express");
const { Follow } = require("../models/");
const User = require("../models/User");
const { isLoggedIn } = require("./middlewares");
const router = express.Router();
const asyncHandler = require("../utils/asyncHandler");

// 다른 유저 follow 요청 post
router.post(
  "/",
  isLoggedIn,
  asyncHandler(async (req, res, next) => {
    const { id: followeeId } = req.user;
    const { followerId } = req.body;

    const currentFollow = await Follow.findOne({ followeeId, followerId, isUnfollowed: false }); //기존에 존재하는 팔로우 정보를 찾아보고

    if (currentFollow) {
      throw new Error("이미 팔로우하는 유저입니다."); //만약 기존에 팔로우 중이었다면 에러던짐
      return;
    }
    await Follow.create({
      followerId,
      followeeId,
    });
    res.status(200).json({ message: "해당 유저 팔로우에 성공했습니다." });
  })
);

//다른 유저 팔로우 취소 delete
router.delete(
  "/",
  isLoggedIn,
  asyncHandler(async (req, res, next) => {
    const { id: followeeId } = req.user;
    const { followerId } = req.body;
    const currentFollow = await Follow.findOne({ followeeId, followerId, isUnfollowed: false });
    if (!currentFollow) {
      throw new Error("팔로우한 유저가 아닙니다."); //조회했을 때 기존에 팔로우 중인 유저가 아니라면 에러던집
      return;
    }
    currentFollow.isUnfollowed = true; //isUnfollowed 값을 true로 바꿔 삭제된 데이터로 관리
    await currentFollow.save();

    res.status(200).json({ message: "팔로우한 유저에서 삭제되었습니다." });
  })
);

module.exports = router;
