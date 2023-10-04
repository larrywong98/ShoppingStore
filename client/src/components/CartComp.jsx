import { useNavigate } from "react-router";
import styles from "../css/Cart.module.css";
import {
  clearCart,
  removeProducts,
  toggleCart,
  setDiscount,
} from "../reducer/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import AddToCart from "./AddToCart";
import { createSelector } from "@reduxjs/toolkit";
import { useMemo, useState } from "react";
import checkoutCart from "../services/checkoutCart";

const CartComp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.productReducer.products);
  const cartQuantity = useSelector((state) => state.cartReducer.cartQuantity);
  const cart = useSelector((state) => state.cartReducer.cart);
  const cartOpened = useSelector((state) => state.cartReducer.cartOpened);
  const userId = useSelector((state) => state.userReducer.userId);
  const discount = useSelector((state) => state.cartReducer.discount);
  const [discountText, setDiscountText] = useState("");

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

  const calculateSubtotal = createSelector(
    [(state) => state, (state, cart) => cart],
    (products, cart) => {
      if (cart.length === 0 || products.length === 0) return 0;
      return cart.reduce((acc, cur) => {
        const price =
          products.find((product) => product.id === cur.id)?.price || 0;
        return acc + cur.added * price;
      }, 0);
    }
  );
  const subtotal = calculateSubtotal(products, cart);

  const taxRate = 0.1;

  const tax = useMemo(() => {
    return subtotal * taxRate;
  }, [subtotal, taxRate]);

  const discountPrice = useMemo(() => {
    if (discount === undefined || discount === "") return 0;
    if (discount.charAt(0) === "*") {
      return subtotal * (1 - parseFloat(discount.slice(1)));
    } else if (discount.charAt(0) === "-") {
      return parseFloat(discount.slice(1));
    }
  }, [discount, subtotal]);

  const total = useMemo(() => {
    return Math.max(subtotal - discountPrice + tax, 0);
  }, [subtotal, discountPrice, tax]);

  const checkDiscountCode = () => {
    const discountCode = { percent90: "*0.8", coupon20: "-20" };
    if (!(discountText in discountCode)) return;
    let currentDiscount = discountCode[discountText];
    dispatch(setDiscount({ discount: currentDiscount }));
    setDiscountText("");
  };

  const checkout = async () => {
    dispatch(toggleCart());
    dispatch(clearCart());
    checkoutCart(userId, cart, navigate);
  };

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
    <>
      <div className={cartOpened && styles["overlay"]}></div>
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
                  style={{ width: "120px", height: "120px" }}
                  onClick={() => toDetailsPage(current.id)}
                  alt=""
                />
                <div className={styles["cart-product-info"]}>
                  <div className={styles["cart-product-name-price"]}>
                    <p>{getProductInfo(products, current.id).desp}</p>
                    <span>${getProductInfo(products, current.id).price}</span>
                  </div>
                  <div className={styles["cart-product-btn"]}>
                    <div className={styles["add-to-cart-wrap"]}>
                      <AddToCart
                        id={current.id}
                        volume={getProductInfo(products, current.id).volume}
                      />
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
              <li>${tax.toFixed(2)}</li>
              {discountPrice !== 0 ? (
                <li className={styles["discount"]}>
                  -${discountPrice.toFixed(2)}
                </li>
              ) : (
                <li>${discountPrice.toFixed(2)}</li>
              )}

              <li>${total.toFixed(2)}</li>
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
