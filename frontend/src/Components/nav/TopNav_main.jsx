import React from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import SearchBar from "../nav/SearchBar";

const TopNavMainBox = styled.div`
  height: 80px;
  width: 100%;
  position: fixed;
  display: flex;
  justify-content: space-between;
  top: 0;
  background-color: white;
  border-bottom: 5px solid rgba(255, 210, 136, 0.46);
  z-index: 900;
`;

const TopNavMainLogo = styled.img`
  position: relative;
  width: 54px;
  top: 12px;
  margin: 0 12px 0 12px;
  // left: 12px;
  // top: 12px;
`;
const TopNavMain = () => {
  return (
    <TopNavMainBox>
      <Link to="/">
        <TopNavMainLogo src="../images/onlylogo.png" alt="arrow.png" />
      </Link>
      <SearchBar placeholder="검색어"></SearchBar>
    </TopNavMainBox>
  );
};

export default TopNavMain;
