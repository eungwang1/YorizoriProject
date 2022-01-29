import React from "react";
import styled from "styled-components";
import { Dropdown } from "react-dropdown-now";
import { DropdownWrapper, CookInfo, TitleBox } from "../PostStyle";

const Category = () => {
  return (
    <>
      <TitleBox>
        <p>카테고리</p>
      </TitleBox>
      {/* <Dropdown
    placeholder="::종류별::"
    className="my-className"
    options={["한식", "중식", "일식"]}
  /> */}
      <DropdownWrapper>
        <Dropdown
          placeholder="::종류별::"
          options={["::종류별::", "한식", "중식", "일식", "아시안", "양식", "기타"]}
          // value="one"
          onChange={(value) => console.log("change!", value)}
          onSelect={(value) => console.log("selected!", value)} // always fires once a selection happens even if there is no change
          onClose={(closedBySelection) => console.log("closedBySelection?:", closedBySelection)}
          onOpen={() => console.log("open!")}
        />
        <Dropdown
          placeholder="::상황별::"
          options={[
            "::상황별::",
            "파티할 때",
            "주말에 혼먹",
            "근사한 분위기",
            "다이어트",
            "영양식",
            "야식",
            "간식",
            "초스피드",
            "기타",
          ]}
          // value="one"
          onChange={(value) => console.log("change!", value)}
          onSelect={(value) => console.log("selected!", value)} // always fires once a selection happens even if there is no change
        />
      </DropdownWrapper>
      <DropdownWrapper>
        <Dropdown
          placeholder="::재료별::"
          options={["::재료별::", "육류", "채소류", "해물류", "과일류", "달걀/유제품", "기타"]}
          // value="one"
          onChange={(value) => console.log("change!", value)}
          onSelect={(value) => console.log("selected!", value)} // always fires once a selection happens even if there is no change
        />
        <Dropdown
          placeholder="::방법별::"
          options={["::방법별::", "볶음", "무침", "비빔", "끓이기", "굽기", "삶기", "튀김", "기타"]}
          // value="one"
          onChange={(value) => console.log("change!", value)}
          onSelect={(value) => console.log("selected!", value)} // always fires once a selection happens even if there is no change
        />
      </DropdownWrapper>
    </>
  );
};

export default Category;
