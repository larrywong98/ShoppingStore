import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: { cartOpened: false },
  reducers: {
    toggleCart: (state) => {
      state.cartOpened = !state.cartOpened;
      //   console.log(state.cartOpened);
      return state;
    },
  },
});

export const { toggleCart } = cartSlice.actions;
export default cartSlice.reducer;
