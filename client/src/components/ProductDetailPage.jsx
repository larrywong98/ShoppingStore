import react from "react";
import "../css/Products.css";
import test from "../resources/test.png";
import {
  Container,
  Grid,
  Paper,
  Box,
  Button,
  MenuList,
  Typography,
  CssBaseline,
} from "@mui/material";
import Product from "./Product";
import usePagination from "@mui/material/usePagination";

const ProductDetailPage = () => {
  return (
    <>
      <Box display={"flex"} flexDirection={"column"}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            marginTop: "50px",
            paddingLeft: "5%",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h5">Products</Typography>
        </Box>

        <Paper
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            width: "100%",
            justifyContent: "center",
          }}
        >
          <Box component="img" width="45%" paddingRight="5%" src={test}></Box>
          <Box width="45%" paddingLeft="5%" sx={{ my: 4 }}>
            <Box sx={{ my: 1 }}>
              <Typography variant="p" sx={{ paddingTop: "10px" }}>
                Company1
              </Typography>
            </Box>
            <Box>
              <Typography variant="h1" sx={{ fontSize: "20px" }}>
                Meta Quest2 VR Headset
              </Typography>
            </Box>

            <Box
              display="flex"
              flexDirection="row"
              alignItems="center"
              sx={{ my: 4 }}
            >
              <Box>
                <Typography
                  variant="span"
                  sx={{
                    fontSize: "30px",
                    fontWeight: "bold",
                    width: "100px",
                    height: "30px",
                    border: "1px solid red",
                  }}
                >
                  $299
                </Typography>
              </Box>
              <Box
                display="flex"
                alignItems="center"
                sx={{
                  fontSize: "15px",
                  backgroundColor: "#fbe7e4",
                  border: "none",
                  borderRadius: "5px",
                  width: "120px",
                  height: "40px",
                }}
              >
                <Typography
                  variant="span"
                  sx={{
                    color: "red",
                    border: "1px solid red",
                  }}
                >
                  Out of Stock
                </Typography>
              </Box>
            </Box>
            <Typography variant="p" sx={{ my: 4 }}>
              Hundreds of hit games, one of experiences
            </Typography>
            <Box sx={{ my: 4 }}>
              <Button
                href="/addToCart"
                sx={{
                  backgroundColor: "#554ce2",
                  fontSize: "10px",
                  color: "white",
                  width: "100px",
                  height: "30px",
                }}
              >
                Add to Cart
              </Button>
              <Button
                href="/edit"
                sx={{
                  backgroundColor: "white",
                  border: "1px solid #dddddd",
                  fontSize: "10px",
                  color: "#554ce2",
                  width: "100px",
                  height: "30px",
                }}
              >
                Edit
              </Button>
            </Box>
          </Box>
        </Paper>
      </Box>
    </>
  );
};

export default ProductDetailPage;
