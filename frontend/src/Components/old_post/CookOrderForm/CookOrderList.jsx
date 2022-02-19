import React from "react";
import styled from "styled-components";
import { CookOrderState, modalStateAtom } from "./_Atom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  CookOrderWrappr,
  DeleteBtn,
  OrderNum,
  TimeContentWrapper,
  OrderText,
  TimeSetBtn,
  ImgBoxSmall,
} from "../PostStyle";
const CookOrderList = () => {
  const CookOrderList = useRecoilValue(CookOrderState);
  const setCookOrderList = useSetRecoilState(CookOrderState);

  const modalState = useRecoilValue(modalStateAtom);
  const setModalState = useSetRecoilState(modalStateAtom);

  const openModal = (e) => {
    setModalState(true);
  };

  const deleteCookOrder = (index) => {
    setCookOrderList((oldList) => {
      const newList = oldList.filter(function (el, i) {
        return index !== i;
      });
      return newList;
    });
  };

  return (
    <div>
      {CookOrderList.map((item, index) => {
        return (
          <CookOrderWrappr key={`wrapper_${index}`}>
            <OrderNum>{index + 1}</OrderNum>
            <TimeContentWrapper>
              <OrderText
                key={`cookorder_${index}`}
                half
                placeholder="예) 소고기 기름기를 떼어내고 ... "
              ></OrderText>
              <TimeSetBtn onClick={openModal} type="button" key={`cookorder_time_${index}`}>
                시간 설정하기
              </TimeSetBtn>
            </TimeContentWrapper>

            <ImgBoxSmall key={`cookorder_img_${index}`}></ImgBoxSmall>

            {index + 1 === CookOrderList.length && (
              <DeleteBtn
                onClick={(event) => {
                  deleteCookOrder(index);
                }}
                type="button"
              >
                x
              </DeleteBtn>
            )}
          </CookOrderWrappr>
        );
      })}
    </div>
  );
};

export default CookOrderList;
