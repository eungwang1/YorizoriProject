import React from "react";
import styled from "styled-components";
import Buttons from "../Components/viewAll/Buttons";
import Postzone from "../Components/viewAll/Postzone";
import TopNav_main from "../Components/nav/TopNav_main";
import BottomNav from "../Components/nav/BottomNav";

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
      <TopNav_main />
      <div style={{ marginTop: "80px", paddingBottom: "90px" }}>
        <Buttons />
        <Postzone />
      </div>
      <BottomNav />
    </ViewAllPageBlock>
  );
};

export default ViewAllPage;
