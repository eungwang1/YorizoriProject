const express = require("express");
const { Post, User } = require("../models/");
const { isLoggedIn } = require("./middlewares");
const { recipeUpload, s3 } = require("../middlewares/upload");
const asyncHandler = require("../utils/asyncHandler");

const router = express.Router();

//레시피 작성
router.post(
  "/",
  isLoggedIn,
  recipeUpload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "copyImage" },
    // { name: "doneImage" },
  ]),
  asyncHandler(async (req, res, next) => {
    const {
      recipeName,
      desc,
      ingredient,
      seasoning,
      process,
      category,
      condition,
      material,
      cook,
      servings,
      time,
      diffic,
    } = req.body;
    const { id: userId } = req.user || req.cookies;
    //thumbnail 이미지 location DB에 넣기
    thumbnail = req.files.thumbnail[0].location;

    //copyImage DB에 넣기
    let arrCopyImage = [];
    let CopyImageContents = req.files.copyImage;
    for (i = 0; i < CopyImageContents.length; i++) {
      arrCopyImage.push(CopyImageContents[i].location);
    }
    copyImage = arrCopyImage;

    if (req.files.doneImage) {
      //doneImage DB에 넣기
      let arrDone = [];
      let doneContents = req.files.doneImage;
      for (i = 0; i < doneContents.length; i++) {
        arrDone.push(doneContents[i].location);
      }
      doneImage = arrDone;
      //doneImage의 key값 찾기
      let arrDoneKey = [];
      let doneContentsKey = req.files.doneImage;
      for (i = 0; i < doneContentsKey.length; i++) {
        arrDoneKey.push(doneContentsKey[i].key);
      }
      doneImageKey = arrDoneKey;
    }

    //이미지의 key값 입력
    thumbnailKey = req.files.thumbnail[0].key;

    //copyImage 의 key 값 찾기
    let arrCopyImageKey = [];
    let CopyImageContentsKey = req.files.copyImage;
    for (i = 0; i < CopyImageContentsKey.length; i++) {
      arrCopyImageKey.push(CopyImageContentsKey[i].key);
    }
    copyImageKey = arrCopyImageKey;
    if (!req.files.doneImage) {
      const posts = await Post.create({
        userId,
        recipeName,
        desc,
        ingredient,
        seasoning,
        process,
        thumbnail,
        thumbnailKey,
        copyImage,
        copyImageKey,
        category,
        condition,
        material,
        cook,
        servings,
        time,
        diffic,
      });
      //process내부 processImage의 location , key값 부여
      for (i = 0; i < process.length; i++) {
        posts.process[i].processImage = copyImage[i];
        posts.process[i].processImageKey = copyImageKey[i];
      }
      await posts.save();
    }
    if (req.files.doneImage) {
      const posts = await Post.create({
        userId,
        recipeName,
        desc,
        ingredient,
        seasoning,
        process,
        thumbnail,
        thumbnailKey,
        copyImage,
        copyImageKey,
        doneImage,
        doneImageKey,
        category,
        condition,
        material,
        cook,
        servings,
        time,
        diffic,
      });
      //process내부 processImage의 location , key값 부여
      for (i = 0; i < process.length; i++) {
        posts.process[i].processImage = copyImage[i];
        posts.process[i].processImageKey = copyImageKey[i];
        await posts.save();
      }
    }
    await User.updateOne({ _id: userId }, { $inc: { numPosts: 1 } });
    res.status(201).json({ message: "레시피등록이 완료되었습니다." });
  })
);

//게시글들을 좋아요 받은 순으로 내림차순 정렬해서 값을 전달.
router.get(
  "/sortByLike",
  asyncHandler(async (req, res, next) => {
    let { startIndex, limit } = req.query;
    if (!startIndex) startIndex = 1;
    if (!limit) limit = 0;
    //startIndex와 limit으로 정제된 데이터를 보내줌
    startIndex = parseInt(startIndex);
    limit = parseInt(limit);
    const limitedSortedPosts = await Post.find({ useYN: true })
      .sort({ numLikes: -1, createdAt: -1 })
      .skip(startIndex - 1)
      .limit(limit)
      .populate({ path: "userId", select: "-password" })
      //게시글이 받은 댓글 수를 populate 해옴
      .populate({ path: "numComments", match: { isDeleted: false } });
    res.status(200).json({ limitedSortedPosts });
  })
);

router.get(
  "/withFilter/count",
  asyncHandler(async (req, res, next) => {
    let filteredCondition = {};
    for (const [key, value] of Object.entries(req.query)) {
      value ? (filteredCondition[key] = value) : null;
    }

    console.log("filteredCondition", filteredCondition);
    const filteredPostCount = await Post.find(filteredCondition).countDocuments();

    res.status(200).json({ filteredPostCount });
  })
);

//레시피 쿼리로 조회하는 로직
//startIndex : 시작인덱스
//limit : 조회할 게시글 개수
//category, condition, material, cook, servings, time, diffc 같은 필터링 조건 모양맞게 넣으면됨
// (EX) category : '한식' , material : '기타'
//currentPost 에 postId를 넘기면 해당 게시글은 제외하고 데이터를 보내줌
router.get(
  "/withFilter",
  asyncHandler(async (req, res, next) => {
    let { startIndex, limit, currentPost } = req.query;

    console.log("currentPost", currentPost);

    if (!startIndex) startIndex = 1;
    if (!limit) limit = 0;
    //startIndex와 limit으로 정제된 데이터를 보내줌
    startIndex = parseInt(startIndex);
    limit = parseInt(limit);
    let filteredCondition = {};
    for (const [key, value] of Object.entries(req.query)) {
      value
        ? key != "startIndex"
          ? key != "limit"
            ? key != "currentPost"
              ? (filteredCondition[key] = value)
              : null
            : null
          : null
        : null;
    }

    console.log("filteredCondition", filteredCondition);
    const totalPost = await Post.find({
      ...filteredCondition,
      _id: { $ne: currentPost },
      useYN: true,
    }).countDocuments({});
    // console.log(Math.round(totalPost / limit));
    if (startIndex <= Math.round(totalPost / limit)) {
      const userPosts = await Post.find({ ...filteredCondition, _id: { $ne: currentPost } })
        .sort({ numLikes: -1, createdAt: -1 })
        .skip((startIndex - 1) * limit)
        .limit(limit)
        .populate({
          path: "userId",
          select: "-password",
        })
        .populate({ path: "numComments", match: { isDeleted: false } });

      res.status(200).json({ userPosts });
    }
  })
);

//개별 레시피 조회
router.get(
  "/:postId",
  asyncHandler(async (req, res, next) => {
    const { postId } = req.params;

    const posts = await Post.findById(postId)
      .findOne({ useYN: true })
      .populate({
        path: "userId",
        select: "-password",
        populate: [
          { path: "numFollowers", match: { isUnfollowed: false } },
          { path: "numLikes", match: { isUnliked: false } },
        ],
      })
      .populate({ path: "numComments", match: { isDeleted: false } });
    if (!posts) {
      res.status(404).send("해당하는 postId가 없습니다.");
      return;
    }
    posts.numViews += 1;
    await posts.save();
    res.status(200).json(posts);
  })
);

//레시피 수정
router.post(
  "/:postId",
  isLoggedIn,
  recipeUpload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "copyImage" },
    // { name: "doneImage" },
  ]),
  asyncHandler(async (req, res, next) => {
    const { postId } = req.params;
    const posts = await Post.findByIdAndUpdate(postId, req.body, {
      new: false,
    });
    // //thumbnail의 url주소가 이전의 값과 다르다면(변경 되었을 경우)
    if (posts.thumbnail != req.files.thumbnail[0].location) {
      //기존의 이미지는 s3에서 삭제
      const params = {
        Bucket: "yorijori-recipes",
        Key: posts.thumbnailKey,
      };
      s3.deleteObject(params, function (error, data) {
        if (error) console.log(error);
        else console.log(data, "요리조리 썸네일 기존 사진 삭제완료");
        return;
      });

      //thumbnail 이미지 location DB에 넣기
      posts.thumbnail = req.files.thumbnail[0].location;
      posts.thumbnailKey = req.files.thumbnail[0].key;
    }

    //-------------------------------------------------------
    //현재 수정하려고 하는 이미지(copyImage)의 location값을 받아오기
    let arrCopyImage = [];
    let CopyImageContents = req.files.copyImage;
    for (i = 0; i < CopyImageContents.length; i++) {
      arrCopyImage.push(CopyImageContents[i].location);
    }

    //processIamge의 url주소가 이전과 다를경우
    if (posts.processImage != arrCopyImage) {
      //s3에서 삭제
      for (i = 0; i < posts.copyImage.length; i++) {
        const params = {
          Bucket: "yorijori-recipes",
          Key: posts.copyImageKey[i],
        };
        s3.deleteObject(params, function (error, data) {
          if (error) console.log(error);
          else console.log(data, "요리조리 processImage 기존 사진 삭제완료");
          return;
        });
      }
      posts.copyImage = arrCopyImage;

      //copyImage 의 key 값 찾기
      let arrCopyImageKey = [];
      let CopyImageContentsKey = req.files.copyImage;
      for (i = 0; i < CopyImageContentsKey.length; i++) {
        arrCopyImageKey.push(CopyImageContentsKey[i].key);
      }
      posts.copyImageKey = arrCopyImageKey;
    }

    // //-------------------------------------------------------
    // //현재 수정하려고 하는 이미지(doneImage)의 location값을 받아오기
    // //doneImage DB에 넣기
    // let arrDone = [];
    // let doneContents = req.files.doneImage;
    // for (i = 0; i < doneContents.length; i++) {
    //   arrDone.push(doneContents[i].location);
    // }

    // //processIamge의 url주소가 이전과 다르다면 변경 되었을 경우
    // if (posts.doneImage != arrDone) {
    //   //s3에서 삭제
    //   for (i = 0; i < posts.doneImageKey.length; i++) {
    //     const params = {
    //       Bucket: "yorijori-recipes",
    //       Key: posts.doneImageKey[i],
    //     };
    //     s3.deleteObject(params, function (error, data) {
    //       if (error) console.log(error);
    //       else console.log(data, "요리조리 doneImage 기존 사진 삭제완료");
    //       return;
    //     });
    //   }
    //   posts.doneImage = arrDone;

    //   //doneImage의 key값 찾기
    //   let arrDoneKey = [];
    //   let doneContentsKey = req.files.doneImage;
    //   for (i = 0; i < doneContentsKey.length; i++) {
    //     arrDoneKey.push(doneContentsKey[i].key);
    //   }
    //   posts.doneImageKey = arrDoneKey;
    // }
    //process내부 processImage의 location , key값 부여
    for (i = 0; i < posts.process.length; i++) {
      posts.process[i].processImage = posts.copyImage[i];
      posts.process[i].processImageKey = posts.copyImageKey[i];
    }

    await posts.save();

    res.status(200).json({
      message: "레시피 수정이 완료되었습니다.",
    });
  })
);

//레시피 조회
router.get(
  "/",
  asyncHandler(async (req, res, next) => {
    const totalPost = await Post.find({ useYN: true }).countDocuments({});
    let { startIndex, limit, recipeName } = req.query;
    if (!startIndex) startIndex = 1;
    if (!limit) limit = 0;
    if (recipeName) {
      const posts = await Post.find({ useYN: true, recipeName: { $regex: recipeName } })
        .populate({ path: "userId", select: "-password" })
        .populate({ path: "numComments", match: { isDeleted: false } })
        .sort({ createdAt: -1 }); //최근 순으로 정렬
      // .skip((page - 1) * perPage) // (현재페이지-1) * 페이지당 게시글수
      // .limit(perPage);
      res.status(200).json(posts);
    } else {
      //startIndex와 limit으로 정제된 데이터를 보내줌
      startIndex = parseInt(startIndex);
      limit = parseInt(limit);
      if (startIndex <= Math.round(totalPost / limit)) {
        const limitedSortedPosts = await Post.find({ useYN: true })
          .populate({ path: "userId", select: "-password" })
          .populate({ path: "numComments", match: { isDeleted: false } })
          .sort({ numLikes: -1, createdAt: -1 })
          .skip((startIndex - 1) * limit)
          .limit(limit)
          .populate({ path: "userId", select: "-password" })
          //게시글이 받은 댓글 수를 populate 해옴
          .populate({ path: "numComments", match: { isDeleted: false } });
        res.status(200).json({ limitedSortedPosts });
      }
    }
  })
);

//레시피 삭제
router.delete(
  "/:postId",
  isLoggedIn,
  recipeUpload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "processImage" },
    { name: "doneImage" },
  ]),
  asyncHandler(async (req, res, next) => {
    const { postId } = req.params;
    const { id: userId } = req.user || req.cookies;

    const posts = await Post.findById(postId).findOne({ useYN: true }); // postId 찾아 삭제
    if (!posts) {
      res.status(404).json({ message: "해당하는 postId가 없습니다." });
      return;
    }

    posts.useYN = false;
    await posts.save();
    await User.updateOne({ _id: userId }, { $inc: { numPosts: -1 } });

    res.status(200).json({ message: "레시피 삭제가 완료되었습니다." });
  })
);

module.exports = router;
