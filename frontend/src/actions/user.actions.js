import { useSetRecoilState } from "recoil";
import { authAtom, usersAtom } from "../states";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import React, { useState } from "react";
export { useUserActions };

function useUserActions() {
  const baseUrl = `/auth`;
  const setAuth = useSetRecoilState(authAtom);

  const setUsers = useSetRecoilState(usersAtom);
  const navigate = useNavigate();
  return {
    login,
    logout,
    register,
  };

  async function login(email, password) {
    try {
      const user = await axios.post(`${baseUrl}/login`, { email, password });
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/");
    } catch (e) {
      console.error(e);
      if (e.response.status === 401) {
        alert("존재하지않는계정입니다.");
      }
    }
  }

  async function register(email, nickName, password) {
    try {
      await axios.post(`${baseUrl}/join`, { email, nickName, password });
      navigate("/login");
    } catch (e) {
      console.error(e);
      if (e.response.status === 409) {
        alert("이메일중복");
      }
      if (e.response.status === 404) {
        alert("경로오류");
      }
    }
  }

  async function logout() {
    try {
      await axios.get(`${baseUrl}/logout`);
      localStorage.removeItem("user");
      setAuth(null);
      navigate("/");
    } catch (e) {
      if (e.response.status === 403) {
        alert("로그아웃 상태입니다.");
      }
    }
  }
}
