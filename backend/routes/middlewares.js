//* 사용자 미들웨어를 직접 구현

exports.isLoggedIn = (req, res, next) => {
  // isAuthenticated()로 검사해 로그인이 되어있으면
  if (req.isAuthenticated()) {
    next(); // 다음 미들웨어
  } else {
    console.log("로그인 하고와")
    res.status(403).json({ message: "로그인이 필요합니다."});
  }
};

exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next(); // 로그인 안되어있으면 다음 미들웨어
  } else {
    console.log("로그인 되어있음 하지마.")
    res.status(400).json({ message: "이미 로그인 되어있는 상태입니다." });
  }
};
