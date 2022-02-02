import React from "react";
import styled from "styled-components";
import PostTemplete from "./PostTemplete";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { pageStateAtom, MainImageStateAtom } from "./PostAtom/PostAtom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import PostStepOne from "./PostStepOne/PostStepOne";
import PostStepTwo from "./PostStepTwo/PostStepTwo";
import PostStepThree from "./PostStepThree/PostStepThree";
import PostStepFour from "./PostStepFour/PostStepFour";

const PostFormBlock = styled.form``;

const PostForm = () => {
  const pageState = useRecoilValue(pageStateAtom);
  const mainImage = useRecoilValue(MainImageStateAtom);
  const methods = useForm();
  const formData = new FormData();
  const onSubmit = (data) => {
    console.log(data);
    formData.append("mainImage", mainImage.file);
    console.log(mainImage.file);
  };
  return (
    <FormProvider {...methods}>
      <PostFormBlock onSubmit={methods.handleSubmit(onSubmit)}>
        <button type="submit">테스트으으으</button>
        {pageState === 1 ? (
          <PostStepOne></PostStepOne>
        ) : pageState === 2 ? (
          <PostStepTwo></PostStepTwo>
        ) : pageState === 3 ? (
          <PostStepThree></PostStepThree>
        ) : pageState === 4 ? (
          <PostStepFour></PostStepFour>
        ) : (
          <PostStepOne></PostStepOne>
        )}
      </PostFormBlock>
    </FormProvider>
  );
};

export default PostForm;