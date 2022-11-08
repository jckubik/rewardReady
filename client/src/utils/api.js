import axios from 'axios';

// should change or declare
const [PROTOCOL, API_HOSTNAME, PORT] = "";

const client = axios.create({
    baseURL:`${PROTOCOL}${API_HOSTNAME}${PORT}`,
    json: true
});

async function execute(method, resource, data) {

    try {
        let c = await client({
            method,
            url: resource,
            data,
            headers: {

            }
        });
        return c.data;
    } catch (err) {
        return err;
    }
}

async function getCardRecommendationsForUser(store) {
    // need to change method to lowercase poss, change resource to valid
    return await execute('GET', '/localhost:9000/api/wallet/recommend/card', {store:store});
}

async function getRandomCoupon() {
    return await execute('GET', '/localhost:9000/api/coupon/random', "");
}

async function getRandomDeal() {
    return await execute('GET', '/localhost:9000/api/deal/random', "");
}

const ccStackSecret = 'bd7018de35mshc04835b79363b6ep17d276jsn603bdc0aceaf';
const discountSecret = 'YxhRTxQe';

export default {getCardRecommendationsForUser}
export {getRandomCoupon}
export {getRandomDeal}
export { ccStackSecret }
export { discountSecret }