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
    return await execute('GET', '/localhost:9000/--', {store:store});
}

export default {getCardRecommendationsForUser}