import React from "react";
import styled, { css } from "styled-components";
import PostTemplete from "../PostTemplete";
import { StyledP, ContainerDiv } from "../commonStyle";
import { Dropdown } from "react-dropdown-now";
import CategoryDropdown from "./CategoryDropdown";
import CookInfoDropdown from "./CookInfoDropdown";

const PostStepFourBlock = styled.div``;

const PostStepFour = () => {
  return (
    <PostTemplete
      stepNum={4}
      page={4}
      request={
        "추가정보를 입력해 주세요.(선택)\n(나중에 입력해도 괜찮습니다.\n입력 안할 시에는 기타 분류로 포함됩니다.)"
      }
    >
      <StyledP stepFour>카테고리(선택)</StyledP>
      <ContainerDiv drop>
        <CategoryDropdown />
      </ContainerDiv>

      <StyledP stepFour>요리정보(필수)</StyledP>
      <ContainerDiv drop small>
        <CookInfoDropdown />
      </ContainerDiv>
    </PostTemplete>
  );
};

export default PostStepFour;
