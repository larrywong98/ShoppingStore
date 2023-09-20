import { useState } from "react";
import { IconButton } from "@mui/material";
import { StarFilled, ShoppingCart, User } from "@carbon/icons-react";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import { toggleCart } from "../reducer/cartSlice";
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
    <div className="header">
      <div className="name-search">
        <div className="app-name">
          <span className="app-name-span">
            M<span className="app-name-display">anagement</span>
            <span className="chuwa-display">Chuwa</span>
          </span>
        </div>
        <div className="search-bar-wrap">
          <input className="search-bar" type="text" placeholder="Search" />
          <IconButton>
            <SearchIcon />
          </IconButton>
        </div>
      </div>

      <div className="status">
        <button className="account" onClick={() => userLogin()}>
          <div className="user-certificate">
            <User className="user-icon" width="30px" height="30px" />
            {loggedin ? <StarFilled className="star-icon" /> : <></>}
          </div>
          <span className="signin"> {loggedin ? "Sign Out" : "Sign In"}</span>
        </button>
        <div className="cart">
          <button onClick={() => onToggleCart()}>
            <ShoppingCart width="30px" height="30px" />
          </button>
          <span className="total">$0.00</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
