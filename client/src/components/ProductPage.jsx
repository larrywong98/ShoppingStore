import "../css/ProductPage.css";
import { Checkmark, CaretUp, CaretDown } from "@carbon/icons-react";
import { useState } from "react";

const ProductPage = () => {
  const [selected, setSelected] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const sortStatus = [
    { desp: "Last added" },
    { desp: "Price: low to high" },
    { desp: "Price: high to low" },
  ];

  const addProduct = () => {};

  const lastAdded = () => {};
  const priceLowtoHigh = () => {};
  const priceHightoLow = () => {};

  const sortBySelection = (i) => {
    if (i === 0) lastAdded();
    if (i === 1) priceLowtoHigh();
    if (i === 2) priceHightoLow();

    setSelected(i);
    setDropdownOpen(false);
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
        {Array.from(Array(10)).map((_, index) => (
          <div className="product-item">111</div>
        ))}
      </div>
      <div className="pagination"></div>
    </div>
  );
};

export default ProductPage;
