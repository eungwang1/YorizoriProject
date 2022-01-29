import React, { useState } from "react";
import styled, { css } from "styled-components";
import { Dropdown } from "react-dropdown-now";
import IngredientList from "./IngredientForm/IngredientList";
import AddIngredinet from "./IngredientForm/AddIngredinet";
import AddSource from "./SourceForm/AddSource";
import SourceList from "./SourceForm/SourceList";
import AddOrder from "./CookOrderForm/AddOrder";
import CookOrderList from "./CookOrderForm/CookOrderList";
import { RecoilRoot } from "recoil";
import { ContentText } from "./PostStyle";
import Category from "./CategoryForm/Category";
import CookInfomation from "./CookInfoForm/CookInfomation";
import moment from "moment";
import TimePicker from "rc-time-picker";
import "rc-time-picker/assets/index.css";

const PostFormBlock = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const TitleBox = styled.div`
  width: 100vw;
  height: 55px;
  background-color: #feae11;
  color: white;
  font-size: 1rem;
  padding-left: 15px;
  box-sizing: border-box;
`;

const TitleInput = styled.input`
  font-size: 1rem;
  width: 100vw;
  padding: 30px 0px 30px 15px;
  border: none;
  background-color: white;
  :focus {
    outline: none;
  }
`;

const TagInfo = styled.div`
  font-size: 0.77rem;
  width: 360px;
  height: 50px;
  padding: 18px 14px 44px 14px;
  border: none;
  box-sizing: border-box;
  background-color: white;
  border-bottom: 1px solid #1111;
`;

const ContentTextWrapper = styled.div`
  display: flex;
`;

const ImgBox = styled.div`
  width: 100vw;
  height: 242px;
  background-color: #c4c4c4;
`;

const CookInfo = styled.div`
  width: 50vw;
  height: 61px;
  box-sizing: border-box;
  padding: 20px 0px 20px 10px;
  font-size: 1rem;
  font-weight: 400;
  font-family: Roboto;
  position: relative;
  border: 0.1px solid #1111;
`;

const DropdownWrapper = styled.div`
  display: flex;
  .rdn {
    width: 50vw;
    height: 61px;
    box-sizing: border-box;
    padding: 20px 0px 20px 10px;
    font-size: 1rem;
    font-weight: 400;
    font-family: Roboto;
    position: relative;
  }
  .rdn-control-placeholder {
    padding-left: 8px;
  }

  .rdn-control {
    position: relative;
    display: flex;
  }

  .rdn-control-arrow {
    width: 0;
    height: 0;
    border-top: 10px solid #feae11;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    position: absolute;
    right: 10px;
    top: 7px;
  }

  .rdn-drop {
    margin-top: 10px;
    position: absolute;
    left: 10px;
    right: 40px;
    top: -50px;
    box-shadow: 5px 5px 5px #9999;
    z-index: 100;
  }

  .rdn-drop-menu-option {
    background-color: white;
    box-sizing: border-box;
    padding: 8px;
  }

  ${(props) =>
    props.cookinfo &&
    css`
      .rdn {
        border: 0.1px solid #1111;
      }
    `}
`;

const PostForm = () => {
  const [input, setInput] = useState({ min: 5, sec: 6 });
  const [test, setTest] = useState({ a: 1, b: 2 });
  const onChangeTest = (e) => {
    const { value } = e.target;
    const { a, b } = e.target.value;
    console.log(a);
    console.log(b);

    setTest(value);
  };
  const { min, sec } = input;
  const onChangeTime = (e) => {
    // const { min, sec } = e.target.value;
    console.log(e.target.value.input.min);
    // setInput({
    //   ...input,
    //   [min]: min,
    //   [sec]: sec,
    // });
  };
  return (
    <PostFormBlock>
      <TitleBox>
        <p>레시피 제목</p>
      </TitleBox>
      <TitleInput placeholder="예) 소고기 미역국 끓이기" />
      <ImgBox />
      <TitleBox>
        <p>요리소개</p>
      </TitleBox>
      <ContentText
        placeholder="이 레시피의 탄생 배경을 적어주세요.
예) 아내의 생일ㄹ을 맞아 소고기 미역국을 끓여봤어요.
어머니로부터 배운 미역국 레시피를 아내의 입맛에 맞게 고안했습니다."
      />
      <Category />
      <CookInfomation />

      <TitleBox>
        <p>재료</p>
      </TitleBox>
      <IngredientList />
      <AddIngredinet />

      <TitleBox>
        <p>양념</p>
      </TitleBox>
      <SourceList />
      <AddSource />

      <TitleBox>
        <p>요리순서</p>
      </TitleBox>
      <CookOrderList />
      <AddOrder />

      <TitleBox>
        <p>완성사진</p>
      </TitleBox>
      <TitleBox>
        <p>팁/주의사항</p>
      </TitleBox>
      <ContentText tip placeholder="예) 소고기 미역국 끓이기"></ContentText>
      <TitleBox>
        <p>태그</p>
      </TitleBox>
      <TagInfo>
        주재료, 목적, 효능, 대상 등을 쉼표(,)를 사용하여 태그로 남겨주세요. 예) 돼지고기, 다이어트,
        비만, 칼슈므 감기예방
      </TagInfo>
      <ContentText tag placeholder="예) 돼지고기, 다이어트, 비만, 캄슘, 감기예방"></ContentText>
    </PostFormBlock>
  );
};

export default PostForm;
