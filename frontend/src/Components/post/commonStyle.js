import { waitForNone } from "recoil";
import styled, { css } from "styled-components";

export const StyledP = styled.p`
  padding-left: 12px;
  font-size: 0.8rem;
  color: rgba(0, 0, 0, 0.5);
  font-weight: 600;
  width: 315px;

  ${(props) =>
    props.stepOne &&
    css`
      padding-top: 10px;
    `}
  ${(props) =>
    props.stepFour &&
    css`
      padding-left: 3px;
      padding-bottom: 20px;
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

export const ResetTextarea = css`
  resize: none;
  :focus {
    outline: none;
  }
`;

export const ContainerDiv = styled.div`
  width: 321px;
  overflow-y: ${(props) => (props.drop ? "visible" : "auto")};

  height: ${(props) => {
    if (props.big) {
      return "321px";
    }
    if (props.small) {
      return "80px";
    }
    return "147px";
  }};

  border: 1px solid #cfcfcf;
  box-sizing: border-box;
  border-radius: 14px;
  padding: 7px 29px 0px 15px;
  display: flex;
  flex-direction: column;
  ${StyledScroll};

  ${(props) =>
    props.drop &&
    css`
      padding: 7px 15px 0px 15px;
    `}
  ${(props) =>
    props.stepTwo &&
    css`
      border: none;
    `}
    ${(props) =>
    props.big &&
    css`
      border: none;
    `}
`;

export const AddBtn = styled.div`
  text-align: center;
  padding: 12px 0;
  font-weight: 900;

  ::before {
    content: "+";
    color: white;
    margin-right: 8px;
    padding: 0px 6px;
    background-color: #feae11;
    border-radius: 100px;
    font-size: 13px;
  }
`;

export const DropdownWrapper = styled.div`
  display: flex;
  margin: 7px 0;
  justify-content: center;

  .rdn {
    position: relative;
  }

  .rdn-drop {
    position: absolute;
    top: 40px;
    left: 2px;
    z-index: 999;
  }

  .rdn-control {
    position: relative;
  }

  .rdn-control-arrow {
    width: 14px;
    height: 14px;
    background-image: url("../../images/dropArrow.png");
    background-repeat: no-repeat;
    background-size: contain;
    position: absolute;
    top: 8px;
    right: 6px;
  }

  .rdn-drop-menu-option {
    padding: 8px 0;
  }

  & > div {
    width: 140px;
    height: 55px;
    border: 2px solid #feae11;
    border-radius: 50px;
    box-sizing: border-box;
    font-size: 1rem;
    text-align: center;
    padding-top: 14px;
    padding-right: 20px;
    &:not(:last-child) {
      margin-right: 9px;
      ${(props) =>
        props.small &&
        css`
          margin-right: 5px;
        `}
    }
    & > div:not(:first-child) {
      background-color: white;
      width: 120px;
      z-index: 100;
      color: #feae11;
      border-radius: 10px;
      border: 2px solid #feae11;
    }
    .last:not(:first-child) {
      /* transform: translateY(-5px) translateX(-60px); */
    }
    .situation:nth-child(2) > :nth-child(3) {
      font-size: 13px;
    }
  }

  ${(props) =>
    props.small &&
    css`
      & > div {
        width: 90px;
        font-size: 0.9rem;
      }

      .rdn-control-arrow {
        top: 8px;
        right: -5px;
        width: 10px;
      }
    `}
`;

export const Preview = styled.div`
  background-repeat: no-repeat;
  background-size: contain;
  position: absolute;
  width: 26px;
  height: 20px;
  background-image: url("../images/PreviewEye.png");
  bottom: 18px;
  left: 110px;

  ${(props) =>
    props.cookImgPreview &&
    css`
      top: -37px;
      bottom: 0px;
      right: 15px;
      left: 53px;
    `}
`;
export const ModalBox = styled.div`
  position: fixed;
  top: 200px;
  width: 346px;
  height: 300px;
  background-color: white;
  border-radius: 11px;
  font-weight: 900;
  display: ${(props) => (props.modalState === true ? "flex" : "none")};
  justify-content: center !important;
  align-items: center;
  flex-direction: column;
  z-index: 999;
  /* 
  ${(props) =>
    props.sub &&
    css`
      right: 7px;
    `} */
`;
export const ModalBackground = styled.div`
  display: ${(props) => (props.modalState === true ? "flex" : "none")};

  position: fixed;
  top: -150px;
  width: 100%;
  height: 150%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 500;
  justify-content: center;
  overflow: hidden;
`;

export const ImgBox = styled.img`
  width: 300px;
  height: 300px;
  position: relative;
`;

export const DeleteImg = styled.div`
  position: absolute;
  border-radius: 10px;
  background-color: #888;
  color: white;
  padding: 5px;
  bottom: 0;
  right: 0;
  margin: 10px;
`;

export const ModalClose = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  margin: 10px;
  border-radius: 5px;
  background-color: #888;
  color: white;
  width: 20px;
  height: 20px;
  text-align: center;
`;
