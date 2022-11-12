import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reduxSlices/userSlice";

export const store = configureStore({
  reducer: { user: userReducer },
});
