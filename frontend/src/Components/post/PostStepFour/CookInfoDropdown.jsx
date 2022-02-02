import React, { useEffect, useState } from "react";
import { cookInfoAtom } from "../PostAtom/PostAtom";
import styled from "styled-components";
import { DropdownWrapper } from "../commonStyle";
import { Dropdown } from "react-dropdown-now";
import { useRecoilState } from "recoil";

const CookInfoDropdown = () => {
  const [cookInfo, setCookInfo] = useRecoilState(cookInfoAtom);

  // useEffect(() => {
  //   if (localStorage.getItem("cookInfo")) {
  //     const getCookInfo = JSON.parse(localStorage.getItem("cookInfo"));
  //     setCookInfo({
  //       servings: getCookInfo.servings,
  //       time: getCookInfo.time,
  //       diffic: getCookInfo.diffic,
  //     });
  //   }
  // }, []);

  // console.log(cookInfo);

  // useEffect(() => {
  //   localStorage.setItem("cookInfo", JSON.stringify(cookInfo));
  // }, [cookInfo]);

  return (
    <>
      <DropdownWrapper small>
        <Dropdown
          placeholder={cookInfo.servings ? cookInfo.servings : "인원"}
          options={["1인분", "2인분", "3인분", "4인분", "5인분", "6인분이상"]}
          onSelect={(value) => {
            console.log("selected!", value);
            setCookInfo({
              ...cookInfo,
              servings: value.value,
            });
          }}
        />
        <Dropdown
          placeholder={cookInfo.time ? cookInfo.time : "시간"}
          options={["5분이내", "10분이내", "15분이내", "30분이내", "60분이내", "1시간이상"]}
          onSelect={(value) => {
            console.log("selected!", value);
            setCookInfo({
              ...cookInfo,
              time: value.value,
            });
          }}
        />
        <Dropdown
          placeholder={cookInfo.diffic ? cookInfo.diffic : "난이도"}
          options={["아무나", "초급", "중급", "고급", "신의경지"]}
          onSelect={(value) => {
            console.log("selected!", value);
            setCookInfo({
              ...cookInfo,
              diffic: value.value,
            });
          }}
        />
      </DropdownWrapper>
    </>
  );
};

export default CookInfoDropdown;
