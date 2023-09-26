import { useEffect, useState } from "react";
import { GrLinkPrevious } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import loadProducts from "../services/loadProducts";
import skStyles from "../css/Skeleton.module.css";

import styles from "../css/ProductDetail.module.css";
import { useParams } from "react-router";
import { toggleLoading } from "../reducer/globalSlice";
import isNumeric from "../utils/isNumeric";

const ProductDetail = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.globalReducer.loading);
  const products = useSelector((state) => state.productReducer.products);
  const productIndex = useParams().productIndex;
  const currentProduct = products[productIndex] || [];
  // const params = useParams();

  useEffect(() => {
    dispatch(toggleLoading({ to: true }));
    if (products.length === 0) {
      dispatch(loadProducts());
      return;
    }
    if (!isNumeric(productIndex) || productIndex >= products.length) {
      navigate("/error");
    }
    dispatch(toggleLoading({ to: false }));
  }, [products]);
  return (
    <>
      {loading ? (
        <div className={styles["product-detail-page"]}>
          <div className={styles["product-detail-page-header"]}>
            <h1>Products Detail</h1>
            <Link to="/products" className={styles["back-icon"]}>
              <GrLinkPrevious />
            </Link>
          </div>
          <div className={styles["product-detail-content"]}>
            <img className={skStyles["loading-animation"]} />
            <div className={styles["product-detail"]}>
              <h2 className={skStyles["loading-animation"]}> </h2>
              <h1 className={skStyles["loading-animation"]}> </h1>
              <div className={styles["product-detail-price-stock"]}>
                <p className={skStyles["loading-animation"]}></p>
              </div>
              <p
                className={
                  styles["product-detail-content-paragraph"] +
                  " " +
                  skStyles["loading-animation"]
                }
              ></p>
              <div className={styles["product-detail-btn-group"]}>
                <button
                  className={
                    styles["add-cart-btn"] + " " + skStyles["loading-animation"]
                  }
                ></button>
                <button
                  className={
                    styles["edit-product"] + " " + skStyles["loading-animation"]
                  }
                ></button>
              </div>
            </div>
          </div>
        </div>
      ) : (
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
                {currentProduct.volume === productIndex ? (
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
                  to={"/products/edit/" + productIndex}
                  className={styles["edit-product"]}
                >
                  Edit
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetail;
