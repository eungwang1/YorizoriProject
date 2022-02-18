import styled, { css } from "styled-components";
import { StyledScroll } from "../post/commonStyle";

export const TargetPostBox = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  height: 300px;
`;

export const TargetPostZone = styled.div`
  display: flex;
  justify-content: space-between;
  width: 330px;
  flex-wrap: wrap;
  overflow: scroll;
  overflow-x: hidden;
  ${StyledScroll}
  justify-content: center;

  img {
    width: 140px;
    height: 140px;
    border-radius: 5px;
    margin-bottom: 5px;
  }
`;

export const PostWrapper = styled.div`
  width: 150px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & > div {
    width: 140px;
    margin: 0;
    font-size: 14px;
    font-weight: 900;
  }
`;
