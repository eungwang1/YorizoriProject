import React from "react";
import styled from "styled-components";

import Buttons from "./Buttons";
import Postzone from "./Postzone";
import PostzoneByRecent from "./PostzoneByRecent";
import TopNav_main from "../nav/TopNav_main";
import BottomNav from "../nav/BottomNav";
import Modal from "./Modal";
import ScrollToTopButton from "../nav/ScrollToTopButton";

import { useRecoilValue } from "recoil";
import { randomButtonState, randomPostState, sortState } from "../../states/ViewAllAtom";
import CategoryDropdown from "./CategoryDropDown";

const ViewAll = () => {
  const randomButton = useRecoilValue(randomButtonState);
  const randomPost = useRecoilValue(randomPostState);
  const famousOrRecentCondition = useRecoilValue(sortState);

  return (
    <ViewAllBlock>
      {randomButton && randomPost && <Modal />}
      <TopNav_main />
      <Content>
        <Buttons />
        <CategoryDropdown></CategoryDropdown>
        {famousOrRecentCondition === "famous" ? <Postzone /> : <PostzoneByRecent />}
      </Content>
      <ScrollToTopButton />
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
