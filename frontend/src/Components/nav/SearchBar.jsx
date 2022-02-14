import React, { useState } from "react";
import styled from "styled-components";
import { searchAtom } from "../nav/NavAtom";
import { useSetRecoilState } from "recoil";
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

  return (
    <>
      <SearchInputs
        placeholder="검색어"
        onChange={handleSearch}
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
  position: relative;
  top: 30px;
  font-size: 16px;
  left: 30px;
  width: 220px;
  height: 20px;
  outline: none;
  bottom: 10px;
  border: none;
  border-bottom: solid 2px #feae11;
  color: #999999;
`;
const SearchButton = styled.button`
  background-color: transparent;
  background-image: url("./images/search.png");
  background-size: cover;
  border: none;
  position: absolute;
  width: 25px;
  height: 25px;
  right: 20px;
  top: 25px;
`;
