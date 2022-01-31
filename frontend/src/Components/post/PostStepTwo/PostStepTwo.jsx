import React from "react";
import styled, { css } from "styled-components";
import PostTemplete from "../PostTemplete";
import { StyledP, ContainerDiv } from "../commonStyle";

const PostStepTwo = () => {
  return (
    <PostTemplete stepNum={2} page={2} request={"재료를 추가해 주세요."}>
      <ContainerDiv></ContainerDiv>
      <StyledP>양념을 추가해 주세요.</StyledP>
      <ContainerDiv></ContainerDiv>
    </PostTemplete>
  );
};

export default PostStepTwo;
