import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const selectIndex = (totalIndex, selectingNumber) => {
  let randomIndexArray = [];
  for (let i = 0; i < selectingNumber; i++) {
    let randomNum = Math.floor(Math.random() * totalIndex);
    if (randomIndexArray.indexOf(randomNum) === -1) {
      randomIndexArray.push(randomNum);
    } else {
      i--;
    }
  }
  return randomIndexArray;
};
const Recommend = ({ data }) => {
  const [allRecipes, setAllRecipes] = useState(null);
  const [randomNumArray, setRandomNumArray] = useState(null);
  const [filteredRecipe, setFilteredRecipe] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await axios.get("/post");
        setAllRecipes(data);
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (allRecipes) {
      const FilteredData = allRecipes.data.filter((el) => {
        if (el.category === data.category) {
          return el;
        }
      });
      console.log(FilteredData);
      setFilteredRecipe(FilteredData);
      const dataLength = FilteredData.length;
      let dataCnt = 4;
      if (dataLength <= 4) {
        dataCnt = dataLength;
      }
      const randomNumArray = selectIndex(dataLength, dataCnt);
      setRandomNumArray(randomNumArray);
    }
  }, [allRecipes]);
  console.log(randomNumArray);
  console.log(filteredRecipe);

  return (
    <RecommendWrapper>
      <StyledDiv>
        <StyledP>'{data.category}'</StyledP>
        <SmallP> 이런 메뉴는 어떠세요?</SmallP>
      </StyledDiv>
      <RecommendedPostWrapper>
        {randomNumArray &&
          randomNumArray.map((n, index) => {
            return (
              <RecommendedPost
                key={`RecommendPost_${index}`}
                onClick={() => {
                  navigate(`/detail/${filteredRecipe[n]._id}`);
                  window.location.reload();
                }}
              >
                <PostImg key={`PostImg_${index}`} src={filteredRecipe[n].thumbnail} />
                <PostTitle key={`PostTitle_${index}`}>{filteredRecipe[n].recipeName}</PostTitle>
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
