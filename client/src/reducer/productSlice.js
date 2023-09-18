import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: { products: [] },
  reducers: {
    load: (state, action) => {
      state.products = action.payload.products;
      return state;
    },
    lastAdded: (state) => {
      state.products.sort((a, b) => {
        if (parseInt(a.timestamp, 10) > parseInt(b.timestamp, 10)) return -1;
        return 1;
      });
      return state;
    },
    priceLowtoHigh: (state) => {
      state.products.sort((a, b) => a.price - b.price);
      return state;
    },
    priceHightoLow: (state) => {
      state.products.sort((a, b) => b.price - a.price);
      return state;
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
