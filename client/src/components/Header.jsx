import react from "react";
import {
  Box,
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
        <h1>
          M<span className="app-name-display">anagement</span>
          <span className="chuwa-display">Chuwa</span>
        </h1>
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
          <Button href="/SignIn" color="inherit">
            <IconButton size="small" color="inherit">
              <ManageAccountsIcon />
            </IconButton>
            <span className="signin">Sign In</span>
          </Button>
        </div>
        <Box className="cart">
          <IconButton size="small" color="inherit">
            <ShoppingCartIcon />
          </IconButton>
          <Typography color="inherit">$0.00</Typography>
        </Box>
      </div>
    </div>
  );
};

export default Header;
