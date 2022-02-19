import React, { useEffect } from "react";
import styled from "styled-components";
import Home from "../Components/home/home";
import { pageStateAtom } from "../states";
import { useSetRecoilState } from "recoil";
const HomePageBlock = styled.div``;

const HomePage = () => {
  const setPageState = useSetRecoilState(pageStateAtom);
  useEffect(() => {
    setPageState("home");
    return () => {
      setPageState("");
    };
  }, []);
  return (
    <HomePageBlock>
      <Home></Home>
    </HomePageBlock>
  );
};

export default HomePage;
