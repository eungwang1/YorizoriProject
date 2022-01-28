import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const TopNavMainBox = styled.div`
  height: 80px;
  width: 100%;
  position: fixed;
  display: flex;
  top: 0;
  background-color: white;
  border-bottom: 5px solid rgba(255,210,136, .46);
`

const TopNavMainLogo = styled.img`
  position: relative;
  width: 54px;
  left: 12px;
  top: 12px;
`
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
  border-bottom: solid 2px;
  color: #FEAE11;
`



const TopNavMain = () => {
  return (
    <TopNavMainBox>
      <Link to="/">
          <TopNavMainLogo src="../images/onlylogo.png" alt="arrow.png"></TopNavMainLogo>
      </Link>
      <TopNavMainInput placeholder="검색어"></TopNavMainInput>
    </TopNavMainBox>
  )

};

export default TopNavMain;