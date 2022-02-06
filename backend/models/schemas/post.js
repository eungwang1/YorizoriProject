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
        ingre_name: { type: String, required: true },
        ingre_count: { type: String, required: true },
      },
    ],
    //양념
    seasoning: { type: Array },
    //조리과정
    //타이머 값 어떻게 받아야할지 일단 데이터 테스트할때는 05:00으로 테스트 하기위해서 String 으로 설정하였습니다.
    process: [{ txt: { type: String, required: true }, process_time: { type: String } }],
    //조리과정 이미지
    processImage: [{ type: String }],
    // 썸네일
    thumbnail: { type: String, default: "" },
    //완성 사진을 받는 부분입니다.
    doneImage: [{ type: String }],
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
