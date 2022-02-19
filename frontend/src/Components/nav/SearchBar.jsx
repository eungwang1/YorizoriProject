import React, { useState, useRef, useEffect } from "react";
import styled, { css } from "styled-components";
import { dataAtom, searchAtom } from "../nav/NavAtom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { Link } from "react-router-dom";

function SearchBar({}) {
  const [data, setData] = useRecoilState(dataAtom);
  const [filteredData, setFilteredData] = useRecoilState(searchAtom);
  const clickChange = () => {
    setData(filteredData);
  };

  const inputChange = (e) => {
    const { value } = e.target;
    setFilteredData(value);
  };

  return (
    <>
      <SearchInputs placeholder="검색어" onChange={inputChange} value={filteredData}></SearchInputs>
      <Link to="/view_all">
        <SearchButton onClick={clickChange} />
      </Link>
    </>
  );
}

export default SearchBar;

const SearchInputs = styled.input`
  background: rgba(0, 0, 0, 0);
  position: relative;
  top: 30px;
  font-size: 16px;
  width: 80%;
  height: 20px;
  outline: none;
  bottom: 10px;
  border: none;
  border-bottom: solid 2px #feae11;
  color: #999999;
`;
const SearchButton = styled.button`
  background-color: transparent;
  background-image: url(${process.env.PUBLIC_URL + "../images/search.png"});
  background-size: cover;
  border: none;
  position: relative;
  width: 25px;
  height: 25px;

  margin: 25px 20px 20px 20px;
`;
