import react from "react";
import "../css/Products.css";
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

const ProductPage = () => {
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
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              paddingRight: "5%",
            }}
          >
            <MenuList>menu</MenuList>
            <Button>Add Product</Button>
          </Box>
        </Box>
        <Box>
          <Grid
            container
            className="product-grid"
            // rowSpacing={{ xs: 2, sm: 2, md: 2, lg: 2 }}
            // columnSpacing={{ xs: 1, sm: 1, md: 1, lg: 1 }}
            width="90%"
            // width="1225px"
            height="100%"
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            wrap="wrap"
            marginLeft="5%"
            marginRight="5%"
            sx={{
              border: "1px solid red",
            }}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((id) => {
              return (
                <Grid
                  item
                  className="product-item"
                  sx={{
                    margin: "2px",
                    border: "1px solid black",
                  }}
                >
                  {/* <Box className="product-item"> */}
                  <Product id={id} />
                  {/* </Box> */}
                </Grid>
              );
            })}
          </Grid>
        </Box>

        {/*
          {[1, 2, 3, 4, 5, 6, 7, 8].map((id) => {
            return (
              <Grid
                item
                className="product-item"
                sx={{
                  margin: "2px",
                  border: "1px solid black",
                }}
              >
                 <Box className="product-item"> 
                <Paper variant="outlined" className="product-paper" square>
                  {id}
                </Paper>
                 </Box> 
              </Grid>
            );
          })}
        </Grid> */}

        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "end",
          }}
        >
          <nav>
            <ul className="pagination">
              <li className="page-item">
                <a className="page-link" href="#">
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
              <li className="page-item actived">
                <a className="page-link" href="#">
                  1
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  2
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  3
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
            </ul>
          </nav>
        </Box>
      </Box>
    </>
  );
};

export default ProductPage;
