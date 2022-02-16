import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import NavBottom from "../nav/BottomNav"
import NavTop from "../nav/TopNav"
import { MyPageImage } from "./Profile"
import { MyPageMainBox, MyPageMainImgBox} from "./ProfileStyle"
import { MyPageEditInputBox } from "./ProfileEditStyle"
import { MyPagePasswordEditBox } from "./ProfileEditStyle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCircleCheck, faCircleXmark} from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';


const EditMyPage = () => {

  const [ myNickName, setMyNickName] = useState("요리조리1234")
  const [ nickCheck, setNickCheck ] = useState("type1")
  const [ password, setPassword ] = useState("1234")
  const [ userData, setUserData] = useState([])
  const [ Profileimage, setProfileImage] = useState(userData.Profileimage ? userData.Profileimage : "../../images/baseimage.png");
  const [ savenickName, setSaveNickName ] = useState("")
  let { userId } = useParams()


  useEffect(()=>{
    fetch(`http://localhost:8080/user/${userId}/profile`)
    .then(response => response.json())
    .then(data => setUserData(data.user))
    
    .catch(err => console.log(err))
  },[]);

  async function successChenge() {
    const formData = new FormData();
    formData.append("nickName", savenickName);
    formData.append("profileImage", Profileimage)
    await axios
      .post("/user/profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((data) => console.log("결과", data))
      .catch((err) => console.log(err));
  }
  
  const ClickUpload = (e) => {
    const imgBtn = document.querySelector("#file-upload")
    imgBtn.click()
  }

  const imgChange = (e) => {
    setProfileImage(URL.createObjectURL(e.target.files[0]));
  }

  const pass1 = () => {
    document.querySelector(".passbox").classList.toggle("passcheck")
  }

  function nickNameCheck(value) {
    let pattern_space = /\s/g;	// 공백체크
    let pattern_num = /[0-9]/;	// 숫자 
    let pattern_eng = /[a-zA-Z]/;	// 문자 
    let pattern_spc = /[~!@#$%^&*()_+|<>?:{}]/; // 특수문자
    let pattern_kor = /[ㄱ-ㅎ|ㅏ-ㅣ]/; // 한글체크
    const data = document.querySelector("#nickNameCheckText")

    if(pattern_spc.test(value)){
      data.innerText = "특수 문자가 포함되어 있습니다."
      setNickCheck("type2")
      setSaveNickName(userData.nickName)


    } else if ( value.length < 2 || value.length > 10){
      data.innerText = "닉네임은 2~10글자로 변경 해주세요"
      setNickCheck("type2")
      setSaveNickName(userData.nickName)


    } else if ( pattern_kor.test(value)) {
      data.innerText = "사용할 수 없는 단어가 포함되어 있습니다."
      setNickCheck("type2")
      setSaveNickName(userData.nickName)


    } else if ( pattern_space.test(value) ) {
      data.innerText = "공백이 포함되어 있습니다.."
      setNickCheck("type2")
      setSaveNickName(userData.nickName)

    }

     else {
      data.innerText = "사용 가능한 닉네임 입니다."
      setNickCheck("type3")
      setSaveNickName(value)
    }

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
              <EditInput placeholder={userData.nickName} type={nickCheck} onChange={(e) => {
                setMyNickName(e.target.value)
                nickNameCheck(e.target.value)
              }}/>
              <p>{nickCheck === "type2" ? <FontAwesomeIcon icon={faCircleXmark} className="checkError"/> : <FontAwesomeIcon icon={faCircleCheck} className="checkSuccess"/> } <span id="nickNameCheckText"></span></p>
              
              <MyPagePasswordEditBox className="passbox">
                <span onClick={pass1}>비밀번호 바꾸기</span><br /><br />
                <span onClick={pass1}>회원탈퇴</span><br /><br />
                <span onClick={pass1}>로그아웃</span>
                <div className="showpass">
                </div>
              </MyPagePasswordEditBox>
              <div style={{position: "relative", top: "21px"}}>  
                <Link to={`/user/${userId}/profile`}>
                  <EditBtn onClick={successChenge}>
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
  margin-top: 10px;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  outline: none;
  color: gray; 

  ::placeholder { 
    color: gray; 
  }
  + p {
    color: ${(props) => {
      
      switch (props.type) {
        case "type1":
          return "white"
          
        case "type2":
          return "red"
          
        case "type3":
          return "green"
      }
    }};

    
    span {
      color: ${(props) => { 

      switch (props.type) {
        case true:
          return "#FEAE11"
        
        case false:
          return "gray"

        default:
          break;
      }
      }};

      padding: 0;
      font-size: 12px;
      font-weight: bold;
    }

    .checkError {
      font-size: 14px;
    }

    .checkSuccess {
      font-size: 14px;
    }

  }
`

const EditBtn = styled.button`
  background-color: #FCAD2C;
  border-radius: 5px;
  border:none;
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
export default EditMyPage