const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("./middlewares");
const { History, User } = require("../models/");
const asyncHandler = require("../utils/asyncHandler");

//게시글 상세페이지 들어갔을 때 history post
router.post(
  "/",
  isLoggedIn,
  asyncHandler(async (req, res, next) => {
    const { id: userId } = req.user;
    const { postId } = req.body;
    //기존에 봤던 게시물이라면 islastviewed를 false로 바꿔줌
    const preLastView = await History.findOne({ userId, postId, isLastViewed: true });
    if (preLastView) {
      preLastView.isLastViewed = false;
      await preLastView.save();
    }
    //그 후 최근에 본 게시물을 새로 만듦
    await History.create({ userId, postId });
    res.status(200).json({ message: "마지막으로 본 게시글에 추가되었습니다" });
  })
);

//특정 게시물을 본 유저 목록 get
router.get(
  "/:postId",
  // isLoggedIn,
  asyncHandler(async (req, res, next) => {
    const { postId } = req.params;
    let { startIndex, limit } = req.query;
    //데이터 개수를 필터링할 값들이 들어오지 않는다면 초기값을 각각 1, 0 으로 설정해 전체 데이터를 보내도록 설정
    if (!startIndex) startIndex = 1;
    if (!limit) limit = 0;

    //startIndex와 limit 값을 이용해 데이터로 정제된 데이터를 보냄
    startIndex = parseInt(startIndex);
    limit = parseInt(limit);
    const viewUserList = await History.find({ postId, isLastViewed: true })
      .sort({ createdAt: -1 })
      //password를 제외한 유저 정보를 populate
      .populate({ path: "userId", select: "-password" })
      .skip(startIndex - 1)
      .limit(limit);
    res.status(200).json({ viewUserList });
  })
);

module.exports = router;
