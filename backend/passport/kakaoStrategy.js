const passport = require("passport");
const kakaoStrategy = require("passport-kakao").Strategy;
const { User } = require("../models/");
const asyncHandler = require("../utils/asyncHandler");

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
          const isUserExist = await User.findOne({ email });
          if (isUserExist) {
            isUserExist.kakaoId = id;
            isUserExist.save();
            const tokenUser = {
              user: isUserExist,
              accessToken,
            };
            done(null, tokenUser);
            return
          }
          // else문으로는 예상치 못한 에러를 처리하지 못할 수 있으니 되도록이면 사용하지 않도록 한다.
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
          return
        } catch (error) {
          console.error(error);
          done(error);
          return
        }
      }
    )
  );
};
