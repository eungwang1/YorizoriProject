import React from "react";
import styled from "styled-components";
import { ImgBoxSmall, ImgWrapper } from "../PostStyle";
import FileUpload from "@mimoid-prog/react-file-upload";

const AlbumFormBlock = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px 10px;
`;

const AlbumForm = () => {
  return (
    <AlbumFormBlock>
      <ImgBoxSmall album>
        <FileUpload name="photo1" shape="rounded" size="big" />
      </ImgBoxSmall>
      <ImgBoxSmall album>
        <FileUpload name="photo2" shape="rounded" size="big" />
      </ImgBoxSmall>
      <ImgBoxSmall album>
        <FileUpload name="photo3" shape="rounded" size="big" />
      </ImgBoxSmall>
      <ImgBoxSmall album>
        <FileUpload name="photo4" shape="rounded" size="big" />
      </ImgBoxSmall>
    </AlbumFormBlock>
  );
};

export default AlbumForm;
