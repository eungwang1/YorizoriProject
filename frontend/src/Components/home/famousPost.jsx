import React, { userRef, useState, useCallback, useMemo, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  datailedPostAtom,
  FamousPostsSelector,
  FamousPostLikeUserSelector,
  FamousPostCommentUserSelector,
  detailedPostsLikeUserAtom,
} from "./homeAtom";
import axios from "axios";
import {
  useRecoilState,
  useSetRecoilState,
  useRecoilValue,
  useRecoilStateLoadable,
  useRecoilValueLoadable,
} from "recoil";
import {
  ArticleWrapper,
  TextMainWrapper,
  TextWrapper,
  TextMain,
  LinkedText,
  ImageWarpper,
  ImageWithTag,
  StyledImage,
  TextBox,
  Title,
  Author,
  WrapperHeartComment,
  HeartCommentCount,
  Heart,
  Comment,
} from "./ariticleTemplateWithOneSlide";

const FamoustViewRapper = styled.div``;

const FamousPost = () => {
  const navigate = useNavigate();
  const setFamousPost = useSetRecoilState(datailedPostAtom);
  const setFamousPostLikeUser = useSetRecoilState(detailedPostsLikeUserAtom);
  const famousListsLoadable = useRecoilValueLoadable(FamousPostsSelector);
  const likeUserLoadble = useRecoilValueLoadable(FamousPostLikeUserSelector);
  const commentUserCountLoadable = useRecoilValueLoadable(FamousPostCommentUserSelector);

  const clickFamousPostHandler = (item, idx) => {
    const postId = item._id;
    setFamousPost(item);
    setFamousPostLikeUser(likeUserLoadble.contents[idx].likeUserList);
    navigate(`/detail/${postId}`);
  };

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    arrows: false,
  };

  if (
    famousListsLoadable.state === "loading" ||
    likeUserLoadble.state === "loading" ||
    commentUserCountLoadable.state === "loading"
  ) {
    return <div>loading...</div>;
  }
  console.log("famousListsLoadable", likeUserLoadble.contents);
  return (
    <ArticleWrapper>
      <TextWrapper>
        <TextMainWrapper>
          <TextMain>지금 ,</TextMain>
          <TextMain>
            <span>인기</span> 있는 음식이에요.
          </TextMain>
        </TextMainWrapper>
        <Link to="/view_all" style={{ textDecoration: "none" }}>
          <LinkedText>구경할래요</LinkedText>
        </Link>
      </TextWrapper>
      {/* <ImageWarpper className="iamge"> */}
      <StyledSlider className="sliderrr" {...settings}>
        {famousListsLoadable.contents.map((item, idx) => {
          return (
            // <div key={item._id}>
            <ImageWithTag className="doosan" key={item._id}>
              <StyledImage
                src={item.thumbnail}
                onClick={() => {
                  clickFamousPostHandler(item, idx);
                }}
              ></StyledImage>
              <TextBox>
                <Title>{item.recipeName}</Title>
                <Author>{item.userId.nickName}</Author>
                <WrapperHeartComment>
                  <Heart
                    className="sprite heart"
                    clicked={false}
                    onClick={() => alert("하트구현해보자구!")}
                  />{" "}
                  <HeartCommentCount>
                    {likeUserLoadble.contents[idx].likeUserList.length}
                  </HeartCommentCount>
                  <span className="sprite comment" />{" "}
                  <HeartCommentCount>
                    {commentUserCountLoadable.contents[idx].count}
                  </HeartCommentCount>
                </WrapperHeartComment>
              </TextBox>
            </ImageWithTag>
            // </div>
          );
        })}
      </StyledSlider>
      {/* </ImageWarpper> */}
    </ArticleWrapper>
  );
};

const StyledSlider = styled(Slider)`
  //   margin: 0 15px 0 15px;
  .slick-prev:before,
  .slick-next:before {
    color: #feae11;
    font-size: 20px;
  }
  .slick-dots li.slick-active button:before {
    color: #feae11;
  }
`;

export default FamousPost;
