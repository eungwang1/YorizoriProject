import React from "react";
import styled from "styled-components";
import { useRecoilValue, useSetRecoilState } from "recoil";
import dummy from "./PostDummyData.json";

const IngredientWrapper = styled.div`
  margin: 20px;
`;
const IngredientInfo = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  margin: 11px 20px 11px 11px;
`;
const Ingredient = ({ data }) => {
  return (
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
  );
};
export default Ingredient;
