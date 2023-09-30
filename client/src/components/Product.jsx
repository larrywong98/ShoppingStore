import React, { useEffect, useState } from "react";
import styles from "../css/Product.module.css";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { addOneProduct, removeOneProduct } from "../reducer/cartSlice";
import { Link } from "react-router-dom";
import loadCart from "../services/loadCart";
import skStyle from "../css/Skeleton.module.css";
import { toggleLoading } from "../reducer/globalSlice";
import { createSelector } from "@reduxjs/toolkit";
import saveCart from "../services/saveCart";
import AddToCart from "./AddToCart";

const Product = (props) => {
  // const [numberInCart, setNumberInCart] = useState(0);
  // const [loading, setLoading] = useState(true);
  const loading = useSelector((state) => state.globalReducer.loading);
  const cartOpened = useSelector((state) => state.cartReducer.cartOpened);
  const cart = useSelector((state) => state.cartReducer.cart);
  const user = useSelector((state) => state.userReducer);
  const numberInCartSelector = createSelector(
    (state) => state,
    (items) => {
      if (Object.keys(items).length === 0) return 0;
      const inCart = items.filter((item) => item.id === props.id);
      if (inCart.length === 1) {
        return inCart[0].added;
      }
      return 0;
    }
  );
  const numberInCart = numberInCartSelector(cart);
  // const [numberInCart, setNumberInCart] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toDetailPage = (pageId, index) => {
    if (cartOpened === true) {
      return;
    }
    let realid = pageId * 10 + index;
    navigate(realid.toString());
  };
  const addOne = () => {
    if (user.signedIn === false) {
      navigate("/signin");
      return;
    }
    if (numberInCart >= props.volume) return;
    dispatch(addOneProduct({ id: props.id }));
    // saveCart({ id: user.userId, cart: cart });
  };
  const removeOne = () => {
    if (user.signedIn === false) {
      navigate("/signin");
      return;
    }
    if (numberInCart < 0) return;
    dispatch(removeOneProduct({ id: props.id }));
    // saveCart({ id: user.userId, cart: cart });
  };
  // useEffect(() => {
  //   if (user.signedIn === false) {
  //     navigate("/signin");
  //   }
  // }, []);
  return (
    <>
      {loading ? (
        <div className={styles["product-item"]}>
          <div
            style={{ width: "100%", height: "100%" }}
            className={skStyle["loading-animation"]}
          ></div>
          <div className={styles["product-info"]}>
            <p
              className={skStyle["loading-animation"]}
              style={{ width: "70%", height: "20px" }}
            ></p>
            <p
              className={skStyle["loading-animation"]}
              style={{ width: "30%", height: "20px", marginTop: "8px" }}
            ></p>
          </div>

          <div className={styles["product-item-btn-group"]}>
            <div
              className={
                styles["add-btn-init"] + " " + skStyle["loading-animation"]
              }
            ></div>
            <div
              className={
                styles["edit-btn"] + " " + skStyle["loading-animation"]
              }
            ></div>
          </div>
        </div>
      ) : (
        <div className={styles["product-item"]}>
          <img
            style={{ width: "100%", height: "100%", cursor: "pointer" }}
            src={props.imgPath}
            alt=""
            onClick={() => toDetailPage(props.pageId, props.index)}
          />
          <div className={styles["product-info"]}>
            <p>{props.desp}</p>
            <span>${props.price.toFixed(2)}</span>
          </div>

          <div className={styles["product-item-btn-group"]}>
            <div className={styles["add-to-cart-btn"]}>
              <AddToCart id={props.id} volume={props.volume} />
            </div>
            {user.admin ? (
              <Link to={"edit/" + props.index} className={styles["edit-btn"]}>
                Edit
              </Link>
            ) : (
              <></>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Product;
