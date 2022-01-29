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
      <TopNav_main />
      <div style={{ marginTop: "80px", paddingBottom: "90px" }}>
        <Link to="/login">
          <button>login</button>
        </Link>
        <Link to="/users/mypage">
          <button>mypage</button>
        </Link>
        <Link to="/post">
          <button>post</button>
        </Link>
        {state.isLogin && <button onClick={userActions.logout}>logout</button>}
        <Link to="/view_all">
          <button>전체글 보기</button>
        </Link>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo natus molestiae modi
          similique, odit praesentium cupiditate temporibus in eum totam atque omnis alias quaerat,
          labore rem molestias, tempora dolore accusantium?
        </div>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo natus molestiae modi
          similique, odit praesentium cupiditate temporibus in eum totam atque omnis alias quaerat,
          labore rem molestias, tempora dolore accusantium?
        </div>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo natus molestiae modi
          similique, odit praesentium cupiditate temporibus in eum totam atque omnis alias quaerat,
          labore rem molestias, tempora dolore accusantium?
        </div>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo natus molestiae modi
          similique, odit praesentium cupiditate temporibus in eum totam atque omnis alias quaerat,
          labore rem molestias, tempora dolore accusantium?
        </div>{" "}
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo natus molestiae modi
          similique, odit praesentium cupiditate temporibus in eum totam atque omnis alias quaerat,
          labore rem molestias, tempora dolore accusantium?
        </div>{" "}
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo natus molestiae modi
          similique, odit praesentium cupiditate temporibus in eum totam atque omnis alias quaerat,
          labore rem molestias, tempora dolore accusantium?
        </div>{" "}
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo natus molestiae modi
          similique, odit praesentium cupiditate temporibus in eum totam atque omnis alias quaerat,
          labore rem molestias, tempora dolore accusantium?
        </div>{" "}
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo natus molestiae modi
          similique, odit praesentium cupiditate temporibus in eum totam atque omnis alias quaerat,
          labore rem molestias, tempora dolore accusantium?
        </div>{" "}
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo natus molestiae modi
          similique, odit praesentium cupiditate temporibus in eum totam atque omnis alias quaerat,
          labore rem molestias, tempora dolore accusantium?
        </div>
      </div>
      <BottomNav />
    </HomeBlock>
  );
};

export default Home;
