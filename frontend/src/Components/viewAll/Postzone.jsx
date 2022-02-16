import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { dropDownOptionsState } from "../../states/ViewAllAtom";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { searchAtom } from "../nav/NavAtom";
import axios from "axios";
const Postzone = () => {
  const filteredData = useRecoilValue(searchAtom);
  const [page, setPage] = useState(1);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const dropDownOptions = useRecoilValue(dropDownOptionsState);

  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight) {
      console.log("페이지 끝입니다.");
      setPage((prev) => prev + 1);
    }
  };

  const getRecipe = async () => {
    try {
      const query = filteredData;
      const urlAll = `http://localhost:8080/post?page=${page}&perPage=10`;
      const urlSearch = `http://localhost:8080/post/search?recipeName=${query}`;

      let url;
      if (filteredData === "") {
        url = urlAll;
        const fetchData = async () => {
          // setLoading(true);
          const result = await axios(url);
          const resultrecipes = recipes.concat(result.data);
          setRecipes(resultrecipes);
          // setLoading(false);
        };
        fetchData();
      } else {
        url = urlSearch;
        const fetchData = async () => {
          // setLoading(true);
          const result = await axios(url);
          setRecipes(result.data);
          // setLoading(false);
        };
        fetchData();
      }
    } catch {
      console.error("에러");
    }
  };
  useEffect(() => {
    if (page <= (Math.ceil(recipes.length) + 10) / 10) {
      console.log("page?", page);
      getRecipe();
    }
  }, [filteredData, page]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  console.log(recipes);

  return (
    <Wrapper>
      <WrapperPost onScroll={handleScroll}>
        {recipes
          .filter((data) => {
            if (dropDownOptions.category === "") {
              return data.category;
            }
            return data.category === dropDownOptions.category;
          })
          .filter((data) => {
            if (dropDownOptions.material === "") {
              return data.material;
            }
            return data.material === dropDownOptions.material;
          })
          .filter((data) => {
            if (dropDownOptions.condition === "") {
              return data.condition;
            }
            return data.condition === dropDownOptions.condition;
          })
          .filter((data) => {
            if (dropDownOptions.cook === "") {
              return data.cook;
            }
            return data.cook === dropDownOptions.cook;
          })
          .map((data) => {
            let recipeName = data.recipeName;
            let nickname = data.userId.nickName;
            if (recipeName.length > 20) {
              recipeName = recipeName.substring(0, 19) + "…";
            }

            return (
              <Link
                to={`/detail/${data._id}`}
                style={{ textDecoration: "none", color: "inherit" }}
                nickname={nickname}
                title={recipeName}
                key={data._id}
              >
                <div>
                  <Img src={data.thumbnail} />
                  <TextBox>
                    <Title>{recipeName}</Title>
                    <Author>{nickname}</Author>
                    <WrapperHeartComment>
                      <span className="sprite heart" />{" "}
                      <HeartCommentCount>{data.numLikes}</HeartCommentCount>
                      <span className="sprite comment" />{" "}
                      <HeartCommentCount>{data.numComments}</HeartCommentCount>
                    </WrapperHeartComment>
                  </TextBox>
                </div>
              </Link>
            );
          })}
      </WrapperPost>
    </Wrapper>
  );
};
export default Postzone;

const Wrapper = styled.div`
  overflow: scroll;
  text-align: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  .sprite {
    display: inline-block;
    flex-shrink: 0;
    background-image: url(${process.env.PUBLIC_URL + "./images/icons.png"});
    background-repeat: no-repeat;
    background-size: 66.34px 30px;
  }
  .heart {
    width: 16px;
    height: 16px;
    background-position: -16px 3.8px;
  }
  .comment {
    width: 16px;
    height: 16px;
    background-position: -16px -13px;
  }
`;
const WrapperPost = styled.div`
  display: grid;
  margin-top: 15px;
  grid: auto-flow 270px / repeat(2, 175px);
  justify-content: center;
  align-items: center;
  justify-items: center;
  overflow: scroll;

  & > div {
    width: 160px;
    height: 228px;
  }
`;
const Img = styled.img`
  width: 160px;
  height: 147px;
  border-radius: 10px;
  object-fit: cover;
`;
const TextBox = styled.div`
  width: 160px;
  height: 73px;
  margin-top: 8px;
  font-weight: 900;
  text-align: left;
`;
const Title = styled.p`
  font-size: 16px;
  margin: 0px;
`;
const Author = styled.p`
  font-size: 13px;
  margin: 5px 0 10px 0;
`;
const WrapperHeartComment = styled.div`
  line-height: 15px;
`;
const HeartCommentCount = styled.span`
  font-size: 13px;
  margin-right: 8px;
`;
