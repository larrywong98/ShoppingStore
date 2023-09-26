import { Checkmark, CaretUp, CaretDown } from "@carbon/icons-react";
import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  lastAdded,
  priceLowtoHigh,
  priceHightoLow,
} from "../reducer/productSlice";
import loadProducts from "../services/loadProducts";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Product from "../components/Product";
import styles from "../css/Products.module.css";
import { createSelector } from "@reduxjs/toolkit";
import loadCart from "../services/loadCart";
import { toggleLoading } from "../reducer/globalSlice";
const Products = ({ children }) => {
  // const [selected, setSelected] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageValue, setPageValue] = useState(1);
  const navigate = useNavigate();
  const loading = useSelector((state) => state.globalReducer.loading);

  //dispatch product slice
  const dispatch = useDispatch();
  const products = useSelector((state) => state.productReducer.products);
  // const selectProducts = (state) => state.productReducer.sortStatus;
  // const products = createSelector(selectProducts, (items) => items);

  // const sortStatus = useSelector((state) =>
  //   state.productReducer.sortStatus.slice(0, 3)
  // );

  // reselect improve performance
  const initsort = useSelector((state) => state.productReducer.sortStatus);
  const sortStatusSelector = createSelector(
    (state) => state,
    (items) => items.slice(0, 3)
  );
  const sortStatus = sortStatusSelector(initsort);

  // memorize sort status
  const selected = useSelector(
    (state) => state.productReducer.sortStatus[3].selected
  );

  useEffect(() => {
    // skeleton loading
    // console.log(selected);
    // if (products.length === 0) {
    dispatch(toggleLoading({ to: true }));
    dispatch(loadProducts());
    dispatch(loadCart());
    dispatch(toggleLoading({ to: false }));
    // console.log(loading);

    // console.log(sortStatusSelector(initsort));
    // console.log(selected);
    // if (products.length === 0) {
    //   navigate("/products");
    // }
    // }
  }, []);

  const sortBySelection = (i) => {
    if (i === 0) dispatch(lastAdded());
    if (i === 1) dispatch(priceLowtoHigh());
    if (i === 2) dispatch(priceHightoLow());

    setDropdownOpen(false);
  };

  function isNumeric(str) {
    if (typeof str != "string") return false;
    return !isNaN(str) && !isNaN(parseFloat(str));
  }
  // only number type
  const customPageOnChange = (e) => {
    if (e.target.value === "") {
      setPageValue("");
    }
    if (isNumeric(e.target.value) === true) {
      setPageValue(e.target.value);
    }
  };
  const customToPage = (e) => {
    if (e.key === "Enter") {
      if (e.target.value === "") {
        navigateToPage(0);
        setPageValue(1);
        return false;
      }
      navigateToPage(parseInt(e.target.value) - 1);
      setPageValue(1);
      return true;
    }
  };

  const navigateToPage = (action) => {
    if (action === "prev") {
      setCurrentPage(Math.max(currentPage - 1, 0));
    } else if (action === "next") {
      setCurrentPage(
        Math.min(currentPage + 1, Math.ceil(products.length / 10) - 1)
      );
    } else {
      let newPageNo = Math.min(action, Math.ceil(products.length / 10) - 1);
      newPageNo = Math.max(newPageNo, 0);
      setCurrentPage(newPageNo);
    }
  };

  return (
    <div className={styles["product-page"]}>
      <div className={styles["product-page-header"]}>
        <h1>Products</h1>
        <div className={styles["product-page-header-button"]}>
          <div
            className={styles["dropdown"]}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button
              className={styles["dropdown-btn"]}
              onMouseEnter={() => setDropdownOpen(true)}
            >
              <span>{sortStatus[selected].desp}</span>
              {dropdownOpen ? (
                <CaretUp className={styles["open-mark"]} />
              ) : (
                <CaretDown className={styles["open-mark"]} />
              )}
            </button>
            <div
              className={
                dropdownOpen
                  ? styles["dropdown-content"] + " " + styles["show"]
                  : styles["dropdown-content"]
              }
            >
              <ul>
                {sortStatus.map(({ checked, desp }, index) => (
                  <button
                    className={styles["dropdown-item-btn"]}
                    onClick={() => sortBySelection(index)}
                    key={index}
                  >
                    {selected === index ? (
                      <Checkmark className={styles["check"]} />
                    ) : (
                      <div className={styles["check"]}></div>
                    )}
                    {desp}
                  </button>
                ))}
              </ul>
            </div>
          </div>
          <Link to="create" className={styles["add-product"]}>
            <span className={styles["add-product-name"]}>Add Product</span>
          </Link>
        </div>
      </div>
      <div className={styles["product-content"]}>
        {loading
          ? Array(10)
              .fill(0)
              .map((value, index) => <Product key={index} />)
          : products
              .slice(currentPage * 10, currentPage * 10 + 10)
              .map((product, index) => (
                <Product
                  key={index}
                  volume={product.volume}
                  category={product.category}
                  content={product.content}
                  imgPath={product.imgPath}
                  index={index}
                  pageId={currentPage}
                  id={product.id}
                  desp={product.desp}
                  price={product.price}
                />
              ))}
      </div>
      <div className={styles["pagination-wrap"]}>
        <div className={styles["nav-to-page"]}>
          <p>Go to </p>
          <input
            value={pageValue}
            maxLength={2}
            onChange={(e) => customPageOnChange(e)}
            onKeyUp={(e) => customToPage(e)}
          />
          <p>Page</p>
        </div>
        <nav className={styles["nav-list"]}>
          <ul>
            <li>
              <button
                className={styles["pagination-item"]}
                onClick={() => navigateToPage("prev")}
              >
                {"<<"}
              </button>
            </li>
            {Array(Math.ceil(products.length / 10))
              .fill(0)
              .map((page, index) => (
                <li key={index}>
                  <button
                    className={
                      index === currentPage
                        ? styles["pagination-item-inverse"]
                        : styles["pagination-item"]
                    }
                    onClick={() => navigateToPage(index)}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
            <li>
              <button
                className={styles["pagination-item"]}
                onClick={() => navigateToPage("next")}
              >
                {">>"}
              </button>
            </li>
          </ul>
        </nav>
      </div>
      {/* {children} */}
      <Outlet />
    </div>
  );
};

export default Products;
