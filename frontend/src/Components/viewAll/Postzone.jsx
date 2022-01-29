import React from "react";
import styled from "styled-components";
const Wrapper = styled.div`
  text-align: center;
  .sprite {
    display: inline-block;
    flex-shrink: 0;
    background-image: url("./images/icons.png");
    background-repeat: no-repeat;
    background-size: 66.34px 30px;
  }
  .heart {
    width: 16px;
    height: 16px;
    background-position: -16px 3.8px;
  }
  .comment {
    width: 16px;
    height: 16px;
    background-position: -16px -13px;
  }
`;
const WrapperPost = styled.div`
  display: grid;
  margin-top: 15px;
  grid: auto-flow 241px / repeat(2, 175px);
  justify-content: center;
  align-items: center;
  justify-items: center;

  & > div {
    width: 160px;
    height: 228px;
  }
`;
const Img = styled.div`
  background-image: url("./images/gam.jpg");
  background-size: cover;
  width: 160px;
  height: 147px;
  border-radius: 10px;
`;
const TextBox = styled.div`
  width: 160px;
  height: 73px;
  margin-top: 8px;
  font-weight: 900;
  text-align: left;
`;
const Title = styled.p`
  font-size: 16px;
  margin: 0px;
`;
const Author = styled.p`
  font-size: 13px;
  margin: 5px 0 10px 0;
`;
const WrapperHeartComment = styled.div`
  line-height: 15px;
`;
const HeartCommentCount = styled.span`
  font-size: 13px;
  margin-right: 8px;
`;
const Postzone = () => {
  return (
    <Wrapper>
      <WrapperPost>
        <div>
          <Img />
          <TextBox>
            <Title>바스바스감바스</Title>
            <Author>고래</Author>
            <WrapperHeartComment>
              <span className="sprite heart" /> <HeartCommentCount>31</HeartCommentCount>
              <span className="sprite comment" /> <HeartCommentCount>7</HeartCommentCount>
            </WrapperHeartComment>
          </TextBox>
        </div>
        <div>
          <Img />
          <TextBox>
            <Title>바스바스감바스</Title>
            <Author>고래</Author>
            <WrapperHeartComment>
              <span className="sprite heart" /> <HeartCommentCount>31</HeartCommentCount>
              <span className="sprite comment" /> <HeartCommentCount>7</HeartCommentCount>
            </WrapperHeartComment>
          </TextBox>
        </div>
        <div>
          <Img />
          <TextBox>
            <Title>바스바스감바스</Title>
            <Author>고래</Author>
            <WrapperHeartComment>
              <span className="sprite heart" /> <HeartCommentCount>31</HeartCommentCount>
              <span className="sprite comment" /> <HeartCommentCount>7</HeartCommentCount>
            </WrapperHeartComment>
          </TextBox>
        </div>
        <div>
          <Img />
          <TextBox>
            <Title>바스바스감바스</Title>
            <Author>고래</Author>
            <WrapperHeartComment>
              <span className="sprite heart" /> <HeartCommentCount>31</HeartCommentCount>
              <span className="sprite comment" /> <HeartCommentCount>7</HeartCommentCount>
            </WrapperHeartComment>
          </TextBox>
        </div>
        <div>
          <Img />
          <TextBox>
            <Title>바스바스감바스</Title>
            <Author>고래</Author>
            <WrapperHeartComment>
              <span className="sprite heart" /> <HeartCommentCount>31</HeartCommentCount>
              <span className="sprite comment" /> <HeartCommentCount>7</HeartCommentCount>
            </WrapperHeartComment>
          </TextBox>
        </div>
      </WrapperPost>
    </Wrapper>
  );
};
export default Postzone;
