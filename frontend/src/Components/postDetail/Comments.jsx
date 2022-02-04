import React from "react";
import styled from "styled-components";
import { useRecoilValue, useSetRecoilState } from "recoil";
const CommentsWrapper = styled.div`
  margin: 0 20px;
`;
const CommentInputWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 17px;
`;
const InputForm = styled.input`
  padding: 10px 18px;
  width: 210px;
  height: 36px;
  border-radius: 14px;
  background-color: #eee;
  border: none;
  font-size: 12px;
`;

const InputButton = styled.button`
  font-size: 12px;
  height: 36px;
  width: 45px;
  margin-left: 10px;
  background-color: #feae11;
  border: none;
  border-radius: 13px;
  color: white;
`;
const Comment = styled.div`
  display: flex;
  align-items: center;
  margin: 18px 0;
`;
const ProfileImg = styled.div`
  background-image: url("../images/gam.jpg");
  background-size: cover;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  margin-right: 12px;
`;
const Nickname = styled.div`
  font-size: 14px;
  font-weight: 900;
`;
const CommenContent = styled.div`
  font-size: 13px;
`;
const Date = styled.div`
  font-size: 12px;
`;
const MoreComments = styled.div`
  font-size: 14px;
  text-align: center;
  padding: 15px 0;
  border-top: 1px solid lightgray;
`;
const Comments = () => {
  return (
    <CommentsWrapper>
      <CommentInputWrapper>
        <ProfileImg />
        <InputForm placeholder="로그인 후 댓글을 작성 해주세요." />
        <InputButton>작성</InputButton>
      </CommentInputWrapper>
      <Comment>
        <ProfileImg />
        <div>
          <Nickname>두부</Nickname>
          <CommenContent>너무 맛있어보여요~</CommenContent>
          <Date>22/02/03 02:03</Date>
        </div>
      </Comment>
      <MoreComments>댓글 더보기</MoreComments>
    </CommentsWrapper>
  );
};
export default Comments;
