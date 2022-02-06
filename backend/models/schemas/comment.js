const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const CommentSchema = new mongoose.Schema(
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
    responseTo: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    comment: {
      type: String,
      required: true,
      default: "",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", CommentSchema);
