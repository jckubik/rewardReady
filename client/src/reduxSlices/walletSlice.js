import { createSlice } from "@reduxjs/toolkit";
import { isLoggedIn } from "../utils/auth";
export const walletSlice = createSlice({
  name: "wallet",
  initialState: {
    cards: isLoggedIn() ? JSON.parse(localStorage.getItem("cards")) : [],
  },
  reducers: {
    setCards: (state, action) => {
      state.cards = action.payload;
    },
    addCard: (state, action) => {
      state.cards = [...state.cards, action.payload];
    },
    removeCard: (state, action) => {},
  },
});

export const getWallet = () => async (dispatch) => {};
