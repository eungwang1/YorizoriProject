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
      padding: 20px 14px 40px 14px;
      font-size: 1rem;
      border-bottom: 1px solid #1111;
      ::-webkit-scrollbar {
        display: none;
        width: 0 !important;
      }
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
