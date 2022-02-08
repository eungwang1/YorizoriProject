import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import PostTemplete from "../PostTemplete";
import {
  StyledP,
  ContainerDiv,
  ModalBox,
  ImgBox,
  DeleteImg,
  ModalClose,
  ModalBackground,
} from "../commonStyle";
import AddOrder from "./OrderForm/AddOrder";
import OrderList from "./OrderForm/OrderList";
import { SubModalStateAtom, SubImageStateAtom, DeleteIndexAtom } from "../PostAtom/PostAtom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

const PostStepThreeBlock = styled.div``;

const PostStepThree = () => {
  const [subModalState, setSubModalState] = useRecoilState(SubModalStateAtom);
  const subImage = useRecoilValue(SubImageStateAtom);
  const setSubImage = useSetRecoilState(SubImageStateAtom);

  const [deleteIndex, setDeleteIndex] = useRecoilState(DeleteIndexAtom);
  const { index } = subModalState;
  const { preview } = subImage;
  const previewRef = useRef();

  const closePreview = () => {
    setSubModalState({
      ...subModalState,
      state: false,
    });
  };

  useEffect(() => {
    if (subModalState.state) {
      console.log(previewRef.current.src);
      previewRef.current.src = preview[index];
      setDeleteIndex(subModalState.index);
    }
  }, [subModalState.state, subImage]);

  const deleteImg = () => {
    setSubImage((oldList) => {
      const newList = {
        ...oldList,
        file: oldList.file.filter((el, idx) => Number(deleteIndex) !== Number(idx)),
        preview: oldList.preview.filter((el, idx) => Number(deleteIndex) !== Number(idx)),
      };
      newList.file.push(0);
      newList.preview.push(0);
      return newList;
    });

    setSubModalState({
      ...subModalState,
      state: false,
    });
  };

  return (
    <PostTemplete stepNum={3} page={3} request={"요리순서를 추가해 주세요.(1개 이상 필수)"}>
      <ModalBackground modalState={subModalState.state} onClick={closePreview} />
      <ModalBox sub modalState={subModalState.state}>
        <ImgBox ref={previewRef} src="" alt="none" />
        <DeleteImg onClick={deleteImg}>삭제하기</DeleteImg>
        <ModalClose onClick={closePreview}>x</ModalClose>
      </ModalBox>

      <ContainerDiv big>
        <OrderList></OrderList>
        <AddOrder></AddOrder>
      </ContainerDiv>
    </PostTemplete>
  );
};

export default PostStepThree;
