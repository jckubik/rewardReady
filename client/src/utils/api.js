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
<<<<<<< HEAD
  // need to change method to lowercase poss, change resource to valid
  return await execute("GET", "/api/wallet/recommend/card", {
    store: store,
  });
=======
    // need to change method to lowercase poss, change resource to valid
    return await execute('GET', '/localhost:9000/api/wallet/recommend/card', {store:store});
>>>>>>> 941c318 (Fixed frontend for card recommendation)
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

async function register(data) {
  return await execute("POST", "/api/user/register", data);
}

async function deleteUser(data) {
  return await execute("POST", "/api/user/delete", data);
}

const ccStackSecret = "bd7018de35mshc04835b79363b6ep17d276jsn603bdc0aceaf";
const discountSecret = "YxhRTxQe";

export default {
  getCardRecommendationsForUser,
  getRandomCoupon,
  getRandomDeal,
  login,
  register,
  deleteUser,
  ccStackSecret,
  discountSecret,
};
