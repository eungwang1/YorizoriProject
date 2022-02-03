import "./App.css";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
// import OldPostPage from "./pages/OldPostPage";
import MyPage from "./pages/MyPage";
import MyPageEdit from "./pages/MyPageEdit";
import ViewAllPage from "./pages/ViewAllPage";
import PostDetailPage from "./pages/PostDetailPage";
import React from "react";
import { Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import Home from "./pages/Home";

import PostPage from "./pages/PostPage";

function App() {
  return (
    <RecoilRoot>
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<LoginPage />} path="/login" />
        <Route element={<RegisterPage />} path="/register" />
        {/* <Route element={<OldPostPage />} path="/oldpost" /> */}
        <Route element={<ViewAllPage />} path="/view_all" />
        <Route element={<PostDetailPage />} path="/detail" />

        <Route element={<MyPage />} path="/users/mypage" />
        <Route element={<MyPageEdit />} path="/users/edit" />
        <Route element={<PostPage />} path="/post" />
      </Routes>
    </RecoilRoot>
  );
}

export default App;
