import React from "react";
import styled, { css } from "styled-components";
import PostNav from "../nav/PostNav";
import NavBottom from "../nav/BottomNav";
import { StyledP } from "./commonStyle";
import { useRecoilValue, useSetRecoilState, useRecoilState } from "recoil";
import { postPageStateAtom } from "./PostAtom/PostAtom";

const PostTemplete = ({ children, stepNum, page, request }) => {
  const postPageState = useRecoilValue(postPageStateAtom);
  const setPostpostPageState = useSetRecoilState(postPageStateAtom);

  return (
    <PostTempleteBlock autocomplete="off">
      <PostNav />

      <StepDiv>STEP {stepNum}</StepDiv>

      <Pre>
        <StyledP temp>{request}</StyledP>
      </Pre>
      <ContentsWrapper postPageState={postPageState}>{children}</ContentsWrapper>

      <BtnWrapper page={page}>
        <PageBtn type="button" onClick={() => setPostpostPageState(1)}>
          [ 1 ]
        </PageBtn>
        <PageBtn type="button" onClick={() => setPostpostPageState(2)}>
          [ 2 ]
        </PageBtn>
        <PageBtn type="button" onClick={() => setPostpostPageState(3)}>
          [ 3 ]
        </PageBtn>
        <PageBtn type="button" onClick={() => setPostpostPageState(4)}>
          [ 4 ]
        </PageBtn>
      </BtnWrapper>
      <StyledBtn page={page} type="submit">
        작성 완료
      </StyledBtn>

      <NavBottom />
    </PostTempleteBlock>
  );
};

export default PostTemplete;

const Pre = styled.pre`
  margin: 0;
`;

const StyledBtn = styled.button`
  width: 315px;
  height: 58px;
  background: #fcad2c;
  border-radius: 10px;
  color: white;
  font-size: 1.1rem;
  font-weight: 550;
  border: none;
  display: none;
  margin-top: 10px;
  ${(props) => {
    if (props.page === 4) {
      return css`
        display: block;
      `;
    }
  }}
`;

const PostTempleteBlock = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  align-items: center;
`;

const StepDiv = styled.div`
  padding: 35px 20px 10px 30px;
  font-size: 1.5rem;
  color: rgba(0, 0, 0, 0.5);
  margin-right: 232px;
`;

const ContentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 50vh;
  width: 100vw;
  align-items: center;
  ${(props) =>
    props.postPageState === 4 &&
    css`
      height: 42vh;
    `}
`;

const BtnWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
  button:nth-child(${(props) => props.page}) {
    color: #feae11;
  }
`;

const PageBtn = styled.button`
  + button {
    margin-left: 3px;
  }
  font-weight: 700;
  font-size: 1rem;
  background-color: white;
  border: none;
`;
