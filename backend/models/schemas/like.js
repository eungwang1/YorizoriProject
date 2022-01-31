const { Schema } = require("mongoose");

const LikeSchema = new Schema(
  {
    userId: String,
    postId: String,
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    post: {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
  },
  { timestamps: true }
);

module.exports = LikeSchema;
