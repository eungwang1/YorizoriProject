import React from "react";
import styled from "styled-components";
import { Dropdown } from "react-dropdown-now";

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
const Line = styled.div`
  width: 360px;
  height: 1px;
  background-color: rgba(0, 0, 0, 0.14);
`;
const DropdownWrapper = styled.div`
  display: flex;
  margin: 14px 3.5px;
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
  }
`;
const Buttons = () => {
  return (
    <Wrapper>
      <ButtonWrapper>
        <button>인기순</button>
        <button>최신순</button>
      </ButtonWrapper>
      <Line />
      <DropdownWrapper>
        <Dropdown
          placeholder="종류"
          className="my-className"
          options={["한식", "중식", "일식", "아시안", "양식", "기타"]}
          value="one"
          onChange={(value) => console.log("change!", value)}
          onSelect={(value) => console.log("selected!", value)} // always fires once a selection happens even if there is no change
          onClose={(closedBySelection) => console.log("closedBySelection?:", closedBySelection)}
          onOpen={() => console.log("open!")}
        />

        <Dropdown
          placeholder="재료"
          className="my-className"
          options={["육류", "채소류", "해물류", "과일류", "달걀/유제품", "기타"]}
          value="one"
          onChange={(value) => console.log("change!", value)}
          onSelect={(value) => console.log("selected!", value)} // always fires once a selection happens even if there is no change
          onClose={(closedBySelection) => console.log("closedBySelection?:", closedBySelection)}
          onOpen={() => console.log("open!")}
        />
        <Dropdown
          placeholder="상황"
          className="my-className"
          options={[
            "파티",
            "주말에 혼먹",
            "근사한 분위기",
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
          className="my-className"
          options={["볶음", "무침", "비빔", "끓이기", "굽기", "삶기", "튀김", "기타"]}
          value="one"
          onChange={(value) => console.log("change!", value)}
          onSelect={(value) => console.log("selected!", value)} // always fires once a selection happens even if there is no change
          onClose={(closedBySelection) => console.log("closedBySelection?:", closedBySelection)}
          onOpen={() => console.log("open!")}
          className="last"
        />
      </DropdownWrapper>
      <Line />
    </Wrapper>
  );
};
export default Buttons;
