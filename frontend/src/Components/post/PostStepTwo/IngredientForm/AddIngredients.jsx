import React, { useState } from "react";
import styled from "styled-components";
import { AddBtn } from "../../commonStyle";

import { useRecoilValue, useSetRecoilState, useRecoilState } from "recoil";

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
