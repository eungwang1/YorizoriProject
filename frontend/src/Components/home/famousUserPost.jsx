import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Watch } from "react-loader-spinner";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  detailedPostAtom,
  famousUsersPostsSelector,
  detailedUserAtom,
} from "../../states/homeAtom";
import {
  useRecoilState,
  useSetRecoilState,
  useRecoilValueLoadable,
  // useResetRecoilState,
  useRecoilRefresher_UNSTABLE,
} from "recoil";
import * as S from "./ariticleTemplateWithOneSlide";

const FamousUserPost = () => {
  const navigate = useNavigate();
  // const setFamousPost = useSetRecoilState(detailedPostAtom);
  // const setDetailedUser = useSetRecoilState(detailedUserAtom);
  const famousUsersPostsLoadable = useRecoilValueLoadable(famousUsersPostsSelector);
  const reset = useRecoilRefresher_UNSTABLE(famousUsersPostsSelector);
  const componentMounted = useRef(true);

  const [changePosts, setChangePosts] = useState(0);

  useEffect(() => {
    if (componentMounted.current) reset();
    return () => {
      componentMounted.current = false;
    };
  }, [reset]);

  if (famousUsersPostsLoadable.state === "loading") {
    return (
      <>
        <S.Loading>
          <Watch ariaLabel="loading-indicator" color="#d45500" />
        </S.Loading>
      </>
    );
  }

  const clickFamousPostHandler = (item) => {
    const postId = item._id;
    // setFamousPost(item);
    navigate(`/detail/${postId}`);
  };

  const clickChangePostHandler = () => {
    setChangePosts((prev) => {
      console.log("prev", prev);
      if (prev === famousUsersPostsLoadable.contents.length - 1) return 0;

      return prev + 1;
    });
  };

  const clickDetailedUserHandler = (user) => {
    // setDetailedUser(user);
    navigate(`/user/${user._id}/profile`);
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

  return (
    <S.ArticleWrapper>
      <S.TextWrapper>
        <S.TextMainWrapper>
          <S.TextMain>많은 사랑을 받은 ,</S.TextMain>
          <S.TextMain>
            <span
              onClick={() =>
                clickDetailedUserHandler(famousUsersPostsLoadable.contents[changePosts][0]?.userId)
              }
            >
              {famousUsersPostsLoadable.contents[changePosts][0]?.userId.nickName}
            </span>
            님.
          </S.TextMain>
        </S.TextMainWrapper>

        <S.LinkedText onClick={clickChangePostHandler}>다른 인기유저</S.LinkedText>
      </S.TextWrapper>
      <StyledSlider className="sliderrr" {...settings}>
        {famousUsersPostsLoadable.contents[changePosts].map((item, idx) => {
          return (
            <S.ImageWithTag className="doosan" key={item._id}>
              <S.StyledImage
                src={item.thumbnail}
                onClick={() => {
                  clickFamousPostHandler(item, idx);
                }}
              ></S.StyledImage>
              <S.TextBox>
                <S.Title>{item.recipeName}</S.Title>
                <S.Author>{item.userId.nickName}</S.Author>
                <S.WrapperHeartComment>
                  <S.Heart
                    className="sprite heart"
                    clicked={false}
                    onClick={() => alert("이제 하트해보자구")}
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

export default FamousUserPost;

const StyledSlider = styled(Slider)`
  .slick-prev:before,
  .slick-next:before {
    color: #feae11;
    font-size: 20px;
  }
  .slick-dots li.slick-active button:before {
    color: #feae11;
  }
`;
