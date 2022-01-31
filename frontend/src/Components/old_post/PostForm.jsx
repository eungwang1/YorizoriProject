import React, { useState } from "react";
import styled, { css } from "styled-components";
import IngredientList from "./IngredientForm/IngredientList";
import AddIngredinet from "./IngredientForm/AddIngredinet";
import AddSource from "./SourceForm/AddSource";
import SourceList from "./SourceForm/SourceList";
import AddOrder from "./CookOrderForm/AddOrder";
import CookOrderList from "./CookOrderForm/CookOrderList";
import { ContentText, ImgBox, ImgWrapper, StyledBtn, StyledBtnWrapper } from "./PostStyle";
import Category from "./CategoryForm/Category";
import CookInfomation from "./CookInfoForm/CookInfomation";
import AlbumForm from "./AlbumForm/AlbumForm";
import NavBottom from "../nav/BottomNav";
import TopNav from "../nav/TopNav";
import { useRecoilValue, useSetRecoilState, atom } from "recoil";
import { recipeNameAtom, descAtom } from "./postStates/postStates";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import FileUpload from "@mimoid-prog/react-file-upload";
import TimeModal from "./CookOrderForm/TimeModal";
import { modalStateAtom } from "./CookOrderForm/_Atom";
import {
  categoryAtom,
  conditionAtom,
  materialAtom,
  cookAtom,
  servingsAtom,
  timeAtom,
  difficAtom,
} from "./postStates/postStates";

const PostFormBlock = styled.form`
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  margin-top: 55px;
  margin-bottom: 80px;
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

const PostForm = () => {
  const category = useRecoilValue(categoryAtom);
  const condition = useRecoilValue(conditionAtom);
  const material = useRecoilValue(materialAtom);
  const cook = useRecoilValue(cookAtom);
  const servings = useRecoilValue(servingsAtom);
  const time = useRecoilValue(timeAtom);
  const diffic = useRecoilValue(difficAtom);

  const modalState = useRecoilValue(modalStateAtom);
  const setModalState = useSetRecoilState(modalStateAtom);

  const methods = useForm();
  const { register, handleSubmit } = methods;

  //이미지 데이터 확인
  let mainImg;
  const handleChange = (data) => {
    if (data) {
      mainImg = data["value"];
    }
  };

  // 폼 데이터 확인
  const onSubmit = (data) => {
    const newList = {
      ...data,
      category: category,
      condition: condition,
      material: material,
      cook: cook,
      serving: servings,
      time: time,
      diffic: diffic,
      mainImg: mainImg,
    };
    console.log(newList);
  };

  return (
    <FormProvider {...methods}>
      <TimeModal />
      <PostFormBlock onSubmit={handleSubmit(onSubmit)} modalState={modalState}>
        <TopNav />
        <TitleBox>
          <p>레시피 제목</p>
        </TitleBox>
        <TitleInput
          placeholder="예) 소고기 미역국 끓이기"
          {...register("recipeName", { required: true })}
        />

        <ImgBox>
          <ImgWrapper big>
            <FileUpload name="photo0" shape="rounded" size="big" onChange={handleChange} />
          </ImgWrapper>
        </ImgBox>

        <TitleBox>
          <p>요리소개</p>
        </TitleBox>
        <ContentText
          {...register("desc", { required: true })}
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
        <AlbumForm />
        <TitleBox>
          <p>팁/주의사항</p>
        </TitleBox>
        <ContentText tip placeholder="예) 소고기 미역국 끓이기"></ContentText>
        <TitleBox>
          <p>태그</p>
        </TitleBox>
        <TagInfo>
          주재료, 목적, 효능, 대상 등을 쉼표(,)를 사용하여 태그로 남겨주세요. 예) 돼지고기,
          다이어트, 비만, 칼슈므 감기예방
        </TagInfo>
        <ContentText tag placeholder="예) 돼지고기, 다이어트, 비만, 캄슘, 감기예방"></ContentText>
        <StyledBtnWrapper>
          <StyledBtn type="submit">글 작성하기</StyledBtn>
        </StyledBtnWrapper>
      </PostFormBlock>

      <NavBottom post />
    </FormProvider>
  );
};

export default PostForm;
