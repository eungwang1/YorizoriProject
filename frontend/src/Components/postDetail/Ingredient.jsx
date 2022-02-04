import React from "react";
import styled from "styled-components";
import { useRecoilValue, useSetRecoilState } from "recoil";

const IngredientWrapper = styled.div`
  margin: 20px;
`;
const IngredientInfo = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  margin: 11px 20px 11px 11px;
`;
const Ingredient = () => {
  return (
    <IngredientWrapper>
      <div style={{ fontWeight: 900 }}>재료</div>
      <IngredientInfo>
        <div>재료명</div>
        <div>재료량</div>
      </IngredientInfo>
      <IngredientInfo>
        <div>재료명</div>
        <div>재료량</div>
      </IngredientInfo>
      <IngredientInfo>
        <div>재료명</div>
        <div>재료량</div>
      </IngredientInfo>
    </IngredientWrapper>
  );
};
export default Ingredient;
