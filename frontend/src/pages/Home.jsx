import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useUserActions } from "../actions";
import BottomNav from "../Components/nav/BottomNav";
import TopNav_main from "../Components/nav/TopNav_main";
import FileUpload from "@mimoid-prog/react-file-upload";
import { useSetRecoilState, useRecoilValue, useRecoilState } from "recoil";
import { authAtom } from "../states";
import { pageStateAtom } from "../states";

const Home = () => {
  const setPageState = useSetRecoilState(pageStateAtom);
  const navigate = useNavigate();

  //authCheck === true -> 로그인 상태
  //authCheck === false -> 로그아웃 상태
  const [authCheck, setAuthCheck] = useRecoilState(authAtom);
  const userActions = useUserActions();

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setAuthCheck(true);
    } else {
      setAuthCheck(false);
    }
    setPageState("home");
    return () => {
      setPageState("");
    };
  }, []);

  return (
    <HomeBlock>
      <TopNav_main />
      <ButtonWrapper>
        {!authCheck && <StyledBtn onClick={() => navigate("/login")}>login</StyledBtn>}
        {authCheck && <StyledBtn onClick={userActions.logout}>logout</StyledBtn>}
        <StyledBtn onClick={() => navigate("/users/mypage")}>mypage</StyledBtn>
        <StyledBtn onClick={() => navigate("post")}>post</StyledBtn>
        <StyledBtn onClick={() => navigate("/view_all")}>전체글 보기</StyledBtn>
      </ButtonWrapper>
      <BottomNav />
    </HomeBlock>
  );
};

const HomeBlock = styled.div`
  position: relative;
`;

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
