import React from "react";
import styled from "styled-components";
import Buttons from "../Components/viewAll/Buttons";
import Postzone from "../Components/viewAll/Postzone";

const ViewAllPageBlock = styled.div`
  font-size: 18px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const ViewAllPage = () => {
  return (
    <ViewAllPageBlock>
      <Buttons />
      <Postzone />
    </ViewAllPageBlock>
  );
};

export default ViewAllPage;
