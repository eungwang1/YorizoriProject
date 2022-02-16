import React from "react";
import styled from "styled-components";

import Buttons from "./Buttons";
import Postzone from "./Postzone";
import TopNav_main from "../nav/TopNav_main";
import BottomNav from "../nav/BottomNav";
import Modal from "./Modal";

import { useRecoilValue } from "recoil";
import { randomButtonState } from "../../states/ViewAllAtom";

const ViewAll = () => {
  const randomButton = useRecoilValue(randomButtonState);

  return (
    <ViewAllBlock>
      {randomButton && <Modal />}
      <TopNav_main />
      <Content>
        <Buttons />
        <Postzone />
      </Content>
      <BottomNav />
    </ViewAllBlock>
  );
};

export default ViewAll;

const ViewAllBlock = styled.div`
  font-size: 18px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
`;
const Content = styled.div`
  margin-top: 80px;
  margin-bottom: 90px;
`;
