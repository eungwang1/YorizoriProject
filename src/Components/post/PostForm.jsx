import React from 'react';
import styled from 'styled-components';
import { Dropdown, Selection } from 'react-dropdown-now';

const PostFormBlock = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const TitleBox = styled.div`
  width: 360px;
  height: 55px;
  background-color: #feae11;
  color: white;
  font-size: 1rem;
  padding-left: 15px;
  box-sizing: border-box;
`;

const TitleInput = styled.input`
  font-size: 1rem;
  width: 360px;
  padding: 30px 0px 30px 15px;
  border: none;
  background-color: white;
  :focus {
    outline: none;
  }
`;

const ContentText = styled.textarea`
  font-size: 0.77rem;
  width: 360px;
  height: 112px;
  padding: 24px 14px;
  border: none;
  box-sizing: border-box;
  background-color: white;
  :focus {
    outline: none;
  }
`;

const ImgBox = styled.div`
  width: 360px;
  height: 242px;
  background-color: #c4c4c4;
`;

const PostForm = () => {
  return (
    <PostFormBlock>
      <TitleBox>
        <p>레시피 제목</p>
      </TitleBox>
      <TitleInput placeholder="예) 소고기 미역국 끓이기" />
      <ImgBox />
      <TitleBox>
        <p>요리소개</p>
      </TitleBox>
      <ContentText
        placeholder="이 레시피의 탄생 배경을 적어주세요.
예) 아내의 생일ㄹ을 맞아 소고기 미역국을 끓여봤어요.
어머니로부터 배운 미역국 레시피를 아내의 입맛에 맞게 고안했습니다."
      />
      <TitleBox>
        <p>카테고리</p>
      </TitleBox>
      <Dropdown
        placeholder="::종류별::"
        className="my-className"
        options={['한식', '중식', '일식']}
      />
      <TitleBox>
        <p>요리정보</p>
      </TitleBox>
      <TitleBox>
        <p>재료</p>
      </TitleBox>
      <TitleBox>
        <p>양념</p>
      </TitleBox>
      <TitleBox>
        <p>요리순서</p>
      </TitleBox>
      <TitleBox>
        <p>완성사진</p>
      </TitleBox>
      <TitleBox>
        <p>팁/주의사항</p>
      </TitleBox>
      <TitleBox>
        <p>태그</p>
      </TitleBox>
    </PostFormBlock>
  );
};

export default PostForm;
