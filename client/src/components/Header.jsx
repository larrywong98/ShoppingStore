import react from "react";
import {
  Button,
  TextField,
  InputAdornment,
  Typography,
  IconButton,
} from "@mui/material";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import "../css/Header.css";

const Header = () => {
  return (
    <div className="header">
      <div className="app-name">
        <p>Management</p>
        <span>Chuwa</span>
      </div>
      <div className="search-bar-wrap">
        <TextField
          placeholder="Search"
          className="search-bar"
          size="small"
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment>
                <IconButton>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </div>
      <div className="status">
        <div className="account">
          <IconButton size="small" color="inherit">
            <ManageAccountsIcon />
          </IconButton>
          <Button href="/SignIn" color="inherit">
            Sign In
          </Button>
        </div>
        <div className="cart">
          <IconButton size="small" color="inherit">
            <ShoppingCartIcon />
          </IconButton>
          <Typography color="inherit">$0.00</Typography>
        </div>
      </div>
    </div>
  );
};

export default Header;
