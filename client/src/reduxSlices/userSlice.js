import { createSlice } from "@reduxjs/toolkit";
import { isLoggedIn } from "../utils/auth";
import api from "../utils/api";
import { setExpToken, clearCookies } from "../utils/auth";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: isLoggedIn() ? JSON.parse(localStorage.getItem("user")) : null,
    resetEmail: "",
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setResetEmail: (state, action) => {
      state.resetEmail = action.payload;
    },
  },
});

export const { setUser, setResetEmail } = userSlice.actions;

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

export const sendResetRequest = (email) => async () => {
  await api.sendResetRequest({ email });
};

export const resetPassword = (newPassword) => async () => {
  await api.resetPassword({ newPassword });
};

export const getEmail = () => async (dispatch) => {
  const emailResponse = await api.getEmail();
  if (!emailResponse) {
    throw new Error(emailResponse.response.data.message);
  }
  const email = emailResponse.email;
  dispatch(setResetEmail(email));
};

export const deleteUser = (email) => async (dispatch) => {
  try {
    await api.deleteUser({ email: email });
    dispatch(logout());
  } catch (err) {
    console.log(err);
  }
};

export default userSlice.reducer;
