import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { IngredientsListAtom } from "../../PostAtom/PostAtom";
import { ResetTextarea } from "../../commonStyle";
import { useForm, useFormContext } from "react-hook-form";

const IngredientsList = () => {
  const [ingredientsList, setIngredientsList] = useRecoilState(IngredientsListAtom);
  const deleteIngredient = (index) => {
    setIngredientsList((oldList) => {
      setValue(`ingredient_${index + 1}`, "");
      setValue(`volume_${index + 1}`, "");

      const newList = oldList.filter(function (el, i) {
        return index !== i;
      });
      return newList;
    });
  };

  const { watch, setValue } = useForm();
  const { register } = useFormContext();

  // useEffect(() => {
  //   const subscription = watch((value) => {
  //     console.log(value);
  //     localStorage.setItem("ingredient", JSON.stringify(value));
  //   });
  // }, [watch]);

  // useEffect(() => {
  //   if (localStorage.getItem("ingredient")) {
  //     const getIngredients = JSON.parse(localStorage.getItem("ingredient"));
  //     ingredientsList.forEach((el, idx) => {
  //       setValue(`ingredient_${idx + 1}`, eval(`getIngredients.ingredient_${idx + 1}`));
  //       setValue(`volume_${idx + 1}`, eval(`getIngredients.volume_${idx + 1}`));
  //     });
  //   }
  // }, []);

  return (
    <>
      {ingredientsList.map((item, index) => {
        return (
          <Wrapper key={`ingredient_wrapper_${index}`}>
            <Ingredient
              {...register(`ingredient_${index + 1}`)}
              placeholder="ex) 우유"
              key={`ingredient_${index}`}
            ></Ingredient>
            <Volume
              {...register(`volume_${index + 1}`)}
              placeholder="200ml"
              key={`ingredient_volume_${index}`}
            ></Volume>
            {index + 1 === ingredientsList.length && (
              <DeleteBtn
                key={`DeleteBtn_${index}`}
                onClick={() => {
                  deleteIngredient(index);
                }}
              >
                x
              </DeleteBtn>
            )}
          </Wrapper>
        );
      })}
    </>
  );
};

export default IngredientsList;

const Wrapper = styled.div`
  display: flex;
  + div {
    margin-top: 10px;
  }
  position: relative;
`;

const DeleteBtn = styled.div`
  width: 10px;
  position: absolute;
  right: -20px;
  color: #6666;
`;

const Ingredient = styled.textarea`
  width: 166px;
  height: 59px;
  border: 1px solid #feae11;
  box-sizing: border-box;
  border-radius: 50px;
  padding: 19px 0px 0px 25px;
  font-size: 1rem;
  font-weight: bold;
  ${ResetTextarea};
`;

const Volume = styled.textarea`
  width: 107px;
  height: 59px;
  border: 1px solid #feae11;
  box-sizing: border-box;
  border-radius: 50px;
  padding: 19px 0px 0px 25px;
  font-size: 1rem;
  font-weight: bold;
  ${ResetTextarea}
  margin-left : 5px;
`;
