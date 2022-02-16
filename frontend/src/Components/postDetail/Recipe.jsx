import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Slider from "react-slick";
import dummy from "./PostDummyData.json";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useForm } from "react-hook-form";

const padNumber = (num, length) => {
  return String(num).padStart(length, "0");
};

const Recipe = ({ data }) => {
  const [timerState, setTimerState] = useState(
    Array.from({ length: 100 }, () => {
      return {
        state: true,
      };
    })
  );

  const { register, setValue, getValues } = useForm();
  const interval = useRef({});

  const timeHandler = (index, e) => {
    let startTime = Number(getValues(`min_${index}`)) * 60 + Number(getValues(`sec_${index}`));

    if (startTime > 0) {
      setTimerState((oldList) => {
        const newList = [...oldList];
        newList[index] = {
          state: !newList[index].state,
        };
        return newList;
      });
    }
    if (timerState[index].state && startTime > 0) {
      interval.current[index] = setInterval(() => {
        if (startTime <= 1) {
          clearInterval(interval.current[index]);
          setTimerState((oldList) => {
            const newList = [...oldList];
            newList[index] = {
              state: true,
            };
            return newList;
          });
        }
        startTime = Number(getValues(`min_${index}`)) * 60 + Number(getValues(`sec_${index}`)) - 1;
        setValue(`sec_${index}`, padNumber(startTime % 60, 2));
        setValue(`min_${index}`, padNumber(parseInt(startTime / 60), 2));
      }, 1000);
      return () => {
        clearInterval(interval.current[index]);
      };
    }
    if (!timerState[index].state) {
      clearInterval(interval.current[index]);
    }
  };

  const resetTime = (index, e) => {
    const resetTimeValue = e.target.dataset.value;
    console.log(e.target.dataset.value);
    setValue(`sec_${index}`, padNumber(resetTimeValue % 60, 2));
    setValue(`min_${index}`, padNumber(parseInt(resetTimeValue / 60), 2));
    setTimerState((oldList) => {
      const newList = [...oldList];
      newList[index] = {
        state: true,
      };
      return newList;
    });
    clearInterval(interval.current[index]);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <RecipeWrapper>
      <div style={{ fontWeight: 900 }}>요리 순서</div>
      {data &&
        data.process.map((process, index) => {
          return (
            <Step key={`step_${index}`}>
              <StepNumber key={`StepNumber_${index}`}>{index + 1}</StepNumber>
              <div>
                <Content key={`Content_${index}`}>{process.explain}</Content>
                <TimerWrapper>
                  <Timer
                    onClick={(e) => {
                      timeHandler(index, e);
                    }}
                    key={`Timer_${index}`}
                  >
                    {timerState[index].state ? (
                      <ClockImg key={`ClockImg_${index}`} src="../images/clockImage.svg" />
                    ) : (
                      <ClockImg key={`ClockImg_${index}`} src="../images/clockImageActive.svg" />
                    )}
                    <TimeInput
                      {...register(`min_${index}`)}
                      defaultValue={padNumber(parseInt(process.processTime.min), 2)}
                      readOnly
                    />
                    <StyledP>:</StyledP>
                    <TimeInput
                      {...register(`sec_${index}`)}
                      defaultValue={padNumber(parseInt(process.processTime.sec), 2)}
                      readOnly
                    />
                  </Timer>
                  <ResetBtn
                    data-value={
                      Number(process.processTime.min * 60) + Number(process.processTime.sec)
                    }
                    onClick={(e) => {
                      resetTime(index, e);
                    }}
                  ></ResetBtn>
                </TimerWrapper>
              </div>
              <Img key={`Img_${index}`} src={process.processImage} />
            </Step>
          );
        })}
      {data && data.doneImage[0] && <div style={{ fontWeight: 900, marginTop: 20 }}>완성 사진</div>}
      <StyledSlider {...settings}>
        {data &&
          data.doneImage[0] &&
          data.doneImage.map((photo, index) => (
            <ResultImg key={`ResultImg_${index}`} src={photo} />
          ))}
      </StyledSlider>
    </RecipeWrapper>
  );
};
export default Recipe;

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
const Img = styled.img`
  width: 100px;
  height: 64px;
  object-fit: cover;
`;
const ResultImg = styled.img`
  height: 200px;
  object-fit: cover;
`;

const ClockImg = styled.img`
  margin-right: 10px;
`;
const StyledSlider = styled(Slider)`
  margin: 15px 30px 50px 30px;
  .slick-prev:before,
  .slick-next:before {
    color: #feae11;
    font-size: 20px;
  }
  .slick-dots li.slick-active button:before {
    color: #feae11;
  }
`;

const Timer = styled.div`
  display: flex;
  align-items: center;
`;

const TimeInput = styled.input`
  border: none;
  width: 24px;
  /* padding-top: 3px;
  padding-right: 2px; */
  text-align: right;
  font-weight: 600;
  font-size: 1.1rem;
  :focus {
    outline: none;
  }
`;

const TimerWrapper = styled.div`
  display: flex;
  font-weight: 700;
  font-size: 1.1rem;
`;

const StyledP = styled.p`
  margin: 0;
`;

const ResetBtn = styled.div`
  background-image: url("../images/reset.png");
  margin: 7px 0px 0px 7px;
  width: 15px;
  height: 15px;
  background-size: cover;
`;
