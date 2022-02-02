import React, { useEffect, useState } from "react";
import { DropdownWrapper } from "../commonStyle";
import { Dropdown } from "react-dropdown-now";
import { categoryAtom } from "../PostAtom/PostAtom";
import { useRecoilState } from "recoil";

const CategoryDropdown = () => {
  const [category, setCategory] = useRecoilState(categoryAtom);

  // useEffect(() => {
  //   if (localStorage.getItem("category")) {
  //     const getCategory = JSON.parse(localStorage.getItem("category"));
  //     setCategory({
  //       category: getCategory.category,
  //       material: getCategory.material,
  //       condition: getCategory.condition,
  //       cook: getCategory.cook,
  //     });
  //   }
  // }, []);

  // console.log(category);

  // useEffect(() => {
  //   localStorage.setItem("category", JSON.stringify(category));
  // }, [category]);

  return (
    <>
      <DropdownWrapper>
        <Dropdown
          placeholder={category.category ? category.category : "종류별"}
          options={["한식", "중식", "일식", "아시안", "양식", "기타"]}
          onSelect={(value) => {
            console.log("selected!", value);
            setCategory({
              ...category,
              category: value.value,
            });
          }}
        />
        <Dropdown
          placeholder={category.material ? category.material : "재료별"}
          options={["육류", "채소류", "해물류", "과일류", "달걀/유제품", "기타"]}
          onSelect={(value) => {
            console.log("selected!", value);
            setCategory({
              ...category,
              material: value.value,
            });
          }}
        />
      </DropdownWrapper>
      <DropdownWrapper>
        <Dropdown
          placeholder={category.condition ? category.condition : "상황별"}
          options={[
            "파티",
            "주말에 혼먹",
            "근사하게",
            "다이어트",
            "영양식",
            "야식",
            "간식",
            "초스피드",
            "기타",
          ]}
          onSelect={(value) => {
            console.log("selected!", value);
            setCategory({
              ...category,
              condition: value.value,
            });
          }}
        />
        <Dropdown
          placeholder={category.cook ? category.cook : "방법별"}
          options={["볶음", "무침", "비빔", "끓이기", "굽기", "삶기", "튀김", "기타"]}
          onSelect={(value) => {
            console.log("selected!", value);
            setCategory({
              ...category,
              cook: value.value,
            });
          }}
        />
      </DropdownWrapper>
    </>
  );
};

export default CategoryDropdown;
