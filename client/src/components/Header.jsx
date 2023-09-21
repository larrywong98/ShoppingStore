import { useState } from "react";
import { IconButton } from "@mui/material";
import { StarFilled, ShoppingCart, User } from "@carbon/icons-react";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import { toggleCart } from "../reducer/cartSlice";
import styles from "../css/Header.module.css";
const Header = () => {
  const [loggedin, setLoggedin] = useState(false);
  const dispatch = useDispatch();
  const cartOpened = useSelector((state) => state.cartReducer.cartOpened);

  const userLogin = () => {
    //dispatch login or logout
    setLoggedin(!loggedin);
  };
  const onToggleCart = () => {
    //dispatch cart
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
          <input
            className={styles["search-bar"]}
            type="text"
            placeholder="Search"
          />
          <IconButton>
            <SearchIcon />
          </IconButton>
        </div>
      </div>

      <div className={styles["status"]}>
        <button className={styles["account"]} onClick={() => userLogin()}>
          <div className={styles["user-certificate"]}>
            <User className={styles["user-icon"]} width="30px" height="30px" />
            {loggedin ? <StarFilled className="star-icon" /> : <></>}
          </div>
          <span className={styles["signin"]}>
            {" "}
            {loggedin ? "Sign Out" : "Sign In"}
          </span>
        </button>
        <div className={styles["cart"]}>
          <button onClick={() => onToggleCart()}>
            <ShoppingCart width="30px" height="30px" />
          </button>
          <span className={styles["total"]}>$0.00</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
