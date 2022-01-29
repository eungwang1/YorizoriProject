import styled, { css } from "styled-components";

export const ContentTextWrapper = styled.div`
  display: flex;
  position: relative;
`;

export const DeleteBtn = styled.div`
  color: #7777;
  right: 20px;
  top: 20px;
  position: absolute;
`;

export const ContentText = styled.textarea`
  resize: none;
  font-size: 0.77rem;
  width: 100vw;
  height: 112px;
  padding: 24px 14px;
  border: none;
  box-sizing: border-box;
  background-color: white;
  :focus {
    outline: none;
  }
  ${(props) =>
    props.tip &&
    css`
      height: 81px;
      padding: 30px 0 30px 15px;
      font-size: 1rem;
    `}
  ${(props) =>
    props.tag &&
    css`
      height: 150px;
      padding: 8px 14px 40px 14px;
      font-size: 1rem;
    `}
  ${(props) =>
    props.half &&
    css`
      height: 61px;
      /* padding: 20px 14px 40px 14px; */
      padding: 0px 14px;
      font-size: 1rem;
      border-bottom: 1px solid #1111;
      ::-webkit-scrollbar {
        display: none;
        width: 0 !important;
      }
      padding-top: 20px;
    `}
`;

export const AddCookOrder = styled.div`
  width: 100vw;
  text-align: center;
  padding: 12px 0;
  font-weight: 600;
  ::before {
    content: "+";
    color: white;
    margin-right: 5px;
    padding: 0px 5px;
    background-color: #feae11;
    border-radius: 100px;
  }
`;

export const PostFormBlock = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const TitleBox = styled.div`
  width: 100vw;
  height: 55px;
  background-color: #feae11;
  color: white;
  font-size: 1rem;
  padding-left: 15px;
  box-sizing: border-box;
  ${(props) =>
    props.cookinfo &&
    css`
      display: flex;
    `}
`;

export const TitleInput = styled.input`
  font-size: 1rem;
  width: 100vw;
  padding: 30px 0px 30px 15px;
  border: none;
  background-color: white;
  :focus {
    outline: none;
  }
`;

export const TagInfo = styled.div`
  font-size: 0.77rem;
  width: 360px;
  height: 50px;
  padding: 18px 14px 44px 14px;
  border: none;
  box-sizing: border-box;
  background-color: white;
  border-bottom: 1px solid #1111;
`;

export const ImgBox = styled.div`
  width: 100vw;
  height: 242px;
  background-color: #1111;
  position: relative;
  background-image: url("../images/camera.png");
  background-repeat: no-repeat;
  background-position: 45px 40px;
  ${(props) =>
    props.small &&
    css`
      width: 76px;
      height: 76px;
    `}
`;

export const CookInfo = styled.div`
  width: 50vw;
  height: 61px;
  box-sizing: border-box;
  padding: 20px 0px 20px 10px;
  font-size: 1rem;
  font-weight: 400;
  font-family: Roboto;
  position: relative;
  border: 0.1px solid #1111;
`;

export const DropdownWrapper = styled.div`
  display: flex;
  .rdn {
    width: 50vw;
    height: 61px;
    box-sizing: border-box;
    padding: 20px 0px 20px 10px;
    font-size: 1rem;
    font-weight: 400;
    font-family: Roboto;
    position: relative;
  }
  .rdn-control-placeholder {
    padding-left: 8px;
  }

  .rdn-control {
    position: relative;
    display: flex;
  }

  .rdn-control-arrow {
    width: 0;
    height: 0;
    border-top: 10px solid #feae11;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    position: absolute;
    right: 10px;
    top: 7px;
  }

  .rdn-drop {
    margin-top: 10px;
    position: absolute;
    left: 10px;
    right: 40px;
    top: -50px;
    box-shadow: 5px 5px 5px #9999;
    z-index: 100;
  }

  .rdn-drop-menu-option {
    background-color: white;
    box-sizing: border-box;
    padding: 8px;
  }

  ${(props) =>
    props.cookinfo &&
    css`
      .rdn {
        border: 0.1px solid #1111;
      }
    `}
`;

export const CookOrderWrappr = styled.div`
  display: flex;
  :focus {
    outline: none;
  }
  align-items: center;
  height: 100px;
  border-bottom: 1px solid #1111;
  padding-left: 12px;
  position: relative;
`;
export const TimeContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 180px;
  box-sizing: border-box;
  margin-left: 10px;
`;
export const TimeSetDiv = styled.input`
  border: none;
  padding-left: 14px;
`;

export const OrderText = styled.textarea`
  font-size: 1rem;
  width: 180px;
  height: 65px;
  padding: 15px 14px 0px 14px;
  border: none;
  box-sizing: border-box;
  background-color: white;
  resize: none;
  :focus {
    outline: none;
  }
  ::-webkit-scrollbar {
    display: none;
    width: 0 !important;
  }
`;

export const ImgBoxSmall = styled.div`
  width: 76px;
  height: 76px;
  position: relative;
  background-color: #1111;
  ::before {
    content: "+";
    position: absolute;
    left: 27px;
    top: 14px;
    color: #9999;
    font-size: 2.5rem;
  }
  ${(props) =>
    props.album &&
    css`
      + div {
        margin-left: 10px;
      }
    `}
`;

export const OrderNum = styled.div`
  color: white;
  width: 10px;
  padding: 0px 5px;
  background-color: #feae11;
  border-radius: 110px;
  height: 20px;
`;

export const TimeSetBtn = styled.button`
  border-style: none;
  background-color: rgba(254, 174, 17, 0.3);
  border-radius: 8px;
  width: 105px;
  margin: 0px 0px 0px 10px;
  height: 24px;
  font-size: 0.7rem;
  font-weight: 600;
`;
