import React, { userRef, useState, useCallback, useMemo, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  datailedPostAtom,
  famousPostsSelector,
  famousUsersSelector,
  famousUsersPostsSelector,
  loginUserAtom,
} from "../../states/homeAtom";
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

//아직 작성중입니다....

const FamousUserPost = () => {
  const navigate = useNavigate();
  const setFamousPost = useSetRecoilState(datailedPostAtom);
  const famousListsLoadable = useRecoilValueLoadable(famousPostsSelector);
  const famousUsersPostsLoadable = useRecoilValueLoadable(famousUsersPostsSelector);
  const loginUser = useRecoilValue(loginUserAtom);

  const [changePosts, setChangePosts] = useState(0);

  if (famousListsLoadable.state === "loading" || famousUsersPostsLoadable.state === "loading") {
    return <div>loading...</div>;
  }

  const clickFamousPostHandler = (item, idx) => {
    const postId = item._id;
    setFamousPost(item);
    navigate(`/detail/${postId}`);
  };

  const clickChangePostHandler = () => {
    console.log(loginUser);
    setChangePosts((prev) => {
      console.log("prev", prev);
      if (prev === famousUsersPostsLoadable.contents.length - 1) return 0;

      return prev + 1;
    });
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

  //   console.log("famousUsersPostsLoadable", famousUsersPostsLoadable.contents[0]);
  console.log("222", famousUsersPostsLoadable.contents);
  return (
    <ArticleWrapper>
      <TextWrapper>
        <TextMainWrapper>
          <TextMain>많은 사랑을 받은 ,</TextMain>
          <TextMain>
            <span>{famousUsersPostsLoadable.contents[changePosts][0]?.userId.nickName}</span> 님의
            음식이에요.
          </TextMain>
        </TextMainWrapper>

        <LinkedText onClick={clickChangePostHandler}>다른 인기유저</LinkedText>
      </TextWrapper>
      {/* <ImageWarpper className="iamge"> */}
      <StyledSlider className="sliderrr" {...settings}>
        {famousUsersPostsLoadable.contents[changePosts].length === 0 ? (
          <div>팔로우 많이 받은 유저의 게시물이 없으면 이렇게 빈 화면이 나옵니당..ㅜ</div>
        ) : (
          famousUsersPostsLoadable.contents[changePosts].map((item, idx) => {
            return (
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
                      onClick={() => alert("이제 하트해보자구")}
                    />{" "}
                    <HeartCommentCount>{item.numLikes}</HeartCommentCount>
                    <span className="sprite comment" />{" "}
                    <HeartCommentCount>{item.numComments}</HeartCommentCount>
                  </WrapperHeartComment>
                </TextBox>
              </ImageWithTag>
              // </div>
            );
          })
        )}
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

export default FamousUserPost;
