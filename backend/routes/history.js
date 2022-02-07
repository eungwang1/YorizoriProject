const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("./middlewares");
const { History } = require("../models/");
const User = require("../models/User");
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
  isLoggedIn,
  asyncHandler(async (req, res, next) => {
    const { postId } = req.params;
    const viewUserList = await History.find({ postId, isLastViewed: true })
      .sort({ createdAt: -1 })
      .populate({ path: "userId", select: "-password" });
    res.status(200).json({ viewUserList });
  })
);

module.exports = router;
