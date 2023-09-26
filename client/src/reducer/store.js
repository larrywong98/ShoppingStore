import productReducer from "./productSlice";
import cartReducer from "./cartSlice";
import globalReducer from "./globalSlice";
import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  productReducer,
  cartReducer,
  globalReducer,
});

const store = configureStore({ reducer: rootReducer }, applyMiddleware(thunk));

store.subscribe(() => {
  // console.log(store.getState());
});

export default store;
