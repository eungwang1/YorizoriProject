import React, { userRef, useState, useCallback, useMemo, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";

export const ArticleWrapper = styled.div`
  width: 100%;
  height: 420px;
  position: relative;
  padding: 0 15px 0 15px;
  margin-top: 20px;
  //   margin-bottom: 100px;
  //   display: flex;
  //   flex-direction: column;
  //   justify-content: center;
`;

export const TextWrapper = styled.div`
  position: relative;
  font-size: 16px;
  height: 60px;
  display: flex;
  justify-content: space-between;
`;

export const TextMainWrapper = styled.div`
  width: 235px;
  height: 60px;
`;

export const TextMain = styled.p`
  position: relative;
  text-align: left;
  margin: 0;
  span {
    font-size: 21px;
    color: #feae11;
    font-weight: 700;
    margin-right: 3px;
  }
  & + & {
    margin-top: 5px;
  }
  &:first-of-type {
    margin-left: 3px;
  }
`;

export const LinkedText = styled.button`
  color: #feae11;
  background: rgba(0, 0, 0, 0);
  border: 1px solid #feae11;
  border-radius: 10px;
  text-align: center;
  font-size: 14px;
  justify-self: end;
  width: 100px;
  height: 35px;
  line-height: 30px;
  margin-top: 14px;
  margin-bottom: 0px;
  &:hover {
    background: #feae11;
    color: #ffffff;
  }
`;

export const ImageWarpper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
  overflow: auto;
  height: 270px;
  margin-top: 10px;
  width: 100%;
`;

export const ImageWithTag = styled.div`
  //   flex-shrink: 0;
  width: 100%;
  height: 310px;
  min-width: 160px;
  margin-top: 5px;
  & + & {
    margin-left: 10px;
  }
`;

export const StyledImage = styled.div`
  width: 100%;
  height: 220px;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  // border-radius: 5%;
`;

export const TextBox = styled.div`
  width: 100%;
  height: 60px;
  margin-top: 8px;
  font-weight: 900;
  text-align: left;
  margin-bottom: 20px;
`;
export const Title = styled.p`
  width: 100%;
  // height: 50px;
  font-size: 16px;
  margin: 0px;
  // overflow: hidden;
  // text-overflow: ellipsis;
  // white-space: nowrap;
`;
export const Author = styled.p`
  font-size: 13px;
  margin: 5px 0 5px 0;
`;
export const WrapperHeartComment = styled.div`
  line-height: 15px;
  .sprite {
    display: inline-block;
    flex-shrink: 0;
    background-image: url("${process.env.PUBLIC_URL}/images/icons.png");
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

export const Heart = styled.span`
  background-position: ${({ heartClick }) => (heartClick ? "-33px" : "-16px")} 3.8px;
`;

export const Comment = styled.span``;
export const HeartCommentCount = styled.span`
  font-size: 13px;
  margin-right: 8px;
  margin-left: 8px;
`;

export const Loading = styled.div`
  height: 400px;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
