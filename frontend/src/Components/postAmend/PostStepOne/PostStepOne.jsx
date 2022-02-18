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
import { MainImageStateAtom, SubImageStateAtom } from "../PostAtom/PostAtom";
import { useRecoilValue, useSetRecoilState, useRecoilState } from "recoil";
import { ConvertURLtoFile } from "../util/ConvertURLtoFile";

const PostStepOne = ({ data }) => {
  const ImgLabel = useRef();
  const ImgInput = useRef();
  const PreviewRef = useRef();
  const { watch, setValue, getValues } = useForm();
  const { register } = useFormContext();
  const mainImage = useRecoilValue(MainImageStateAtom);
  const [subImage, setSubImage] = useRecoilState(SubImageStateAtom);
  const setMainImage = useSetRecoilState(MainImageStateAtom);
  const [modalState, setModalState] = useState(false);
  const [number, setNumber] = useState(0);

  useEffect(() => {
    console.log("랜더링오류");
    data.copyImage.map((el, index) => {
      ConvertURLtoFile(el).then((imgFile) => {
        console.log(imgFile);
        console.log(el);
        if (!subImage.preview[index + 1]) {
          setSubImage((oldList) => {
            const newList = {
              ...oldList,
              file: oldList.file.map((element, idx) => {
                if (element) {
                  return element;
                } else if (idx === index + 1) {
                  return imgFile;
                }
              }),
              preview: oldList.preview.map((element, idx) => {
                if (element) {
                  return element;
                } else if (idx === index + 1) {
                  return el;
                }
              }),
            };
            return newList;
          });
        }
      });
    });
    console.log(subImage);
  }, []);
  useEffect(() => {
    if (!mainImage.state) {
      ConvertURLtoFile(data.thumbnail).then((el) => {
        console.log([el]);
        setMainImage({
          ...mainImage,
          file: [el],
          state: true,
          preview: data.thumbnail,
        });
      });
    }
  }, []);

  useEffect(() => {
    PreviewRef.current.src = mainImage.preview;
  }, [watch, mainImage]);

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
    <PostTemplete stepNum={1} page={1} request={"썸네일을 등록해주세요.(필수)"}>
      <ModalBackground
        modalState={modalState}
        onClick={() => {
          setModalState(false);
        }}
      />
      <ModalBox modalState={modalState}>
        <ImgBox ref={PreviewRef} src="" alt="none" />
        <ModalClose onClick={closePreview}>
          <CloseP>x</CloseP>
        </ModalClose>
      </ModalBox>
      <ButtonWrapper>
        <ImgUploadButton ref={ImgLabel} htmlFor="main_img">
          {mainImage.state ? "썸네일 변경하기" : "썸네일 등록하기"}
        </ImgUploadButton>
        <ImgCheckButton
          type="button"
          state={mainImage.state}
          onClick={openPreview}
          value="썸네일 확인하기"
          disabled={mainImage.state ? false : true}
        />
      </ButtonWrapper>
      <StyledP stepOne>레시피 제목을 입력해주세요.(필수)</StyledP>
      <TitleInput
        {...register(`recipeName`)}
        placeholder="마늘 50개 들어간 알리오 올리오"
        defaultValue={data.recipeName}
      />
      <PositionRelative>
        <ImgUploadInput
          accept="image/*"
          ref={ImgInput}
          onChange={handleImage}
          id="main_img"
          type="file"
        />
      </PositionRelative>
      <StyledP stepOne>간단한 레시피 소개를 해주세요.(필수)</StyledP>
      <StyledTextArea
        {...register(`desc`)}
        placeholder="직접 백종원 선생님의 레시피를 참고하여 변형하였습니다. "
        defaultValue={data.desc}
      ></StyledTextArea>
    </PostTemplete>
  );
};

export default PostStepOne;

const CloseP = styled.p`
  margin: 0;
  position: absolute;
  top: -3px;
  left: 6px;
`;

const TitleInput = styled.input`
  width: 315px;
  height: 60px;
  border-radius: 15px;
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

const ImgUploadButton = styled.label`
  width: 157.5px;
  height: 60px;
  border-radius: 10px 0px 0px 10px;
  background-color: #feae11;
  color: white;
  padding: 17px 0px 0px 23px;
  font-size: 1rem;
  font-weight: bold;
`;

const ImgCheckButton = styled.input`
  border: none;
  width: 157.5px;
  height: 60px;
  border-radius: 0px 10px 10px 0px;
  background-color: ${(props) => (props.state === true ? "#feae11" : "#c4c4c4")};
  color: white;
  font-size: 1rem;
  font-weight: bold;
  margin-left: 10px;
`;

const ButtonWrapper = styled.div`
  display: flex;
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
  border-radius: 15px;
  padding: 50px 45px 0 45px;
  font-size: 1rem;
  font-weight: bold;
  ${ResetTextarea}
  ${StyledScroll}
`;
