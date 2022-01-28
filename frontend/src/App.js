import "./App.css";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PostPage from "./pages/PostPage";
import MyPage from "./pages/MyPage";
import ViewAllPage from "./pages/ViewAllPage";
import React from "react";
import { Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import Home from "./pages/Home";

function App() {
  return (
    <RecoilRoot>
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<LoginPage />} path="/login" />
        <Route element={<RegisterPage />} path="/register" />
        <Route element={<PostPage />} path="/post" />
        <Route element={<ViewAllPage />} path="/view_all" />

        <Route element={<MyPage />} path="/users/mypage" />
      </Routes>
    </RecoilRoot>
  );
}

export default App;
