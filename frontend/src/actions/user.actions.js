import { useSetRecoilState } from "recoil";
import { authAtom, userIdAtom, userImage, usersAtom } from "../states";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import React, { useState } from "react";
import swal from "sweetalert";

export { useUserActions };
function useUserActions() {
  const baseUrl = `/auth`;
  const setAuth = useSetRecoilState(authAtom);
  const setUid = useSetRecoilState(userIdAtom);
  const setUimg = useSetRecoilState(userImage);
  const setUsers = useSetRecoilState(usersAtom);
  const navigate = useNavigate();
  return {
    login,
    logout,
    register,
    kakaoLogin,
  };

  async function login(email, password) {
    try {
      const user = await axios.post(`${baseUrl}/login`, { email, password });
      localStorage.setItem("user", JSON.stringify(user.data));
      setAuth(true);
      setUid(user.data.uid);
      setUimg(user.data.uimg);
      swal("로그인 성공", "로그인되었습니다.", "success").then(() => navigate("/"));
    } catch (e) {
      console.error(e);
      if (e.response.status === 400) {
        swal("로그인 실패", e.response.data.message, "warning");
      }
    }
  }

  async function register(email, nickName, password) {
    try {
      await axios.post(`${baseUrl}/join`, { email, nickName, password });
      swal("회원가입 성공", "환영합니다", "success").then(() => navigate("/login"));
    } catch (e) {
      console.error(e);
      if (e.response.status === 400) {
        swal("회원가입 실패", e.response.data.message, "warning");
      }
    }
  }

  async function kakaoLogin() {
    try {
      console.log("test why");
      console.log(`${baseUrl} kakao`);
      const res = await fetch(`http://localhost:8080${baseUrl}/kakao`);
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  }

  async function logout() {
    try {
      swal({
        title: "로그아웃 하시겠습니까?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((res) => {
        if (res) {
          swal("로그아웃 되었습니다.", {
            icon: "success",
          }).then(() => {
            axios.get(`${baseUrl}/logout`);
            localStorage.removeItem("user");
            setAuth(null);
            navigate("/");
          });
        } else {
          swal("로그아웃 취소되었습니다.");
        }
      });
    } catch (e) {
      if (e.response.status === 403) {
        alert("로그아웃 상태입니다.");
      }
    }
  }
}
