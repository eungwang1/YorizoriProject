import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link,   } from "react-router-dom";
import NavBottom from "../nav/BottomNav"
import NavTop from "../nav/TopNav"
import { MyPageMainBox, MyPageMainImgBox, MyPageMainBtnBox, MypageResipeBox} from "./ProfileStyle"
import ResipeButton from "../mypage/ResipeList"

const MyPageImage = styled.img`
  width: 115px;
  height: 115px;
  border-radius: 50%;
  background-image: url("../images/profile.jpg");
  background-size: cover;

  + p {
    font-family: sans-serif;
    margin-top: 15px;
    font-size: 18px;
    font-weight: 500;
  }
`
const MyPageMainProfileEdit = styled.button`
  width: 315px;
  height: 45px;
  font-weight: bold;
  font-size: 16px;
  border-radius: 10px;
  background-color: #FEAE11;
  display: inline-block;
  outline: none;
  border: none;
  cursor: pointer;
  color: white;
  margin-top: 14px;
  margin-bottom: 30px;
`

const MyPageFollowBox = styled.div`
  width: 150px;
  height: 100px;
`

const MyPageMainInfoBox = styled.div`
  display: flex;
  justify-content: center;

  .InfoProfile {
    margin-left: 10px;
  };

  .followBox {
    margin-left: 40px;
    position: relative;
    top: 30px;
    border: solid 2px #FEAE11;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    line-height: 5px;    
    align-items: center;
    div {
      a {
        color: black;
        text-decoration: none;
      }

      margin-left: 7px;
      margin-right: 7px;
      margin-bottom: 15px;

      p {
        font-size: 14px;
      }
    }
  }
`


const MyPageTemplate = () => {
  const [ profileName, setProfileName ] = useState("요리조리1234")


  return (
    <div>
      <NavTop />
        <MyPageMainBox style={{ marginTop: "80px", marginBottom: "90px" }}>
          <MyPageMainImgBox inImgBox>
            
            <MyPageMainInfoBox>
              <div className="InfoProfile">
                <MyPageImage />
                  <p>{profileName}</p>
              </div>
                <MyPageFollowBox className="followBox">
                  <div>
                    <Link to="/">
                      <p>팔로워</p>
                      <span>150</span>
                    </Link>
                  </div>
                  <div>
                    <Link to="/">
                      <p>팔로잉</p>
                      <span>150</span>
                    </Link>
                  </div>
                </MyPageFollowBox>
            </MyPageMainInfoBox>
            <MyPageMainBtnBox >

              <Link to="/users/edit">
                <MyPageMainProfileEdit type="button" >프로필 수정</MyPageMainProfileEdit>
              </Link>

              <div style={{width: "100%", borderBottom : "1px solid #c5c5c5", marginBottom: "5px"}}>
              </div>
              <ResipeButton nums="0"/>
              <ResipeButton nums="1"/>
              <ResipeButton nums="2"/>
              <ResipeButton nums="3"/>
              <div style={{width: "300px", height: "70px"}}></div>
              
            </MyPageMainBtnBox>
          </MyPageMainImgBox>
        </MyPageMainBox>

      <NavBottom />
    </div>
  
  );
};
export default MyPageTemplate;
