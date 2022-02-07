const express = require("express");
const Post = require("../models/schemas/post");
const User = require("../models/User");
const { isLoggedIn } = require("./middlewares");
const { recipeUpload, s3 } = require("../middlewares/upload");

const router = express.Router();

//레시피 작성
router.post(
  "/",
  isLoggedIn,
  recipeUpload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "processImage" },
    { name: "doneImage" },
  ]),
  async (req, res, next) => {
    const posts = new Post(req.body);
    try {
      //thumbnail 이미지 location DB에 넣기
      posts.thumbnail = req.files.thumbnail[0].location;

      //processImage DB에 넣기
      let arr_process = [];
      let process_contents = req.files.processImage;
      process_contents.forEach((process_contents) => arr_process.push(process_contents.location));
      posts.processImage = arr_process;

      //doneImage DB에 넣기
      let arr_done = [];
      let done_contents = req.files.doneImage;
      done_contents.forEach((done_contents) => arr_done.push(done_contents.location));
      posts.doneImage = arr_done;
      posts.doneImage = req.files.thumbnail[0].location;

      await posts.save();

      res.status(201).json({ message: "레시피등록이 완료되었습니다." });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

//전체 레시피 조회
router.get("/", async (req, res, next) => {
  try {
    const posts = await Post.find({});
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//개별 레시피 조회
router.get("/:postId", async (req, res, next) => {
  const { postId } = req.params;
  try {
    const posts = await Post.findById(postId).findOne({ useYN: true });
    if (!posts) {
      res.status(404).send("해당하는 postId가 없습니다.");
      return;
    }
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//레시피 수정
router.patch("/:postId", isLoggedIn, async (req, res, next) => {
  const { postId } = req.params;
  try {
    const posts = await Post.findByIdAndUpdate(postId, req.body, {
      new: true, // new 값이 ture이면 업데이트된 데이터를 반환.
      // false 이면 업데이트 되기 전 데이터를 반환
    });
    if (!posts) {
      res.status(404).json({ message: "해당하는 postId가 없습니다." });
      return;
    }
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//레시피 삭제
router.delete("/:postId", isLoggedIn, async (req, res, next) => {
  const { postId } = req.params;
  try {
    const posts = await Post.findById(postId).findOne({ useYN: true }); // postId 찾아 삭제
    if (!posts) {
      res.status(404).json({ message: "해당하는 postId가 없습니다." });
      return;
    }
    posts.useYN = false;
    posts.save();

    res.status(200).json({ message: "레시피 삭제가 완료되었습니다." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;