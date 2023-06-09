import { createSlice } from "@reduxjs/toolkit";
import { isLoggedIn } from "../utils/auth";
import api from "../utils/api";
import { setExpToken, clearCookies } from "../utils/auth";
import { setCards } from "./walletSlice";
import { useDispatch } from "react-redux";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: isLoggedIn() ? JSON.parse(localStorage.getItem("user")) : null,
    resetEmail: "",
    history: isLoggedIn() ? JSON.parse(localStorage.getItem("history")) : null,
    favoriteStores: isLoggedIn()
      ? JSON.parse(localStorage.getItem("favoriteStores"))
      : null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setResetEmail: (state, action) => {
      state.resetEmail = action.payload;
    },
    setHistory: (state, action) => {
      state.history = action.payload;
    },
    setFavoriteStores: (state, action) => {
      state.favoriteStores = action.payload;
    },
  },
});

export const { setUser, setResetEmail, setHistory, setFavoriteStores } =
  userSlice.actions;

export const addFavoriteStore = (merchantName) => async (dispatch) => {
  await api.addFavoriteStore(merchantName);
  console.log("UPDATING USERSLICE FAVORITES");
  const favoriteStores = await api.getFavorites();
  dispatch(setFavoriteStores(favoriteStores));
  localStorage.setItem("favoriteStores", JSON.stringify(favoriteStores));
};

export const removeFavoriteStore = (merchantName) => async (dispatch) => {
  await api.removeFavoriteStore(merchantName);
  console.log("UPDATING USERSLICE FAVORITES");
  const favoriteStores = await api.getFavorites();
  dispatch(setFavoriteStores(favoriteStores));
  localStorage.setItem("favoriteStores", JSON.stringify(favoriteStores));
};

export const login = (email, password) => async (dispatch) => {
  let loginResponse = await api.login({ email, password });
  let cards = await api.getUserCards();
  let history = await api.getHistory();
  let favoriteStores = await api.getFavorites();
  if (!loginResponse.user || !loginResponse.token) {
    throw new Error(loginResponse.response.data.message);
  }
  let token = loginResponse.token;
  let user = loginResponse.user;
  setExpToken(token);
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("cards", JSON.stringify(cards));
  localStorage.setItem("history", JSON.stringify(history));
  localStorage.setItem("favoriteStores", JSON.stringify(favoriteStores));
  dispatch(setUser(user));
  dispatch(setCards(cards));
  dispatch(setHistory(history));
  dispatch(setFavoriteStores(favoriteStores));
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

export const addHistoryLog = (log) => async (dispatch) => {
  await api.insertHistoryLog(log);
  const history = await api.getHistory();
  dispatch(setHistory(history));
  localStorage.setItem("history", JSON.stringify(history));
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
