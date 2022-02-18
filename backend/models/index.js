const mongoose = require("mongoose");
const UserSchema = require("./schemas/user");
const PostSchema = require("./schemas/post");
const LikeSchema = require("./schemas/like");
const FollowSchema = require("./schemas/follow");
const CommentSchema = require("./schemas/comment");
const HistorySchema = require("./schemas/history");

const User = mongoose.model("User", UserSchema);
const Post = mongoose.model("Post", PostSchema);
const Like = mongoose.model("Like", LikeSchema);
const Follow = mongoose.model("Follow", FollowSchema);
const History = mongoose.model("History", HistorySchema);
const Comment = mongoose.model("Comment", CommentSchema);

exports.User = User;
exports.Post = Post;
exports.Like = Like;
exports.Follow = Follow;
exports.History = History;
exports.Comment = Comment;
