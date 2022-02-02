import React from "react";
import styled, { css } from "styled-components";
import PostTemplete from "../PostTemplete";
import { StyledP, ContainerDiv } from "../commonStyle";
import IngredientsList from "./IngredientForm/IngredientsList";
import AddIngredients from "./IngredientForm/AddIngredients";
import AddSource from "./SourceForm/Addsource";
import SourceList from "./SourceForm/SourceList";

const PostStepTwo = () => {
  return (
    <PostTemplete stepNum={2} page={2} request={"재료를 추가해 주세요."}>
      <ContainerDiv>
        <IngredientsList></IngredientsList>
        <AddIngredients></AddIngredients>
      </ContainerDiv>
      <StyledP>양념을 추가해 주세요.</StyledP>
      <ContainerDiv>
        <SourceList></SourceList>
        <AddSource></AddSource>
      </ContainerDiv>
    </PostTemplete>
  );
};

export default PostStepTwo;
