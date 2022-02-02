import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import PostTemplete from "../PostTemplete";
import {
  StyledP,
  StyledScroll,
  ResetTextarea,
  Preview,
  ModalBox,
  ImgBox,
  DeleteImg,
  ModalClose,
  ModalBackground,
} from "../commonStyle";
import { useForm, useFormContext } from "react-hook-form";
import { MainImageStateAtom } from "../PostAtom/PostAtom";
import { useRecoilValue, useSetRecoilState } from "recoil";

const PostStepOne = () => {
  const ImgLabel = useRef();
  const ImgInput = useRef();
  const PreviewRef = useRef();
  const { watch, setValue } = useForm();
  const { register } = useFormContext();
  const mainImage = useRecoilValue(MainImageStateAtom);
  const setMainImage = useSetRecoilState(MainImageStateAtom);

  const [modalState, setModalState] = useState(false);
  const [stepOne, setStepOne] = useState({
    recipeName: "",
    desc: "",
  });

  useEffect(() => {
    // const subscription = watch((value) => {
    //   localStorage.setItem("TitleAndDesc", JSON.stringify(value));
    // });

    PreviewRef.current.src = mainImage.preview;
  }, [watch, mainImage]);

  // useEffect(() => {
  //   if (localStorage.getItem("TitleAndDesc")) {
  //     const stepOne = JSON.parse(localStorage.getItem("TitleAndDesc"));
  //     setValue("recipeName", stepOne.recipeName);
  //     setValue("desc", stepOne.desc);
  //   }
  // }, []);

  const handleImage = (e) => {
    let cur_file = e.target.files[0];
    const filesInArr = Array.from(e.target.files);
    if (cur_file) {
      setMainImage({
        ...mainImage,
        file: filesInArr,
        state: true,
        preview: window.URL.createObjectURL(cur_file),
      });
    }
  };

  const openPreview = () => {
    setModalState(true);
  };

  const closePreview = () => {
    setModalState(false);
  };

  const changeImg = () => {
    setModalState(false);
    setMainImage({
      file: [],
      state: false,
    });
  };

  return (
    <PostTemplete stepNum={1} page={1} request={"레시피 제목을 입력해주세요."}>
      <ModalBackground
        modalState={modalState}
        onClick={() => {
          setModalState(false);
        }}
      />
      <ModalBox modalState={modalState}>
        <ImgBox ref={PreviewRef} src="" alt="none" />
        <DeleteImg onClick={changeImg}>삭제하기</DeleteImg>
        <ModalClose onClick={closePreview}>x</ModalClose>
      </ModalBox>

      <TitleInput {...register(`recipeName`)} placeholder="마늘 50개 들어간 알리오 올리오" />
      <PositionRelative>
        {mainImage.state ? (
          <Preview onClick={openPreview} />
        ) : (
          <ImgUploadLabel ref={ImgLabel} htmlFor="main_img" />
        )}
        <ImgUploadInput
          accept="image/*"
          ref={ImgInput}
          // {...register("main_img")}
          onChange={handleImage}
          id="main_img"
          type="file"
        />
      </PositionRelative>
      <StyledP stepOne>간단한 레시피 소개를 해주세요.{<br />}(필수사항은 아닙니다.)</StyledP>
      <StyledTextArea
        {...register(`desc`)}
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
  ${ResetTextarea}
`;

const ImgUploadLabel = styled.label`
  background-repeat: no-repeat;
  background-size: contain;
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
  font-size: 1rem;
  font-weight: bold;
  ${ResetTextarea}
  ${StyledScroll}
`;
