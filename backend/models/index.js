const mongoose = require("mongoose");
const UserSchema = require("./schemas/user");
const PostSchema = require("./schemas/post");
const LikeSchema = require("./schemas/like");
const FollowSchema = require("./schemas/follow");
const CommentSchema = require("./schemas/comment");
const HistorySchema = require("./schemas/history");

// const User = mongoose.model("User", UserSchema);
// const Post = mongoose.model("Post", PostSchema);
const Like = mongoose.model("Like", LikeSchema);
const Follow = mongoose.model("Follow", FollowSchema);
const History = mongoose.model("History", HistorySchema);
// const Comment = mongoose.model("Comment", CommentSchema);

// exports.User = User;
// exports.Post = Post;
exports.Like = Like;
exports.Follow = Follow;
exports.History = History;
// exports.Comment = Comment;

// 저희 스키마 구조를 정리하면 좋을 것 같아요.
// 1. models/schema 에서 바로 모델을 만들어서 각 스키마별로 export 하거나,
// 2. models/schema 에서는 스키마 구조만 짜고
// models/index 에서 스키마들 모아서 한번에 모델 만들어서 export 하거나
