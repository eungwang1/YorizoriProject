import React from "react";
import styled, { css } from "styled-components";
import PostTemplete from "../PostTemplete";
import { StyledP, ContainerDiv } from "../commonStyle";

const PostStepThreeBlock = styled.div``;

const PostStepThree = () => {
  return (
    <PostStepThreeBlock>
      <PostTemplete stepNum={3} page={3} request={"요리순서를 추가해 주세요."}>
        <ContainerDiv big></ContainerDiv>
      </PostTemplete>
    </PostStepThreeBlock>
  );
};

export default PostStepThree;
