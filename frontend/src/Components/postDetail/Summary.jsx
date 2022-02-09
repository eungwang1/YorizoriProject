import React, { useState } from "react";
import styled from "styled-components";
import { useRecoilValue, useSetRecoilState } from "recoil";
const SummaryWrapper = styled.div`
  width: 360px;
  .sprite {
    display: inline-block;
    flex-shrink: 0;
    background-image: url("../images/icons.png");
    background-repeat: no-repeat;
    background-size: 135px 61.05px;
  }
  .view {
    width: 28px;
    height: 28px;
    background-position: 0px 0px;
  }
  .heart {
    width: 28px;
    height: 24.5px;
    background-position: ${(props) => (props.heartstate === true ? "-71.5px 0px" : "-36.5px 0px")};
  }
  .comment {
    width: 28px;
    height: 28px;
    background-position: -36.5px -31px;
  }
  .share {
    width: 28px;
    height: 31px;
    background-position: -107px 0px;
  }
`;

const Thumbnail = styled.img`
  width: 100%;
  height: 360px;
  object-fit: cover;
`;
const LCVS = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 9px 0;
  font-size: 12px;
`;
const Likes = styled.span`
  display: flex;
  align-items: center;
  & > span:first-child {
    margin-right: 10px;
  }
`;
const Comments = styled.span`
  width: 28px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 70px;
`;
const Views = styled.div`
  width: 28px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 15px;
`;
const Share = styled.div`
  margin-left: 15px;
`;
const Title = styled.div`
  font-size: 18px;
  font-weight: 900;
  margin: 8px 0px 6px 20px;
`;
const Content = styled.div`
  font-size: 13px;
  margin: 0 0 10px 20px;
`;
const Author = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  padding: 9px 20px;
`;
const ProfileImg = styled.img`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  margin-right: 12px;
  object-fit: cover;
`;
const Nickname = styled.span``;

const Summary = () => {
  const [heart, SetHeart] = useState(false);
  const HeartState = () => {
    SetHeart(!heart);
  };
  return (
    <SummaryWrapper heartstate={heart}>
      <Thumbnail src="../images/gam.jpg" />
      <LCVS>
        <Likes>
          <span className="sprite heart" onClick={HeartState} />
          <span>59명이 좋아합니다.</span>
        </Likes>
        <Comments>
          <span className="sprite comment" />
          <span>2</span>
        </Comments>
        <Views>
          <span className="sprite view" />
          <span>200</span>
        </Views>
        <Share className="sprite share" />
      </LCVS>
      <div>
        <Title>구운계란카레</Title>
        <Content>카레의 깊은맛을 느껴보세요 ~</Content>
      </div>
      <Author>
        <ProfileImg src="../images/gam.jpg" />
        <Nickname>스누피</Nickname>
      </Author>
    </SummaryWrapper>
  );
};

export default Summary;