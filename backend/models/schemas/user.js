const { Schema } = require("mongoose");
const shortId = require("../types/short-id");

const UserSchema = new Schema(
  {
    shortId, //변경 제안해서 맞춰야함  ... userId = shortId 어떨까요
    //유저아메일
    email: {
      type: String,
      required: true,
      default: null,
      unique: true,
    },
    //유저닉네임
    nickname: {
      required: true,
      type: String,
      unique: true,
    },
    //유저 비밀번호
    password: {
      type: String,
      required: true,
    },
    //유저 프로필 사진이 저장된 파일 경로
    profileImage: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = UserSchema;
