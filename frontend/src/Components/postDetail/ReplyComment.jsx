import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { userIdAtom } from "../../states";
import {MemoizeComment as Comment} from "./Comment";

function ReplyComment({ commentList, parentCommentId, postId }) {
  const [childCommentNumber, setChildCommentNumber] = useState(0);
  const [openRelpyComments, setOpenReplyComments] = useState(false);
  const isLogin = useRecoilValue(userIdAtom)

  useEffect(() => {
    let commentNumber = commentList.filter((comment) => (comment.parentComment === parentCommentId)).length;
    setChildCommentNumber(commentNumber);
  }, [commentList, parentCommentId]); // 전체 댓글 개수가 변할때마다 상황을 감지해서 useEffect의 함수를 실행한다.

  const renderReplyCommnet = (parentCommentId) =>
    commentList.map((comment, index) => (
      <>
        {comment.parentComment === parentCommentId && (
          <ReplyWrapper key={index} >
            <Comment key={comment._id} isMore={true} comment={comment} isAuth={isLogin === comment.userId.id} postId={postId} />
            <ReplyComment key={comment._id + index} commentList={commentList} parentCommentId={comment._id} postId={postId} />
          </ReplyWrapper>
        )}
      </>
    ));

  const onHandleChange = () => {
    setOpenReplyComments(!openRelpyComments);
  };
  return (
    <>
      {childCommentNumber > 0 && !openRelpyComments && (
        <MoreWrapper onClick={onHandleChange}>대댓글 {childCommentNumber}개 더 보기...</MoreWrapper>
      )}
      {openRelpyComments && renderReplyCommnet(parentCommentId)}
    </>
  );
}

const ReplyWrapper = styled.div`
  margin-left: 10px;
`;

const MoreWrapper = styled.p`
  margin: 0;
  margin-top: 4px;
`;

export default ReplyComment;
