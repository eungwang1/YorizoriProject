import React, { useState, useRef } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useUserActions } from "../../actions";
import {
  StyledButton,
  StyledInput,
  ToggleEyeImg,
  InputImgWrapper,
  InputLabel,
  ErrorText,
  StyledDiv,
  DivWrapper,
  StyledHr,
} from "./AuthStyle";

const RegisterFormBlock = styled.form`
  display: flex;
  flex-direction: column;
  position: relative;
  justify-content: center;
  align-items: center;
`;

const KakaoImg = styled.img`
  margin-top: 8px;
`;

const RegisterForm = () => {
  const userActions = useUserActions();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // 폼 데이터 확인
  const onSubmit = ({ email, nickName, password }) => {
    return userActions.register(email, nickName, password);
  };
  // 렌더링 횟수 및 에러확인
  console.log("랜더링");
  console.log(errors);

  const password = useRef({});
  password.current = watch("password", "");

  return (
    <RegisterFormBlock onSubmit={handleSubmit(onSubmit)}>
      <InputLabel htmlFor="email">이메일</InputLabel>
      <StyledInput
        placeholder="elice@naver.com"
        id="email"
        {...register("email", {
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            errors: "이메일 형식에 맞게 입력해주세요",
          },
          required: true,
        })}
      />
      {errors.email?.type === "pattern" && <ErrorText>이메일 형식이 올바르지 않습니다.</ErrorText>}
      {errors.email?.type === "required" && <ErrorText>이메일을 입력해주세요.</ErrorText>}

      <InputLabel htmlFor="name">닉네임</InputLabel>
      <StyledInput
        {...register("nickName", {
          minLength: 2,
          required: true,
        })}
        placeholder="요리조리"
        type="text"
        id="name"
      />
      {errors.nickName?.type === "required" && <ErrorText>닉네임을 입력해주세요.</ErrorText>}
      {errors.nickName?.type === "minLength" && (
        <ErrorText>닉네임은 최소 2글자 이상 입력해주세요.</ErrorText>
      )}

      <InputLabel htmlFor="password">비밀번호</InputLabel>
      <StyledInput
        {...register("password", {
          minLength: 8,
          required: true,
        })}
        placeholder="********"
        id="password"
        type="password"
      />
      {errors.password?.type === "required" && <ErrorText>비밀번호를 입력해주세요.</ErrorText>}
      {errors.password?.type === "minLength" && (
        <ErrorText>비밀번호는 최소 8글자 이상 입력해주세요.</ErrorText>
      )}

      <InputLabel htmlFor="passwordCheck">비밀번호 확인</InputLabel>
      <StyledInput
        {...register("passwordCheck", {
          required: true,
          validate: (value) => value === password.current || "비밀번호가 일치하지 않습니다.",
        })}
        type="password"
        placeholder="********"
      />
      {errors.passwordCheck?.type === "required" && (
        <ErrorText>비밀번호 확인을 입력해주세요.</ErrorText>
      )}
      {errors.passwordCheck?.type === "validate" && (
        <ErrorText>비밀번호가 일치하지 않습니다.</ErrorText>
      )}

      <StyledButton>회원가입</StyledButton>
    </RegisterFormBlock>
  );
};

export default RegisterForm;
