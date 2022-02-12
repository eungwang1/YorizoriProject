import React from "react";
import styled from "styled-components";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { randomButtonState, randomPostState } from "./ViewAllAtom";
import { Link } from "react-router-dom";
import dummy from "../../posts.json";

const Modal = () => {
  const randomButton = useRecoilValue(randomButtonState);
  const setRandomButton = useSetRecoilState(randomButtonState);
  const randomPost = useRecoilValue(randomPostState);
  const setRandomPost = useSetRecoilState(randomPostState);
  let recipeNameValue = randomPost.recipeName;
  let author = randomPost.diffic;
  const closeModal = () => {
    setRandomButton(false);
    console.log(randomButton);
  };

  console.log(randomPost._id);

  const getRandomIndex = async () => {
    if (randomButton) {
      let random = parseInt(Math.random() * dummy.length);
      setRandomPost(dummy[random]);
    }
  };
  return (
    <ModalWrapping RandomButtonPush={randomButton}>
      <ModalBackground onClick={closeModal} />
      <ModalBox>
        <div>
          <CloseButton onClick={closeModal} />
          <Recommendtext>랜덤으로 메뉴를 추천해드려요</Recommendtext>
          <Link to={`/detail/${randomPost._id.$oid}`}>
            <Img src={randomPost.thumbnail} />
          </Link>
          <TextBox>
            <Title>{recipeNameValue}</Title>
            <Author>{author}</Author>
            <WrapperHeartComment>
              <span className="sprite heart" /> <HeartCommentCount>31</HeartCommentCount>
              <span className="sprite comment" /> <HeartCommentCount>7</HeartCommentCount>
            </WrapperHeartComment>
          </TextBox>
          <ButtonWrapper>
            <button onClick={getRandomIndex}>다른 추천도 준비했어요!</button>
            <button>
              <div className="sprite2 share" />
            </button>
          </ButtonWrapper>
        </div>
      </ModalBox>
    </ModalWrapping>
  );
};
export default Modal;

const ModalWrapping = styled.div`
  display: ${(props) => (props.RandomButtonPush === true ? "flex" : "none")};

  z-index: 999;
  justify-content: center;
`;
const ModalBackground = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalBox = styled.div`
  position: fixed;
  top: 100px;
  width: 346px;
  height: auto;
  padding: 30px;
  background-color: white;
  border-radius: 11px;
  font-weight: 900;
  display: flex;
  justify-content: center;
  align-items: center;
  .sprite {
    display: inline-block;
    flex-shrink: 0;
    background-image: url("./images/icons.png");
    background-repeat: no-repeat;
    background-size: 66.34px 30px;
  }
  .heart {
    width: 16px;
    height: 16px;
    background-position: -16px 3.8px;
  }
  .comment {
    width: 16px;
    height: 16px;
    background-position: -16px -13px;
  }
  .share {
    width: 20px;
    height: 23px;
    background-position: 0px 0px;
  }
`;

const CloseButton = styled.div`
  position: absolute;
  background-image: url("./images/closeButton.png");
  background-size: cover;
  width: 28px;
  height: 28px;
  top: 20px;
  right: 20px;
`;
const Recommendtext = styled.div`
  color: #feae11;
  font-size: 11px;
  margin-bottom: 10px;
`;
const Img = styled.img`
  margin-top: 10px;
  width: 256px;
  height: 242px;
  border-radius: 10px;
  object-fit: cover;
`;
const TextBox = styled.div`
  width: 256px;
  height: auto;
  margin-top: 8px;
  font-weight: 900;
  text-align: left;
`;
const Title = styled.p`
  font-size: 16px;
  margin: 0px;
`;
const Author = styled.p`
  font-size: 13px;
  margin: 8px 0 13px 0;
`;
const WrapperHeartComment = styled.div`
  line-height: 15px;
`;
const HeartCommentCount = styled.span`
  font-size: 13px;
  margin-right: 8px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 14px;
  .sprite2 {
    display: inline-block;
    flex-shrink: 0;
    background-image: url("./images/icons.png");
    background-repeat: no-repeat;
    background-size: 106px 47.93px;
  }
  .share {
    width: 23px;
    height: 25px;
    background-position: -84px 1px;
    filter: invert(100%);
  }
  & > button {
    font-size: 13px;
    font-weight: 900;
    color: white;
    height: 45px;
    background-color: #feae11;
    border: none;
    border-radius: 50px;
  }
  & > button:first-child {
    width: 175px;
    margin-right: 14px;
  }
  & > button:last-child {
    width: 58px;
  }
`;
