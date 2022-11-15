import { createSlice } from "@reduxjs/toolkit";
import { isLoggedIn } from "../utils/auth";
import api from "../utils/api";
import { setExpToken, clearCookies } from "../utils/auth";

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

export const login = (email, password) => async (dispatch) => {
  let loginResponse = await api.login({ email, password });
  if (!loginResponse.user || !loginResponse.token) {
    throw new Error(loginResponse.response.data.message);
  }
  let token = loginResponse.token;
  let user = loginResponse.user;
  setExpToken(token);
  localStorage.setItem("user", JSON.stringify(user));
  dispatch(setUser(user));
};

export const logout = () => async (dispatch) => {
  await api.logout();
  localStorage.clear();
  clearCookies();
  dispatch(setUser(null));
};

export default userSlice.reducer;
