import React from "react";
import styled from "styled-components";
import { useForm, FormProvider } from "react-hook-form";
import {
  postPageStateAtom,
  MainImageStateAtom,
  SubImageStateAtom,
  categoryAtom,
  cookInfoAtom,
  InvalidationAtom,
} from "./PostAtom/PostAtom";
import { useRecoilState, useRecoilValue } from "recoil";
import PostStepOne from "./PostStepOne/PostStepOne";
import PostStepTwo from "./PostStepTwo/PostStepTwo";
import PostStepThree from "./PostStepThree/PostStepThree";
import PostStepFour from "./PostStepFour/PostStepFour";
import { Invalidation } from "./util/Invalidation.jsx";
import axios from "axios";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

const PostFormBlock = styled.form``;
document.addEventListener(
  "keydown",
  function (event) {
    if (event.keyCode === 13) {
      event.preventDefault();
    }
  },
  true
);

function setFormData(formData, data, parentKey) {
  if (!(formData instanceof FormData)) return;
  if (!(data instanceof Object)) return;
  Object.keys(data).forEach((key) => {
    const val = data[key];
    if (parentKey) key = `${parentKey}[${key}]`;
    if (val instanceof Object && !Array.isArray(val)) {
      return setFormData(formData, val, key);
    }
    if (Array.isArray(val)) {
      val.forEach((v, idx) => {
        if (v instanceof Object) {
          setFormData(formData, v, `${key}[${idx}]`);
        } else {
          formData.append(`${key}[${idx}]`, v);
        }
      });
    } else {
      formData.append(key, val);
    }
  });
}

const PostForm = () => {
  const [postPageState, setPostpostPageState] = useRecoilState(postPageStateAtom);
  const mainImage = useRecoilValue(MainImageStateAtom);
  const cookInfo = useRecoilValue(cookInfoAtom);
  const category = useRecoilValue(categoryAtom);
  const subImage = useRecoilValue(SubImageStateAtom);
  const [invalidationState, setInvalidationState] = useRecoilState(InvalidationAtom);
  const navigate = useNavigate();
  const methods = useForm();

  const onSubmit = async (data) => {
    let ingredient = [];
    let seasoning = [];
    let process = [];
    let process_el;
    let ingre_el;
    let seasoning_el;
    let time = {
      min: 0,
      sec: 0,
    };
    let processImage = [];
    let ImageIndex = 1;
    for (let [key, value] of Object.entries(data)) {
      // ingredient
      if (key.indexOf("ingredient_") > -1 && value.length >= 1) {
        ingre_el = new Object({
          ingreName: "",
        });
        ingre_el.ingreName = value;
      }
      if (key.indexOf("ingredientVolume_") > -1 && value.length) {
        ingre_el = {
          ...ingre_el,
          ingreCount: "",
        };
        ingre_el.ingreCount = value;
        ingredient.push(ingre_el);
      }

      // seasoning
      if (key.indexOf("source_") > -1 && value.length) {
        seasoning_el = new Object({
          ingreName: "",
        });
        seasoning_el.ingreName = value;
      }
      if (key.indexOf("sourceVolume_") > -1 && value.length) {
        seasoning_el = {
          ...seasoning_el,
          ingreCount: "",
        };
        seasoning_el.ingreCount = value;
        seasoning.push(seasoning_el);
      }

      // process
      if (key.indexOf("order_") > -1 && value.length >= 1) {
        console.log(`process : ${value}`);
        process_el = new Object({
          explain: "",
        });
        process_el.explain = value;
        if (subImage.file[ImageIndex]) {
          processImage.push(subImage.file[ImageIndex]);
          ImageIndex++;
        } else {
          setPostpostPageState(3);
          swal("", "요리순서 이미지는 필수입니다.", "info");
          return;
        }
      }
      if (key.indexOf("orderTimeMin_") > -1) {
        process_el = {
          ...process_el,
          processTime: "",
        };
        time = {
          ...time,
          min: value,
        };
      }
      if (key.indexOf("orderTimeSec_") > -1) {
        time = {
          ...time,
          sec: value,
        };
        process_el.processTime = time;
        if (process_el.explain) process.push(process_el);

        process_el = {
          ...process_el,
          explain: "",
        };
      }
    }

    const filteredData = {
      desc: data.desc,
      recipeName: data.recipeName,
      ingredient: ingredient,
      seasoning: seasoning,
      process: process,
    };

    const submitData = {
      ...filteredData,
      ...cookInfo,
      ...category,
    };

    if (Invalidation(submitData, setPostpostPageState, mainImage, setInvalidationState) === true) {
      const formData = new FormData();
      setFormData(formData, submitData);
      formData.append("thumbnail", mainImage.file[0]);
      processImage.map((eachfile) => {
        formData.append("copyImage", eachfile);
      });

      for (var pair of formData.entries()) {
        console.log(pair[0] + ", " + pair[1]);
      }

      await axios
        .post("/post", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          swal("등록 성공", "레시피가 등록되었습니다.", "success").then(() => {
            // navigate("/");
            window.location.replace("/");
          });
        })
        .catch((err) => {
          swal("등록 실패", "", "error");
          console.log(err);
        });

      //데이터 누수를 방지하기위해 미리보기를 위해 생성한 URL 삭제.
      subImage.preview.map((el, idx) => {
        if (el) {
          return window.URL.revokeObjectURL(el);
        }
      });
      window.URL.revokeObjectURL(mainImage.preview);
    }
  };

  return (
    <FormProvider {...methods}>
      <PostFormBlock onSubmit={methods.handleSubmit(onSubmit)}>
        {postPageState === 1 ? (
          <PostStepOne></PostStepOne>
        ) : postPageState === 2 ? (
          <PostStepTwo></PostStepTwo>
        ) : postPageState === 3 ? (
          <PostStepThree></PostStepThree>
        ) : postPageState === 4 ? (
          <PostStepFour></PostStepFour>
        ) : (
          <PostStepOne></PostStepOne>
        )}
      </PostFormBlock>
    </FormProvider>
  );
};

export default PostForm;
