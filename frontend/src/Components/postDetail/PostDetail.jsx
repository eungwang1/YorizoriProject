import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import TopNav from "../nav/TopNav";
import BottomNav from "../nav/BottomNav";
import Summary from "./Summary";
import Ingredient from "./Ingredient";
import Recipe from "./Recipe";
import Comments from "./Comments";
import Recommend from "./Recommend";
import axios from "axios";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { detailDataAtom } from "../../states/detail";

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
const PostDetail = () => {
  const location = useLocation();
  const setDetailData = useSetRecoilState(detailDataAtom);
  const detailData = useRecoilValue(detailDataAtom);

  useEffect(() => {
    const _id = location.pathname.substring(
      location.pathname.indexOf("detail/") + "detail/".length
    );
    console.log(_id);
    const getProcessData = async () => {
      const { data } = await axios.get(`/post/${_id}`);
      console.log(data);
      setDetailData(data);
    };
    getProcessData();
  }, []);

  return (
    <PostDetailBlock>
      <TopNav />
      <Content>
        <Summary data={detailData} />
        <Line />
        <Ingredient data={detailData} />
        <Line />
        <Recipe data={detailData} />
        <Line />
        <Comments />
        <Line />
        <Recommend />
      </Content>
      <BottomNav />
    </PostDetailBlock>
  );
};

export default PostDetail;
