import styled, { css } from "styled-components";

export const StyledP = styled.p`
  padding-left: 40px;
  width: 100vw;
  font-size: 0.8rem;
  color: rgba(0, 0, 0, 0.5);
  font-weight: 600;
  ${(props) =>
    props.stepOne &&
    css`
      padding-top: 20px;
    `}
  ${(props) =>
    props.stepFour &&
    css`
      padding-left: 24px;
      height: 11px;
    `}
    ${(props) =>
    props.temp &&
    css`
      margin-top: 0;
    `}
`;

export const StyledScroll = css`
  ::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #e09f21;
    border-radius: 10px;
  }
  ::-webkit-scrollbar-track {
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 10px;
  }
`;

export const ContainerDiv = styled.div`
  width: 321px;
  height: ${(props) => {
    if (props.big) {
      return "321px";
    }
    if (props.small) {
      return "75px";
    }
    return "147px";
  }};
  border: 1px solid #cfcfcf;
  box-sizing: border-box;
  border-radius: 14px;
  ${StyledScroll}
`;
