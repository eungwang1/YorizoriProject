import React from "react";
import styled, { css } from "styled-components";
import { SourceListState } from "./_Atom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { ContentTextWrapper, DeleteBtn, ContentText } from "../PostStyle";
import { useFormContext } from "react-hook-form";

const SourceView = () => {
  const sourceList = useRecoilValue(SourceListState);
  const setSourceList = useSetRecoilState(SourceListState);
  const { register } = useFormContext();
  const deleteSource = (index) => {
    setSourceList((oldList) => {
      const newList = oldList.filter(function (el, i) {
        return index !== i;
      });
      return newList;
    });
  };
  return (
    <div>
      {sourceList.map((item, index) => {
        return (
          <ContentTextWrapper key={`source_wrapper_${index}`}>
            {console.log(sourceList)}
            {console.log(item.key)}
            <ContentText
              {...register(`source_${index}`)}
              key={`source_${index}`}
              half
              placeholder="예) 고추장"
            ></ContentText>
            <ContentText
              {...register(`source_weight_${index}`)}
              key={`source_weight_${index}`}
              half
              placeholder="예) 30g"
            ></ContentText>
            {index + 1 === sourceList.length && (
              <DeleteBtn
                onClick={(event) => {
                  deleteSource(index);
                }}
                type="button"
              >
                x
              </DeleteBtn>
            )}
          </ContentTextWrapper>
        );
      })}
    </div>
  );
};
export default SourceView;
