import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import { searchAtom } from "../nav/NavAtom";
import axios from "axios";
import {
  categoryAtom,
  materialAtom,
  conditionAtom,
  cookAtom,
  ViewAll,
  dropDownOptionsState,
  sortState,
  viewAllPostsByLikesAtom,
  entirePostsCountAtom,
  viewAllFamousPage,
  viewAllRecentPosts,
  viewAllRecentPage,
  getDefaultViewAllPostAtom,
} from "../../states/ViewAllAtom";

const Postzone = () => {
  const filteredData = useRecoilValue(searchAtom);
  //   const [page, setPage] = useState(1);
  // const [recentRecipePage,setRecentRecipePage] = useState(1);
  const [recipes, setRecipes] = useRecoilState(viewAllRecentPosts);
  const [page, setPage] = useRecoilState(viewAllRecentPage);

  const categoryFilter = useRecoilState(categoryAtom);
  const materialFilter = useRecoilState(materialAtom);
  const conditionFilter = useRecoilState(conditionAtom);
  const cookFilter = useRecoilState(cookAtom);
  const filteredCondition = useRecoilValue(dropDownOptionsState);
  const famousOrRecentCondition = useRecoilValue(sortState);
  const getDefaultViewAllPost = useRecoilValue(getDefaultViewAllPostAtom);

  console.log("레시피페이지 렌더링");
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
      const filterByLikes = famousOrRecentCondition === "famous" ? "likes" : "recent";
      const limit = 10;
      const startIndex = (page - 1) * limit + 1;
      console.log("getRecipe", filterByLikes, startIndex);
      const {
        data: { filteredPost },
      } = await axios({
        url: "/post/withFilter",
        method: "get",
        params: {
          ...filteredCondition,
          filterByLikes,
          startIndex,
          limit,
        },
      });
      setRecipes((prevPosts) => {
        return prevPosts.concat(filteredPost);
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (page <= (Math.ceil(recipes.length) + 10) / 10 && famousOrRecentCondition === "recent") {
      getRecipe();
    }
  }, [page, filteredData, filteredCondition, famousOrRecentCondition, getDefaultViewAllPost]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  console.log(recipes);

  return (
    <Wrapper>
      <WrapperPost>
        {recipes.map((data, index) => {
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
              key={index}
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
  // overflow: scroll;
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
  // overflow: scroll;
  display: grid;
  margin-top: 5px;
  grid: auto-flow 270px / repeat(2, 175px);
  justify-content: center;
  align-items: center;
  justify-items: center;
  & > div {
    width: 160px;
    height: 228px;
  }
`;
const Img = styled.img`
  width: 160px;
  height: 160px;
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
  font-size: 14px;
  margin: 0px;
`;
const Author = styled.p`
  font-size: 12px;
  margin: 5px 0 5px 0;
`;
const WrapperHeartComment = styled.div`
  line-height: 15px;
`;
const HeartCommentCount = styled.span`
  font-size: 10px;
  margin-right: 8px;
`;
