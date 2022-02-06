const express = require("express");
const Comment = require("../models/schemas/comment");
const { isLoggedIn } = require("./middlewares");

const router = express.Router();

router.post("/", isLoggedIn, async (req, res, next) => {
  const { postId, responseTo, comment } = req.body;
  // postId, responseTo, comment내용은 req에서 받아오고,
  // case1. userId는 클라이언트의 쿠키에서 받아오도록한다.
  // case2. userId를 저장한 클라이언테에서 body에 내용을 함께 담아서 보낸다.
  // 두 방법중 어떤걸로 해야할까요?
  const { id: userId } = req.user;
  // req.user에는 { id: "... " } 형식으로 user의 id값이 저장되어있습니다.
  try {
    await Comment.create({
      postId,
      userId,
      responseTo,
      comment,
    });

    return res.status(201).json({ message: "댓글 등록이 완료되었습니다." });
  } catch (err) {
    console.error(err);
    return next(err);
  }
});

router.get("/", async (req, res, next) => {
  const { postId } = req.body;
  try {
    // Comments에서 정의한 userId프로퍼티를 populate해서 해당 userId의 user정보도 함께 나오돋록 한다.
    const comments = await Comment.find({ postId }).populate("userId");
    console.log(comments);
    return res.status(200).json({ comments });
  } catch (err) {
    console.error(err);
    return next(err);
  }
});

module.exports = router;
