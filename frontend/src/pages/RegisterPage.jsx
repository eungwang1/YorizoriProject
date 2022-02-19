import React from "react";
import styled from "styled-components";
import RegisterForm from "../Components/auth/RegisterForm";
import Headers from "../Components/auth/Header";

const RegisterPageBlock = styled.div`
  font-size: 18px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const RegisterPage = () => {
  return (
    <RegisterPageBlock>
      <Headers />
      <RegisterForm />
    </RegisterPageBlock>
  );
};

export default RegisterPage;
