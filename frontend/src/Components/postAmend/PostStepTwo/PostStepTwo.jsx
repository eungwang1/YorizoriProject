import React from "react";
import PostTemplete from "../PostTemplete";
import { StyledP, ContainerDiv } from "../commonStyle";
import IngredientsList from "./IngredientForm/IngredientsList";
import AddIngredients from "./IngredientForm/AddIngredients";
import AddSource from "./SourceForm/Addsource";
import SourceList from "./SourceForm/SourceList";

const PostStepTwo = ({ data }) => {
  return (
    <PostTemplete stepNum={2} page={2} request={"재료를 추가해 주세요.(1개 이상 필수)"}>
      <ContainerDiv stepTwo>
        <IngredientsList data={data}></IngredientsList>
        <AddIngredients></AddIngredients>
      </ContainerDiv>
      <StyledP>양념을 추가해 주세요.(필수)</StyledP>
      <ContainerDiv stepTwo>
        <SourceList data={data}></SourceList>
        <AddSource></AddSource>
      </ContainerDiv>
    </PostTemplete>
  );
};

export default PostStepTwo;
