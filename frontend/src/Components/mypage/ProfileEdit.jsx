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
  width: 200px;
  height: 200px;
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
  border-radius: 155px;
  background-color: #FCAD2C;
  margin-bottom: 41px;
  margin-top: 10px;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  color: white;
  outline: none;

  ::placeholder { 
    color: white; 
  }

`

const EditBtn = styled.button`
  background-color: #FCAD2C;
  color: white;
  border: none;
  border-radius: 5px;
  width: 45px;
  height: 30px;
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
            <MyPageMainImgBox>
              <input type="file" id="file-upload" accept="img/*" onChange={imgChange} required multiple  style={{display:'none'}} />

              <EditImage id="imgs"  onClick={ClickUpload} src={Profileimage}/>
              <p style={{ marginTop: "20px", fontSize: "18px"}}>변경할 닉네임</p>
              <EditInput placeholder="요리조리1234"/>
              <div>
                <Link to="/users/mypage">
                  <EditBtn>수정</EditBtn>
                </Link>
              </div>
              
            </MyPageMainImgBox>
          </MyPageMainBox>
        <NavBottom />
      </EditMainBox>
  ) 
}

export default EditMyPage