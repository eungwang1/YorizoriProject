import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ReactLoading from "react-loading";
const Wrapper = styled.div`
  text-align: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  .sprite {
    display: inline-block;
    flex-shrink: 0;
    background-image: url("./images/icons.png");
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
  grid: auto-flow 241px / repeat(2, 175px);
  justify-content: center;
  align-items: center;
  justify-items: center;

  & > div {
    width: 160px;
    height: 228px;
  }
`;
const Img = styled.div`
  background-image: url("./images/gam.jpg");
  background-size: cover;
  width: 160px;
  height: 147px;
  border-radius: 10px;
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
const Postzone = () => {
  const [target, setTarget] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [countPost, setCountPost] = useState(4);

  useEffect(() => {
    console.log(countPost);
  }, [countPost]);

  const getMoreItem = async () => {
    setIsLoaded(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setCountPost((countPost) => countPost + 4);
    setIsLoaded(false);
  };

  const onIntersect = async ([entry], observer) => {
    if (entry.isIntersecting && !isLoaded) {
      observer.unobserve(entry.target);
      await getMoreItem();
      observer.observe(entry.target);
    }
  };

  useEffect(() => {
    let observer;
    if (target) {
      observer = new IntersectionObserver(onIntersect, {
        threshold: 0.4,
      });
      observer.observe(target);
    }
    return () => observer && observer.disconnect();
  }, [target]);

  return (
    <Wrapper>
      <WrapperPost>
        {[...Array(countPost)].map((n, index) => {
          return (
            <Link to="/detail/" style={{ textDecoration: "none", color: "inherit" }}>
              <div>
                <Img />
                <TextBox>
                  <Title>바스바스감바스</Title>
                  <Author>고래</Author>
                  <WrapperHeartComment>
                    <span className="sprite heart" /> <HeartCommentCount>31</HeartCommentCount>
                    <span className="sprite comment" /> <HeartCommentCount>7</HeartCommentCount>
                  </WrapperHeartComment>
                </TextBox>
              </div>
            </Link>
          );
        })}
      </WrapperPost>

      <div ref={setTarget} className="Target-Element">
        {isLoaded && <ReactLoading type="bubbles" color="#feae11" height="40px" />}
      </div>
    </Wrapper>
  );
};
export default Postzone;
