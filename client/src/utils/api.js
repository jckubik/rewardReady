import axios from "axios";

// should change or declare
const PROTOCOL = "http://";
const API_HOSTNAME = "localhost:";
const PORT = "9000";

const client = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || `${PROTOCOL}${API_HOSTNAME}${PORT}/api`,
  json: true,
  withCredentials: true,
});

async function execute(method, resource, data) {
  try {
    let c = await client({
      method,
      url: resource,
      data,
      headers: {},
    });
    return c.data;
  } catch (err) {
    return err;
  }
}

// Input - storeName
async function addFavoriteStore(data) {
  return await execute("POST", "/favorite/store/add", data);
}

async function getFavorites() {
  return await execute("GET", "/favorite/all");
}

// Input - storeName
async function removeFavoriteStore(data) {
  return await execute("POST", "/favorite/store/remove", data);
}

async function getDealsAndCouponsFromFavoriteStores() {
  return await execute("GET", "/favorite/store/content");
}

async function getCardRecommendationsForUser(storeName) {
  // need to change method to lowercase poss, change resource to valid
  return await execute("GET", "/wallet/recommend/card", {
    store: storeName,
  });
}

async function getRandomCoupon() {
  return await execute("GET", "/coupon/random", "");
}

// Get user's email from token
async function getEmail() {
  return await execute("POST", "/user/email", "");
}

async function getRandomDeal() {
  return await execute("GET", "/deal/random", "");
}

async function login(data) {
  return await execute("POST", "/user/login", data);
}

async function logout() {
  return await execute("POST", "/user/logout");
}

async function register(data) {
  return await execute("POST", "/user/register", data);
}

async function deleteUser(data) {
  return await execute("POST", "/user/delete", data);
}

async function updateInfo(data) {
  return await execute("POST", "/user/update", data);
}

async function updatePassword(data) {
  return await execute("POST", "/user/update/password", data);
}

async function resetPassword(data) {
  return await execute("POST", "/user/update/password/reset", data);
}

async function sendResetRequest(data) {
  return await execute("POST", "/user/update/password/reset/request", data);
}

async function getRandomStore() {
  return await execute("GET", "/store/get_random", "");
}

async function getRandomStores() {
  return await execute("GET", "/store/get_multiple_random", "");
}

async function getCreditCards() {
  return await execute("GET", "/card", "");
}

async function getCreditCardById(id) {
  return await execute("GET", `/card/${id}`);
}

async function getUserCards() {
  return await execute("GET", `/wallet/items/cards`);
}

async function insertHistoryLog(data) {
  return await execute("POST", "/history/insertHistoryLog", data);
}

async function getHistory() {
  return await execute("GET", "/history/getHistory");
}

async function insertCardToWallet(cardId) {
  return await execute("POST", "/wallet/items/cards/insert", {
    cardId: cardId,
  });
}

async function removeCardFromWallet(cardId) {
  return await execute("POST", "/wallet/items/cards/remove", {
    cardId: cardId,
  });
}

async function search(data) {
  return await execute("POST", "/search/findDealsAndCoupons", {
    query: data,
  });
}

async function getStores() {
  return await execute("GET", "/store", "");
}

const ccStackSecret = "bd7018de35mshc04835b79363b6ep17d276jsn603bdc0aceaf";
const discountSecret = "YxhRTxQe";

export default {
  addFavoriteStore,
  getFavorites,
  removeFavoriteStore,
  getDealsAndCouponsFromFavoriteStores,
  getCardRecommendationsForUser,
  getCreditCards,
  getCreditCardById,
  getRandomCoupon,
  getRandomDeal,
  getEmail,
  login,
  logout,
  register,
  deleteUser,
  updateInfo,
  updatePassword,
  resetPassword,
  sendResetRequest,
  getRandomStore,
  getRandomStores,
  getUserCards,
  insertCardToWallet,
  insertHistoryLog,
  getHistory,
  removeCardFromWallet,
  search,
  getStores,
  ccStackSecret,
  discountSecret,
};
