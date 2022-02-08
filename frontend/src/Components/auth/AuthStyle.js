import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

export const StyledInput = styled.input`
  font-size: 1rem;
  width: 340px;
  height: 50px;
  border: 1px solid #dcd9d9;
  border-radius: 6px;

  padding: 13px 0 13px 10px;
  box-sizing: border-box;
  + input {
    margin-top: 20px;
  }
  :focus {
    outline: 1px solid #feae11;
  }
`;

export const StyledButton = styled.button`
  font-size: 1rem;
  width: 340px;
  height: 50px;
  border: none;
  color: white;
  border-radius: 6px;
  box-sizing: border-box;
  background-color: #feae11;
  margin-top: 19px;
  text-align: center;
`;

export const ToggleEyeImg = styled.img`
  width: 17px;
  position: absolute;
  bottom: 16px;
  right: 14px;
`;

export const InputImgWrapper = styled.div`
  position: relative;
  + div {
    margin-top: 26px;
  }
`;

export const InputLabel = styled.label`
  margin-right: 250px;
  color: #555555;
  font-size: 0.83em;
  font-weight: 700;
  + div {
    margin-bottom: 6px;
  }
  + input {
    margin-bottom: 6px;
  }
  width: 100px;
`;

export const ErrorText = styled.p`
  color: red;
  font-size: 0.8rem;
  line-height: 1;
  font-weight: bold;
  margin: 0 0 10px 20px;
  width: 100%;
  ${(props) =>
    props.loginError &&
    css`
      margin: 4px 0 0 3px;
      + input {
        margin-top: 10px;
      }
    `}
`;

export const StyledDiv = styled.div`
  position: absolute;
  background-color: white;
  display: block;
  z-index: 1;
  text-align: center;
  margin-top: 2px;
  width: 100px;
  font-weight: 900;
  color: #4c4545bd;
  font-size: 0.9rem;
  ${(props) =>
    props.easyLogin &&
    css`
      color: #9999;
      margin-top: 2px;
      font-size: 0.75rem;
      width: 83px;
    `}
`;

export const DivWrapper = styled.div`
  margin-top: 30px;
  position: relative;
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: center;
`;

export const CenterLink = styled(Link)`
  margin-top: 10px;
  position: relative;
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: center;
`;

export const StyledHr = styled.hr`
  border: 0.6px solid #4c4545bd;
  opacity: 0.6;
  width: 100%;
  ${(props) =>
    props.login &&
    css`
      margin-top: 23px;
      width: 57px;
    `}
  ${(props) =>
    props.easyLogin &&
    css`
      border: 0.05px solid #9999;
      opacity: 0.3;
    `}
`;
