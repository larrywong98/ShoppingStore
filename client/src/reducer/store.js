import productReducer from "./productSlice";
import cartReducer from "./cartSlice";
import globalReducer from "./globalSlice";
import userReducer from "./userSlice";
import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import thunk from "redux-thunk";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  productReducer,
  cartReducer,
  globalReducer,
  userReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore(
  {
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  },
<<<<<<< HEAD

=======
>>>>>>> bdf0ad10c5356daa06ba11c687831b4f678208e0
  applyMiddleware(thunk)
);
const persistor = persistStore(store);

<<<<<<< HEAD
store.subscribe(() => {
  // console.log(store.getState());
});

=======
>>>>>>> bdf0ad10c5356daa06ba11c687831b4f678208e0
export { store, persistor };
