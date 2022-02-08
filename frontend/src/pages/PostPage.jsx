import React, { useEffect } from "react";
import styled from "styled-components";
import PostForm from "../Components/post/PostForm";
import { pageStateAtom } from "../states";
import { useSetRecoilState } from "recoil";
const PostPageBlock = styled.div``;

const PostPage = () => {
  const setPageState = useSetRecoilState(pageStateAtom);
  useEffect(() => {
    setPageState("post");
    return () => {
      setPageState("");
    };
  }, []);
  return (
    <PostPageBlock>
      <PostForm></PostForm>
    </PostPageBlock>
  );
};

export default PostPage;
