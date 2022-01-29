import React from "react";
import { useSetRecoilState } from "recoil";
import { IngredientListState } from "./_Atom";
import styled from "styled-components";
import { AddCookOrder } from "../PostStyle";

const AddIngredinet = () => {
  const setIngredientList = useSetRecoilState(IngredientListState);
  const addItem = (e) => {
    e.preventDefault();
    setIngredientList((oldList) => {
      const newList = [
        ...oldList,
        {
          key: new Date().getTime(),
        },
      ];
      return newList;
    });
  };
  return <AddCookOrder onClick={addItem}>재료 추가</AddCookOrder>;
};

export default AddIngredinet;
