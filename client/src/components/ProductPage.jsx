import { Checkmark, CaretUp, CaretDown } from "@carbon/icons-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loadProducts,
  lastAdded,
  priceLowtoHigh,
  priceHightoLow,
} from "../reducer/productSlice";
import Product from "./Product";

const ProductPage = () => {
  const [selected, setSelected] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageValue, setPageValue] = useState(1);

  //dispatch product slice
  const dispatch = useDispatch();
  const products = useSelector((state) => state.productReducer.products);

  const sortStatus = [
    { desp: "Last added" },
    { desp: "Price: low to high" },
    { desp: "Price: high to low" },
  ];

  useEffect(() => {
    // skeleton loading
    dispatch(loadProducts());

    dispatch(lastAdded());
  }, []);
  const addProduct = () => {};

  const sortBySelection = (i) => {
    if (i === 0) dispatch(lastAdded());
    if (i === 1) dispatch(priceLowtoHigh());
    if (i === 2) dispatch(priceHightoLow());

    setSelected(i);
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
    <div className="product-page">
      <div className="product-page-header">
        <h1>Products</h1>
        <div className="product-page-header-button">
          <div className="dropdown" onMouseLeave={() => setDropdownOpen(false)}>
            <button
              className="dropdown-btn"
              onMouseEnter={() => setDropdownOpen(true)}
            >
              <span>{sortStatus[selected].desp}</span>
              {dropdownOpen ? (
                <CaretUp className="open-mark" />
              ) : (
                <CaretDown className="open-mark" />
              )}
            </button>
            <div
              className={
                dropdownOpen ? "dropdown-content show" : "dropdown-content"
              }
            >
              <ul>
                {sortStatus.map(({ checked, desp }, index) => (
                  <button
                    className="dropdown-item-btn"
                    onClick={() => sortBySelection(index)}
                    key={index}
                  >
                    {selected === index ? (
                      <Checkmark className="check" />
                    ) : (
                      <div className="check"></div>
                    )}
                    {desp}
                  </button>
                ))}
              </ul>
            </div>
          </div>
          <button className="add-product" onClick={() => addProduct()}>
            <span className="add-product-name">Add Product</span>
          </button>
        </div>
      </div>
      <div className="product-content">
        {products
          .slice(currentPage * 10, currentPage * 10 + 10)
          .map((product, index) => (
            <Product
              key={index}
              volume={product.volume}
              category={product.category}
              content={product.content}
              imgPath={product.imgPath}
              id={product.id}
              desp={product.desp}
              price={product.price}
            />
          ))}
      </div>
      <div className="pagination-wrap">
        <div className="nav-to-page">
          <p>Go to </p>
          <input
            value={pageValue}
            maxLength={2}
            onChange={(e) => customPageOnChange(e)}
            onKeyUp={(e) => customToPage(e)}
          />
          <p>Page</p>
        </div>
        <nav className="nav-list">
          <ul>
            <li>
              <button
                className="pagination-item "
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
                        ? "pagination-item-inverse"
                        : "pagination-item"
                    }
                    onClick={() => navigateToPage(index)}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
            <li>
              <button
                className="pagination-item"
                onClick={() => navigateToPage("next")}
              >
                {">>"}
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default ProductPage;
