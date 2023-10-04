import { IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import styles from "../css/Header.module.css";
import { useEffect, useState } from "react";
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
