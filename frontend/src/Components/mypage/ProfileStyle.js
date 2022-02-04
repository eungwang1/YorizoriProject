import styled, { css } from "styled-components";
import { Link } from "react-router-dom";


export const MyPageMainBox = styled.div`
text-align: center;
  margin-top: 70px;
`


export const MyPageMainImgBox = styled.div`
  width: 100%;
  height: 200px;
  text-align: center;
`

export const MyPageMainBtnBox = styled.div`
  text-align: center;
  align-items: center;
  display: flex;
  flex-direction: column;
`


export const MypageResipeBox = styled.button`
  width: 350px;
  border: none;
  background-color: white;
  cursor: pointer;
  height: 55px;
  margin-bottom: 10px;
  margin-top: 8px;
  align-items: center;
  display: flex;
  justify-content: space-between;

  img {
    margin-right: 20px;
    transition: .5s;
  }
  
  .buttonMoveTop {
    transform: scaleY(-1);
    transition: .5s;
  }
  
`
