import React from "react";
import { AddBtn } from "../../commonStyle";

import { useSetRecoilState } from "recoil";

import { IngredientsListAtom } from "../../PostAtom/PostAtom";

const AddIngredients = () => {
  const setIngredientsList = useSetRecoilState(IngredientsListAtom);
  const addItem = (e) => {
    e.preventDefault();
    setIngredientsList((oldList) => {
      const newList = [
        ...oldList,
        {
          key: new Date().getTime(),
        },
      ];
      return newList;
    });
  };

  return <AddBtn onClick={addItem}>재료 추가</AddBtn>;
};

export default AddIngredients;
