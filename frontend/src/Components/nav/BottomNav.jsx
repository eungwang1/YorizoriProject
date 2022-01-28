import React from "react";
import styled, { css } from "styled-components";

const BottomNavBlock = styled.div`
  height: 80px;
  width: 100%;
  position: fixed;
  bottom: 0;
  display: flex;
  // flex-direction: row;
  border-top: 1px solid #c5c5c5;
`;

const IconImg = styled.div`
  width: 12.5vh;

  background-image: url(../images/BottomIcon.png);
  ${(props) =>
    props.write &&
    css`
      background-color: white;
      background-position: -30px -15px;
      :hover {
        background-position: -30px 94px;
      }
    `}

  ${(props) =>
    props.home &&
    css`
      background-color: white;
      background-position: -111px -15px;
      :hover {
        background-position: -111px 94px;
      }
    `}
  ${(props) =>
    props.recipe &&
    css`
      background-color: white;
      background-position: -205px -15px;
      :hover {
        background-position: -205px 94px;
      }
    `}
    ${(props) =>
    props.my &&
    css`
      background-color: white;
      background-position: -294px -15px;
      :hover {
        background-position: -294px 94px;
      }
    `}
`;

const BottomNav = () => {
  return (
    <BottomNavBlock>
      <IconImg write />
      <IconImg home />
      <IconImg recipe />
      <IconImg my />
    </BottomNavBlock>
  );
};

export default BottomNav;
