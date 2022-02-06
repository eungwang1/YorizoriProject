const passport = require("passport");
const kakaoStrategy = require("passport-kakao").Strategy;
const User = require("../models/User");

module.exports = () => {
  passport.use(
    new kakaoStrategy(
      {
        clientID: process.env.KAKAO_ID,
        callbackURL: `/auth/kakao/callback`,
      },
      async (accessToken, refreshToken, profile, done) => {
        const {
          id,
          username: name,
          displayName: nickName,
          _json: {
            kakao_account: { email },
          },
        } = profile;
        try {
          const isUser = await User.findOne({ email });
          if (isUser) {
            isUser.kakaoId = id;
            isUser.save();
            const tokenUser = {
              user: isUser,
              accessToken,
            };
            done(null, tokenUser);
          } else {
            const newUser = await User.create({
              email,
              nickName,
              kakaoId: id,
            });
            tokenUser = {
              user: newUser,
              accessToken,
            };
            done(null, tokenUser);
          }
        } catch (err) {
          console.error(err);
          done(err);
        }
      }
    )
  );
};
