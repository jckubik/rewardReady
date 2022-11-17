import axios from "axios";

// should change or declare
const PROTOCOL = "http://";
const API_HOSTNAME = "localhost:";
const PORT = "9000";

const client = axios.create({
  baseURL: `${PROTOCOL}${API_HOSTNAME}${PORT}`,
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

async function getCardRecommendationsForUser(store) {
  // need to change method to lowercase poss, change resource to valid
  return await execute("GET", "/api/wallet/recommend/card", {
    store: store,
  });
}

async function getRandomCoupon() {
  return await execute("GET", "/api/coupon/random", "");
}

async function getRandomDeal() {
  return await execute("GET", "/api/deal/random", "");
}

async function login(data) {
  return await execute("POST", "/api/user/login", data);
}

async function logout() {
  return await execute("POST", "/api/user/logout");
}

async function register(data) {
  return await execute("POST", "/api/user/register", data);
}

async function deleteUser(data) {
  return await execute("POST", "/api/user/delete", data);
}

async function updateInfo(data) {
  return await execute("POST", "/api/user/update", data);
}

async function updatePassword(data) {
  return await execute("POST", "/api/user/update/password", data);
}

async function resetPassword(data) {
  return await execute("POST", "/api/user/update/password/reset", data);
}

const ccStackSecret = "bd7018de35mshc04835b79363b6ep17d276jsn603bdc0aceaf";
const discountSecret = "YxhRTxQe";

export default {
  getCardRecommendationsForUser,
  getRandomCoupon,
  getRandomDeal,
  login,
  logout,
  register,
  deleteUser,
  updateInfo,
  updatePassword,
  resetPassword,
  ccStackSecret,
  discountSecret,
};
