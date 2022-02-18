import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Recommend = ({ data }) => {
  const [filteredRecipe, setFilteredRecipe] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {
          data: { filteredPostCount },
        } = await axios.get("/post/withFilter/count", {
          params: {
            category: data.category,
          },
        });
        const limit = 4;
        const startIndex = Math.ceil(Math.random() * (Number(filteredPostCount) - limit));
        console.log("startIndex", startIndex);
        const {
          data: { filteredPost },
        } = await axios.get("/post/withFilter", {
          params: {
            startIndex,
            limit,
            category: data.category,
            currentPost: data._id,
          },
        });
        console.log("filteredPost", filteredPost);
        setFilteredRecipe(filteredPost);
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, []);

  return (
    <RecommendWrapper>
      <StyledDiv>
        <StyledP>'{data.category}'</StyledP>
        <SmallP> 이런 메뉴는 어떠세요?</SmallP>
      </StyledDiv>
      <RecommendedPostWrapper>
        {filteredRecipe?.map((post) => {
          return (
            <RecommendedPost
              key={post._id}
              onClick={() => {
                navigate(`/detail/${post._id}`);
                window.location.reload();
              }}
            >
              <PostImg src={post.thumbnail} />
              <PostTitle>{post.recipeName}</PostTitle>
            </RecommendedPost>
          );
        })}
      </RecommendedPostWrapper>
    </RecommendWrapper>
  );
};
export default Recommend;

const StyledDiv = styled.div`
  font-size: 0.8rem;
`;

const StyledP = styled.p`
  display: inline-block;
  color: #feae11;
  font-size: 1.4rem;
  font-weight: 800;
`;

const SmallP = styled.p`
  display: inline-block;
  margin-left: 10px;
  font-weight: 600;
`;

const RecommendWrapper = styled.div`
  margin: 0 20px 20px 20px;
`;
const Button = styled.button`
  width: 60px;
  height: 30px;
  font-size: 12px;
  font-weight: 900;
  background-color: #feae11;
  color: white;
  border: none;
  border-radius: 50px;
  margin: 10px 0px;
  &:not(:last-child) {
    margin-right: 14px;
  }
`;
const RecommendedPostWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;
const RecommendedPost = styled.div`
  margin-bottom: 10px;
`;
const PostImg = styled.img`
  width: 155px;
  height: 155px;
  object-fit: cover;
`;
const PostTitle = styled.div`
  font-size: 11px;
  width: 155px;
`;
