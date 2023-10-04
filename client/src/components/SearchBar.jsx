import { IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import styles from "../css/Header.module.css";
<<<<<<< HEAD
import { useEffect, useState } from "react";
=======
import { useState } from "react";
>>>>>>> bdf0ad10c5356daa06ba11c687831b4f678208e0
import { useDispatch } from "react-redux";
import { filterByInput, initProduct } from "../reducer/productSlice";
import debounce from "../utils/debounce.js";

const SearchBar = () => {
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();

  // filter products
  const searchProducts = (productText) => {
    dispatch(filterByInput({ text: productText }));
    if (productText === "") {
      dispatch(initProduct());
    }
  };

  // debounce merge events
  const searchOnChange = (e) => {
    setSearchText(e.target.value);
    debounce(() => searchProducts(e.target.value), 500)();
  };
  return (
    <>
      <input
        className={styles["search-bar"]}
        type="text"
        placeholder="Search"
        value={searchText}
        onChange={(e) => searchOnChange(e)}
      />
      <IconButton>
        <SearchIcon />
      </IconButton>
    </>
  );
};
export default SearchBar;
