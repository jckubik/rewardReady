const apiConfig = require("../config/api.config");
const axios = require("axios");
const { discountSecret } = require("../config/api.config");

// TODO - this is extremely dirty and needs to be removed, but how?
exports.getCardById = async (cardId) => {
    let cardInfo = null;
    let pageNum = 1;
    while (true) {
        const options = {
            method: 'GET',
            url: 'https://ccstack.p.rapidapi.com/discover/cards',
            headers: {
                'X-RapidAPI-Key': apiConfig.ccStackSecret,
                'X-RapidAPI-Host': 'ccstack.p.rapidapi.com'
            },
            params: {
                page: pageNum
            }
        };
        let data;
        try {
            const res = await axios.request(options);
            data = res.data;
        } catch (err) {
            break;
        }

        const results = data.results;
        if (results.length === 0 || data.page < pageNum) {
            break;
        }

        const filteredResults = data.results.filter(card => card._id === cardId)
        if (filteredResults.length > 0) {
            cardInfo = filteredResults[0];
            break;
        }

        pageNum++;
    }

    return cardInfo;
};

exports.getCoupons = async () => {
    let coupons = null;

    // while(true) {
        const options = {
            method: 'GET',
            // url: `https://api.discountapi.com/v2/deals?api_key=${discountSecret}`,
            url: `https://api.discountapi.com/v2/deals`,
            // url: `https://api.discountapi.com/v2/deals/1757102?api_key=${discountSecret}`
            headers: {
                'api_key': discountSecret
            }
        };
        let data;
        try {
            const res = await axios.request(options);
            data = res.data;
            console.log(data.deals)
        } catch (err) {
            console.error(err);
            // break;
        }

        // const filteredResults = data.results.filter();
        // console.log(filteredResults)
        coupons = data.deals;
    // }

    return coupons;
}