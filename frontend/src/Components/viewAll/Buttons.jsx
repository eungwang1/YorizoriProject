import React from "react";
import styled from "styled-components";
import { Dropdown } from "react-dropdown-now";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { buttonState } from "./ModalAtom";

const Wrapper = styled.div`
  text-align: center;
`;

const ButtonWrapper = styled.div`
  margin: 12px 0px;
  & > button {
    width: 95px;
    height: 45px;
    background-color: #feae11;
    color: white;
    border: none;
    border-radius: 50px;
    line-height: 36px;
    font-size: 16px;
    font-weight: 900;

    &:first-child {
      margin-right: 16px;
    }
  }
`;

const RandomButtonWapper = styled.div`
  position: absolute;
  right: 15px;
  top: 89px;
  & > div {
    background-color: transparent;
    background-image: url("./images/randomButton.png");
    background-size: cover;
    border: none;
    width: 27px;
    height: 38px;
  }
  & > p {
    position: absolute;
    top: 25px;
    left: -10px;
    width: 44px;
    color: #feae11;
    font-size: 11px;
    font-weight: 900;
  }
`;

const Line = styled.div`
  width: 360px;
  height: 1px;
  background-color: rgba(0, 0, 0, 0.14);
`;
const DropdownWrapper = styled.div`
  display: flex;
  margin: 14px 0;
  justify-content: center;
  & > div {
    width: 76px;
    height: 36px;
    border: 2px solid #feae11;
    border-radius: 50px;
    line-height: 36px;
    font-size: 14px;
    font-weight: 900;
    color: #feae11;
    background-color: white;
    &:not(:last-child) {
      margin-right: 11px;
    }
    & > div:not(:first-child) {
      background-color: white;
      width: 120px;
      z-index: 100;
      color: #feae11;
      transform: translateY(-5px) translateX(10px);
      border-radius: 10px;
      border: 2px solid #feae11;
    }
    .last:not(:first-child) {
      transform: translateY(-5px) translateX(-60px);
    }
    .situation:nth-child(2) > :nth-child(3) {
      font-size: 13px;
    }
  }
`;

const Buttons = () => {
  const randomButton = useRecoilValue(buttonState);
  const setRandomButton = useSetRecoilState(buttonState);

  const randompost = () => {
    setRandomButton(true);
    console.log(randomButton);
  };
  return (
    <>
      <Wrapper>
        <ButtonWrapper>
          <button>인기순</button>
          <button>최신순</button>
          <RandomButtonWapper onClick={randompost}>
            <div />
            <p>랜덤메뉴</p>
          </RandomButtonWapper>
        </ButtonWrapper>
        <Line />
        <DropdownWrapper>
          <Dropdown
            placeholder="종류"
            options={["한식", "중식", "일식", "아시안", "양식", "기타"]}
            value="one"
            onChange={(value) => console.log("change!", value)}
            onSelect={(value) => console.log("selected!", value)} // always fires once a selection happens even if there is no change
            onClose={(closedBySelection) => console.log("closedBySelection?:", closedBySelection)}
            onOpen={() => console.log("open!")}
          />

          <Dropdown
            placeholder="재료"
            options={["육류", "채소류", "해물류", "과일류", "달걀/유제품", "기타"]}
            value="one"
            onChange={(value) => console.log("change!", value)}
            onSelect={(value) => console.log("selected!", value)} // always fires once a selection happens even if there is no change
            onClose={(closedBySelection) => console.log("closedBySelection?:", closedBySelection)}
            onOpen={() => console.log("open!")}
          />
          <Dropdown
            placeholder="상황"
            options={[
              "파티",
              "주말에 혼먹",
              "근사하게",
              "다이어트",
              "영양식",
              "야식",
              "간식",
              "초스피드",
              "기타",
            ]}
            value="one"
            onChange={(value) => console.log("change!", value)}
            onSelect={(value) => console.log("selected!", value)} // always fires once a selection happens even if there is no change
            onClose={(closedBySelection) => console.log("closedBySelection?:", closedBySelection)}
            onOpen={() => console.log("open!")}
          />
          <Dropdown
            placeholder="방법"
            className="last"
            options={["볶음", "무침", "비빔", "끓이기", "굽기", "삶기", "튀김", "기타"]}
            value="one"
            onChange={(value) => console.log("change!", value)}
            onSelect={(value) => console.log("selected!", value)} // always fires once a selection happens even if there is no change
            onClose={(closedBySelection) => console.log("closedBySelection?:", closedBySelection)}
            onOpen={() => console.log("open!")}
          />
        </DropdownWrapper>
        <Line />
      </Wrapper>
    </>
  );
};
export default Buttons;
