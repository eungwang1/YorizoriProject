import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Watch } from "react-loader-spinner";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { detailedPostAtom, famousPostsSelector } from "../../states/homeAtom";
import { useSetRecoilState, useRecoilValueLoadable } from "recoil";
import * as S from "./ariticleTemplateWithOneSlide";

const FamousPost = () => {
  const navigate = useNavigate();
  const setFamousPost = useSetRecoilState(detailedPostAtom);
  // const famousPost = useRecoilValue(datailedPostAtom);
  const famousListsLoadable = useRecoilValueLoadable(famousPostsSelector);

  const clickFamousPostHandler = (item) => {
    const postId = item._id;
    setFamousPost(item);
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

  if (famousListsLoadable.state === "loading") {
    return (
      <S.Loading>
        <Watch ariaLabel="loading-indicator" color="#d45500" />
      </S.Loading>
    );
  }
  return (
    <S.ArticleWrapper>
      <S.TextWrapper>
        <S.TextMainWrapper>
          <S.TextMain>지금 ,</S.TextMain>
          <S.TextMain>
            <span>인기</span> 있는 음식이에요.
          </S.TextMain>
        </S.TextMainWrapper>
        <Link to="/view_all" style={{ textDecoration: "none" }}>
          <S.LinkedText>구경할래요</S.LinkedText>
        </Link>
      </S.TextWrapper>
      <StyledSlider {...settings}>
        {famousListsLoadable.contents.map((item, idx) => {
          return (
            <S.ImageWithTag key={item._id}>
              <S.StyledImage
                src={item.thumbnail}
                onClick={() => {
                  clickFamousPostHandler(item);
                }}
              ></S.StyledImage>
              <S.TextBox>
                <S.Title>{item.recipeName}</S.Title>
                <S.Author>{item.userId.nickName}</S.Author>
                <S.WrapperHeartComment>
                  <S.Heart
                    className="sprite heart"
                    clicked={false}
                    onClick={() => console.log("famousPost")}
                  />
                  <S.HeartCommentCount>{item.numLikes}</S.HeartCommentCount>
                  <S.Comment className="sprite comment" />
                  <S.HeartCommentCount>{item.numComments}</S.HeartCommentCount>
                </S.WrapperHeartComment>
              </S.TextBox>
            </S.ImageWithTag>
          );
        })}
      </StyledSlider>
    </S.ArticleWrapper>
  );
};

export default FamousPost;

const StyledSlider = styled(Slider)`
  margin-top: 5px;
  .slick-prev:before,
  .slick-next:before {
    color: #feae11;
    font-size: 20px;
  }
  .slick-dots li.slick-active button:before {
    color: #feae11;
  }
`;
