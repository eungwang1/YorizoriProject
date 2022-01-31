import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import PostTemplete from "../PostTemplete";
import { StyledP, StyledScroll } from "../commonStyle";
// import { stepOneAtom } from "../PostAtom/PostAtom";
import { debounce } from "lodash";
import { useRecoilValue, useSetRecoilState, useRecoilState } from "recoil";

const PostStepOne = () => {
  const [stepOne, setStepOne] = useState({
    recipeName: "",
    desc: "",
  });
  const { recipeName, desc } = stepOne;
  const stateRef = useRef([]);
  useEffect(() => {
    const savedState = JSON.parse(localStorage.getItem("stepOne"));
    const { recipeName, desc } = savedState;
    setStepOne({
      recipeName: recipeName,
      desc: desc,
    });
  }, []);

  const saveData = () => {
    localStorage.setItem("stepOne", JSON.stringify(stepOne));
  };

  useEffect(() => {
    saveData();
  }, [stepOne]);

  const onChange = (e) => {
    const { value, name } = e.target;
    setStepOne({
      ...stepOne,
      [name]: value,
    });
  };

  const [test, setTest] = useState(true);
  return (
    <PostTemplete stepNum={1} page={1} request={"레시피 제목을 입력해주세요."}>
      <TitleInput
        name="recipeName"
        onChange={onChange}
        value={recipeName}
        ref={(el) => (stateRef.current[0] = el)}
        placeholder="마늘 50개 들어간 알리오 올리오"
      />
      <PositionRelative>
        <ImgUploadLabel htmlFor="main_img" />
        <ImgUploadInput id="main_img" type="file" />
      </PositionRelative>
      <StyledP stepOne>간단한 레시피 소개를 해주세요.{<br />}(필수사항은 아닙니다.)</StyledP>
      <StyledTextArea
        onChange={onChange}
        value={desc}
        name="desc"
        placeholder="직접 백종원 선생님의 레시피를 참고하여 변형하였습니다. "
      ></StyledTextArea>
    </PostTemplete>
  );
};

export default PostStepOne;

const TitleInput = styled.input`
  width: 315px;
  height: 60px;
  border-radius: 50px;
  border: 1px solid #feae11;
  font-size: 1rem;
  font-weight: bold;
  padding-left: 24px;
  padding-right: 60px;
`;
const ImgUploadLabel = styled.label`
  position: absolute;
  width: 26px;
  height: 28px;
  background-image: url("../images/bi_camera.png");
  bottom: 18px;
  left: 110px;
`;

const ImgUploadInput = styled.input`
  display: none;
`;

const PositionRelative = styled.div`
  position: relative;
`;

const StyledTextArea = styled.textarea`
  width: 315px;
  height: 159px;
  border: 1px solid #feae11;
  box-sizing: border-box;
  border-radius: 50px;
  padding: 50px 45px 0 45px;
  resize: none;
  font-size: 1rem;
  font-weight: bold;
  :focus {
    outline: none;
  }
  ${StyledScroll}
`;
