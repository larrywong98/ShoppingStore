import { useNavigate } from "react-router";
import styles from "../css/Cart.module.css";
import { initCart, removeProducts, toggleCart } from "../reducer/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AddToCart from "./AddToCart";
import { createSelector } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import requestData from "../services/requestData";

const CartComp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.productReducer.products);
  const cartQuantity = useSelector((state) => state.cartReducer.cartQuantity);
  const cart = useSelector((state) => state.cartReducer.cart);
  const taxRate = 0.1;
  const discountCode = { google90: "90%", apple: "-20" };
  const [discount, setDiscount] = useState(0);
  const [discountText, setDiscountText] = useState("");
  const getProductInfo = createSelector(
    [(state) => state, (state, currentId) => currentId],
    (items, currentId) => {
      const currentProduct = items.find((item) => item.id === currentId);
      return {
        imgPath: currentProduct.imgPath,
        desp: currentProduct.desp,
        price: currentProduct.price,
      };
    }
  );

  const calculateSubtotal = createSelector(
    [(state) => state, (state, cart) => cart],
    (products, cart) => {
      return cart.reduce((acc, cur) => {
        const price = products.find((product) => product.id === cur.id).price;
        return acc + cur.added * price;
      }, 0);
    }
  );
  const subtotal = calculateSubtotal(products, cart);

  const checkDiscountCode = () => {
    if (!(discountText in discountCode)) return;
    setDiscount(0);
    const currentDiscount = discountCode[discountText];
    if (currentDiscount.includes("%")) {
      setDiscount(
        (subtotal *
          parseInt(currentDiscount.slice(0, currentDiscount.length - 1), 10)) /
          100
      );
    } else if (currentDiscount.includes("-")) {
      setDiscount(parseFloat(currentDiscount.slice(1, currentDiscount.length)));
    }
  };

  const checkout = async () => {
    dispatch(toggleCart());
    // dispatch(initCart());
    const response = await requestData({
      url: "http://127.0.0.1:4000/api/cart/checkout",
      method: "delete",
      data: JSON.stringify(cart),
      headers: { "Content-Type": "application/json" },
    });
    navigate("/success", { state: { message: "Product Purchased !!!" } });
  };
  useEffect(() => {
    checkDiscountCode();
  }, [cart]);

  const remove = (index) => {
    dispatch(removeProducts({ id: cart[index].id }));
  };
  return (
    <>
      <div className={styles["blur-background"]}></div>
      <div className={styles["cart"]}>
        <div className={styles["cart-header"]}>
          <div className={styles["cart-header-head"]}>
            <p>Cart</p>
            <span>{"(" + cartQuantity + ")"}</span>
          </div>

          <button onClick={() => dispatch(toggleCart())}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <g clipPath="url(#clip0_31_560)">
                <path
                  d="M24 2.41714L21.5829 0L12 9.58286L2.41714 0L0 2.41714L9.58286 12L0 21.5829L2.41714 24L12 14.4171L21.5829 24L24 21.5829L14.4171 12L24 2.41714Z"
                  fill="white"
                />
              </g>
              <defs>
                <clipPath id="clip0_31_560">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </button>
        </div>
        <div className={styles["cart-content"]}>
          <div className={styles["cart-products-list"]}>
            {cart.map((current, index) => (
              <div className={styles["cart-product"]} key={index}>
                <img
                  src={getProductInfo(products, current.id).imgPath}
                  alt=""
                />
                <div className={styles["cart-product-info"]}>
                  <div className={styles["cart-product-name-price"]}>
                    <p>{getProductInfo(products, current.id).desp}</p>
                    <span>${getProductInfo(products, current.id).price}</span>
                  </div>
                  <div className={styles["cart-product-btn"]}>
                    <div className={styles["add-to-cart-wrap"]}>
                      <AddToCart id={current.id} />
                    </div>
                    <button onClick={() => remove(index)}>Remove</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className={styles["cart-discount"]}>
            <p>Apply Discount Code</p>
            <div className={styles["cart-discount-text-btn"]}>
              <input
                value={discountText}
                onChange={(e) => setDiscountText(e.target.value)}
              />
              <button onClick={(e) => checkDiscountCode(e)}>Apply</button>
            </div>
          </div>
          <hr></hr>
          <div className={styles["cart-summary"]}>
            <ul>
              <li>Subtotal</li>
              <li>Tax</li>
              <li>Discount</li>
              <li>Estimate total</li>
            </ul>
            <ul>
              <li>${subtotal.toFixed(2)}</li>
              <li>${(subtotal * taxRate).toFixed(2)}</li>
              {discount !== 0 ? (
                <li className={styles["discount"]}>-${discount}</li>
              ) : (
                <li>${discount}</li>
              )}

              <li>${(subtotal * (1 + taxRate) - discount).toFixed(2)}</li>
            </ul>
          </div>
          <button className={styles["checkout"]} onClick={() => checkout()}>
            Continue to Checkout
          </button>
        </div>
      </div>
    </>
  );
};

export default CartComp;
