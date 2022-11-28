import { createSlice } from "@reduxjs/toolkit";
import api from "../utils/api";
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
    removeCard: (state, action) => {
      let index = state.cards.findIndex((card) => {
        return card.id == action.payload;
      });
      state.cards.splice(index, 1);
    },
  },
});

export const { setCards, addCard, removeCard } = walletSlice.actions;

export const insertCardInToWallet = (cardId) => async (dispatch) => {
  let insertedCard = await api.insertCardToWallet(cardId);
  dispatch(addCard(insertedCard));
  const cards = useSelector((state) => state.wallet.cards);
  localStorage.setItem("cards", JSON.stringify(cards));
};

export const removeCardFromWallet = (cardId) => async (dispatch) => {
  await api.removeCardFromWallet(cardId);
  dispatch(removeCard(cardId));
  const cards = useSelector((state) => state.wallet.cards);
  localStorage.setItem("cards", JSON.stringify(cards));
};

export default walletSlice.reducer;
