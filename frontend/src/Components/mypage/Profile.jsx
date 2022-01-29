import React from "react";
import styled from "styled-components";
import { Link,   } from "react-router-dom";
import NavBottom from "../nav/BottomNav"
import NavTop from "../nav/TopNav"
import { MyPageMainBox, MyPageMainImgBox, MyPageMainBtnBox, MypageResipeBox} from "./ProfileStyle"

const MyPageImage = styled.img`
  width: 115px;
  height: 115px;
  border-radius: 50%;
  background-image: url("../images/profile.jpg");
  background-size: cover;
  margin-top: 25px;

  + p {
    margin: 0;
    font-size: 18px;
  }
`
const MyPageMainProfileEdit = styled.button`
  width: 315px;
  height: 45px;
  font-weight: bold;
  font-size: 16px;
  border-radius: 155px;
  background-color: #FEAE11;
  display: inline-block;
  outline: none;
  border: none;
  cursor: pointer;
  color: white;
  margin-top: 14px;
`

const ResipeMenu1 = styled.div`
  span {
    font-size: 16px;
    margin-top: 4px;
    margin-left: 30px;
  }
`
const MyPageTemplate = () => {

  return (
    <div>
      <NavTop />
        <MyPageMainBox>
          <MyPageMainImgBox>
            <MyPageImage />
              <p>요리조리1234</p>
            <MyPageMainBtnBox>

              <Link to="/users/edit">
                <MyPageMainProfileEdit type="button">프로필 수정</MyPageMainProfileEdit>
              </Link>

              <MypageResipeBox>
                <ResipeMenu1 >
                  <span>내가 작성한 레시피</span>
                </ResipeMenu1>
                 <img src="../images/bottomBT.png" alt=""  style={{ marginRight: "20px"}}/>
              </MypageResipeBox>

              <MypageResipeBox>
                <ResipeMenu1 >
                  <span>좋아요 누른 레시피</span>
                </ResipeMenu1>
                 <img src="../images/bottomBT.png" alt=""  style={{ marginRight: "20px"}}/>
              </MypageResipeBox>

              <MypageResipeBox>
                <ResipeMenu1 >
                  <span>최근 확인한 레시피</span>
                </ResipeMenu1>
                 <img src="../images/bottomBT.png" alt=""  style={{ marginRight: "20px"}}/>
              </MypageResipeBox>

              <MypageResipeBox>
                <ResipeMenu1 >
                  <span>댓글 단 레시피</span>
                </ResipeMenu1>
                 <img src="../images/bottomBT.png" alt=""  style={{ marginRight: "20px"}}/>
              </MypageResipeBox>                            

            </MyPageMainBtnBox>
          </MyPageMainImgBox>
        </MyPageMainBox>
      <NavBottom />
    </div>
  
  );
};
export default MyPageTemplate;
