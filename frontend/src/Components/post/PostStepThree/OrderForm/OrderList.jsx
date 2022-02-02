import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { ResetTextarea, Preview } from "../../commonStyle";
import { useForm, useFormContext } from "react-hook-form";
import {
  OrderListAtom,
  SubImageStateAtom,
  SubModalStateAtom,
  DeleteIndexAtom,
} from "../../PostAtom/PostAtom";

const OrderList = () => {
  const [OrderList, setOrderList] = useRecoilState(OrderListAtom);
  const [subModalState, setSubModalState] = useRecoilState(SubModalStateAtom);
  const [deleteIndex, setDeleteIndex] = useRecoilState(DeleteIndexAtom);
  const subImage = useRecoilValue(SubImageStateAtom);
  const setSubImage = useSetRecoilState(SubImageStateAtom);

  const { watch, setValue } = useForm();
  const { register } = useFormContext();

  // useEffect(() => {
  //   const subscription = watch((value) => {
  //     console.log(value);
  //     localStorage.setItem("order", JSON.stringify(value));
  //   });
  //   console.log(subImage);
  // }, [watch, subImage]);

  // useEffect(() => {
  //   if (localStorage.getItem("order")) {
  //     const getOrder = JSON.parse(localStorage.getItem("order"));
  //     OrderList.forEach((el, idx) => {
  //       setValue(`order_${idx + 1}`, eval(`getOrder.order_${idx + 1}`));
  //       setValue(`orderTimeMin_${idx + 1}`, eval(`getOrder.orderTimeMin_${idx + 1}`));
  //       setValue(`orderTimeSec_${idx + 1}`, eval(`getOrder.orderTimeSec_${idx + 1}`));
  //     });
  //   }
  // }, []);

  const deleteIngredient = (index) => {
    setValue(`order_${index + 1}`, "");
    setValue(`orderTimeMin_${index + 1}`, "");
    setValue(`orderTimeSec_${index + 1}`, "");
    setOrderList((oldList) => {
      const newList = oldList.filter(function (el, idx) {
        return index !== idx;
      });
      return newList;
    });

    setSubImage((oldList) => {
      const newList = {
        ...oldList,
        file: oldList.file.filter((el, idx) => Number(index + 1) !== Number(idx)),
        preview: oldList.preview.filter((el, idx) => Number(index + 1) !== Number(idx)),
      };
      newList.file.push(0);
      newList.preview.push(0);
      return newList;
    });
  };

  const handleImage = (e, index) => {
    let cur_file = e.target.files[0];
    console.log(e.target);
    const filesInArr = Array.from(e.target.files);
    const previewArr = [window.URL.createObjectURL(cur_file)];
    if (cur_file) {
      setSubImage((oldList) => {
        const newList = {
          ...oldList,
          file: oldList.file.map((el, idx) => {
            if (el) {
              return el;
            } else if (idx === index + 1) {
              return cur_file;
            }
          }),
          preview: oldList.preview.map((el, idx) => {
            if (el) {
              return el;
            } else if (idx === index + 1) {
              return window.URL.createObjectURL(cur_file);
            }
          }),
        };
        return newList;
      });
    }
  };

  const openPreview = (e) => {
    setSubModalState({
      ...subModalState,
      state: true,
      index: e.target.dataset.name,
    });
    setDeleteIndex(e.target.dataset.name);
  };

  return (
    <>
      {OrderList.map((item, index) => {
        return (
          <Wrapper key={`order_wrapper_${index}`}>
            <Ingredient
              {...register(`order_${index + 1}`)}
              placeholder="ex) 마늘을 잘게 썬다."
              key={`order_${index}`}
            ></Ingredient>
            <TimeWrapper key={`TimeWrapper_${index}`}>
              {subImage.file[index + 1] ? (
                <Preview
                  key={`Preview_${index}`}
                  data-name={`${index + 1}`}
                  cookImgPreview
                  onClick={openPreview}
                />
              ) : (
                <ImgUploadLabel key={`ImgUploadLabel_${index}`} htmlFor={`main_img_${index}`} />
              )}
              <ImgUploadInput
                onChange={(e) => {
                  handleImage(e, index);
                }}
                key={`ImgUploadInput_${index}`}
                id={`main_img_${index}`}
                type="file"
                accept="image/*"
              />
              <TimeInput
                {...register(`orderTimeMin_${index + 1}`)}
                placeholder="05"
                type="number"
                min="0"
                key={`TimeInput_min_${index}`}
              />

              <p>:</p>
              <TimeInput
                {...register(`orderTimeSec_${index + 1}`)}
                placeholder="00"
                type="number"
                max="60"
                min="0"
                key={`TimeInput_sec_${index}`}
              />
            </TimeWrapper>
            {index + 1 === OrderList.length && (
              <DeleteBtn
                key={`DeleteBtn_${index}`}
                onClick={() => {
                  deleteIngredient(index);
                }}
              >
                x
              </DeleteBtn>
            )}
          </Wrapper>
        );
      })}
    </>
  );
};

export default OrderList;

const Wrapper = styled.div`
  + div {
    margin-top: 10px;
  }
  position: relative;
  text-align: right;
  margin-top: 20px;
`;

const DeleteBtn = styled.div`
  width: 10px;
  position: absolute;
  top: 3px;
  color: #6666;
`;

const TimeInput = styled.input`
  width: 30px;
  font-weight: bold;
  border: none;
  padding-left: 7px;
  height: 16px;
`;

const Ingredient = styled.textarea`
  width: 235px;
  height: 54px;
  border: 1px solid #feae11;
  box-sizing: border-box;
  border-radius: 50px;
  padding: 15px 55px 0px 25px;
  font-size: 1rem;
  font-weight: bold;
  ${ResetTextarea};
`;

const TimeWrapper = styled.div`
  width: 95px;
  height: 25px;
  border: 1px solid #feae11;
  box-sizing: border-box;
  border-radius: 50px;
  padding: 0px 10px 0px 10px;
  font-size: 1rem;
  font-weight: bold;
  margin-left: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const ImgUploadLabel = styled.label`
  position: absolute;
  width: 26px;
  height: 28px;
  background-image: url("../images/bi_camera.png");
  top: -45px;
  right: 14px;
`;

const ImgUploadInput = styled.input`
  display: none;
`;
