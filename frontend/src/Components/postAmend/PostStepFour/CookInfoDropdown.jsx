import React, { useEffect } from "react";
import { cookInfoAtom } from "../PostAtom/PostAtom";
import { DropdownWrapper } from "../commonStyle";
import { Dropdown } from "react-dropdown-now";
import { useRecoilState } from "recoil";

const CookInfoDropdown = ({ data }) => {
  const [cookInfo, setCookInfo] = useRecoilState(cookInfoAtom);

  useEffect(() => {
    console.log(cookInfo);
    if (!cookInfo.servings) {
      setCookInfo({
        ...cookInfo,
        servings: data.servings,
      });
    }
    if (!cookInfo.time) {
      setCookInfo({
        ...cookInfo,
        time: data.time,
      });
    }
    if (!cookInfo.diffic) {
      setCookInfo({
        ...cookInfo,
        diffic: data.diffic,
      });
    }
  }, [cookInfo]);

  return (
    <>
      <DropdownWrapper small>
        <Dropdown
          placeholder={cookInfo.servings ? cookInfo.servings : "인원"}
          options={["1인분", "2인분", "3인분", "4인분", "5인분", "6인분이상"]}
          onSelect={(value) => {
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
