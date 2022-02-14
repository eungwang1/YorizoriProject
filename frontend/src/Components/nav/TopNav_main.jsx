import React from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import SearchBar from "../nav/SearchBar";

const TopNavMainBox = styled.div`
  height: 80px;
  width: 100%;
  position: fixed;
  display: flex;
  top: 0;
  background-color: white;
  border-bottom: 5px solid rgba(255, 210, 136, 0.46);
  z-index: 900;
`;

const TopNavMainLogo = styled.img`
  position: relative;
  width: 54px;
  left: 12px;
  top: 12px;
`;
const TopNavMainInput = styled.input`
  position: relative;
  top: 30px;
  font-size: 16px;
  left: 30px;
  width: 220px;
  height: 20px;
  outline: none;
  bottom: 10px;
  border: none;
  border-bottom: solid 2px #feae11;
  color: #999999;
`;
const SearchButton = styled.button`
  background-color: transparent;
  background-image: url("./images/search.png");
  background-size: cover;
  border: none;
  position: absolute;
  width: 25px;
  height: 25px;
  right: 20px;
  top: 25px;
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
