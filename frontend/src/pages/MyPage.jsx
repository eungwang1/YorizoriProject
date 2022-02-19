import React, { useEffect } from "react";
import Profile from "../Components/mypage/Profile";
import { pageStateAtom } from "../states";
import { useSetRecoilState } from "recoil";

const MyPage = () => {
  const setPageState = useSetRecoilState(pageStateAtom);

  useEffect(() => {
    setPageState("myPage");
    return () => {
      setPageState("");
    };
  }, []);
  return (
    <div>
      <Profile />
    </div>
  );
};

export default MyPage;
