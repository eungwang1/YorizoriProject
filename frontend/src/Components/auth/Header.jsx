import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const AuthTemplateBlock = styled.div`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
`;

const LogoImageBox = styled.img`
  width: 215px;
  height: 143px;
`;

const ArrowImageBox = styled.img`
  position: absolute;
  left: 10px;
  top: 20px;
`;

const AuthTemplate = () => {
  return (
    <AuthTemplateBlock>
      <Link to="/">
        <ArrowImageBox src="./images/arrow.png" alt="arrow.png"></ArrowImageBox>
      </Link>
      <Link to="/">
        <LogoImageBox src="./images/logo_login.png" alt="logo.png"></LogoImageBox>
      </Link>
    </AuthTemplateBlock>
  );
};
export default AuthTemplate;
