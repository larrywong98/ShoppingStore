import { TextField, Typography, IconButton } from "@mui/material";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { StarFilled, ShoppingCart, User } from "@carbon/icons-react";
import SearchIcon from "@mui/icons-material/Search";
import "../css/Header.css";

const Header = () => {
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
        <div className="account">
          <div className="user-certificate">
            <User className="user-icon" width="30px" height="30px" />
            <StarFilled className={"star-icon"} />
          </div>
          <span className="signin">Sign In</span>
        </div>
        <div className="cart">
          <ShoppingCart width="30px" height="30px" />
          <span className="total">$0.00</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
