import React, { userRef, useState, useCallback, useMemo, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSetRecoilState, useRecoilValue, atom, selector } from "recoil";
import { authAtom } from "../../states";
import { useUserActions } from "../../actions";
import styled, { css } from "styled-components";

const SloganWrapper = styled.div`
  width: 100%;
  height: 160px;
  position: relative;
  margin-bottom: 80px;
`;

const SloganBackground = styled.div`
  position: relative;
  border-radius: 10px 0 0 10px;
  height: 160px;
  background-color: #fffcf4;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  right : 0
  z-index: 100;

`;

const SloganBody = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
  color: #feae11;
  height: 30px;
  line-height: 30px;
  margin: 0;
`;
const SloganContents = styled.p`
  font-size: 0.8rem;
  color: #646464;
  height: 20px;
  line-height: 20px;
  padding: 0;
`;
const Info = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: gray;
  font-size: 15px;
`;

const StyledBtn = styled.span`
  border: none;
  align-item: center;
  background-color: #feae11;
  width: 120px;
  color: white;
  font-size: 1rem;
  padding: 8px;
  border-radius: 10px;
  text-align: center;
`;

const SloganBottom = () => {
  const user = localStorage.getItem("user");
  const navigate = useNavigate();

  //authCheck === true -> 로그인 상태
  //authCheck === false -> 로그아웃 상태
  const authCheck = useRecoilValue(authAtom);

  const userActions = useUserActions();

  return (
    <SloganWrapper>
      <SloganBackground>
        <SloganBody>요리할 준비가 되셨나요?</SloganBody>
        <SloganContents>요리조리와 함께 행복한 요리를 지금 바로 시작해보세요</SloganContents>
        <Info>
          {!authCheck && (
            <StyledBtn
              onClick={() => {
                navigate("/login");
              }}
            >
              로그인
            </StyledBtn>
          )}
          {authCheck && <StyledBtn onClick={userActions.logout}>로그아웃</StyledBtn>}
        </Info>
      </SloganBackground>
    </SloganWrapper>
  );
};

export default SloganBottom;
