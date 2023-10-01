import { Checkmark, CaretUp, CaretDown } from "@carbon/icons-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  lastAdded,
  priceLowtoHigh,
  priceHightoLow,
} from "../reducer/productSlice";
import loadProducts from "../services/loadProducts";
import { Link, Outlet } from "react-router-dom";
import Product from "../components/Product";
import styles from "../css/Products.module.css";
import { toggleLoading } from "../reducer/globalSlice";
import isNumeric from "../utils/isNumeric";

const Products = ({ children }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageValue, setPageValue] = useState(1);

  const loading = useSelector((state) => state.globalReducer.loading);
  const products = useSelector((state) => state.productReducer.products);
  const selected = useSelector((state) => state.productReducer.selected);
  const user = useSelector((state) => state.userReducer);

  const dispatch = useDispatch();
  const sortStatus = [
    { desp: "Last added" },
    { desp: "Price: low to high" },
    { desp: "Price: high to low" },
  ];

  useEffect(() => {
    dispatch(toggleLoading({ to: true }));
    dispatch(loadProducts());
    dispatch(toggleLoading({ to: false }));
  }, []);

  const sortBySelection = (i) => {
    if (i === 0) dispatch(lastAdded());
    if (i === 1) dispatch(priceLowtoHigh());
    if (i === 2) dispatch(priceHightoLow());
    setDropdownOpen(false);
  };

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
                {sortStatus.map(({ desp }, index) => (
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
          {user.admin ? (
            <Link to="create" className={styles["add-product"]}>
              <span className={styles["add-product-name"]}>Add Product</span>
            </Link>
          ) : (
            <></>
          )}
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
