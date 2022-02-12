const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("./middlewares");
const { Like, User, Post } = require("../models/");
const asyncHandler = require("../utils/asyncHandler");

//좋아요 눌렀을 때 post
router.post(
  "/",
  isLoggedIn,
  asyncHandler(async (req, res, next) => {
    const { postId } = req.body; // body에서 postId 받고 ,
    const { id: userId } = req.user; //req.user 에서 userId 꺼내고

    //만약 이미 좋아요를 누른 게시물이라면 에러를 던짐
    const currentLike = await Like.findOne({ postId, userId, isUnliked: false });
    if (currentLike) {
      throw new Error("이미 좋아요 한 게시글입니다.");
      return;
    }
    await Like.create({ userId, postId }); //새로운 좋아요 데이터 생성
    res.status(200).json({ message: "좋아요 한 목록에 추가되었습니다." });
  })
);

//게시글에 눌린 좋아요를 조회하는 경우 좋아요를 누른 유저들을 배열로 보내줍니다.
router.get(
  "/:postId",
  // isLoggedIn,
  asyncHandler(async (req, res, next) => {
    const { postId } = req.params;
    let { startIndex, limit } = req.query;
    if (!startIndex) startIndex = 1;
    if (!limit) limit = 0;
    //startIndex와 limit으로 정제된 데이터를 보내줌
    startIndex = parseInt(startIndex);
    limit = parseInt(limit);
    //isUnliked : false로 취소되지 않은 좋아요만 필터링
    const likeUserList = await Like.find({ postId, isUnliked: false })
      .sort({ createdAt: -1 })
      // 좋아요 누른 유저를 populate 하고 추가적으로 부가적인 카운팅값들도 populate해옴
      .populate({
        path: "userId",
        select: "-password",
        populate: [
          { path: "numFollowees", match: { isUnfollowed: false } },
          { path: "numFollowers", match: { isUnfollowed: false } },
          { path: "numPosts", match: { useYN: true } },
          { path: "numLikes", match: { isUnliked: false } },
        ],
      })
      .skip(startIndex - 1)
      .limit(limit);
    res.status(200).json({ likeUserList });
  })
);

//좋아요 삭제 delete isUnliked = true 로 바꿔서 관리
router.delete(
  "/",
  isLoggedIn,
  asyncHandler(async (req, res, next) => {
    const { postId } = req.body;
    const { id: userId } = req.user;
    const currentLike = await Like.findOne({ postId, userId, isUnliked: false }); //
    if (!currentLike) {
      throw new Error("좋아요 한 게시글이 아닙니다."); // 종아요한 게시글이 아니면 에러 던짐
      return;
    }
    currentLike.isUnliked = true;
    await currentLike.save();
    res.status(200).json({ message: "좋아요 한 목록에서 삭제되었습니다." });
  })
);

module.exports = router;

//post Router로 이동.. 일단 남겨둠
// router.get(
//   "/sortByLike",
//   asyncHandler(async (req, res, next) => {
//     let { startIndex, limit } = req.query;
//     //virtual populate 로 가져온 count option 으로는 sort가 안됩니다..ㅜ
//     const posts = await Post.find({ useYN: true })
//       .populate({ path: "userId", select: "-password" })
//       .populate({
//         path: "numLikes",
//         match: { isUnliked: false },
//         // options: { sort: { numLikes: -1 } },
//       })
//       .populate({ path: "numComments", match: { isDeleted: false } })
//       //.sort({numLikes : -1})
//       .sort({ createdAt: -1 });
//     const sortedPosts = posts.sort((a, b) => b.numLikes - a.numLikes);
//     if (!startIndex && !limit) {
//       res.status(200).json({ sortedPosts });
//       return;
//     }
//     //startIndex 와 limit  중 하나만 보내면 에러를 던짐
//     if (!startIndex || !limit) {
//       throw Error("startIndex와 limit 중 빠진 항목이 있습니다.");
//       return;
//     }
//     //startIndex와 limit으로 정제된 데이터를 보내줌
//     startIndex = parseInt(startIndex);
//     limit = parseInt(limit);
//     const limitedSortedPosts = sortedPosts.slice(startIndex - 1, startIndex - 1 + limit);
//     res.status(200).json({ limitedSortedPosts });
//   })
// );
