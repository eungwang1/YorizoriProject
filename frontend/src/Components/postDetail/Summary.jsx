import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useRecoilValue, useSetRecoilState, useRecoilState } from "recoil";
import { userIdAtom } from "../../states";
import { detailDataAtom, delAndAmendBtnStateAtom } from "../../states/detail";
import axios from "axios";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

const Summary = ({ data, postId }) => {
  const navigate = useNavigate();
  const [detailData, setDetailData] = useRecoilState(detailDataAtom);
  const [heartCheck, setHeartCheck] = useState(false);
  const [delAndAmendBtnState, setDelAndAmendBtnState] = useRecoilState(delAndAmendBtnStateAtom);
  const [numLikes, setNumLikes] = useState(data ? data.numLikes : null);
  const userId = useRecoilValue(userIdAtom);
  const [heart, setHeart] = useState(false);
  const { Kakao } = window;
  const url = "http://localhost:3000";

  const setShare = () => {
    const shareURL = url + "/detail/" + data._id;

    Kakao.Link.sendDefault({
      objectType: "feed",
      content: {
        title: data.recipeName,
        description: data.desc,
        imageUrl: data.thumbnail,
        link: {
          mobileWebUrl: shareURL,
          webUrl: shareURL,
        },
      },
      buttons: [
        {
          title: "레시피 구경가기",
          link: {
            mobileWebUrl: shareURL,
            webUrl: shareURL,
          },
        },
      ],
    });
  };

  const deleteHandler = (postId) => {
    try {
      swal({
        title: "정말 삭제하시겠습니까?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((res) => {
        if (res) {
          swal("게시물이 삭제되었습니다..", {
            icon: "success",
          }).then(() => {
            axios.delete(`/post/${postId}`);
            navigate("/");
          });
        }
      });
    } catch (e) {
      if (e.response.status === 403) {
        alert("로그아웃 상태입니다.");
      }
    }
  };

  const heartStateCheck = async () => {
    const { data: heartArray } = await axios.get(`/like/${postId}`);
    setNumLikes(heartArray.likeUserList.length);
    setHeartCheck(false);
    heartArray.likeUserList.forEach((el) => {
      if (el.userId.id === userId) {
        setHeartCheck(true);
      }
    });
  };

  useEffect(() => {
    console.log(userId);
    console.log(data.userId.id);
    heartStateCheck();
    return () => setDetailData(null);
  }, []);

  useEffect(() => {
    if (heartCheck) setHeart(true);
    else setHeart(false);
  }, [heartCheck, numLikes]);
  const HeartState = async () => {
    if (heartCheck) {
      try {
        await axios.delete("/like", {
          data: {
            postId: postId,
          },
        });
      } catch (e) {
        console.error(e);
      }
    } else {
      try {
        await axios.post("/like", { postId: postId });
      } catch (e) {
        console.error(e);
        console.log(e.response.data.message);
      }
    }
    heartStateCheck();
  };

  return (
    <SummaryWrapper heartstate={heart}>
      {data && (
        <>
          <Thumbnail src={data.thumbnail} />
          <LCVS>
            <Likes>
              <span className="sprite heart" onClick={HeartState} />
              <span>{numLikes}명이 좋아합니다.</span>
            </Likes>
            <Comments>
              <span className="sprite comment" />
              <span>{data.numComments}</span>
            </Comments>
            <Views>
              <span className="sprite view" />
              <span>{data.numViews}</span>
            </Views>
            <Share className="sprite share" onClick={setShare} />
          </LCVS>
          <div>
            <Title>{data.recipeName}</Title>
            <Content>{data.desc}</Content>
          </div>
          <Author>
            <ProfileImg
              onClick={() => {
                navigate(`/user/${data.userId.id}/profile`);
              }}
              src={data.userId.profileImage ? data.userId.profileImage : "../images/onlylogo.png"}
            />
            <Nickname>{data.userId.nickName}</Nickname>
            {userId === data.userId.id && (
              <DropDownContainer>
                <DropDownBtn
                  onClick={() => {
                    setDelAndAmendBtnState(!delAndAmendBtnState);
                  }}
                />
                {delAndAmendBtnState && (
                  <DropDownWrapper>
                    <StyledDiv
                      onClick={() => {
                        deleteHandler(postId);
                      }}
                    >
                      삭제하기
                    </StyledDiv>
                    <StyledDiv>수정하기</StyledDiv>
                  </DropDownWrapper>
                )}
              </DropDownContainer>
            )}
          </Author>
          <SummaryInfo>
            <Servings>{data.servings}</Servings>
            <Time>{data.time}</Time>
            <Diffic>{data.diffic}</Diffic>
          </SummaryInfo>
        </>
      )}
    </SummaryWrapper>
  );
};

export default Summary;

const StyledDiv = styled.div`
  + div {
    margin-top: 8px;
  }
`;
const DropDownContainer = styled.div`
  position: relative;
  margin-left: auto;
`;

const DropDownBtn = styled.div`
  background-image: url("../../images/threedot.png");
  width: 16px;
  height: 16px;
  background-size: cover;
  z-index: 999;
`;

const DropDownWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 125px;
  height: 100px;
  background-color: #feae11;
  color: white;
  border-radius: 3px;
  padding: 5px 10px;
  position: absolute;
  right: 0px;
  font-size: 15px;
  font-weight: 900;
`;

const SummaryWrapper = styled.div`
  width: 360px;
  .sprite {
    display: inline-block;
    flex-shrink: 0;
    background-image: url("../../images/icons.png");
    background-repeat: no-repeat;
    background-size: 135px 61.05px;
  }
  .view {
    width: 28px;
    height: 28px;
    background-position: 0px 0px;
  }
  .heart {
    width: 28px;
    height: 24.5px;
    /* background-position: -71.5px 0px; */
    background-position: ${(props) => (props.heartstate === true ? "-71.5px 0px" : "-36.5px 0px")};
  }
  .comment {
    width: 28px;
    height: 28px;
    background-position: -36.5px -31px;
  }
  .share {
    width: 28px;
    height: 31px;
    background-position: -107px 0px;
  }
`;

const Thumbnail = styled.img`
  width: 100%;
  height: 360px;
  object-fit: cover;
`;
const LCVS = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 9px 0;
  font-size: 12px;
`;
const Likes = styled.span`
  display: flex;
  align-items: center;
  & > span:first-child {
    margin-right: 10px;
  }
`;
const Comments = styled.span`
  width: 28px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 70px;
`;
const Views = styled.div`
  width: 28px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 15px;
`;
const Share = styled.div`
  margin-left: 15px;
`;
const Title = styled.div`
  font-size: 18px;
  font-weight: 900;
  margin: 8px 20px 6px 20px;
`;
const Content = styled.div`
  font-size: 13px;
  margin: 0 20px 10px 20px;
`;
const Author = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  padding: 9px 20px;
`;
const ProfileImg = styled.img`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  margin-right: 12px;
  object-fit: cover;
`;
const Nickname = styled.span``;
const SummaryInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px 0px 25px 0px;
  color: gray;
  font-size: 15px;
  & > span:not(:first-child) {
    margin-left: 20px;
    &::before {
      margin-right: 20px;

      content: "|";
      width: 10px;
      height: 10px;
    }
  }
`;

const HeartImage = styled.img`
  display: inline-block;
  flex-shrink: 0;
  width: 28px;
  height: 24.5px;
`;
const Servings = styled.span``;
const Time = styled.span``;
const Diffic = styled.span``;
