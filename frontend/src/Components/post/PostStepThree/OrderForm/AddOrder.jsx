import React from "react";

import { AddBtn } from "../../commonStyle";

import { useSetRecoilState } from "recoil";

import { OrderListAtom } from "../../PostAtom/PostAtom";

const AddOrder = () => {
  const setOrderList = useSetRecoilState(OrderListAtom);
  const addItem = (e) => {
    e.preventDefault();
    setOrderList((oldList) => {
      const newList = [
        ...oldList,
        {
          key: new Date().getTime(),
        },
      ];
      return newList;
    });
  };

  return <AddBtn onClick={addItem}>요리 순서 추가</AddBtn>;
};

export default AddOrder;
