import React from "react";
import styled from "styled-components";
import { useRecoilValue, useSetRecoilState } from "recoil";
import dummy from "./PostDummyData.json";

const Ingredient = ({ data }) => {
  return (
    <>
      <IngredientWrapper>
        <div style={{ fontWeight: 900 }}>재료</div>
        {data &&
          data.ingredient.map((ingredient, index) => {
            return (
              <IngredientInfo key={`IngredientInfo_${index}`}>
                <div key={`IngredientInfo_name_${index}`}>{ingredient.ingreName}</div>
                <div key={`IngredientInfo_amount_${index}`}>{ingredient.ingreCount}</div>
              </IngredientInfo>
            );
          })}
      </IngredientWrapper>
      <Line />
      <IngredientWrapper>
        <div style={{ fontWeight: 900 }}>양념</div>
        {data &&
          data.seasoning.map((seasoning, index) => {
            return (
              <IngredientInfo key={`SeasoningInfo_${index}`}>
                <div key={`SeasoningInfo_name_${index}`}>{seasoning.ingreName}</div>
                <div key={`SeasoningInfo_amount_${index}`}>{seasoning.ingreCount}</div>
              </IngredientInfo>
            );
          })}
      </IngredientWrapper>
    </>
  );
};
export default Ingredient;

const IngredientWrapper = styled.div`
  margin: 20px;
`;
const IngredientInfo = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  margin: 11px 20px 11px 11px;
`;

const Line = styled.div`
  width: 360px;
  height: 10px;
  background-color: rgba(0, 0, 0, 0.14);
`;
