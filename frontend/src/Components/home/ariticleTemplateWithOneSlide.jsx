import React, { userRef, useState, useCallback, useMemo, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";

const ArticleWrapper = styled.div`
  width: 100%;
  height: 330px;
  position: relative;
  padding: 0 15px 0 15px;
  margin-top: 25px;
  //   margin-bottom: 100px;
  //   display: flex;
  //   flex-direction: column;
  //   justify-content: center;
`;

const TextWrapper = styled.div`
  position: relative;
  font-size: 16px;
  height: 60px;
  display: flex;
  justify-content: space-between;
  //   margin-top: 15px;
`;

const TextMainWrapper = styled.div`
  width: 175px;
  height: 60px;
`;

const TextMain = styled.p`
  position: relative;
  text-align: left;
  margin: 0;
  span {
    font-size: 24px;
    color: #d45500;
    font-weight: 700;
  }
  & + & {
    margin-top: 10px;
  }
`;

const LinkedText = styled.p`
  color: #d45500;
  text-align: center;
  font-size: 14px;
  justify-self: end;
  width: 100px;
  line-height: 30px;
  margin-top: 30px;
  margin-bottom: 0px;
`;

const ImageWarpper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
  overflow: auto;
  height: 270px;
  margin-top: 10px;
  width: 100%;
`;

const ImageWithTag = styled.div`
  //   flex-shrink: 0;
  width: 100%;
  height: 240px;
  min-width: 160px;
  & + & {
    margin-left: 10px;
  }
`;

const StyledImage = styled.div`
  width: 100%;
  height: 150px;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

const TextBox = styled.div`
  width: 150px;
  height: 100px;
  margin-top: 8px;
  font-weight: 900;
  text-align: left;
`;
const Title = styled.p`
  width: 100%;
  height: 40px;
  font-size: 16px;
  margin: 0px;
  overflow: hidden;
  //   text-overflow: ellipsis;
  //   white-space: nowrap;
`;
const Author = styled.p`
  font-size: 13px;
  margin: 5px 0 10px 0;
`;
const WrapperHeartComment = styled.div`
  line-height: 15px;
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
  }
  .comment {
    width: 16px;
    height: 16px;
    background-position: -16px -13px;
  }
`;

const Heart = styled.span`
  background-position: ${({ clicked }) => (clicked ? "-33px" : "-16px")} 3.8px;
`;

const Comment = styled.span``;
const HeartCommentCount = styled.span`
  font-size: 13px;
  margin-right: 8px;
`;

export {
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
};
