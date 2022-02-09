import React, { useState, useEffect} from 'react'
import {MypageResipeBox} from "./ProfileStyle"
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import { StyledScroll } from '../post/commonStyle';

const ResipeMenus = styled.div`
  span {
    font-family: 'Montserrat', sans-serif;
    font-size: 16px;
    margin-top: 4px;
    margin-left: 20px;
    font-weight: bold;
    color: ${(props) => { 

    switch (props.type) {
      case true:
        return "#FEAE11"
      
      case false:
        return "gray"

      default:
        break;
    }
  }}
  }
`

const ResipeListBox = styled.div`
  width: 310px;
  height: 260px;
  left: 32px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  text-align: center;
  overflow:scroll;
  overflow-x: hidden;
  ${StyledScroll}

  img {
    position: relative;
    bottom: 15px;
    margin: 10px 25px 5px 25px;
    width: 100px;
    height: 100px;
    border-radius: 15px;
    
  }
  
  p {
    width: 140px;
    text-align: center;
    font-family: sans-serif;
    position: relative;
    bottom: 15px;
    margin: 0px;
    overflow: hidden; 
    text-overflow: ellipsis;
    white-space: nowrap; 
    color: gray;
    font-weight: bold;
    font-size: 14px;
  }

`
const ResipeListItem = styled.div`
`

export default function ResipeButton(props) {
  const resipeMenu = ["내가 작성한 레시피", "좋아요 누른 레시피", "최근 확인한 레시피", "댓글 남긴 레시피"]
  const [onResipe, setOnResipe] = useState(false)
  const resipeMenuButton = ["../images/bottomBT.png", "../images/bottomBT.png", "../images/bottomBT.png", "../images/bottomBT.png"]



  const changeResipe = () => {
    setOnResipe((onResipe) => {
      console.log(onResipe)
      return !onResipe
    })
  }

  const moveButton = () => {
    document.querySelector(`.buttont${props.nums}`).classList.toggle("buttonMoveTop")
  }
  return (
    <>
      <MypageResipeBox onClick={() => {
        changeResipe()
        moveButton()
      }}>
          <ResipeMenus type={onResipe}>
            <span>{ resipeMenu[props.nums]}</span>
          </ResipeMenus>
            <img className={`buttont${props.nums}`} src={resipeMenuButton[props.nums]} alt=""/>

      </MypageResipeBox>
          {
            onResipe 
            ?  <ResipeListBox>
                <ResipeListItem>
                  <Link to="/detail">
                    <img src="../images/food1.jpg" alt=""/>
                  </Link>
                  <p># 햄버거 레시피</p>
                </ResipeListItem>
                <ResipeListItem>
                  <Link to="/detail">
                    <img src="../images/food1.jpg" alt=""/>
                  </Link>
                  <p># 햄버거 레시피</p>
                </ResipeListItem>
                <ResipeListItem>
                  <Link to="/detail">
                    <img src="../images/food2.jpg" alt=""/>
                  </Link>
                  <p># 고기 레시피</p>
                </ResipeListItem>
                <ResipeListItem>
                  <Link to="/detail">
                    <img src="../images/food2.jpg" alt=""/>
                  </Link>
                  <p># 고기 레시피</p>
                </ResipeListItem>
                <ResipeListItem>
                  <Link to="/detail">
                    <img src="../images/food2.jpg" alt=""/>
                  </Link>
                  <p># 고기 레시피</p>
                </ResipeListItem>
                <ResipeListItem>
                  <Link to="/detail">
                    <img src="../images/food2.jpg" alt=""/>
                  </Link>
                  <p># 고기 레시피</p>
                </ResipeListItem>
                <ResipeListItem>
                  <Link to="/detail">
                    <img src="../images/food2.jpg" alt=""/>
                  </Link>
                  <p># 고기 레시피</p>
                </ResipeListItem>
                <ResipeListItem>
                  <Link to="/detail">
                    <img src="../images/food2.jpg" alt=""/>
                  </Link>
                  <p># 고기 레시피</p>
                </ResipeListItem>
                <ResipeListItem>
                  <Link to="/detail">
                    <img src="../images/food2.jpg" alt=""/>
                  </Link>
                  <p># 고기 레시피</p>
                </ResipeListItem>
                <ResipeListItem>
                  <Link to="/detail">
                    <img src="../images/food2.jpg" alt=""/>
                  </Link>
                  <p># 고기 레시피</p>
                </ResipeListItem>
                <ResipeListItem>
                  <Link to="/detail">
                    <img src="../images/food2.jpg" alt=""/>
                  </Link>
                  <p># 고기 레시피</p>
                </ResipeListItem>
       
              </ResipeListBox> 
            : ""
          }
    </>
  )
}