import React, { useRef } from "react";
import styled from "styled-components";
import PostTemplete from "./PostTemplete";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import {
  postPageStateAtom,
  MainImageStateAtom,
  SubImageStateAtom,
  categoryAtom,
  cookInfoAtom,
} from "./PostAtom/PostAtom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import PostStepOne from "./PostStepOne/PostStepOne";
import PostStepTwo from "./PostStepTwo/PostStepTwo";
import PostStepThree from "./PostStepThree/PostStepThree";
import PostStepFour from "./PostStepFour/PostStepFour";
import { Invalidation } from "./util/Invalidation.jsx";
import axios from "axios";

const PostFormBlock = styled.form``;
document.addEventListener(
  "keydown",
  function (event) {
    if (event.keyCode === 13) {
      event.preventDefault();
    }
  },
  true
);

const PostForm = () => {
  const [postPageState, setPostpostPageState] = useRecoilState(postPageStateAtom);
  const mainImage = useRecoilValue(MainImageStateAtom);
  const cookInfo = useRecoilValue(cookInfoAtom);
  const category = useRecoilValue(categoryAtom);
  const subImage = useRecoilValue(SubImageStateAtom);

  const methods = useForm();
  const formData = new FormData();

  const onSubmit = async (data) => {
    mainImage.file.map((el) => {
      formData.append("mainImg", el);
    });
    subImage.file.map((el, idx) => {
      if (el) {
        return formData.append(`subImg_${idx}`, el);
      }
    });
    let ingredient = [];
    let seasoning = [];
    let process = [];
    let process_el;
    let ingre_el;
    let seasoning_el;
    let time;
    for (let [key, value] of Object.entries(data)) {
      // ingredient
      if (key.indexOf("ingredient_") > -1) {
        ingre_el = new Object({
          ingre_name: "",
          ingre_count: "",
        });
        ingre_el.ingre_name = value;
      }
      if (key.indexOf("ingredientVolume_") > -1) {
        ingre_el.ingre_count = value;
        ingredient.push(ingre_el);
      }

      // seasoning
      if (key.indexOf("source_") > -1) {
        seasoning_el = new Object({
          ingre_name: "",
          ingre_count: "",
        });
        seasoning_el.ingre_name = value;
      }
      if (key.indexOf("sourceVolume_") > -1) {
        seasoning_el.ingre_count = value;
        seasoning.push(seasoning_el);
      }

      // process
      if (key.indexOf("order_") > -1) {
        process_el = new Object({
          txt: "",
          process_time: "",
        });
        process_el.txt = value;
      }
      if (key.indexOf("orderTimeMin_") > -1) {
        time = value;
      }
      if (key.indexOf("orderTimeSec_") > -1) {
        time = `${time}:${value}`;
        process_el.process_time = time;
        process.push(process_el);
      }
    }

    const filteredData = {
      desc: data.desc,
      recipeName: data.recipeName,
      ingredient: ingredient,
      seasoning: seasoning,
      process: process,
    };

    const submitData = {
      ...filteredData,
      ...cookInfo,
      ...category,
    };

    // Invalidation(submitData, setPostpostPageState);
    Invalidation(submitData, setPostpostPageState, mainImage);



    
    // 
    // try {
    //   const postData = await axios.post("/post", submitData);
    // } catch (e) {
    //   console.error(e);
    // }

    console.log(submitData);
    // console.log(formData.get("subImg_1"));
    // console.log(formData.get("subImg_2"));
    // console.log(formData.get("subImg_3"));

    // 데이터 누수를 방지하기위해 미리보기를 위해 생성한 URL 삭제.
    // subImage.preview.map((el, idx) => {
    //   if (el) {
    //     return window.URL.revokeObjectURL(el);
    //   }
    // });
    // window.URL.revokeObjectURL(mainImage.preview);
  };

  return (
    <FormProvider {...methods}>
      <PostFormBlock onSubmit={methods.handleSubmit(onSubmit)}>
        {postPageState === 1 ? (
          <PostStepOne></PostStepOne>
        ) : postPageState === 2 ? (
          <PostStepTwo></PostStepTwo>
        ) : postPageState === 3 ? (
          <PostStepThree></PostStepThree>
        ) : postPageState === 4 ? (
          <PostStepFour></PostStepFour>
        ) : (
          <PostStepOne></PostStepOne>
        )}
      </PostFormBlock>
    </FormProvider>
  );
};

export default PostForm;
