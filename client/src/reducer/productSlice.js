import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "product",
  initialState: [],
  reducers: {
    load: (state, action) => {
      state = action.payload.products;
      return state;
    },
    lastAdded: (state) => {
      let newProducts = [...state];
      newProducts.sort((a, b) => {
        if (parseInt(a.timestamp, 10) > parseInt(b.timestamp, 10)) return -1;
        return 1;
      });
      return newProducts;
    },
    priceLowtoHigh: (state) => {
      let newProducts = [...state];
      newProducts.sort((a, b) => a.price - b.price);
      return newProducts;
    },
    priceHightoLow: (state) => {
      let newProducts = [...state];
      newProducts.sort((a, b) => b.price - a.price);
      // setProducts(newProducts);
      return newProducts;
    },
  },
});

export const loadProducts = () => {
  return async (dispatch, getState) => {
    const products = await getProductsRequest();
    dispatch(load({ products: products }));
  };
};

export const getProductsRequest = async () => {
  const res = await fetch("http://127.0.0.1:4000/products", {
    method: "get",
  });
  return await res.json();
};

export const { load, lastAdded, priceLowtoHigh, priceHightoLow } =
  productSlice.actions;

export default productSlice.reducer;
