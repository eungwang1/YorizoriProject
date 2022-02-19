import React from "react";
import styled from "styled-components";
import Headers from "../Components/auth/Header";
import LoginForm from "../Components/auth/LoginForm";

const LoginPageBlock = styled.div`
  font-size: 18px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const LoginPage = () => {
  return (
    <LoginPageBlock>
      <Headers />
      <LoginForm />
    </LoginPageBlock>
  );
};

export default LoginPage;
