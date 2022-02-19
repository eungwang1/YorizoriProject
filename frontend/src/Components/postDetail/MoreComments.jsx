import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { userIdAtom } from "../../states";
import { commentAtom } from "../../states/comment";
import TopNav from "../nav/TopNav";
import { MemoizeComment as Comment } from "./Comment";
import ReplyComment from "./ReplyComment";
import { isLoadingAtom, messageAtom, toastAtom } from "./toastAtom";

function MoreComments() {
  const [comments, setComments] = useRecoilState(commentAtom);
  console.log("It's more comments", comments);
  const isLogin = useRecoilValue(userIdAtom);
  const { postId } = useParams();
  const url = `/api/comment/${postId}/detail`;
  // const [myComments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useRecoilState(isLoadingAtom);
  const [newComment, setNewComment] = useState("");
  const [toastStatus, setToastStatus] = useRecoilState(toastAtom);
  const [toastMessage, setToastMessage] = useRecoilState(messageAtom);

  useEffect(() => {
    (async () => {
      const { data } = await axios(`${url}`);
      setComments(data.comments);
      setIsLoading(false);
    })();
    if (toastStatus) {
      setTimeout(() => setToastStatus(false), 1000);
    }
  }, [toastStatus, isLoading]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/comment", { postId, comment: newComment });
      setNewComment("");
      setToastStatus(true);
      setToastMessage("댓글이 등록되었습니다.");
      setIsLoading(true);
    } catch (err) {
      console.error(err);
      setNewComment("");
      setToastStatus(true);
      setToastMessage(err);
    }
  };

  const changeHandler = ({ target: { value } }) => {
    setNewComment(value);
  };

  const onKeyPress = (e) => {
    if (e.key == "Enter") {
      submitHandler(e);
    }
  };

  return (
    <>
      <TopNav title="댓글" />
      <Wrapper>
        {!isLoading &&
          comments.map((comment, index) => {
            const isAuth = comment.userId.id === isLogin;
            return (
              !comment.parentComment && (
                <React.Fragment key={index}>
                  <Comment
                    key={comment._id}
                    comment={{ ...comment }}
                    isMore={true}
                    isAuth={isAuth}
                    postId={postId}
                  />
                  <ReplyComment
                    key={comment._id + index}
                    commentList={comments}
                    parentCommentId={comment._id}
                    postId={postId}
                  />
                </React.Fragment>
              )
            );
          })}
      </Wrapper>
      <MyForm onSubmit={submitHandler}>
        <input
          onKeyDown={onKeyPress}
          onChange={changeHandler}
          value={newComment}
          placeholder="댓글을 남겨주세요 😊"
          type="text"
        />
        <button>등록</button>
      </MyForm>
    </>
  );
}

const Wrapper = styled.div`
  padding: 55px 12px 53px;
`;

const MyForm = styled.form`
  width: 100%;
  position: fixed;
  bottom: 0;
  display: flex;
  & > input {
    flex: 1;
    height: 38px;
    padding-left: 8px;
    border: none;
    border-top: 1px solid #dcdde1;
    &:focus {
      border: 1px solid #e1b12c;
    }
  }
  & > button {
    flex-basis: 50px;
    background-color: ${(props) => props.theme.mainColor};
    border: 1px solid #e1b12c;
  }
`;

export default MoreComments;
