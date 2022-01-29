import React from "react";
import { useSetRecoilState } from "recoil";
import { SourceListState } from "./_Atom";
import styled from "styled-components";
import { AddCookOrder } from "../PostStyle";

const AddSource = () => {
  const setSourceList = useSetRecoilState(SourceListState);
  const addItem = (e) => {
    e.preventDefault();
    setSourceList((oldList) => {
      const newList = [
        ...oldList,
        {
          key: new Date().getTime() + 1,
        },
      ];
      return newList;
    });
  };
  return <AddCookOrder onClick={addItem}>재료추가</AddCookOrder>;
};

export default AddSource;
