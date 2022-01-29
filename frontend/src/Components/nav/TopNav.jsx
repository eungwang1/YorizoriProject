import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { use } from "react-dom";
const TopNavBox = styled.div`
  height: 50px;
  width: 100%;
  position: fixed;
  display: flex;
  top: 0;
  background-color: white;
  border-bottom: 5px solid rgba(255, 210, 136, 0.46);
  z-index: 900;
`;

const TopBackBox = styled.img`
  color: #fcad2c;
  font-size: 24px;
  position: absolute;
  left: 12px;
  top: 14px;
`;

const TopNav = () => {
  return (
    <TopNavBox>
      <Link to="/">
        <TopBackBox src="../images/arrow.png" alt="arrow.png"></TopBackBox>
      </Link>
    </TopNavBox>
  );
};

export default TopNav;
