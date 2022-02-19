import React from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

const TopNavMainBox = styled.div`
  height: 80px;
  width: 100%;
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

const PostNav = () => {
  return (
    <TopNavMainBox>
      <Link to="/">
        <TopNavMainLogo src="../images/onlylogo.png" alt="arrow.png" />
      </Link>
    </TopNavMainBox>
  );
};

export default PostNav;
