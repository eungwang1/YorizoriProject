import React from "react";
import styled from "styled-components";
import { useRecoilValue, useSetRecoilState } from "recoil";
const RecipeWrapper = styled.div`
  margin: 20px;
`;
const Step = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
`;
const StepNumber = styled.div``;
const Content = styled.div`
  font-size: 14px;
  width: 150px;
  margin-bottom: 6px;
`;
const Img = styled.div`
  background-image: url("../images/gam.jpg");
  background-size: cover;
  width: 100px;
  height: 64px;
`;
const Timer = styled.div`
  display: flex;
  align-items: center;
`;
const ClockImg = styled.img``;
const Recipe = () => {
  return (
    <RecipeWrapper>
      <div style={{ fontWeight: 900 }}>요리 순서</div>
      <Step>
        <StepNumber>1</StepNumber>
        <div>
          <Content>계란을 크게크게 볶는다.</Content>
          <Timer>
            <ClockImg src="../images/clock.png" />
            00:00
          </Timer>
        </div>
        <Img />
      </Step>
      <Step>
        <StepNumber>2</StepNumber>
        <div>
          <Content>잘 볶아진 계란과 인사를 나눕니다</Content>
          <Timer>
            <ClockImg src="../images/clock.png" />
            00:00
          </Timer>
        </div>
        <Img />
      </Step>
    </RecipeWrapper>
  );
};
export default Recipe;
