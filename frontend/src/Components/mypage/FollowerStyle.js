import styled, { css } from "styled-components";
import { StyledScroll } from '../post/commonStyle';


export const TargetPostBox = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  height: 300px;
`

export const TargetPostZone = styled.div`
  display: flex;
  justify-content: space-between;
  width: 330px;
  flex-wrap: wrap;
  overflow:scroll;
  overflow-x: hidden;
  ${StyledScroll}

  img {
    width: 140px;
    height: 140px;
    border-radius: 5px;
    margin: 0 10px 20px 10px;
  }
`