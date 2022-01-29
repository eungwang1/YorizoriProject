const { Schema } = require("mongoose");

const CommentSchema = new Schema(
  {
    postId: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    comment: {
      type: String,
      required: true,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = CommentSchema;
