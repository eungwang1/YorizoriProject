import axios from "axios";
import React, { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { userIdAtom } from "../../states";
import { AuthInput, SubmitButton } from "./Comments";
import Toast from "./Toast";
import { toastAtom, messageAtom, isLoadingAtom } from "./toastAtom";

const displayedAt = (createdAt) => {
  const milliSeconds = new Date().getTime() - new Date(createdAt).getTime();
  const seconds = milliSeconds / 1000;
  if (seconds < 60) return `방금 전`;
  const minutes = seconds / 60;
  if (minutes < 60) return `${Math.floor(minutes)}분 전`;
  const hours = minutes / 60;
  if (hours < 24) return `${Math.floor(hours)}시간 전`;
  const days = hours / 24;
  if (days < 7) return `${Math.floor(days)}일 전`;
  const weeks = days / 7;
  if (weeks < 5) return `${Math.floor(weeks)}주 전`;
  const months = days / 30;
  if (months < 12) return `${Math.floor(months)}개월 전`;
  const years = days / 365;
  return `${Math.floor(years)}년 전`;
};

function Comment({ comment, isMore, isAuth, postId }) {
  const [toastStatus, setToastStatus] = useRecoilState(toastAtom);
  const [toastMessage, setToastMessage] = useRecoilState(messageAtom);
  const isLogin = useRecoilValue(userIdAtom);
  const [isLoading, setIsLoading] = useRecoilState(isLoadingAtom);
  const [toggleReply, setToggleReply] = useState(false);
  const [replyComment, setReplyComment] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [editComment, setEditComment] = useState(comment.comment);

  const deleteHandler = async (commentId) => {
    const res = await axios.patch(`/api/comment/${commentId}/delete`, { isDelete: true });
    setToastStatus(true);
    setToastMessage("댓글이 삭제되었습니다.");
    setIsLoading(true);
  };

  const editHandler = () => {
    setIsEdit(true);
  };

  const onChangeHandler = (e) => {
    setEditComment(e.target.value);
  };

  const onSubmitHandler = async (commentId) => {
    if (editComment === comment.comment) {
      setIsEdit(false);
      return;
    }
    axios.patch(`/api/comment/${commentId}`, { comment: editComment }).then((res) => {
      console.log(res);
      setToastMessage("수정이 완료되었습니다");
      setToastStatus(true);
      setIsEdit(false);
      setIsLoading(true);
    });
  };

  const replyHandler = () => {
    setToggleReply(!toggleReply);
  };

  const onChangeRelpy = (e) => {
    setReplyComment(e.target.value);
  };

  const onReplyHandler = async (commentId) => {
    console.log(!replyComment, replyComment, "???");
    if (!replyComment) {
      setToggleReply(false);
      console.log("대댓글 입력바람");
      return;
    }
    console.log("Let's start Axios~!");
    try {
      const result = await axios.post(`/api/comment/`, {
        postId,
        parentComment: commentId,
        comment: replyComment,
      });
      setToastMessage("댓글이 등록되었습니다.");
      setToastStatus(true);
      setToggleReply(false);
      setIsLoading(true);
    } catch (err) {
      console.error(err);
      setToastStatus(true);
      setToggleReply(false);
    }
  };

  console.log("Let's find Id", comment);
  console.log("Are you auth?", isAuth);
  return (
    <Wrapper>
      {comment.isDeleted ? (
        <DeletedComment>삭제된 댓글입니다</DeletedComment>
      ) : (
        <>
          <ProfileImg isImage={comment.userId?.profileImage ? comment.userId?.profileImage : ""} />
          {isEdit ? (
            <>
              <AuthInput onChange={onChangeHandler}>{comment.comment}</AuthInput>
              <SubmitButton onClick={() => onSubmitHandler(comment._id)} comment={true}>
                수정
              </SubmitButton>
            </>
          ) : (
            <>
              <CommentWrapper>
                <Nickname>{comment.userId?.nickName}</Nickname>
                <CommenContent isMore={isMore}>{comment.comment}</CommenContent>
                <Time>{displayedAt(comment.createdAt)}</Time>
                {isLogin && (
                  <>
                    <ReplyImg
                      isActive={toggleReply}
                      onClick={replyHandler}
                      src={`${process.env.PUBLIC_URL}/images/reply.png`}
                    />
                    {toggleReply && (
                      <div>
                        <AuthInput
                          onChange={onChangeRelpy}
                          placeholder="대댓글 추가..."
                        ></AuthInput>
                        <SubmitButton onClick={() => onReplyHandler(comment._id)} comment={true}>
                          등록
                        </SubmitButton>
                      </div>
                    )}
                  </>
                )}
              </CommentWrapper>
              {isAuth && (
                <ButtonWrapper>
                  <Button onClick={editHandler}>수정</Button>
                  <Button onClick={() => deleteHandler(comment._id)}>삭제</Button>
                </ButtonWrapper>
              )}
            </>
          )}

          {toastStatus && <Toast msg={toastMessage} />}
        </>
      )}
    </Wrapper>
  );
}

const DeletedComment = styled.div`
  border-radius: 5px;
  width: 100%;
  text-align: center;
  background-color: #7f8fa64b;
  color: #b1b3b9;
`;

const ReplyImg = styled.img`
  width: 12px;
  height: 12px;
  margin-left: 8px;
  vertical-align: -4px;
  image-rendering: -webkit-optimize-contrast;
  opacity: ${(props) => (props.isActive ? 1 : 0.5)};
`;

const ButtonWrapper = styled.div`
  align-self: flex-start;
  flex-basis: 77px;
  flex-shrink: 0;
`;

const Button = styled.button`
  margin-left: 2px;
  border: none;
  background-color: transparent;
  color: #a5a8b1;
  font-size: 12px;
`;

export const ProfileImg = styled.img.attrs((props) => ({
  src: props.isImage ? props.isImage : process.env.PUBLIC_URL + "/images/onlylogo.png",
}))`
  width: 42px;
  height: 42px;
  margin-right: 12px;
  border-radius: 50%;
  object-fit: cover;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  padding-top: 4px;
  ${ProfileImg} {
    align-self: baseline;
    flex-shrink: 0;
  }
`;

const CommentWrapper = styled.div`
  flex-grow: 1;
`;

const Nickname = styled.div`
  font-size: 14px;
  font-weight: 900;
`;

const CommenContent = styled.div`
  margin-top: 4px;
  font-size: 13px;
  width: 100%;
  ${(props) =>
    props.isMore
      ? "word-break:break-all"
      : `line-height: 17px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  word-break:break-all;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;`};
`;

const Time = styled.span`
  margin-top: 4px;
  font-size: 12px;
  margin-bottom: 0;
  color: #a5a8b1;
`;

// export default Comment;
export const MemoizeComment = React.memo(Comment);
