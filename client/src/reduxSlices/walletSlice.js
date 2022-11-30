import { createSlice } from "@reduxjs/toolkit";
import api from "../utils/api";
import { isLoggedIn } from "../utils/auth";
import { useSelector } from "react-redux";
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
    removeCard: (state, action) => {
      let index = state.cards.findIndex((card) => {
        return card.id == action.payload;
      });
      state.cards.splice(index, 1);
    },
  },
});

export const { setCards, addCard, removeCard } = walletSlice.actions;

export const insertCardInToWallet = (card) => (dispatch, getState) => {
  dispatch(addCard(card));
  let cards = getState().wallet.cards;
  localStorage.setItem("cards", JSON.stringify(cards));
};

export const removeCardFromWallet = (cardId) => (dispatch, getState) => {
  dispatch(removeCard(cardId));
  let cards = getState().wallet.cards;
  localStorage.setItem("cards", JSON.stringify(cards));
};

export const setUserCreditCards = (creditCards) => (dispatch, getState) => {
  dispatch(setCards(creditCards));
  let cards = getState().wallet.cards;
  localStorage.setItem("cards", JSON.stringify(cards));
};

export default walletSlice.reducer;
