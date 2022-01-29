import React from "react";
import styled, { css } from "styled-components";
import { SourceListState } from "./_Atom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { ContentTextWrapper, DeleteBtn, ContentText } from "../PostStyle";

const SourceView = () => {
  const sourceList = useRecoilValue(SourceListState);
  const setSourceList = useSetRecoilState(SourceListState);
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
            <ContentText key={`source_${index}`} half placeholder="예) 소고기"></ContentText>
            <ContentText key={`source_weight_${index}`} half placeholder="예) 300g"></ContentText>
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
