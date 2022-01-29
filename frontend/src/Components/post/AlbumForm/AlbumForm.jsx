import React from "react";
import styled from "styled-components";
import { ImgBoxSmall } from "../PostStyle";

const AlbumFormBlock = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px 0;
`;

const AlbumForm = () => {
  return (
    <AlbumFormBlock>
      <ImgBoxSmall album />
      <ImgBoxSmall album />
      <ImgBoxSmall album />
      <ImgBoxSmall album />
    </AlbumFormBlock>
  );
};

export default AlbumForm;
