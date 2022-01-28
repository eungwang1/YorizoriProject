import React from "react";
import styled from "styled-components";

const TopNavMainBlock = styled.div`
  height: 80px;
  width: 100%;
  position: fixed;
  display: flex;
  top: 0;
  background-color: red;
`;

const TopNav_main = () => {
  return <TopNavMainBlock></TopNavMainBlock>;
};

export default TopNav_main;
