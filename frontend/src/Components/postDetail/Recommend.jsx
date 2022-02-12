import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
const RecommendWrapper = styled.div`
  margin: 20px;
`;
const Button = styled.button`
  width: 60px;
  height: 30px;
  font-size: 12px;
  font-weight: 900;
  background-color: #feae11;
  color: white;
  border: none;
  border-radius: 50px;
  margin: 10px 0px;
  &:not(:last-child) {
    margin-right: 14px;
  }
`;
const RecommendedPostWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;
const RecommendedPost = styled.div`
  margin-bottom: 10px;
`;
const PostImg = styled.img`
  width: 155px;
  height: 155px;
  object-fit: cover;
`;
const PostTitle = styled.div`
  font-size: 11px;
  width: 155px;
`;
const Recommend = () => {
  return (
    <RecommendWrapper>
      <div style={{ fontSize: 11 }}>이런 메뉴는 어떠세요?</div>
      <Button>한식</Button>
      <Button>일식</Button>
      <Button>중식</Button>
      <RecommendedPostWrapper>
        {[...Array(4)].map((n, index) => {
          return (
            <Link
              key={`RecommendLink_${index}`}
              to="/detail/"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <RecommendedPost key={`RecommendPost_${index}`}>
                <PostImg key={`PostImg_${index}`} src="../images/gam.jpg" />
                <PostTitle key={`PostTitle_${index}`}>
                  요리왕 비룡에게 전수받은 마늘 50개 들어간 알리오올리오
                </PostTitle>
              </RecommendedPost>
            </Link>
          );
        })}
      </RecommendedPostWrapper>
    </RecommendWrapper>
  );
};
export default Recommend;
