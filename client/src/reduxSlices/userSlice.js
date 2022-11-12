import { createSlice } from "@reduxjs/toolkit";
import { isLoggedIn } from "../utils/auth";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: isLoggedIn() ? JSON.parse(localStorage.getItem("user")) : null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
