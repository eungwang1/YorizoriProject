import React from "react";
import styled from "styled-components";
import TopNav from "../Components/nav/TopNav";
import BottomNav from "../Components/nav/BottomNav";
import Summary from "../Components/postDetail/Summary";
const PostDetailPageBlock = styled.div`
  font-size: 18px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  background-color: blue;
`;

const PostDetailPage = () => {
  return (
    <PostDetailPageBlock>
      <TopNav />
      <div style={{ marginTop: "55px", marginBottom: "90px" }}>
        <Summary></Summary>
      </div>
      <BottomNav />
    </PostDetailPageBlock>
  );
};

export default PostDetailPage;
