const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("./middlewares");
const { Like, Post } = require("../models/schemas/user");
//일단은 의섭님이 작업하신 모델을 가져왔습니다.
const User = require("../models/User");
const asyncHandler = require("../utils/ayncHandler");

// 저희 postId를 _id 말고 따로 설정할거라면 post schem에 postId (ex: shortId) 도 추가해야 할 것 같네요.
// 일단 shortId를 postId 쓴다고 생각하고 작업했습니다.

//좋아요 눌렀을 때
router.post(
  "/posts/:postId/likes",
  isLoggedIn,
  asyncHandler(async (res, req, next) => {
    const { postId } = req.params; // url에서 postId 받고 ,
    const { shortId } = req.user; //req.user 에서 shortId 꺼내고
    const user = await User.findOne({ shortId });
    const post = await Post.findOne({ postId });

    // 연결된 유저와 게시글이 존재한다면 좋아요가 눌려있다는 것이므로 다시 요청이 들어오면 졿아요를 취소합니다.
    if (user && post) {
      await Like.deleteOne({ userId: shortId, postId });
      post.likesCount -= 1;
      await post.save(); //좋아요 데이터를 삭제하고 포스트의 좋아요 수를 -1 해줍니다.

      return res.status(200).json({ message: "좋아요가 취소되었습니다." });
    }

    await Like.create({ userId: shortId, postId, user: user._id, post: post._id }); //새로운 좋아요 데이터 생성
    post.likesCount += 1; //해당 포스트에 좋아요 횟수 하나 추가
    await post.save();
    res.status(200).json({ message: "좋아요 한 목록에 추가되었습니다." });
  })
);

//게시글에 눌린 좋아요를 조회하는 경우 좋아요를 누른 유저들을 배열로 보내줍니다.
router.get(
  "posts/:postId/likes",
  isLoggedIn,
  asyncHandler(async (req, res, next) => {
    const { postId } = req.params; //url에서 postId 받고
    const { shortId } = req.user; //req.user 에서 shortId 꺼내고

    const likeUserList = await Like.find({ postId }).populate("user"); //해당 포스트의 좋아요만 필터링하고 각각 좋아요를 누른 유저의 정보를 받아옴
    const newList = likeUserList.map(({ user }) => ({ email, nickName })); // 유저가 담긴 배열에서 email, nickName만 뽑아서 정리된 배열을 만듦
    res.status(200).json(newList); //좋아요를 누른 유저 정보가 담긴 배열을 응답
  })
);

module.exports = router;
