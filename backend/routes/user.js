const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("./middlewares");
const asyncHandler = require("../utils/asyncHandler");
const { Like } = require("../models/");
const User = require("../models/User");
const Post = require("../models/schemas/post");
const Comment = require("../models/schemas/comment");

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
    const { id: userId } = req.user; //로그인한 유저를 찾아서
    const { location, key } = req.file; //파일이 저장된 경로와 파일 이름(s3)
    const { nickName } = req.body; //formData key='nickName' 으로 변경할 닉네임을 받음
    const user = await User.findOne({ _id: userId });
    if (!req.file && !nickName) {
      throw new Error("변경된 내용이 없습니다.");
      return;
    }
    //기존의 사진이 있으면 그 사진을 삭제하고 새로운 사진을 프로필사진으로 해서 s3에 업로드해야겠죠? 그냥 두는게 나을까요..?
    if (req.file) {
      //기존에 등록된 프로필사진이 있으면 s3에서 지우는 작업을 수행함
      // if (user.profileImage) {
      //   const params = { Bucket: "yorijori-profile", Key: user.profileName };
      //   s3.deleteObject(params, function (error, data) {
      //     if (error) console.log(error);
      //     else console.log(data);
      //   });
      // }
      //user의 프로필 관련 정보 업데이트
      user.profileImage = location;
      user.profileName = key;
    }
    if (nickName) user.nickName = nickName; //유저의 nickName 업데이트해줌
    await user.save();

    res.status(200).json({ message: "성공적으로 업로드 되었습니다." });
  })
);

// 유저 프로필 조회 api를 작성할 때
// 1. 로그인한 유저(본인)조회하는 경우와
// 2. 그 외 기타유저 조회하는 경우를 분리해야할까요?
// 1, 2 모두 password 항목 제외하고 데이터 보내주는 개념은 같은 것 같은데 이 부분 궁금합니다.
// 유저 프로필 조회
router.get(
  "/:userId/profile",
  isLoggedIn,
  asyncHandler(async (req, res, next) => {
    const { userId } = req.params; //body에서 유저아이디를 받고
    const user = await User.findOne({ _id: userId }).select("-password"); //_id가 일치하는 유저를 찾음
    //password 제외한 정보를 보냄
    res.status(200).json({ user });
  })
);

//작성한 레시피 조회
router.get(
  "/:userId/post",
  isLoggedIn,
  asyncHandler(async (req, res, next) => {
    const { userId } = req.params;
    const post = await Post.find({ userId });
    res.status(200).json({ post });
  })
);

//특정 유저가 좋아요한 레시피 조회
router.get(
  "/:userId/like/",
  isLoggedIn,
  asyncHandler(async (req, res, next) => {
    const { userId } = req.params;
    const likesList = await Like.find({ userId, isUnliked: false }).populate("postId");
    res.status(200).json({ likesList });
  })
);
module.exports = router;
