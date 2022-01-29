const { Schema } = require("mongoose");

const FollowSchema = new Schema(
  {
    //팔로우한 유저를 연결합니다.
    followId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    //팔로우를 누른 유저를 연결합니다.
    followeeId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = FollowSchema;
