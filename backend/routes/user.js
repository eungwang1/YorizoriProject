const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("./middlewares");
const asyncHandler = require("../utils/asyncHandler");
const { Like, History, Follow, User, Post, Comment } = require("../models/");

const { profileUpload, s3 } = require("../middlewares/upload");

// 유저 프로필 수정
//formdata를 patch로 받는 방법을 아직 모르겠어서 일단 post 처리
router.post(
  "/profile",
  isLoggedIn,
  profileUpload.single("profileImage"), //input name="profileImage"인 input field를 통해 파일을 받아 aws s3에 업로드함. req.file 에는 파일이, req.body에는 string 타입의 데이터를 넘겨받음
  // formData 로 요청을 하는 경우엔 formData의 key를 "profileImage" 로 설정해주면 됨
  asyncHandler(async (req, res, next) => {
    console.log(req.file);
    const { id: userId } = req.user || req.cookies; //로그인한 유저를 찾아서
    const { nickName } = req.body; //formData key='nickName' 으로 변경할 닉네임을 받음
    if (!req.file && !nickName) {
      throw new Error("변경된 내용이 없습니다.");
      return;
    }
    const exsitedNickName = await User.findOne({ nickName });
    if (exsitedNickName) {
      throw new Error("이미 존재하는 닉네임입니다.");
    }
    const user = await User.findOne({ _id: userId });
    if (req.file) {
      const { location, key } = req.file;
      //기존의 사진이 있으면 그 사진을 삭제하고 새로운 사진을 프로필사진으로 해서 s3에 업로드해야겠죠? 그냥 두는게 나을까요..?
      //기존에 등록된 프로필사진이 있으면 s3에서 지우는 작업을 수행함
      if (user.profileImage) {
        const params = { Bucket: "yorijori-profile", Key: user.profileName };
        s3.deleteObject(params, function (error, data) {
          if (error) console.log(error);
          else console.log(data, "기존 프로필 삭제 완료");
        });
      }
      //user의 프로필 관련 정보 업데이트
      user.profileImage = location;
      user.profileName = key;
    }
    if (nickName) user.nickName = nickName; //유저의 nickName 업데이트해줌
    await user.save();

    res.status(200).json({ message: "성공적으로 업로드 되었습니다." });
  })
);

// 특정 유저 프로필 조회
router.get(
  "/:userId/profile",
  // isLoggedIn,
  asyncHandler(async (req, res, next) => {
    const { userId } = req.params; //body에서 유저아이디를 받고
    const user = await User.findOne({ _id: userId })
      .populate({ path: "numFollowers", match: { isUnfollowed: false } })
      .populate({ path: "numLikes", match: { isUnliked: false } })
      .select("-password"); //_id가 일치하는 유저를 찾음
    //password 제외한 정보를 보냄
    res.status(200).json({ user });
  })
);

//작성한 레시피 조회
//유저 한명이 작성한 데이터를 가져오는 경우에 user를 populate해야 하나 고민을 해봤는데
router.get(
  "/:userId/post",
  // isLoggedIn,
  asyncHandler(async (req, res, next) => {
    const { userId } = req.params;
    let { startIndex, limit } = req.query;
    if (!startIndex) startIndex = 1;
    if (!limit) limit = 0;

    //startIndex와 limit으로 정제된 데이터를 보내줌
    startIndex = parseInt(startIndex);
    limit = parseInt(limit);
    const userPosts = await Post.find({ userId, useYN: true })
      .sort({ createdAt: -1 })
      .skip(startIndex - 1)
      .limit(limit)
      .populate({
        path: "userId",
        select: "-password",
        // populate: [
        //   { path: "numFollowers", match: { isUnfollowed: false } },
        //   { path: "numLikes", match: { isUnliked: false } },
        // ],
      })
      .populate({ path: "numComments", match: { isDeleted: false } });

    res.status(200).json({ userPosts });
  })
);

//특정 유저가 좋아요한 레시피 조회
router.get(
  "/:userId/like",
  // isLoggedIn,
  asyncHandler(async (req, res, next) => {
    const { userId } = req.params;
    let { startIndex, limit } = req.query;
    if (!startIndex) startIndex = 1;
    if (!limit) limit = 0;
    //startIndex와 limit으로 정제된 데이터를 보내줌
    startIndex = parseInt(startIndex);
    limit = parseInt(limit);
    const likePosts = await Like.find({ userId, isUnliked: false })
      .sort({ createdAt: -1 })
      .skip(startIndex - 1)
      .limit(limit)
      .populate({
        path: "userId",
        select: "-password",
        // populate: [
        //   { path: "numFollowers", match: { isUnfollowed: false } },
        //   { path: "numLikes", match: { isUnliked: false } },
        // ],
      })
      .populate({
        path: "postId",
        match: { useYN: true },
        populate: [{ path: "numComments", match: { isDeleted: false } }],
      });
    res.status(200).json({ likePosts });
  })
);

//특정 유저가 댓글을 단 레시피 목록 조회
//최근에 댓글을 단 게시물 순으로 정렬
//여기서 reduce를 썼는데 더 최적화된 방법이 있을까요?
//아니면 comment 스키마에 isNewest 이런 토글값을 추가하는건 어떨까요?
router.get(
  "/:userId/comment",
  // isLoggedIn,
  asyncHandler(async (req, res, next) => {
    const { userId } = req.params;
    let { startIndex, limit } = req.query;
    //유저가 작성한 댓글을 게시글 순으로 정렬한 후 그 안에서 최신글 순서로 정렬합니다.
    // 예) a,b,a,b,c,a,b  => a,a,a,b,b,c
    const allCommentPosts = await Comment.find({ userId, isDeleted: false })
      .sort({ postId: 1, createdAt: -1 })
      .populate({
        path: "userId",
        select: "-password",
        // populate: [
        //   { path: "numFollowers", match: { isUnfollowed: false } },
        //   { path: "numLikes", match: { isUnliked: false } },
        // ],
      })
      .populate({
        path: "postId",
        match: { useYN: true },
        populate: [{ path: "numComments", match: { isDeleted: false } }],
      });
    //겹치는 게시글들을 제거하기 위해 각 게시글마다 최신 글을 하나씩 모아 commentPosts 배열을 만듭니다.
    //예) A,a,a,B,b,C => A,B,C
    const commentPosts = allCommentPosts
      .reduce((acc, post) => {
        if (!post.postId) {
          return acc;
        }
        //첫 데이터는 그냥 넣어주고
        acc.length === 0
          ? acc.push(post)
          : //그 이후의 데이터는 마지막 데이터와 게시글의 _id 값이 다르면 즉 새로운 게시글이면 acc에 넣어줍니다
          acc[acc.length - 1].postId._id != post.postId._id
          ? acc.push(post)
          : acc;
        return acc;
      }, [])
      // 그 후 댓글작성시간 기준으로 내림차순 정렬을 해줍니다.
      .sort((a, b) => b.createdAt - a.createdAt);
    if (!startIndex && !limit) {
      res.status(200).json({ commentPosts });
      return;
    }
    //startIndex 와 limit  중 하나만 보내면 에러를 던짐
    if (!startIndex || !limit) {
      throw Error("startIndex와 limit 중 빠진 항목이 있습니다.");
      return;
    }
    //startIndex와 limit으로 정제된 데이터를 보내줌
    startIndex = parseInt(startIndex);
    limit = parseInt(limit);
    const limitedCommentPosts = commentPosts.slice(startIndex - 1, startIndex - 1 + limit);
    res.status(200).json({ limitedCommentPosts });
  })
);

//특정 유저가 최근 확인한 게시글 조회
router.get(
  "/:userId/history",
  // isLoggedIn,
  asyncHandler(async (req, res, next) => {
    const { userId } = req.params;
    let { startIndex, limit } = req.query;
    if (!startIndex) startIndex = 1;
    if (!limit) limit = 0;
    //startIndex와 limit으로 정제된 데이터를 보내줌
    startIndex = parseInt(startIndex);
    limit = parseInt(limit);
    const lastViewedPosts = await History.find({ userId, isLastViewed: true })
      .sort({ createdAt: -1 })
      .skip(startIndex - 1)
      .limit(limit)
      .populate({
        path: "userId",
        select: "-password",
        // populate: [
        //   { path: "numFollowers", match: { isUnfollowed: false } },
        //   { path: "numLikes", match: { isUnliked: false } },
        // ],
      })
      .populate({
        path: "postId",
        match: { useYN: true },
        populate: [{ path: "numComments", match: { isDeleted: false } }],
      });
    res.status(200).json({ lastViewedPosts });
  })
);

//특정 유저가 팔로우한 follower 목록 get
router.get(
  "/:userId/follower",
  // isLoggedIn,
  asyncHandler(async (req, res, next) => {
    const { userId } = req.params;
    let { startIndex, limit } = req.query;
    if (!startIndex) startIndex = 1;
    if (!limit) limit = 0;
    //startIndex와 limit으로 정제된 데이터를 보내줌
    startIndex = parseInt(startIndex);
    limit = parseInt(limit);
    const followers = await Follow.find({ followeeId: userId, isUnfollowed: false })
      .sort({ createdAt: -1 })
      .skip(startIndex - 1)
      .limit(limit)
      .populate({
        path: "followerId",
        select: "-password",
        populate: [
          { path: "numFollowers", match: { isUnfollowed: false } },
          { path: "numLikes", match: { isUnliked: false } },
        ],
      });
    res.status(200).json({ followers });
  })
);

//특정 유저를 팔로우하고 있는 followee 목록 get
router.get(
  "/:userId/followee",
  // isLoggedIn,
  asyncHandler(async (req, res, next) => {
    const { userId } = req.params;
    let { startIndex, limit } = req.query;
    if (!startIndex) startIndex = 1;
    if (!limit) limit = 0;
    //startIndex와 limit으로 정제된 데이터를 보내줌
    startIndex = parseInt(startIndex);
    limit = parseInt(limit);
    const followees = await Follow.find({ followerId: userId, isUnfollowed: false })
      .sort({ createdAt: -1 })
      .skip(startIndex - 1)
      .limit(limit)
      .populate({
        path: "followeeId",
        select: "-password",
        populate: [
          { path: "numFollowers", match: { isUnfollowed: false } },
          { path: "numLikes", match: { isUnliked: false } },
        ],
      });
    res.status(200).json({ followees });
  })
);

//유저들을 followee 순으로 내림차순 정렬한 후 데이터를 보냅니다.
// 인기많은 순으로 데이터 보내는겁니다.
//여기서도 numFolowees 라는 populate virtual 로 가져온 값으로 정렬하는 방법을 못 찾아서 일단 데이터를 db에서 가져온 후 따로 sort 했습니다.
router.get(
  "/sortByFollowees",
  asyncHandler(async (req, res, next) => {
    let { startIndex, limit, hasPost } = req.query;
    if (!startIndex) startIndex = 1;
    if (!limit) limit = 0;
    //startIndex와 limit으로 정제된 데이터를 보내줌
    startIndex = parseInt(startIndex);
    limit = parseInt(limit);

    let filteringNum = 0;
    if (hasPost) filteringNum = 2;
    const limitedSortedUsers = await User.find({ numPosts: { $gte: filteringNum } })
      .sort({ numFollowees: -1, createdAt: -1 })
      .skip(startIndex - 1)
      .limit(limit)
      .populate({ path: "numFollowers", match: { isUnfollowed: false } })
      .populate({ path: "numLikes", match: { isUnliked: false } });

    res.status(200).json({ limitedSortedUsers });
  })
);
module.exports = router;

// router.get(
//   "/:userId/comment",
//   isLoggedIn,
//   asyncHandler(async (req, res, next) => {
//     const { userId } = req.params;
//     //댓글 collection에서 유저가 작성한 댓글을 필터링한 후 중복된 post를 제거한후 postId를 저장한 배열
//     const commentPostIds = await Comment.find({ userId, isDeleted: false }).distinct("postId");
//     //게시글 컬렉션에서 위에서 저장한 postId를 이용해 게시글을 찾음
//     const commentPosts = await Post.find().where("_id").in(commentPostIds);
//     res.status(200).json({ commentPosts });
//   })
// );
