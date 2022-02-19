import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import * as S from "./AuthStyle";
import { useUserActions } from "../../actions";
import { useRecoilValue } from "recoil";
import { authAtom } from "../../states";

const { Kakao } = window;

const LoginFormBlock = styled.form`
  display: flex;
  flex-direction: column;
  position: relative;
`;
const KakaoImg = styled.a`
  /* width: 38px; */
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

  // 렌더링 횟수 및 에러확인
  console.log("랜더링");
  console.log(errors);
  const REST_API_KEY = "0734499ca487a114ff01aed588ab068c";
  const REDIRECT_URI = `${process.env.REACT_APP_API_URL}/oauth/kakao/callback`;
  const KAKAO_AUTH_URL = `${process.env.REACT_APP_API_URL}/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  return (
    <LoginFormBlock onSubmit={handleSubmit(onSubmit)}>
      <S.StyledInput placeholder="아이디" {...register("email", { required: true })} />
      {errors.email?.type === "required" && (
        <S.ErrorText loginError>아이디를 입력해주세요.</S.ErrorText>
      )}

      <S.StyledInput
        type="password"
        placeholder="비밀번호"
        {...register("password", { required: true })}
      />
      {errors.password?.type === "required" && (
        <S.ErrorText loginError>비밀번호를 입력해주세요.</S.ErrorText>
      )}

      <S.StyledButton type="submit">로그인</S.StyledButton>

      <S.CenterLink to="/register">
        <S.StyledDiv login>회원가입</S.StyledDiv>
        <S.StyledHr login />
      </S.CenterLink>

      <S.DivWrapper>
        <S.StyledDiv easyLogin>간편 로그인</S.StyledDiv>
        <S.StyledHr easyLogin />
      </S.DivWrapper>
      <KakaoImg href={KAKAO_AUTH_URL}>
        <img src={`${process.env.PUBLIC_URL}/images/kakao_login_medium_narrow.png`} />
      </KakaoImg>
    </LoginFormBlock>
  );
};

export default LoginForm;
