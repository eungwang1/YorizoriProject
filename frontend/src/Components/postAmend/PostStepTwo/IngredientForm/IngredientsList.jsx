import React, { useEffect } from "react";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { IngredientsListAtom } from "../../PostAtom/PostAtom";
import { ResetTextarea } from "../../commonStyle";
import { useFormContext } from "react-hook-form";

const IngredientsList = ({ data }) => {
  const [ingredientsList, setIngredientsList] = useRecoilState(IngredientsListAtom);

  const { register, setValue } = useFormContext();
  const deleteIngredient = (index) => {
    setIngredientsList((oldList) => {
      setValue(`ingredient_${index + 1}`, "");
      setValue(`ingredientVolume_${index + 1}`, "");
      const newList = oldList.filter(function (el, i) {
        return index !== i;
      });
      return newList;
    });
  };

  useEffect(() => {
    if (ingredientsList.length < data.ingredient.length) {
      for (let i = 0; i < data.ingredient.length - 1; i++) {
        setIngredientsList((oldList) => {
          const newList = [
            ...oldList,
            {
              key: new Date().getTime(),
            },
          ];
          return newList;
        });
      }
    }
  }, []);

  return (
    <>
      {ingredientsList.map((item, index) => {
        return (
          <Wrapper key={`ingredient_wrapper_${index}`}>
            <Ingredient
              {...register(`ingredient_${index + 1}`)}
              placeholder="ex) 우유"
              key={`ingredient_${index}`}
              defaultValue={
                index + 1 <= data.ingredient.length ? data.ingredient[index].ingreName : ""
              }
            ></Ingredient>
            <Volume
              {...register(`ingredientVolume_${index + 1}`)}
              placeholder="200ml"
              key={`ingredient_volume_${index}`}
              defaultValue={
                index + 1 <= data.ingredient.length ? data.ingredient[index].ingreCount : ""
              }
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
  border-radius: 10px;
  padding: 16px 0px 0px 25px;
  font-size: 1rem;
  font-weight: bold;
  ${ResetTextarea};
`;

const Volume = styled.textarea`
  width: 107px;
  height: 59px;
  border: 1px solid #feae11;
  box-sizing: border-box;
  border-radius: 10px;
  padding: 16px 0px 0px 25px;
  font-size: 1rem;
  font-weight: bold;
  ${ResetTextarea}
  margin-left : 5px;
`;
