import React from "react";
import styled from "styled-components";
import PostForm from "../Components/post/PostForm";

const PostPageBlock = styled.div``;

const PostPage = () => {
  return (
    <PostPageBlock>
      <PostForm></PostForm>
    </PostPageBlock>
  );
};

export default PostPage;
