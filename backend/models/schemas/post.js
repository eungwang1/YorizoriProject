const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    //레시피명
    recipeName: {
      type: String,
      required: true,
    },
    //요리 소개
    desc: {
      type: String,
      required: true,
    },
    //재료소개
    ingredient: [
      {
        ingreName: { type: String, required: true },
        ingreCount: { type: String, required: true },
      },
    ],
    //양념소개
    seasoning: [
      {
        ingreName: { type: String, required: true },
        ingreCount: { type: String, required: true },
      },
    ],
    //조리과정
    process: { type: Array, required: true },
    //process_time은 분따로 초따로 (ex) min:1 sec:20 저장
    processTime: [
      {
        min: { type: Number },
        sec: { type: Number },
      },
    ],
    //조리과정 이미지
    processImage: [{ type: String, required: true }],
    processImage_key: [{ type: String, default: null }],
    // 썸네일
    thumbnail: { type: String, required: true },
    thumbnail_key: { type: String, default: null },
    //완성 사진을 받는 부분입니다.
    doneImage: [{ type: String }],
    doneImage_key: [{ type: String, default: null }],
    //종류별
    category: {
      type: String,
      required: true,
    },
    //상황별 :
    condition: {
      type: String,
      required: true,
    },
    //재료별
    material: {
      type: String,
      required: true,
    },
    //방법별
    cook: {
      type: String,
      required: true,
    },
    //인원수
    servings: {
      type: String,
      required: true,
    },
    //요리 시간
    time: {
      type: String,
      required: true,
    },
    //난이도
    diffic: {
      type: String,
      required: true,
    },
    //작성글을 유저와 연결합니다
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    //DB에는 삭제안되지만, 게시물 조회할때 useYN:true 인 값만 노출되어주는 컬럼
    useYN: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Post", PostSchema);
