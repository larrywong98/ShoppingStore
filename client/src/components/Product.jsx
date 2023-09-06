import React from "react";
import { Paper } from "@mui/material";

const Product = (props) => {
  return (
    <Paper variant="outlined" className="product-paper" square>
      {props.id}
    </Paper>
  );
};

export default Product;
