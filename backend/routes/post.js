const express = require("express");
const { Post } = require("../models/");
const { isLoggedIn } = require("./middlewares");
const { recipeUpload, s3 } = require("../middlewares/upload");
const { DataBrew } = require("aws-sdk");

const router = express.Router();

//레시피 작성
router.post(
  "/",
  isLoggedIn,
  recipeUpload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "copyImage" },
    { name: "doneImage" },
  ]),
  async (req, res, next) => {
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
    const { id: userId } = req.user;
    try {
      //thumbnail 이미지 location DB에 넣기
      thumbnail = req.files.thumbnail[0].location;

      //copyImage DB에 넣기
      let arrCopyImage = [];
      let CopyImageContents = req.files.copyImage;
      CopyImageContents.forEach((CopyImageContents) =>
        arrCopyImage.push(CopyImageContents.location)
      );
      copyImage = arrCopyImage;

      //doneImage DB에 넣기
      let arr_done = [];
      let done_contents = req.files.doneImage;
      done_contents.forEach((done_contents) => arr_done.push(done_contents.location));
      doneImage = arr_done;

      //이미지의 key값 입력
      thumbnail_key = req.files.thumbnail[0].key;

      //copyImage 의 key 값 찾기
      let arr_process_key = [];
      let process_contents_key = req.files.copyImage;
      process_contents_key.forEach((process_contents_key) =>
        arr_process_key.push(process_contents_key.key)
      );
      copyImage_key = arr_process_key;

      //doneImage의 key값 찾기
      let arr_done_key = [];
      let done_contents_key = req.files.doneImage;
      done_contents_key.forEach((done_contents) => arr_done_key.push(done_contents.key));
      doneImage_key = arr_done_key;

      const posts = await Post.create({
        userId,
        recipeName,
        desc,
        ingredient,
        seasoning,
        process,
        thumbnail,
        thumbnail_key,
        copyImage,
        copyImage_key,
        doneImage,
        doneImage_key,
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
        posts.process[i].processImage_key = copyImage_key[i];
      }

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
router.patch(
  "/:postId",
  isLoggedIn,
  recipeUpload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "processImage" },
    { name: "doneImage" },
  ]),
  async (req, res, next) => {
    const { postId } = req.params;
    try {
      const posts = await Post.findByIdAndUpdate(postId, req.body, {
        new: false,
      });
      // //thumbnail의 url주소가 이전의 값과 다르다면(변경 되었을 경우)
      if (posts.thumbnail != req.files.thumbnail[0].location) {
        //기존의 이미지는 s3에서 삭제
        const params = {
          Bucket: "yorijori-recipes",
          Key: posts.thumbnail_key,
        };
        s3.deleteObject(params, function (error, data) {
          if (error) console.log(error);
          else console.log(data, "요리조리 썸네일 기존 사진 삭제완료");
          return;
        });

        //thumbnail 이미지 location DB에 넣기
        posts.thumbnail = req.files.thumbnail[0].location;
        posts.thumbnail_key = req.files.thumbnail[0].key;
      }

      //-------------------------------------------------------
      //현재 수정하려고 하는 이미지(processImage)의 location값을 받아오기
      let arr_process = [];
      let process_contents = req.files.processImage;
      process_contents.forEach((process_contents) => arr_process.push(process_contents.location));

      //processIamge의 url주소가 이전과 다르다면 변경 되었을 경우
      if (posts.processImage != arr_process) {
        //processImage 이미지 location DB에 넣기

        //s3에서 삭제
        for (i = 0; i < posts.processImage_key.length; i++) {
          const params = {
            Bucket: "yorijori-recipes",
            Key: posts.processImage_key[i],
          };
          s3.deleteObject(params, function (error, data) {
            if (error) console.log(error);
            else console.log(data, "요리조리 processImage 기존 사진 삭제완료");
            return;
          });
        }

        posts.processImage = arr_process;
        //processImage 의 key 값 찾기
        let arr_process_key = [];
        let process_contents_key = req.files.processImage;
        process_contents_key.forEach((process_contents) =>
          arr_process_key.push(process_contents.key)
        );
        posts.processImage_key = arr_process_key;
      }

      //-------------------------------------------------------
      //현재 수정하려고 하는 이미지(doneImage)의 location값을 받아오기
      let arr_done = [];
      let done_contents = req.files.doneImage;
      done_contents.forEach((done_contents) => arr_done.push(done_contents.location));
      //processIamge의 url주소가 이전과 다르다면 변경 되었을 경우
      if (posts.doneImage != arr_done) {
        //s3에서 삭제
        for (i = 0; i < posts.doneImage_key.length; i++) {
          const params = {
            Bucket: "yorijori-recipes",
            Key: posts.doneImage_key[i],
          };
          s3.deleteObject(params, function (error, data) {
            if (error) console.log(error);
            else console.log(data, "요리조리 doneImage 기존 사진 삭제완료");
            return;
          });
        }

        posts.doneImage = arr_done;

        //doneImage의 key값 찾기
        let arr_done_key = [];
        let done_contents_key = req.files.doneImage;
        done_contents_key.forEach((done_contents) => arr_done_key.push(done_contents.key));
        posts.doneImage_key = arr_done_key;
      }

      await posts.save();

      res.status(200).json({ message: req.body });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
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
  async (req, res, next) => {
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
      res.status(500).json({ dd: req.files, message: err.message });
    }
  }
);

module.exports = router;
