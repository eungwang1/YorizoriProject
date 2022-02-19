import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import TopNav from "../nav/TopNav";
import BottomNav from "../nav/BottomNav";
import ScrollToTopButton from "../nav/ScrollToTopButton";
import Summary from "./Summary";
import Ingredient from "./Ingredient";
import Recipe from "./Recipe";
import Comments from "./Comments";
import Recommend from "./Recommend";
import axios from "axios";
import { useRecoilState, useRecoilValue } from "recoil";
import { detailDataAtom, delAndAmendBtnStateAtom } from "../../states/detail";
import { Watch } from "react-loader-spinner";
import { Loading } from "../home/ariticleTemplateWithOneSlide";
import { userIdAtom } from "../../states";

const PostDetail = () => {
  const [detailData, setDetailData] = useRecoilState(detailDataAtom);
  const [delAndAmendBtnState, setDelAndAmendBtnState] = useRecoilState(delAndAmendBtnStateAtom);
  const isLogin = useRecoilValue(userIdAtom);
  const { postId } = useParams();
  useEffect(() => {
    const getProcessData = async () => {
      try {
        const { data } = await axios.get(`/api/post/${postId}`);
        if (isLogin)
          await axios.post("/api/history", {
            postId,
          });
        setDetailData(data);
      } catch (e) {
        console.error(e);
      }
    };
    getProcessData();
  }, []);

  if (!detailData) {
    return (
      <Loading>
        <Watch ariaLabel="loading-indicator" color="#d45500" />
      </Loading>
    );
  }

  return (
    <PostDetailBlock>
      {delAndAmendBtnState && (
        <Dimmed
          onClick={() => {
            setDelAndAmendBtnState(false);
          }}
        />
      )}
      <TopNav />
      <Content>
        <Summary data={detailData} postId={postId} />
        <Line />
        <Ingredient data={detailData} />
        <Line />
        <Recipe data={detailData} />
        <Line />
        <Comments />
        <Line />
        <Recommend data={detailData} />
      </Content>
      <ScrollToTopButton />
      <BottomNav />
    </PostDetailBlock>
  );
};

export default PostDetail;

const Dimmed = styled.div`
  width: 100vw;
  height: 3000px;
  position: absolute;
`;

const PostDetailBlock = styled.div`
  font-size: 18px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Content = styled.div`
  width: 360px;
  margin-top: 50px;
  margin-bottom: 90px;
`;
const Line = styled.div`
  width: 360px;
  height: 10px;
  background-color: rgba(0, 0, 0, 0.14);
`;
