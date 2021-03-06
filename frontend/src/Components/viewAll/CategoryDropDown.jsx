import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Dropdown } from "react-dropdown-now";
import { searchAtom } from "../nav/NavAtom";
import { useRecoilState } from "recoil";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import {
  dropDownOptionsState,
  categoryAtom,
  materialAtom,
  conditionAtom,
  cookAtom,
  ViewAll,
  viewAllFamousPage,
  viewAllRecentPage,
  viewAllRecentPosts,
  sortState,
} from "../../states/ViewAllAtom";

const CategoryDropdown = () => {
  const dropDownOptions = useRecoilValue(dropDownOptionsState);
  const setDropDownOptions = useSetRecoilState(dropDownOptionsState);
  const [filterCategory, setFilterCategory] = useRecoilState(categoryAtom);
  const [filterMaterial, setFilterMaterial] = useRecoilState(materialAtom);
  const [filterCondition, setFilterCondition] = useRecoilState(conditionAtom);
  const resetSearchValue = useResetRecoilState(searchAtom);
  const [category, setCategoty] = useState([]);
  const [recipe, setRecipe] = useRecoilState(ViewAll);
  const resetView = useResetRecoilState(ViewAll);
  const resetCategory = useResetRecoilState(categoryAtom);
  const resetMaterial = useResetRecoilState(materialAtom);
  const resetCondition = useResetRecoilState(conditionAtom);
  const resetCook = useResetRecoilState(cookAtom);
  const [recipes, setRecipes] = useRecoilState(ViewAll);
  const [recentRecipes, setRecentRecipes] = useRecoilState(viewAllRecentPosts);
  const [famousPage, setFamousPage] = useRecoilState(viewAllFamousPage);
  const [recentPage, setRecentPage] = useRecoilState(viewAllRecentPage);
  const famousOrRecentCondition = useRecoilValue(sortState);

  const handleFilterCategory = (e) => {
    resetView();
    resetSearchValue();
    resetMaterial();
    resetCondition();
    resetCook();
    setFilterCategory(e.value);
  };
  const handleFilterMaterial = (e) => {
    resetView();
    resetSearchValue();
    resetCategory();
    resetCondition();
    resetCook();
    setFilterMaterial(e.value);
  };
  const handleFilterCondition = (e) => {
    resetView();
    resetSearchValue();
    resetCategory();
    resetMaterial();
    resetCook();
    setFilterCondition(e.value);
  };
  const handleFilterCook = (e) => {
    resetView();
    resetSearchValue();
    resetCategory();
    resetMaterial();
    resetCondition();
    setFilterCondition(e.value);
  };

  const onSelectResethandler = () => {
    if (famousOrRecentCondition === "famous") {
      if (famousPage !== 1) setRecipes([]);
      setFamousPage(1);
    }
    if (famousOrRecentCondition === "recent") {
      if (recentPage !== 1) setRecentRecipes([]);
      setRecentPage(1);
    }
  };

  return (
    <>
      <DropdownWrapper>
        <Dropdown
          placeholder="??????"
          options={["??????", "??????", "??????", "??????", "?????????", "??????", "??????"]}
          onChange={(e) => handleFilterCategory(e)}
          onSelect={(value) => {
            setDropDownOptions((dropDownValues) => {
              if (dropDownValues.category == value.value) return dropDownValues;
              if (dropDownValues.category == "" && value.value === "??????") return dropDownValues;
              return {
                ...dropDownValues,
                category: value.value === "??????" ? "" : value.value,
              };
            });
            onSelectResethandler();
            console.log("dropDownOptions", dropDownOptions);
          }} // always fires once a selection happens even if there is no change
        />
        <Dropdown
          placeholder="??????"
          options={["??????", "??????", "?????????", "?????????", "?????????", "??????/?????????", "??????"]}
          value="one"
          onChange={(e) => handleFilterMaterial(e)}
          onSelect={(value) => {
            setDropDownOptions((dropDownValues) => {
              if (dropDownValues.material == value.value) return dropDownValues;
              if (dropDownValues.material == "" && value.value === "??????") return dropDownValues;
              return {
                ...dropDownValues,
                material: value.value === "??????" ? "" : value.value,
              };
            });
            onSelectResethandler();
          }} // always fires once a selection happens even if there is no change
        />
        <Dropdown
          placeholder="??????"
          options={[
            "??????",
            "??????",
            "????????? ??????",
            "????????????",
            "????????????",
            "?????????",
            "??????",
            "??????",
            "????????????",
            "??????",
          ]}
          value="one"
          onChange={(e) => handleFilterCondition(e)}
          onSelect={(value) => {
            setDropDownOptions((dropDownValues) => {
              if (dropDownValues.condition == value.value) return dropDownValues;
              if (dropDownValues.condition == "" && value.value === "??????") return dropDownValues;
              return {
                ...dropDownValues,
                condition: value.value === "??????" ? "" : value.value,
              };
            });
            onSelectResethandler();
          }} // always fires once a selection happens even if there is no change
        />
        <Dropdown
          placeholder="??????"
          options={["??????", "??????", "??????", "??????", "?????????", "??????", "??????", "??????", "??????"]}
          className="last"
          value="one"
          onChange={(e) => handleFilterCook(e)}
          onSelect={(value) => {
            setDropDownOptions((dropDownValues) => {
              if (dropDownValues.cook == value.value) return dropDownValues;
              if (dropDownValues.cook == "" && value.value === "??????") return dropDownValues;
              return {
                ...dropDownValues,
                cook: value.value === "??????" ? "" : value.value,
              };
            });
            onSelectResethandler();
          }} // always fires once a selection happens even if there is no change
        />
      </DropdownWrapper>
      <Line />
    </>
  );
};

export default CategoryDropdown;

const ButtonWrapper = styled.div`
  margin: 12px 0px;
  & > button {
    width: 95px;
    height: 45px;
    color: white;
    border: 2px solid #feae11;
    border-radius: 50px;
    line-height: 36px;
    font-size: 16px;
    font-weight: 900;

    &:first-child {
      margin-right: 16px;
    }
  }
`;
const Line = styled.div`
  width: 360px;
  height: 1px;
  background-color: rgba(0, 0, 0, 0.14);
`;
const DropdownWrapper = styled.div`
  display: flex;
  margin: 14px 0;
  justify-content: center;
  & > div {
    width: 76px;
    height: 36px;
    border: 2px solid #feae11;
    border-radius: 50px;
    line-height: 36px;
    font-size: 13px;
    font-weight: 900;
    color: #feae11;
    text-align: center;

    &:not(:last-child) {
      margin-right: 8px;
    }
    & > div:not(:first-child) {
      background-color: white;
      width: 120px;
      z-index: 100;
      color: #feae11;
      transform: translateY(-5px) translateX(10px);
      border-radius: 10px;
      border: 2px solid #feae11;
    }
    .last:not(:first-child) {
      transform: translateY(-5px) translateX(-60px);
    }
    .situation:nth-child(2) > :nth-child(3) {
      font-size: 13px;
    }
  }
`;
