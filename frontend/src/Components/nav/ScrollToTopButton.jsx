import React, { useState, useEffect } from "react";
import styled from "styled-components";

const ScrollToTopButton = () => {
  const [ScrollY, setScrollY] = useState(0);

  const handleFollow = () => {
    setScrollY(window.pageYOffset);
  };

  useEffect(() => {
    const watch = () => {
      window.addEventListener("scroll", handleFollow);
    };
    watch(); // addEventListener 함수를 실행

    return () => {
      window.removeEventListener("scroll", handleFollow); // addEventListener 함수를 삭제
    };
  });
  return ScrollY > 100 ? (
    <Button
      onClick={() => {
        window.scrollTo(0, 0);
      }}
    >
      ▲
    </Button>
  ) : null;
};

export default ScrollToTopButton;

const Button = styled.button`
  position: fixed;
  z-index: 999;
  bottom: 95px;
  right: 20px;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  border: none;
  background-color: #feaf11e3;
  color: white;
  font-size: 15px;
  box-shadow: 0px 0px 5px rgba(128, 128, 128, 0.4);
`;
