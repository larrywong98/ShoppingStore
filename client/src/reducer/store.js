import productReducer from "./productSlice";
import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

const store = configureStore(
  { reducer: productReducer },
  applyMiddleware(thunk)
);

store.subscribe(() => {
  console.log(store.getState());
});

export default store;
