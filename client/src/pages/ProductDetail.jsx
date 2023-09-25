import { useEffect, useState } from "react";
import { GrLinkPrevious } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loadProducts } from "../reducer/productSlice";

import styles from "../css/ProductDetail.module.css";
import { useParams } from "react-router";
const ProductDetail = (props) => {
  const navigate = useNavigate();
  const products = useSelector((state) => state.productReducer.products);
  const productId = useParams().productId;
  const currentProduct = products[productId] || {};
  // const params = useParams();

  useEffect(() => {
    // dispatch(loadProducts());
    // console.log(currentProduct);
    if (Object.keys(currentProduct).length === 0) {
      navigate("/products");
    }
  }, []);
  return (
    <>
      <div className={styles["product-detail-page"]}>
        <div className={styles["product-detail-page-header"]}>
          <h1>Products Detail</h1>
          <Link to="/products" className={styles["back-icon"]}>
            <GrLinkPrevious />
          </Link>
        </div>
        <div className={styles["product-detail-content"]}>
          <img src={currentProduct.imgPath} alt="" />
          <div className={styles["product-detail"]}>
            <h2>{currentProduct.category}</h2>
            <h1>{currentProduct.desp}</h1>
            <div className={styles["product-detail-price-stock"]}>
              <p>${currentProduct.price}</p>
              {currentProduct.volume === productId ? (
                <span>Out of Stock</span>
              ) : (
                <></>
              )}
            </div>
            <p className={styles["product-detail-content-paragraph"]}>
              {currentProduct.content}
            </p>
            <div className={styles["product-detail-btn-group"]}>
              <button className={styles["add-cart-btn"]}>Add To Cart</button>
              <Link
                to={"/products/edit/" + productId}
                className={styles["edit-product"]}
              >
                Edit
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
