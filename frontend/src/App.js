import "./App.css";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import OldPostPage from "./pages/OldPostPage";
import MyPage from "./pages/MyPage";
import MyPageEdit from "./pages/MyPageEdit";
import ViewAllPage from "./pages/ViewAllPage";
import React from "react";
import { Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import Home from "./pages/Home";
import PostStepOnePage from "./pages/PostStepOnePage";
import PostStepTwoPage from "./pages/PostStepTwoPage";
import PostStepThreePage from "./pages/PostStepThreePage";
import PostStepFourPage from "./pages/PostStepFourPage";

function App() {
  return (
    <RecoilRoot>
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<LoginPage />} path="/login" />
        <Route element={<RegisterPage />} path="/register" />
        <Route element={<OldPostPage />} path="/oldpost" />
        <Route element={<ViewAllPage />} path="/view_all" />
        <Route element={<PostStepOnePage />} path="/poststep1" />
        <Route element={<PostStepTwoPage />} path="/poststep2" />
        <Route element={<PostStepThreePage />} path="/poststep3" />
        <Route element={<PostStepFourPage />} path="/poststep4" />
        <Route element={<MyPage />} path="/users/mypage" />
        <Route element={<MyPageEdit />} path="/users/edit" />
      </Routes>
    </RecoilRoot>
  );
}

export default App;
