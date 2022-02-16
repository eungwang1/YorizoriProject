import React, { useState, useRef } from "react";
import styled, { css } from "styled-components";
import { searchAtom } from "../nav/NavAtom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { Link } from "react-router-dom";

function SearchBar({}) {
  const setItem = useSetRecoilState(searchAtom);

  const [filteredData, setFilteredData] = useState("");
  const searchText = () => {
    setItem(filteredData);
  };
  const handleSearch = (e) => {
    setFilteredData(e.target.value);
  };
  const keyPress = (e) => {
    if (e.key == "Enter") {
      searchText();
    }
  };

  return (
    <>
      <SearchInputs
        placeholder="검색어"
        onChange={handleSearch}
        onKeyPress={keyPress}
        value={filteredData}
      ></SearchInputs>
      <Link to="/view_all">
        <SearchButton onClick={searchText} />
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
