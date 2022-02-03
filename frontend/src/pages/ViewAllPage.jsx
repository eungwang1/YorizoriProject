import React, { useEffect } from "react";
import styled from "styled-components";
import ViewAll from "../Components/viewAll/ViewAll";

const ViewAllPageBlock = styled.div``;

const ViewAllPage = () => {
  const setPageState = useSetRecoilState(pageStateAtom);

  useEffect(() => {
    setPageState("viewAllPage");
    return () => {
      setPageState("");
    };
  }, []);
  return (
    <ViewAllPageBlock>
      <ViewAll></ViewAll>
    </ViewAllPageBlock>
  );
};

export default ViewAllPage;
