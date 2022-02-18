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
    parentComment: {
      type: Schema.Types.ObjectId,
      ref: "Comment", // 이처럼 자기 자신의 모델을 자신의 항목으로 가지는 것을 self referencing relationship이라고 합니다.
      // parentComment라는 항목을 추가하해서 대댓글인 경우 어느 댓글에 달린 댓글인지를 표시할 수 있습니다.
      // 대댓글이 아니고 게시물에 바로 달리는 댓글은 부모 댓글이 없으므로 required는 필요하지 않습니다.
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
  { timestamps: true} 
  // , toObject: { virtuals: true } DB상에는 대댓글의 부모정보만 저장합니다.
  // 하지만 웹사이트를 사용할때는 부모로부터 자식들을 찾아 내려가는 것이 더 편리하기 때문에 자식 댓글들의 정보를 가지는 항목을
  // virtual(가상)항목으로 추가합니다. -> CommentSchema에 virtual메서드를 사용할 수 있느듯?
);

// CommentSchema.virtual("childComments")
//   .get(function () {
//     return this._childComments;
//   })
//   .set(function (value) {
//     this._childComments = value;
//   });

module.exports = CommentSchema;
