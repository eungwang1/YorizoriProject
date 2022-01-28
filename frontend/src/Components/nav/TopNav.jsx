import React from "react";
import styled from "styled-components";

const TopNavBlock = styled.div`
  height: 80px;
  width: 100vh;
  position: absolute;
  top: 0;
  background-color: red;
  height: 80px;
`;

const TopNav = () => {
  return <TopNavBlock></TopNavBlock>;
};

export default TopNav;
