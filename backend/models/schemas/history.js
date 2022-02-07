const { Schema } = require("mongoose");

const HistorySchema = new Schema(
  {
    //유저를 연결합니다.
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    //게시글을 연결합니다.
    postId: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    //같은 게시물 중 마지막으로 본 게시물인지를 체크합니다.
    isLastViewed: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = HistorySchema;
