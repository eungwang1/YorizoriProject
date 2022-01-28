import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { authAtom } from "../states";
import { useUserActions } from "../actions";
import BottomNav from "../Components/nav/BottomNav";
import TopNav_main from "../Components/nav/TopNav_main";
const HomeBlock = styled.div`
  position: relative;
  height: 100vh;
`;

const Home = () => {
  console.log("랜더링");
  const userActions = useUserActions();
  const [state, setState] = useState({
    isLogin: false,
  });
  const checkLoginStatus = () => {
    if (JSON.parse(localStorage.getItem("user"))) {
      setState({
        isLogin: true,
      });
    }
  };
  useEffect(() => {
    checkLoginStatus();
  }, []);

  return (
    <HomeBlock>
      <TopNav_main></TopNav_main>
      <Link to="/login">
        <button>login</button>
      </Link>
      {state.isLogin && <button onClick={userActions.logout}>logout</button>}
      <BottomNav></BottomNav>
    </HomeBlock>
  );
};

export default Home;
