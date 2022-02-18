import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Dropdown } from "react-dropdown-now";
import { useRecoilValue, useSetRecoilState, useRecoilState } from "recoil";
import axios from "axios";
import {
  randomButtonState,
  randomPostState,
  dropDownOptionsState,
  sortState,
  ViewAll,
} from "../../states/ViewAllAtom";

const Buttons = () => {
  const setRandomButton = useSetRecoilState(randomButtonState);
  const setRandomPost = useSetRecoilState(randomPostState);
  const dropDownOptions = useRecoilValue(dropDownOptionsState);
  const setDropDownOptions = useSetRecoilState(dropDownOptionsState);
  const currentSortState = useRecoilValue(sortState);
  const setCurrentSortState = useSetRecoilState(sortState);
  const [recipes, setRecipes] = useRecoilState(ViewAll);
  const [page, setPage] = useState(1);

  const randompost = () => {
    setRandomButton(true);
  };

  const getRandomIndex = () => {
    let random = parseInt(Math.random() * recipes.length);
    setRandomPost(recipes[random]);
  };

  const clearDropDownOptions = (e) => {
    window.location.replace("/view_all");
  };

  const sortByFamous = (e) => {
    console.log("인기순");
    setCurrentSortState("famous");
  };
  const sortByRecent = (e) => {
    console.log("최신순");
    setCurrentSortState("recent");
  };
  return (
    <>
      <Wrapper>
        <ButtonWrapper currentValue={currentSortState}>
          <RefreshButtonWapper onClick={clearDropDownOptions}>
            <div />
            <p>새로고침</p>
          </RefreshButtonWapper>
          <button id="famous" onClick={(e) => sortByFamous(e)}>
            인기순
          </button>
          <button id="recent" onClick={(e) => sortByRecent(e)}>
            최신순
          </button>
          <RandomButtonWapper
            onClick={() => {
              randompost();
              getRandomIndex();
              document.body.style.overflow = "hidden";
            }}
          >
            <div />
            <p>랜덤메뉴</p>
          </RandomButtonWapper>
        </ButtonWrapper>
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
    margin-right: 10px;
    background-color: ${(props) => (props.currentValue === "famous" ? "#feae11" : "white")};
    color: ${(props) => (props.currentValue === "famous" ? "white" : "#feae11")};
  }
  #recent {
    background-color: ${(props) => (props.currentValue === "recent" ? "#feae11" : "white")};
    color: ${(props) => (props.currentValue === "recent" ? "white" : "#feae11")};
  }
`;
const RefreshButtonWapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  left: 15px;
  top: 91px;
  & > div {
    background-color: transparent;
    background-image: url(${process.env.PUBLIC_URL + "../images/refresh.png"});
    background-size: cover;
    border: none;
    width: 35px;
    height: 35px;
  }
  & > p {
    width: 44px;
    color: #feae11;
    font-size: 11px;
    font-weight: 900;
    margin: 0;
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
