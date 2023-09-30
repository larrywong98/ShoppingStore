import { useEffect, useState } from "react";
import { GrLinkPrevious } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import loadProducts from "../services/loadProducts";
import skStyles from "../css/Skeleton.module.css";

import styles from "../css/ProductDetail.module.css";
// import ostyles from "../css/Products.module.css";
import { useParams } from "react-router";
import { toggleLoading } from "../reducer/globalSlice";
import isNumeric from "../utils/isNumeric";
import { addOneProduct, removeOneProduct } from "../reducer/cartSlice";
import { createSelector } from "@reduxjs/toolkit";
import requestData from "../services/requestData";
import saveCart from "../services/saveCart";
import AddToCart from "../components/AddToCart";

const ProductDetail = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer);
  const loading = useSelector((state) => state.globalReducer.loading);
  const products = useSelector((state) => state.productReducer.products);
  const cart = useSelector((state) => state.cartReducer.cart);
  const productIndex = useParams().productIndex;
  const currentProduct = products[productIndex] || [];
  // const numberInCartSelector = createSelector(
  //   (state) => state,
  //   (items) => {
  //     if (Object.keys(items).length === 0) return 0;
  //     const inCart = items.filter((item) => item.id === currentProduct.id);
  //     if (inCart.length === 1) {
  //       return inCart[0].added;
  //     }
  //     return 0;
  //   }
  // );
  // const numberInCart = numberInCartSelector(cart);

  // const addToCart = () => {
  //   if (user.signedIn === false) {
  //     navigate("/signin");
  //     return;
  //   }

  //   dispatch(addOneProduct({ id: currentProduct.id }));
  //   saveCart({ id: user.userId, cart: cart });
  //   // console.log(products[productIndex].id);
  // };
  // const addOne = () => {
  //   if (user.signedIn === false) {
  //     navigate("/signin");
  //     return;
  //   }
  //   if (numberInCart >= currentProduct.volume) return;
  //   dispatch(addOneProduct({ id: currentProduct.id }));
  //   // saveCart({ id: user.userId, cart: cart });
  // };
  // const removeOne = () => {
  //   if (user.signedIn === false) {
  //     navigate("/signin");
  //     return;
  //   }
  //   if (numberInCart < 0) return;
  //   dispatch(removeOneProduct({ id: currentProduct.id }));
  //   // saveCart({ id: user.userId, cart: cart });
  // };

  useEffect(() => {
    dispatch(toggleLoading({ to: true }));
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
                <div className={styles["add-to-cart-wrap"]}>
                  <AddToCart id={currentProduct.id} />
                </div>

                {user.admin ? (
                  <Link
                    to={"/products/edit/" + productIndex}
                    className={styles["edit-product"]}
                  >
                    Edit
                  </Link>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetail;
