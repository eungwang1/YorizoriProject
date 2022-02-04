import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import NavBottom from "../nav/BottomNav"
import NavTop from "../nav/TopNav"
import { MyPageImage } from "./Profile"
import { MyPageMainBox, MyPageMainImgBox} from "./ProfileStyle"
import { MyPageEditInputBox } from "./ProfileEditStyle"

const EditMainBox = styled.div`
  
`
const EditImage = styled.img`
  width: 190px;
  height: 190px;
  border-radius: 50%;
  /* background-image: url("../images/profile.png");
  background-size: cover; */

  + p {
    margin: 0;
    font-size: 18px;
  }

`

const EditInput = styled.input`
  width: 320px;
  height: 50px;
  border: none;
  border-radius: 10px;
  border: solid 1px #FCAD2C;
  margin-bottom: 41px;
  margin-top: 10px;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  outline: none;
  color: gray; 

  ::placeholder { 
    color: gray; 
  }

`

const EditBtn = styled.button`
  background-color: #FCAD2C;
  border-radius: 5px;
  border:none;
  position: relative;
  top: 151px;
  width: 360px;
  height: 50px;
  color: white;
  font-family: sans-serif;
  font-size: 16px;
  font-weight: bold;
  text-decoration: none;
  cursor: pointer;
`

const EditImageUpload = styled.input`
  
`

const EditMyPage = () => {

  const [Profileimage, setProfileImage] = useState("../images/profile.jpg");

  const ClickUpload = (e) => {
    const imgBtn = document.querySelector("#file-upload")
    imgBtn.click()
  }

  const imgChange = (e) => {
    setProfileImage(URL.createObjectURL(e.target.files[0]));
  }


  return (
      <EditMainBox>
        <NavTop />
          <MyPageMainBox>
            <p style={{fontSize: "14px", color: "gray" }} >이미지를 클릭하여 프로필 사진을 변경할 수 있어요.</p>
            <MyPageMainImgBox>
              <input type="file" id="file-upload" accept="img/*" onChange={imgChange} required multiple  style={{display:'none'}} />

              <EditImage id="imgs"  onClick={ClickUpload} src={Profileimage}/>
                <p style={{ marginTop: "40px", fontSize: "14px", color: "gray"}}>변경할 닉네임을 입력해주세요</p>
              <EditInput placeholder="요리조리1234"/>

              <div>  
                <Link to="/users/mypage">
                  <EditBtn>
                    완료
                  </EditBtn>
                </Link>
              </div>

            </MyPageMainImgBox>
          </MyPageMainBox>
        <NavBottom />
      </EditMainBox>
  ) 
}

export default EditMyPage