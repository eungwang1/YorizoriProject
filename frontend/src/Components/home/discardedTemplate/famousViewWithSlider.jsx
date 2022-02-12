import React, { userRef, useState, useCallback, useMemo, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import { datailedPostAtom, FamousPostsSelector } from "../homeAtom";
import axios from "axios";
import { useRecoilState, useRecoilValue, useRecoilValueLoadable } from "recoil";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// import { getFamousList } from "./homeAction";
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
} from "./articleTemplateWIthSlider";

const FamoustViewRapper = styled.div``;

const FamousViewWithSlider = () => {
  // const baseURL = "http://localhost:8080";
  const navigatge = useNavigate();
  // const [famousLists, setFamousLists] = useRecoilState(datailedPostAtom);
  // const getFamousList = async (startIndex, limit) => {
  //   await axios({
  //     baseURL,
  //     method: "get",
  //     url: "/like/sortByLike",
  //     responseType: "json",
  //     params: {
  //       startIndex: startIndex,
  //       limit: limit,
  //     },
  //   }).then((res) => setFamousLists(res.data.limitedSortedPosts));
  // };

  // useEffect(() => {
  //   getFamousList(1, 4);
  // }, []);
  const famousLists = useRecoilValueLoadable(FamousPostsSelector);
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    arrows: false,
  };

  if (famousLists.state === "loading") {
    return <div>...loading</div>;
  }
  console.log("famousLists", famousLists);
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
        {famousLists.contents.map((item) => {
          return (
            <ImageWithTag className="doosan" key={item._id}>
              <StyledImage
                src={item.thumbnail}
                onClick={() => {
                  navigatge("/detail");
                }}
              ></StyledImage>
              <TextBox>
                <Title>{item.recipeName}</Title>
                <Author>{item.userId.nickName}</Author>
                <WrapperHeartComment>
                  <Heart className="sprite heart" clicked={false} onClick={() => alert("ds")} />{" "}
                  <HeartCommentCount>311</HeartCommentCount>
                  <span className="sprite comment" /> <HeartCommentCount>7</HeartCommentCount>
                </WrapperHeartComment>
              </TextBox>
            </ImageWithTag>
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

export default FamousViewWithSlider;
