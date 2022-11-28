import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./reduxSlices/userSlice";
import walletReducer from "./reduxSlices/walletSlice";

export const store = configureStore({
  reducer: combineReducers({
    user: userReducer,
    wallet: walletReducer,
  }),
});
