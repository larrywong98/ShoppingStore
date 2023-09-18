import "../css/ProductPage.css";
import { Checkmark, CaretUp, CaretDown } from "@carbon/icons-react";
import { useEffect, useState } from "react";
import Product from "./Product";

const ProductPage = () => {
  const [selected, setSelected] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  // const productImageDirUrl = "http://127.0.0.1:4000/resources/";
  const [currentPage, setCurrentPage] = useState(0);

  //dispatch product slice
  const [products, setProducts] = useState([]);
  const sortStatus = [
    { desp: "Last added" },
    { desp: "Price: low to high" },
    { desp: "Price: high to low" },
  ];
  useEffect(() => {
    (async () => {
      const res = await fetch("http://127.0.0.1:4000/products", {
        method: "get",
      });
      setProducts(await res.json());
    })();
    lastAdded();
  }, []);
  const addProduct = () => {};

  const lastAdded = () => {
    let newProducts = [...products];
    newProducts.sort((a, b) => {
      if (parseInt(a.timestamp, 10) > parseInt(b.timestamp, 10)) return -1;
      return 1;
    });
    setProducts(newProducts);
  };
  const priceLowtoHigh = () => {
    let newProducts = [...products];
    newProducts.sort((a, b) => a.price - b.price);
    setProducts(newProducts);
  };
  const priceHightoLow = () => {
    let newProducts = [...products];
    newProducts.sort((a, b) => b.price - a.price);
    setProducts(newProducts);
  };

  const sortBySelection = (i) => {
    if (i === 0) lastAdded();
    if (i === 1) priceLowtoHigh();
    if (i === 2) priceHightoLow();

    setSelected(i);
    setDropdownOpen(false);
  };

  const navigateToPage = (action) => {
    if (action === "prev") {
      setCurrentPage(Math.max(currentPage - 1, 0));
    } else if (action === "next") {
      setCurrentPage(
        Math.min(currentPage + 1, Math.ceil(products.length / 10) - 1)
      );
    } else {
      setCurrentPage(action);
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
        {[...products]
          .slice(currentPage * 10, currentPage * 10 + 10)
          .map((product, index) => (
            <Product
              key={index}
              imgPath={product.imgPath}
              id={product.id}
              desp={product.desp}
              price={product.price}
            />
          ))}
      </div>
      <div className="pagination-wrap">
        <div className="nav-to-page"></div>
        <nav className="nav-list">
          <ul>
            <li>
              <button onClick={() => navigateToPage("prev")}>{"<<"}</button>
            </li>
            {Array(Math.ceil(products.length / 10))
              .fill(0)
              .map((page, index) => (
                <li key={index}>
                  <button onClick={() => navigateToPage(index)}>
                    {index + 1}
                  </button>
                </li>
              ))}
            <li>
              <button onClick={() => navigateToPage("next")}>{">>"}</button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default ProductPage;
