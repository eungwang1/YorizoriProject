import React, { useState, useEffect, useMemo, useRef } from "react";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import { MemoizeComment as Comment, ProfileImg } from "./Comment";
import axios from "axios";
import { userIdAtom, userImage } from "../../states";
import { useRecoilState, useRecoilValue } from "recoil";
import { commentAtom } from "../../states/comment";
import Toast from "./Toast";
import { isLoadingAtom, messageAtom, postIdAtom, toastAtom } from "./toastAtom";
import { commentScrollStateAtom } from "../../states/detail";

const Comments = () => {
  const [isLoading, setIsLoading] = useRecoilState(isLoadingAtom);
  const [comments, setComments] = useRecoilState(commentAtom);
  const commentLength = useMemo(() => comments.length, [comments]);
  const isLogin = useRecoilValue(userIdAtom);
  const userImg = useRecoilValue(userImage);
  const { postId } = useParams();
  const url = `/comment/${postId}/detail`;
  const [write, setWrite] = useState("");
  const [toastStatus, setToastStatus] = useRecoilState(toastAtom);
  const [toastMessage, setToastMessage] = useRecoilState(messageAtom);
  const [commentScrollState, setCommentScrollState] = useRecoilState(commentScrollStateAtom);
  const commentDomRef = useRef(null);
  console.log(comments);

  useEffect(() => {
    if (commentScrollState === true) {
      commentDomRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }
    setCommentScrollState(false);
  }, [commentScrollState]);

  useEffect(() => {
    // 원래 useEffect안에는 async-await을 사용하지 못하지만
    // 즉시실행함수로 함수를 만든 후 실행함으로써 해결할 수 있음
    // async를 useEffect에 그대로 전달하면 구조상 프로미스를 반환할 수 밖에 없고, 이펙트 함수에는 클린업 함수를 리턴해야한다는데
    // 리액트가 받는건 덜렁 프라미스로 대체된다고 합니다.
    (async () => {
      const { data } = await axios(`${url}`);
      setComments(data.comments);
      setIsLoading(false);
    })();
    if (toastStatus) {
      setTimeout(() => setToastStatus(false), 1000);
    }
  }, [toastStatus]);

  const onChangeHandler = (e) => {
    const {
      target: { value },
    } = e;
    setWrite(value);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/comment", { postId, comment: write });
      setWrite("");
      setToastStatus(true);
      setToastMessage("댓글이 등록되었습니다.");
      setIsLoading(true);
    } catch (err) {
      console.error(err);
      setWrite("");
      setToastStatus(true);
      setToastMessage(err);
    }
  };

  const onKeyPress = (e) => {
    if (e.key == "Enter") {
      onSubmitHandler(e);
    }
  };

  return (
    <>
      {!isLoading && (
        <>
          <Title ref={commentDomRef}>
            댓글 <Count>{commentLength}</Count>
          </Title>
          <CommentsWrapper>
            <form onSubmit={onSubmitHandler}>
              <ProfileImg isImage={userImg} />
              {!isLogin ? (
                <CommentLink to="/login">공개 댓글 추가...</CommentLink>
              ) : (
                <>
                  <AuthInput
                    value={write}
                    onChange={onChangeHandler}
                    onKeyDown={onKeyPress}
                    placeholder="공개 댓글 추가..."
                    type="text"
                  />
                  <SubmitButton comment={write}>{write ? "등록" : ""}</SubmitButton>
                </>
              )}
            </form>
            {comments
              .filter((comment) => comment.isDeleted === false)
              .slice(0, 3)
              .map((comment) => {
                console.log("Look at me", comment);
                const isAuth = comment.userId?.id === isLogin;
                return (
                  <Comment
                    key={comment._id}
                    comment={comment}
                    isMore={false}
                    isAuth={isAuth}
                    postId={postId}
                  />
                );
              })}
            {commentLength === 0 ? (
              <EmptyComment>아직 작성된 댓글이 없어요</EmptyComment>
            ) : commentLength > 3 ? (
              <More to="./comments">댓글 더보기</More>
            ) : null}
          </CommentsWrapper>
        </>
      )}
      {toastStatus && <Toast msg={toastMessage} />}
    </>
  );
};

const CommentsWrapper = styled.div`
  padding: 10px 12px 0;
  & > form {
    display: flex;
    margin-bottom: 10px;
  }
`;

export const AuthInput = styled.textarea`
  position: relative;
  flex: 1;
  border: none;
  resize: none;
  overflow: hidden;
  height: 29px;
  align-self: center;
  border-bottom: 1px solid #a5a8b126;
  &:focus {
    outline: none;
    border-bottom-color: #a5a8b1;
  }
`;

export const SubmitButton = styled.button`
  color: #fff;
  font-weight: bold;
  border-radius: 4px;
  display: ${(props) => (props.comment ? "inline" : "none")};
  height: 37px;
  background-color: ${(props) => props.theme.mainColor};
  border: none;
`;

const CommentLink = styled(Link)`
  flex: 1;
  position: relative;
  color: #a5a8b1;
  text-decoration: none;
  align-self: center;
  font-size: 13px;
  &::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: -5px;
    height: 2px;
    background-color: #a5a8b126;
  }
`;

const Title = styled.h1`
  margin: 0;
  font-size: 18px;
  font-weight: bold;
  background-color: ${(props) => props.theme.mainColor};
  padding: 10px 20px;
  color: #fff;
`;

const Count = styled.span`
  margin-left: 4px;
  font-size: 16px;
  font-weight: normal;
`;

const CommentInputForm = styled.form`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 17px 0;
`;

const Input = styled.input`
  padding: 10px 18px;
  width: 210px;
  height: 36px;
  border-radius: 14px;
  background-color: #eee;
  border: none;
  font-size: 12px;
`;

const InputButton = styled.button`
  font-size: 12px;
  height: 36px;
  width: 45px;
  margin-left: 10px;
  background-color: #feae11;
  border: none;
  border-radius: 13px;
  color: white;
`;

const More = styled(Link)`
  display: block;
  color: inherit;
  text-decoration: none;
  font-size: 14px;
  text-align: center;
  padding: 15px 0;
  border-top: 1px solid lightgray;
  margin-top: 4px;
`;

const EmptyComment = styled.div`
  padding: 10px 0;
  color: #a5a8b1;
`;

export default Comments;
