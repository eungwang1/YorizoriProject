import React, { useState, useEffect} from 'react'
import {MypageResipeBox} from "./ProfileStyle"
import styled, { css } from "styled-components";

const ResipeMenu1 = styled.div`
  span {
    font-size: 16px;
    margin-top: 4px;
    margin-left: 30px;
  }
`

const ResipeListBox = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  img {
    margin: 10px 20px;
    width: 100px;
    height: 100px;
    border-radius: 15px;
    
  }
  p {
    
  }
`
const ResipeListItem = styled.div`

`

export default function ResipeButton(props) {
  const resipeMenu = ["내가 작성한 레시피", "좋아요 누른 레시피", "최근 확인한 레시피", "댓글 남긴 레시피"]
  const [onResipe, setOnResipe] = useState(false)
  
  const changeResipe = () => {
    setOnResipe((onResipe) => {
      console.log(onResipe)
      return !onResipe
    })
  }

  return (
    <>
      <MypageResipeBox onClick={changeResipe}>
          <ResipeMenu1>
            <span>{ resipeMenu[props.nums]}</span>
          </ResipeMenu1>
            <img src="../images/bottomBT.png" alt=""  style={{ marginRight: "20px"}}/>

      </MypageResipeBox>
          {
            onResipe 
            ? <ResipeListBox>
                <ResipeListItem>
                  <img src="../images/food1.jpg" alt=""/>
                  <img src="../images/food2.jpg" alt=""/>
                </ResipeListItem>
              </ResipeListBox> 
            : ""
          }
    </>
  )
}