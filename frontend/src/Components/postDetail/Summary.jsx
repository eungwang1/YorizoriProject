import React from "react";
import styled from "styled-components";
import { useRecoilValue, useSetRecoilState } from "recoil";
const SummaryWrapper = styled.div`
  width: 360px;
`;
const Thumbnail = styled.div`
  background-image: url("../images/gam.jpg");
  background-size: cover;
  width: 100%;
  height: 360px;
`;
const Likes = styled.div``;
const Comments = styled.div``;
const Views = styled.div``;
const Share = styled.div``;
const Title = styled.div``;
const Contents = styled.div``;
const Author = styled.div``;
const ProfileImg = styled.div``;
const Nickname = styled.div``;

const Summary = () => {
  return (
    <SummaryWrapper>
      <Thumbnail />
      <div>
        <Likes></Likes>

        <Comments></Comments>
        <Views></Views>
        <Share></Share>
      </div>
      <div>
        <Title></Title>
        <Contents></Contents>
      </div>
      <Author>
        <ProfileImg />
        <Nickname></Nickname>
      </Author>
    </SummaryWrapper>
  );
};

export default Summary;
