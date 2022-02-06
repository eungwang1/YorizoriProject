const { Schema } = require("mongoose");

const LikeSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    postId: {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
    isUnliked: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = LikeSchema;
