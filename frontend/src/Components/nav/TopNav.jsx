import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { use } from "react-dom";
const TopNavBox = styled.div`
  height: 50px;
  width: 100%;
  position: fixed;
  display: flex;
  align-items: center;
  top: 0;
  background-color: white;
  border-bottom: 5px solid rgba(255, 210, 136, 0.46);
  z-index: 900;
  padding: 0 12px;
`;

const TopBackBox = styled.img`
  color: ${(props) => props.theme.mainColor};
  font-size: 24px;
`;

const Title = styled.h1`
  font-size: 18px;
  margin-left: 24px;
  color: ${(props) => props.theme.mainColor};
`;

const TopNav = ({ title }) => {
  let navigate = useNavigate();
  return (
    <TopNavBox>
      <TopBackBox
        src={process.env.PUBLIC_URL + "../../images/arrow.png"}
        alt="arrow.png"
        onClick={() => navigate(-1)}
      ></TopBackBox>
      <Title>{title}</Title>
    </TopNavBox>
  );
};

export default TopNav;
