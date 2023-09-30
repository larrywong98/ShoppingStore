import { useEffect, useState } from "react";
import { IconButton } from "@mui/material";

import { StarFilled, ShoppingCart, User } from "@carbon/icons-react";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import { toggleCart, clearCart } from "../reducer/cartSlice";
import loadCart from "../services/loadCart";
import styles from "../css/Header.module.css";
import SearchBar from "./SearchBar";
import { signOut } from "../reducer/userSlice";
import { useNavigate } from "react-router";
import saveCart from "../services/saveCart";
import CartComp from "./CartComp";
const Header = () => {
  const loggedIn = useSelector((state) => state.userReducer.signedIn);
  // const [loggedIn, setloggedIn] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartOpened = useSelector((state) => state.cartReducer.cartOpened);
  const cartQuantity = useSelector((state) => state.cartReducer.cartQuantity);
  const cart = useSelector((state) => state.cartReducer.cart);
  const user = useSelector((state) => state.userReducer);

  const userLogin = () => {
    if (loggedIn === false) {
      navigate("/signin");
    } else {
      localStorage.clear();
      saveCart({ id: user.userId, cart: cart });
      // console.log(cart);
      dispatch(signOut());
      dispatch(clearCart());
      navigate("/success", { state: { message: "Log out Successfully !!!" } });
    }
  };
  const onToggleCart = () => {
    if (user.signedIn === false) {
      navigate("/signin");
      return;
    }
    console.log(cartOpened);
    //dispatch cart
    dispatch(toggleCart());
    // console.log(cart);
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
        <button className={styles["account"]} onClick={() => userLogin()}>
          <div className={styles["user-certificate"]}>
            <User className={styles["user-icon"]} width="30px" height="30px" />
            {loggedIn ? <StarFilled className={styles["star-icon"]} /> : <></>}
          </div>
          <span className={styles["signin"]}>
            {loggedIn ? "Sign Out" : "Sign In"}
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
          <span className={styles["total"]}>$0.00</span>
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
