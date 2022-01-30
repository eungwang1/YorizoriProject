import React from "react";
import styled from "styled-components";
import { modalStateAtom } from "./_Atom";
import { atom, useRecoilValue, useSetRecoilState } from "recoil";

const TimeModalBlock = styled.div`
  display: ${(props) => (props.modalState === true ? "flex" : "none")};
  /* display: flex; */
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 500;
  justify-content: center;
  overflow: hidden;
`;

const TimeModalBox = styled.div`
  position: fixed;
  top: 250px;
  width: 346px;
  height: 200px;
  background-color: white;
  border-radius: 11px;
  font-weight: 900;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  z-index: 999;
`;

const Test = styled.div`
  width: 100%;
  height: 100%;
  z-index: 100;
`;

const TimeInput = styled.input`
  font-size: 30px;
  + p {
    margin-right: 15px;
  }
`;

const TimeText = styled.p`
  color: #888;
  font-size: 30px;
`;

const TimeSetBtn = styled.button`
  color: white;
  background-color: #feae11;
  border: none;
  border-radius: 30px;
  width: 135px;
  font-size: 15px;
  height: 40px;
`;

const TimeWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const TimeModal = () => {
  const modalState = useRecoilValue(modalStateAtom);
  const setModalState = useSetRecoilState(modalStateAtom);
  const closeModal = () => {
    if (modalState === true) {
      setModalState(false);
    }
  };
  return (
    <TimeModalBlock modalState={modalState}>
      <TimeModalBox>
        <TimeWrapper>
          <TimeInput type="number" step="1" min="0" max="60" />
          <TimeText>분</TimeText>
          <TimeInput type="number" step="1" min="0" max="60" />
          <TimeText>초</TimeText>
        </TimeWrapper>
        <TimeSetBtn onClick={closeModal}>설정하기</TimeSetBtn>
      </TimeModalBox>
      <Test onClick={closeModal}></Test>
    </TimeModalBlock>
  );
};

export default TimeModal;
