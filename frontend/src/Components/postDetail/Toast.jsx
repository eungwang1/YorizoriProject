import styled from "styled-components";
import React from "react";

function Toast({ msg }) {
  return <ToastDiv>{msg}</ToastDiv>;
}

const ToastDiv = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  padding: 11px;
  min-width: 200px;
  transform: translate(-50%, -50%);
  z-index: 3;
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
  border-radius: 4px;
  border: 1px solid #000;
`;

export default Toast;
