import React, { useEffect } from "react";
import styled from "styled-components";
import PostForm from "../Components/postAmend/PostForm";
import { pageStateAtom } from "../states";
import { useSetRecoilState } from "recoil";

const PostAemdPageBlock = styled.div``;

const PostAemdPage = () => {
  const setPageState = useSetRecoilState(pageStateAtom);
  useEffect(() => {
    setPageState("post");
    return () => {
      setPageState("");
    };
  }, []);
  return (
    <PostAemdPageBlock>
      <PostForm></PostForm>
    </PostAemdPageBlock>
  );
};

export default PostAemdPage;
