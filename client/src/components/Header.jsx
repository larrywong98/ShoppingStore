import { useMemo } from "react";
import { StarFilled, ShoppingCart, User } from "@carbon/icons-react";
import { useDispatch, useSelector } from "react-redux";
import { toggleCart, clearCart } from "../reducer/cartSlice";
import styles from "../css/Header.module.css";
import SearchBar from "./SearchBar";
import { signOut } from "../reducer/userSlice";
import { useNavigate } from "react-router";
import saveCart from "../services/saveCart";
import CartComp from "./CartComp";
import { createSelector } from "@reduxjs/toolkit";
const Header = () => {
  const cartOpened = useSelector((state) => state.cartReducer.cartOpened);
  const cartQuantity = useSelector((state) => state.cartReducer.cartQuantity);
  const cart = useSelector((state) => state.cartReducer.cart);
  const discount = useSelector((state) => state.cartReducer.discount);
  const user = useSelector((state) => state.userReducer);
  const products = useSelector((state) => state.productReducer.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  // login initialize
  const toggleLogin = async () => {
    if (user.signedIn === false) {
      navigate("/signin");
    } else {
      saveCart({ id: user.userId, cart: cart });
      dispatch(signOut());
      dispatch(clearCart());
      localStorage.clear();
      navigate("/success", { state: { message: "Log out Successfully !!!" } });
    }
  };
  // open cart
  const onToggleCart = () => {
    if (user.signedIn === false) {
      navigate("/signin");
      return;
    }
    dispatch(toggleCart());
  };

  return (
    <div className={styles["header"]}>
      <div className={styles["name-search"]}>
        <div className={styles["app-name"]}>
          <span className={styles["app-name-span"]}>
            M<span className={styles["app-name-display"]}>anagement</span>
            <span className={styles["chuwa-display"]}>Chuwa</span>
          </span>
        </div>
        <div className={styles["search-bar-wrap"]}>
          <SearchBar />
        </div>
      </div>

      <div className={styles["status"]}>
        <button className={styles["account"]} onClick={() => toggleLogin()}>
          <div className={styles["user-certificate"]}>
            <User className={styles["user-icon"]} width="30px" height="30px" />
            {user.signedIn ? (
              <StarFilled className={styles["star-icon"]} />
            ) : (
              <></>
            )}
          </div>
          <span className={styles["signin"]}>
            {user.signedIn ? "Sign Out" : "Sign In"}
          </span>
        </button>
        <div className={styles["cart"]}>
          <button onClick={() => onToggleCart()}>
            <ShoppingCart width="30px" height="30px" />
          </button>
          {cartQuantity === 0 ? (
            <></>
          ) : (
            <span className={styles["cart-number"]}>{cartQuantity}</span>
          )}
          <span className={styles["total"]}>${total.toFixed(2)}</span>
        </div>
      </div>
      {cartOpened ? (
        <div className={styles["show-cart"]}>
          <div className={styles["cart-wrap"]}>
            <CartComp />
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Header;
