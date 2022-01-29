import React, { useState } from "react";
import styled, { css } from "styled-components";
import { Dropdown } from "react-dropdown-now";
import IngredientList from "./IngredientForm/IngredientList";
import AddIngredinet from "./IngredientForm/AddIngredinet";
import AddSource from "./SourceForm/AddSource";
import SourceList from "./SourceForm/SourceList";
import { RecoilRoot } from "recoil";
import { ContentText } from "./PostStyle";

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
  const [ingredientList, setIngredientList] = useState([0]);
  const [count, setCount] = useState(1);

  const addIngredient = () => {
    console.log("test");
    setIngredientList((current) => {
      const newList = [...current];
      setCount((el) => el + 1);
      newList.push(count);
      return newList;
    });
  };
  const [inputValue, setInputValue] = useState("");
  const handleChangeInput = (event) => {
    console.log(inputValue);
    setInputValue(event.target.value);
  };
  console.log(inputValue);
  const onRemove = (index) => {
    setIngredientList((current) => {
      const newList = [...current];
      console.log(newList);
      newList.splice(index, 1);
      console.log(index);
      return newList;
    });
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
      <TitleBox>
        <p>카테고리</p>
      </TitleBox>
      {/* <Dropdown
        placeholder="::종류별::"
        className="my-className"
        options={["한식", "중식", "일식"]}
      /> */}
      <DropdownWrapper>
        <Dropdown
          placeholder="::종류별::"
          options={["::종류별::", "한식", "중식", "일식", "아시안", "양식", "기타"]}
          // value="one"
          onChange={(value) => console.log("change!", value)}
          onSelect={(value) => console.log("selected!", value)} // always fires once a selection happens even if there is no change
          onClose={(closedBySelection) => console.log("closedBySelection?:", closedBySelection)}
          onOpen={() => console.log("open!")}
        />
        <Dropdown
          placeholder="::상황별::"
          options={[
            "::상황별::",
            "파티할 때",
            "주말에 혼먹",
            "근사한 분위기",
            "다이어트",
            "영양식",
            "야식",
            "간식",
            "초스피드",
            "기타",
          ]}
          // value="one"
          onChange={(value) => console.log("change!", value)}
          onSelect={(value) => console.log("selected!", value)} // always fires once a selection happens even if there is no change
        />
      </DropdownWrapper>
      <DropdownWrapper>
        <Dropdown
          placeholder="::재료별::"
          options={["::재료별::", "육류", "채소류", "해물류", "과일류", "달걀/유제품", "기타"]}
          // value="one"
          onChange={(value) => console.log("change!", value)}
          onSelect={(value) => console.log("selected!", value)} // always fires once a selection happens even if there is no change
        />
        <Dropdown
          placeholder="::방법별::"
          options={["::방법별::", "볶음", "무침", "비빔", "끓이기", "굽기", "삶기", "튀김", "기타"]}
          // value="one"
          onChange={(value) => console.log("change!", value)}
          onSelect={(value) => console.log("selected!", value)} // always fires once a selection happens even if there is no change
        />
      </DropdownWrapper>
      <TitleBox>
        <p>요리정보</p>
      </TitleBox>
      <DropdownWrapper cookinfo>
        <CookInfo>인원</CookInfo>
        <Dropdown
          placeholder="선택"
          options={["선택", "1인분", "2인분", "3인분", "4인분", "5인분", "6인분이상"]}
          // value="one"
          onChange={(value) => console.log("change!", value)}
          onSelect={(value) => console.log("selected!", value)} // always fires once a selection happens even if there is no change
        />
      </DropdownWrapper>
      <DropdownWrapper cookinfo>
        <CookInfo>시간</CookInfo>
        <Dropdown
          placeholder="선택"
          options={["선택", "5분이내", "10분이내", "15분이내", "30분이내", "60분이내", "1시간이상"]}
          // value="one"
          onChange={(value) => console.log("change!", value)}
          onSelect={(value) => console.log("selected!", value)} // always fires once a selection happens even if there is no change
        />
      </DropdownWrapper>
      <DropdownWrapper cookinfo>
        <CookInfo>난이도</CookInfo>
        <Dropdown
          placeholder="선택"
          options={["선택", "아무나", "초급", "중급", "고급", "신의경지"]}
          // value="one"
          onChange={(value) => console.log("change!", value)}
          onSelect={(value) => console.log("selected!", value)} // always fires once a selection happens even if there is no change
        />
      </DropdownWrapper>
      <TitleBox>
        <p>재료</p>
      </TitleBox>

      <RecoilRoot>
        <IngredientList />
        <AddIngredinet />
      </RecoilRoot>

      <TitleBox>
        <p>양념</p>
      </TitleBox>

      <RecoilRoot>
        <SourceList />
        <AddSource />
      </RecoilRoot>

      <TitleBox>
        <p>요리순서</p>
      </TitleBox>
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
