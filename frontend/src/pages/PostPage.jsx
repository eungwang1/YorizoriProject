import React from "react";
import { RecoilRoot } from "recoil";
import styled, { css } from "styled-components";
import PostForm from "../Components/post/PostForm";
import { modalStateAtom } from "../Components/post/CookOrderForm/_Atom";
import { useRecoilValue, useSetRecoilState, atom } from "recoil";

const PostPageBlock = styled.div``;

const PostPage = () => {
  const modalState = useRecoilValue(modalStateAtom);
  return (
    <PostPageBlock>
      <PostForm></PostForm>
    </PostPageBlock>
  );
};

export default PostPage;
