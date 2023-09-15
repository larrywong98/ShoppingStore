import { configureStore } from "@reduxjs/toolkit";
import testReducer from "../reducer/testSlice";

export default configureStore({ reducer: { test: testReducer } });
