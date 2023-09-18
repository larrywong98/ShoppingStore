import { useState } from "react";
import { IconButton } from "@mui/material";
import { StarFilled, ShoppingCart, User } from "@carbon/icons-react";
import SearchIcon from "@mui/icons-material/Search";
import "../css/Header.css";

const Header = () => {
  const [loggedin, setLoggedin] = useState(false);

  const userLogin = () => {
    //dispatch login or logout
    setLoggedin(!loggedin);
  };
  const openCart = () => {
    console.log("cart open");
    //dispatch cart
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
          <button onClick={() => openCart()}>
            <ShoppingCart width="30px" height="30px" />
          </button>
          <span className="total">$0.00</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
