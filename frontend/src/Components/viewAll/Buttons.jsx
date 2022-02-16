import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Dropdown } from "react-dropdown-now";
import { useRecoilValue, useSetRecoilState } from "recoil";
import axios from "axios";
import {
  randomButtonState,
  randomPostState,
  dropDownOptionsState,
  sortState,
} from "../../states/ViewAllAtom";
import dummy from "../../posts.json";

const Buttons = () => {
  const setRandomButton = useSetRecoilState(randomButtonState);
  const setRandomPost = useSetRecoilState(randomPostState);
  const dropDownOptions = useRecoilValue(dropDownOptionsState);
  const setDropDownOptions = useSetRecoilState(dropDownOptionsState);
  const currentSortState = useRecoilValue(sortState);
  const setCurrentSortState = useSetRecoilState(sortState);
  const [recipes, setRecipes] = useState([]);

  const randompost = () => {
    setRandomButton(true);
  };

  const getRandomIndex = () => {
    let random = parseInt(Math.random() * recipes.length);
    setRandomPost(recipes[random]);
  };

  const clearDropDownOptions = (e) => {
    const defaultName = document.querySelectorAll(".rdn-control-placeholder");
    const defaultNameList = ["종류", "재료", "상황", "방법"];
    defaultName.forEach((item, index) => {
      item.innerText = defaultNameList[index];
    });

    setDropDownOptions(() => ({
      category: "",
      material: "",
      condition: "",
      cook: "",
    }));
    if (e.target.id === "famous") {
      setCurrentSortState("famous");
    } else {
      setCurrentSortState("recent");
    }
  };

  useEffect(() => {
    const defaultName = document.querySelectorAll(".rdn-control-placeholder");
    const defaultCategory = ["category", "material", "condition", "cook"];
    const defaultNameList = ["종류", "재료", "상황", "방법"];

    defaultName.forEach((item, index) => {
      if (!dropDownOptions[defaultCategory[index]]) {
        item.innerText = defaultNameList[index];
      } else {
        item.innerText = dropDownOptions[defaultCategory[index]];
      }
    });

    const urlAll = "http://localhost:8080/post";

    const fetchData = async () => {
      const result = await axios(urlAll);
      setRecipes(result.data);
    };
    fetchData();
  }, []);

  return (
    <>
      <Wrapper>
        <ButtonWrapper currentValue={currentSortState}>
          <button id="famous" onClick={clearDropDownOptions}>
            인기순
          </button>
          <button id="recent" onClick={clearDropDownOptions}>
            최신순
          </button>
          <RandomButtonWapper
            onClick={() => {
              randompost();
              getRandomIndex();
            }}
          >
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
            onSelect={(value) => {
              setDropDownOptions((dropDownValues) => ({
                ...dropDownValues,
                category: value.value,
              }));
            }} // always fires once a selection happens even if there is no change
          />

          <Dropdown
            placeholder="재료"
            options={["육류", "채소류", "해물류", "과일류", "달걀/유제품", "기타"]}
            value="one"
            onChange={(value) => console.log("change!", value)}
            onSelect={(value) => {
              setDropDownOptions((dropDownValues) => ({
                ...dropDownValues,
                material: value.value,
              }));
            }} // always fires once a selection happens even if there is no change
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
            onSelect={(value) => {
              setDropDownOptions((dropDownValues) => ({
                ...dropDownValues,
                condition: value.value,
              }));
            }} // always fires once a selection happens even if there is no change
          />
          <Dropdown
            placeholder="방법"
            options={["볶음", "무침", "비빔", "끓이기", "굽기", "삶기", "튀김", "기타"]}
            className="last"
            value="one"
            onChange={(value) => console.log("change!", value)}
            onSelect={(value) => {
              setDropDownOptions((dropDownValues) => ({
                ...dropDownValues,
                cook: value.value,
              }));
            }} // always fires once a selection happens even if there is no change
          />
        </DropdownWrapper>
        <Line />
      </Wrapper>
    </>
  );
};
export default Buttons;

const Wrapper = styled.div`
  text-align: center;
`;

const ButtonWrapper = styled.div`
  margin: 12px 0px;
  & > button {
    width: 95px;
    height: 45px;
    color: white;
    border: 2px solid #feae11;
    border-radius: 50px;
    line-height: 36px;
    font-size: 16px;
    font-weight: 900;

    &:first-child {
      margin-right: 16px;
    }
  }
  #famous {
    background-color: ${(props) => (props.currentValue === "famous" ? "#feae11" : "white")};
    color: ${(props) => (props.currentValue === "famous" ? "white" : "#feae11")};
  }
  #recent {
    background-color: ${(props) => (props.currentValue === "recent" ? "#feae11" : "white")};
    color: ${(props) => (props.currentValue === "recent" ? "white" : "#feae11")};
  }
`;

const RandomButtonWapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  right: 15px;
  top: 89px;
  & > div {
    background-color: transparent;
    background-image: url(${process.env.PUBLIC_URL + "../images/randomButton.png"});
    background-size: cover;
    border: none;
    width: 27px;
    height: 38px;
  }
  & > p {
    width: 44px;
    color: #feae11;
    font-size: 11px;
    font-weight: 900;
    margin: 0;
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
    font-size: 13px;
    font-weight: 900;
    color: #feae11;

    &:not(:last-child) {
      margin-right: 8px;
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
