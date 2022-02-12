import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  StyledButton,
  StyledInput,
  ErrorText,
  StyledDiv,
  CenterLink,
  StyledHr,
  DivWrapper,
} from "./AuthStyle";
import { useUserActions } from "../../actions";
import { useRecoilValue } from "recoil";
import { authAtom } from "../../states";
import swal from "sweetalert";

const LoginFormBlock = styled.form`
  display: flex;
  flex-direction: column;
  position: relative;
`;
const KakaoImg = styled.img`
  width: 38px;
  margin: 10px auto 0px auto;
`;

const LoginForm = () => {
  // 폼을 만들기 위한 여러가지 요소 불러오기
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // 로그인 상태 가져오기.
  const auth = useRecoilValue(authAtom);
  const userActions = useUserActions();

  // 폼 데이터 확인
  const onSubmit = ({ email, password }) => {
    return userActions.login(email, password);
  };

  const kakaoLogin = () => {};

  // 렌더링 횟수 및 에러확인
  console.log("랜더링");
  console.log(errors);

  return (
    <LoginFormBlock onSubmit={handleSubmit(onSubmit)}>
      <StyledInput placeholder="아이디" {...register("email", { required: true })} />
      {errors.email?.type === "required" && (
        <ErrorText loginError>아이디를 입력해주세요.</ErrorText>
      )}

      <StyledInput
        type="password"
        placeholder="비밀번호"
        {...register("password", { required: true })}
      />
      {errors.password?.type === "required" && (
        <ErrorText loginError>비밀번호를 입력해주세요.</ErrorText>
      )}

      <StyledButton type="submit">로그인</StyledButton>

      <CenterLink to="/register">
        <StyledDiv login>회원가입</StyledDiv>
        <StyledHr login />
      </CenterLink>

      <DivWrapper>
        <StyledDiv easyLogin>간편 로그인</StyledDiv>
        <StyledHr easyLogin />
      </DivWrapper>
      <KakaoImg onClick={userActions.kakaoLogin} src="./images/kakao.png" />
    </LoginFormBlock>
  );
};

export default LoginForm;
