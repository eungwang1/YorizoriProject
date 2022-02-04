const mongoose = require("mongoose");
const shortId = require("./types/short-id");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    nickName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
    },
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
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
