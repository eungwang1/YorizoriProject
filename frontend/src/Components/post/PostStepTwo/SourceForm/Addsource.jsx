import React from "react";

import { AddBtn } from "../../commonStyle";

import { useSetRecoilState } from "recoil";

import { SourceListAtom } from "../../PostAtom/PostAtom";

const AddSource = () => {
  const setSourceList = useSetRecoilState(SourceListAtom);
  const addItem = (e) => {
    e.preventDefault();
    setSourceList((oldList) => {
      const newList = [
        ...oldList,
        {
          key: new Date().getTime(),
        },
      ];
      return newList;
    });
  };

  return <AddBtn onClick={addItem}>양념 추가</AddBtn>;
};

export default AddSource;
