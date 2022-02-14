import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useUserActions } from "../../actions";
import BottomNav from "../../Components/nav/BottomNav";
import TopNav_main from "../../Components/nav/TopNav_main";
import FileUpload from "@mimoid-prog/react-file-upload";
import {
  useRecoilStateLoadable,
  useSetRecoilState,
  useRecoilState,
  useRecoilValue,
  atom,
  selector,
} from "recoil";
import { authAtom } from "../../states";
import { pageStateAtom } from "../../states";
import Slogan from "./slogan";
import RandomView from "./randomView";
// import FamousView from "./discardedTemplate/famousView";
// import FamousViewWithSlider from "./discardedTemplate/famousViewWithSlider";
// import FamousViewWithOneSlider from "./discardedTemplate/famousViewWithOneSlide";
import { userIdAtom } from "../../states/auth";
import { loginUserSelector, loginUserAtom } from "../../states/homeAtom";
import FamousPost from "./famousPost";
import FamousUserPost from "./famousUserPost";
import SloganBottom from "./sloganBottom";

const HomeBlock = styled.div`
  box-sizing: border-box;
  font-size: 18px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
`;
const Home = () => {
  const [loginUserLoadable, setloginUserLoadable] = useRecoilStateLoadable(loginUserSelector);
  const loginUser = useRecoilValue(loginUserAtom);

  useEffect(() => {
    if (loginUser) return;
    if (loginUserLoadable.state === "hasValue") setloginUserLoadable(loginUserLoadable.contents);

    console.log("홈 useEffect 실행여부");
  }, [loginUserLoadable]);

  if (loginUserLoadable.state === "loading") return <div>loading...</div>;
  console.log("홈 렌더링");
  return (
    <HomeBlock>
      <TopNav_main />
      <Slogan></Slogan>
      <FamousPost></FamousPost>
      {/* 팔로워 순으로 상위 4명의 유저를 뽑아서 유저의 게시글을 6개씩 보여줌 */}
      <FamousUserPost></FamousUserPost>
      <SloganBottom></SloganBottom>
      <BottomNav></BottomNav>
    </HomeBlock>
  );
};
const StyledBtn = styled.button`
  border: none;
  background-color: #feae11;
  width: 120px;
  color: white;
  font-size: 1rem;
  padding: 10px;
  border-radius: 10px;
  + button {
    margin-top: 20px;
  }
`;

const ButtonWrapper = styled.div`
  margin: auto 0;
  height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default Home;
