import React, { userRef, useState, useCallback, useMemo, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";

const SloganWrapper = styled.div`
  width: 100%;
  height: 200px;
  z-index: 10;
  margin-top: 80px;
  position: relative;
`;

const SloganBackground = styled.div`
  position: relative;
  border-radius: 10px 0 0 10px;
  height: 200px;
  background-color: #fffcf4;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  right : 0
  z-index: 100;
`;

const SloganTitle = styled.div`
  background-image: url("../images/onlytitle.png");
  background-size: contain;
  background-repeat: no-repeat;
  width: 200px;
  height: 60px;
  margin-right: 100px;
  border: 0;
  z-index: 1000;
`;

const SloganBody = styled.p`
  // font-size:1.5rem;
  font-size: 2.5rem;
  font-family: "Dongle", sans-serif;
  font-weight: 400;
  color: #ffbd73;
  height:50px
  line-height: 50px;
  margin: 0 0 0 70px;
`;
const SloganContents = styled.p`
  font-size: 0.8rem;
  color: #646464;
  line-height: 30px;
  margin: 5px 0 0 0;
  padding: 0;
`;

const Slogan = () => {
  return (
    <SloganWrapper>
      <SloganBackground>
        <SloganTitle></SloganTitle>
        <SloganBody>직접 만드는 즐거움</SloganBody>
        <SloganContents>다양한 레시피를 확인하고 여러분만의 레시피를 공유해보세요</SloganContents>
      </SloganBackground>
    </SloganWrapper>
  );
};

export default Slogan;
