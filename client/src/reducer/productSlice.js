import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    initProducts: [],
    sortStatus: [
      { desp: "Last added" },
      { desp: "Price: low to high" },
      { desp: "Price: high to low" },
      { selected: 0 },
    ],
  },
  reducers: {
    load: (state, action) => {
      state.products = action.payload.products;
      state.initProducts = action.payload.products;
      return state;
    },
    lastAdded: (state) => {
      state.products.sort((a, b) => {
        if (parseInt(a.timestamp, 10) > parseInt(b.timestamp, 10)) return -1;
        return 1;
      });
      state.sortStatus[3].selected = 0;
      return state;
    },
    priceLowtoHigh: (state) => {
      state.products.sort((a, b) => a.price - b.price);
      state.sortStatus[3].selected = 1;
      return state;
    },
    priceHightoLow: (state) => {
      state.products.sort((a, b) => b.price - a.price);
      state.sortStatus[3].selected = 2;
      return state;
    },
    filterByInput: (state, action) => {
      state.products = state.initProducts;
      state.products = state.products.filter((product) =>
        product.desp.toLowerCase().includes(action.payload.text.toLowerCase())
      );
      return state;
    },
    initProduct: (state) => {
      state.products = state.initProducts;
      state.products.sort((a, b) => {
        if (parseInt(a.timestamp, 10) > parseInt(b.timestamp, 10)) return -1;
        return 1;
      });
      state.sortStatus[3].selected = 0;
      return state;
    },
  },
});

export const {
  load,
  lastAdded,
  priceLowtoHigh,
  priceHightoLow,
  filterByInput,
  initProduct,
} = productSlice.actions;

export default productSlice.reducer;