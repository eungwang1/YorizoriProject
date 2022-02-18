import React, { useState, useEffect} from 'react'
import {MypageResipeBox} from "./ProfileStyle"
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import { StyledScroll } from '../post/commonStyle';
import dummy from "../../posts.json";



export default function ResipeButton(props) {
  const resipeMenu = ["내가 작성한 레시피", "좋아요 누른 레시피", "댓글 남긴 레시피", "최근 확인한 레시피", ]
  const [onResipe, setOnResipe] = useState(false)
  const resipeMenuButton = ["../../images/bottomBT.png", "../../images/bottomBT.png", "../../images/bottomBT.png", "../../images/bottomBT.png"]
  const listResipe = [ "postResipe", "likeResipe", "commentResipe", "historyResipe" ]
  
  let datas = ""

  if(props.nums === "1" || props.nums === "2" || props.nums === "3") {
    datas = props[listResipe[props.nums]].filter((item) => item.postId)
  } else {
    datas = props[listResipe[props.nums]]
  }


  const changeResipe = () => {
    setOnResipe((onResipe) => {
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
          <ResipeMenus type={String(onResipe)}>
            <span>{ resipeMenu[props.nums]}</span>
          </ResipeMenus>
            <img className={`buttont${props.nums}`} src={resipeMenuButton[props.nums]} alt=""/>

      </MypageResipeBox>
          {
            onResipe 
            ? 
            <ResipeListBox>
              { 
                datas.map((item, index) => {
                console.log(item)
              return (
                <ResipeListItem key={index}>
                  <Link to={`/detail/${props.nums === "1" || props.nums === "2" || props.nums === "3" ? item.postId.id : item.id } `}>
                    { props.nums === "1" || props.nums === "2" || props.nums === "3"
                      ? <img src={item.postId.thumbnail} alt=""/>
                      : <img src={item.thumbnail} alt=""/>
                    }
                  </Link>
                  { props.nums === "1" || props.nums === "2" || props.nums === "3"
                    ? <p> {item.postId.recipeName}</p>
                    : <p> {item.recipeName}</p>
                  }
                </ResipeListItem>
                )
              })}
            </ResipeListBox> 
            : ""
          }
    </>
  )
}

const ResipeMenus = styled.div`
  span {
    font-family: 'Montserrat', sans-serif;
    font-size: 16px;
    margin-top: 4px;
    margin-left: 20px;
    font-weight: bold;
    color: ${(props) => { 

    switch (props.type) {
      case "true":
        return "#FEAE11"
      
      case "false":
        return "gray"

      default:
        break;
    }
  }}
  }
`

const ResipeListBox = styled.div`
  background-color: #FDFDFD;
  border-radius: 10px;
  box-shadow: 0px 0px 2px 5px #FAFAF7;
  padding: 20px 0 0 0 ;
  width: 310px;
  height: 270px;
  left: 32px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  text-align: center;
  overflow:scroll;
  overflow-x: hidden;
  margin-bottom: 16px;
  ${StyledScroll}

  img {
    position: relative;
    bottom: 15px;
    margin: 15px 25px 0 25px;
    width: 100px;
    height: 100px;
    border-radius: 5px;
    object-fit: cover;
  }
  
  p {
    width: 140px;
    text-align: center;
    font-family: sans-serif;
    position: relative;
    bottom: 15px;
    margin-left: 5px;
    margin-right: 5px;
    overflow: hidden; 
    text-overflow: ellipsis;
    white-space: wrap; 
    color: gray;
    font-weight: bold;
    font-size: 12px;
    display: -webkit-box;
    margin-bottom: 10px;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

`
const ResipeListItem = styled.div`
`