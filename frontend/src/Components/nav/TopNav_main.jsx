import React from "react";
import styled from "styled-components";

const TopNav_mainBlock = styled.div`
  height: 80px;
  width: 100vh;
  position: absolute;
  top: 0;
  background-color: red;
  height: 80px;
`;

const TopNav_main = () => {
  return <TopNav_mainBlock></TopNav_mainBlock>;
};

export default TopNav_main;
