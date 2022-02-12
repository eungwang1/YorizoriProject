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



const MyPageTemplate = () => {
  const [ profileName, setProfileName ] = useState("요리조리1234")


  return (
    <div>
      <NavTop />
        <MyPageMainBox style={{ marginTop: "80px", marginBottom: "90px" }}>
          <MyPageMainImgBox>
            <MyPageImage />
              <p>{profileName}</p>
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
