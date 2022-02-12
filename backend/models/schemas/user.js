const { Schema } = require("mongoose");
const shortId = require("../types/short-id");

const UserSchema = new Schema(
  {
    //유저아메일
    email: {
      type: String,
      required: true,
      unique: true,
    },
    //유저닉네임
    nickName: {
      required: true,
      type: String,
      unique: true,
    },
    //유저 비밀번호
    password: {
      type: String,
      default: null,
    },
    //유저 프로필 사진이 저장된 파일 경로
    profileImage: {
      type: String,
      default: null,
    },
    profileName: {
      type: String,
      default: null,
    },
    kakaoId: {
      type: String,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

//유저를 팔로우하는 다른 유저의 수를 받습니다.
UserSchema.virtual("numFollowees", {
  ref: "Follow",
  localField: "_id",
  foreignField: "followerId",
  count: true,
});

//유저가 팔로우하는 다른 유저의 수를 받습니다.
UserSchema.virtual("numFollowers", {
  ref: "Follow",
  localField: "_id",
  foreignField: "followeeId",
  count: true,
});

//유저가 작성한 게시글의 수를 받습니다.
UserSchema.virtual("numPosts", {
  ref: "Post",
  localField: "_id",
  foreignField: "userId",
  count: true,
});

//유저가 좋아요한 게시글의 수를 받습니다.
UserSchema.virtual("numLikes", {
  ref: "Like",
  localField: "_id",
  foreignField: "userId",
  count: true,
});

module.exports = UserSchema;
