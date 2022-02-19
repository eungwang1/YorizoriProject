import React from "react";
import styled, { css } from "styled-components";
import { IngredientListState } from "./_Atom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { ContentTextWrapper, DeleteBtn, ContentText } from "../PostStyle";
import { useFormContext } from "react-hook-form";

const IngredientView = () => {
  const ingredientList = useRecoilValue(IngredientListState);
  const setIngredientList = useSetRecoilState(IngredientListState);
  const { register } = useFormContext();
  const deleteIngredient = (index) => {
    setIngredientList((oldList) => {
      const newList = oldList.filter(function (el, i) {
        return index !== i;
      });
      return newList;
    });
  };
  return (
    <div>
      {ingredientList.map((item, index) => {
        return (
          <ContentTextWrapper key={`wrapper_${index}`}>
            <ContentText
              {...register(`ingredient_${index}`)}
              key={`ingredient_${index}`}
              half
              placeholder="예) 소고기"
            ></ContentText>
            <ContentText
              {...register(`ingredient_weight_${index}`)}
              key={`ingredient_weight_${index}`}
              half
              placeholder="예) 300g"
            ></ContentText>
            {index + 1 === ingredientList.length && (
              <DeleteBtn
                onClick={(event) => {
                  deleteIngredient(index);
                }}
                type="button"
              >
                x
              </DeleteBtn>
            )}
          </ContentTextWrapper>
        );
      })}
    </div>
  );
};
export default IngredientView;
