import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartOpened: false,
    cartQuantity: 0,
    cart: [],
    discount: "",
  },
  reducers: {
    toggleCart: (state) => {
      state.cartOpened = !state.cartOpened;
      return state;
    },
    calculateCartQuantity: (state) => {
      state.cartQuantity = state.cart
        .map((cur) => cur.added)
        .reduce((cur, acc) => acc + cur, 0);
      return state;
    },
    initCart: (state, action) => {
      state.cart = action.payload.cart;
      state.cartQuantity = action.payload.cart
        .map((cur) => cur.added)
        .reduce((cur, acc) => acc + cur, 0);
      return state;
    },
    clearCart: (state) => {
      state = { cartOpened: false, cartQuantity: 0, cart: [], cartTotal: 0 };
      return state;
    },
    addOneProduct: (state, action) => {
      let id = action.payload.id;
      const i = state.cart.findIndex((item) => item.id === id);
      if (i === -1) {
        state.cart.push({ id: id, added: 0 });
        state.cart[state.cart.length - 1].added += 1;
      } else {
        state.cart[i].added += 1;
      }
      state.cartQuantity += 1;
      return state;
    },
    removeOneProduct: (state, action) => {
      let id = action.payload.id;
      const i = state.cart.findIndex((item) => item.id === id);
      state.cart[i].added -= 1;
      if (state.cart[i].added === 0) state.cart.splice(i, 1);
      state.cartQuantity -= 1;
      return state;
    },
    removeProducts: (state, action) => {
      let id = action.payload.id;
      const i = state.cart.findIndex((item) => item.id === id);
      state.cartQuantity -= state.cart[i].added;
      state.cart.splice(i, 1);
      return state;
    },
    updateTotal: (state, action) => {
      let total = action.payload.total;
      state.cartTotal = total;
      return state;
    },
    setDiscount: (state, action) => {
      state.discount = action.payload.discount;
      return state;
    },
  },
});

export const {
  toggleCart,
  calculateCartQuantity,
  addOneProduct,
  initCart,
  clearCart,
  removeProducts,
  removeOneProduct,
  updateTotal,
  setDiscount,
} = cartSlice.actions;
export default cartSlice.reducer;
