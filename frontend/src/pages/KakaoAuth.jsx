import React, { useEffect } from "react";
import qs from "qs";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { authAtom, userIdAtom, userImage } from "../states";
import { useNavigate } from "react-router";
import swal from "sweetalert";

function KakaoAuth() {
  // useEffect(() => {
  //   // const script = document.createElement("script")
  //   // script.src = "https://developers.kakao.com/sdk/js/kakao.min.js"
  //   // document.body.appendChild(script)

  //   // return () => {
  //   //   document.body.removeChild(script)
  //   // }
  // },[])
  const REST_API_KEY = "0734499ca487a114ff01aed588ab068c";
  const CLIENT_SECRET = "GIDxRVULPyKVl1l7SCqFxW74psn827fa";
  const REDIRECT_URI = "http://localhost:80/oauth/kakao/callback";
  const code = new URL(window.location.href).searchParams.get("code");
  const setAuth = useSetRecoilState(authAtom);
  const setUid = useSetRecoilState(userIdAtom);
  const setUimg = useSetRecoilState(userImage);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/api/auth/find?code=${code}`).then((res) => {
      console.log(res);
      setAuth(true);
      setUid(res.data.uid);
      setUimg(res.data.uimg);
      swal("로그인 성공", "로그인되었습니다.", "success").then(() => navigate("/"));
    });
  }, []);

  // const getToken = async () => {
  //   const payload = qs.stringify({
  //     grant_type: "authorization_code",
  //     client_id: REST_API_KEY,
  //     redirect_uri: REDIRECT_URI,
  //     code: code,
  //     client_secret: CLIENT_SECRET,
  //   });

  //   try {
  //     console.log(payload)
  //     // access token 가져오기
  //     const res = await axios.post("https://kauth.kakao.com/oauth/token", payload);
  //     console.log("res:",res)

  //     // Kakao Javascript SDK 초기화
  //     window.Kakao.init(REST_API_KEY);
  //     // access token 설정
  //     window.Kakao.Auth.setAccessToken(res.data.access_token);
  //     const data = await window.Kakao.API.request({
  //       url: "/v2/user/me",
  //     });
  //     console.log("data:",data);
  //     const result = await axios.post("/auth/find", {
  //       email: data.kakao_account.email,
  //       nickName: data.properties.nickname,
  //       profileImage: data.kakao_account.profile.thumbnail_image_url,
  //       kakaoId: data.id
  //     });
  //     console.log("result:",result)
  //     localStorage.setItem("user", JSON.stringify(result.data));
  //     setAuth(true)
  //     setUid(result.data.uid)
  //     setUimg(result.data.uimg)
  //     swal("로그인 성공", "로그인되었습니다.", "success").then(() => navigate("/"));
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  // useEffect(() => {
  //   getToken();
  // }, []);

  return null;
}

export default KakaoAuth;
