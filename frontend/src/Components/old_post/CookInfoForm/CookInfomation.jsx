import React from "react";
import styled from "styled-components";
import { Dropdown } from "react-dropdown-now";
import { DropdownWrapper, CookInfo, TitleBox } from "../PostStyle";
import { useSetRecoilState } from "recoil";
import { servingsAtom, timeAtom, difficAtom } from "../postStates/postStates";

const CookInfomationBlock = styled.div``;

const CookInfomation = () => {
  const setServing = useSetRecoilState(servingsAtom);
  const setTime = useSetRecoilState(timeAtom);
  const setDiffic = useSetRecoilState(difficAtom);

  return (
    <CookInfomationBlock>
      <TitleBox cookinfo>
        <p>요리정보</p>
      </TitleBox>
      <DropdownWrapper cookinfo>
        <CookInfo>인원</CookInfo>
        <Dropdown
          placeholder="선택"
          options={["선택", "1인분", "2인분", "3인분", "4인분", "5인분", "6인분이상"]}
          // value="one"
          onChange={(value) => console.log("change!", value)}
          onSelect={(value) => {
            setServing(value.value);
            console.log("selected!", value);
          }} // always fires once a selection happens even if there is no change
        />
      </DropdownWrapper>
      <DropdownWrapper cookinfo>
        <CookInfo>시간</CookInfo>
        <Dropdown
          placeholder="선택"
          options={["선택", "5분이내", "10분이내", "15분이내", "30분이내", "60분이내", "1시간이상"]}
          // value="one"
          onChange={(value) => console.log("change!", value)}
          onSelect={(value) => {
            setTime(value.value);
            console.log("selected!", value);
          }} // always fires once a selection happens even if there is no change
        />
      </DropdownWrapper>
      <DropdownWrapper cookinfo>
        <CookInfo>난이도</CookInfo>
        <Dropdown
          placeholder="선택"
          options={["선택", "아무나", "초급", "중급", "고급", "신의경지"]}
          // value="one"
          onChange={(value) => console.log("change!", value)}
          onSelect={(value) => {
            setDiffic(value.value);
            console.log("selected!", value);
          }} // always fires once a selection happens even if there is no change
        />
      </DropdownWrapper>
    </CookInfomationBlock>
  );
};

export default CookInfomation;
