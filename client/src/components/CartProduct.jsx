import React from "react";
import styles from "../css/CartProduct.module.css";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { toggleCart, removeProducts } from "../reducer/cartSlice";
import AddToCart from "./AddToCart";

const CartProduct = (props) => {
  const products = useSelector((state) => state.productReducer.products);
  const cart = useSelector((state) => state.cartReducer.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { index, current } = props;

  // use cart id to find product info
  const getProductInfo = createSelector(
    [(state) => state, (state, currentId) => currentId],
    (items, currentId) => {
      const currentProduct = items.find((item) => item.id === currentId);
      return {
        imgPath:
          currentProduct?.imgPath ||
          "http://127.0.0.1:4000/resources/unavailable.png",
        desp: currentProduct?.desp || "Item is unavailable",
        price: currentProduct?.price || 0,
        volume: currentProduct?.volume || 0,
      };
    }
  );

  const cartProduct = getProductInfo(products, current.id);
  console.log(cartProduct);

  const remove = (index) => {
    dispatch(removeProducts({ id: cart[index].id }));
  };

  const toDetailsPage = (productId) => {
    const productIndex = products.findIndex(
      (product) => product.id === productId
    );
    if (productIndex === -1) {
      navigate("/products");
    } else {
      navigate(`/products/get/${productIndex}`);
    }
    dispatch(toggleCart());
  };
  return (
    <div className={styles["cart-product"]} key={index}>
      <img
        src={cartProduct.imgPath}
        style={{ width: "120px", height: "120px" }}
        onClick={() => toDetailsPage(current.id)}
        alt=""
      />
      <div className={styles["cart-product-info"]}>
        <div className={styles["cart-product-name-price"]}>
          {cartProduct.volume > 0 ? (
            <p>{cartProduct.desp}</p>
          ) : (
            <p className={styles["out-of-stock"]}>out of stock</p>
          )}
          {cartProduct.volume > 0 ? (
            <span>${cartProduct.price}</span>
          ) : (
            <span className={styles["out-of-stock"]}>$0</span>
          )}
        </div>
        <div className={styles["cart-product-btn"]}>
          <div className={styles["add-to-cart-wrap"]}>
            <AddToCart id={current.id} volume={cartProduct.volume} />
          </div>
          <button onClick={() => remove(index)}>Remove</button>
        </div>
      </div>
    </div>
  );
};

export default CartProduct;
