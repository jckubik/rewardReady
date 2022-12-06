const db = require('../models');
const Coupon = db.coupons;
const Deal = db.deals;
const axios = require("axios");


async function addDealsToDBQuery(query) {
  const options = {
      method: "GET",
      url:"https://rewardready.discovery.cs.vt.edu/api/deal/search_deals_web",
      data: {
        "query": query
      }
  };
  axios
      .request(options)
      .then(function (response) {
        console.log(response.data)
      });
}

async function addCouponsToDBQuery(query) {
  const options = {
      method: "GET",
      url:"https://rewardready.discovery.cs.vt.edu/api/coupon/cj_query",
      data: {
        "query": query
      }
  };
  axios
      .request(options)
      .then(function (response) {
        console.log(response.data)
      });
}


// search local database for deals/coupons
exports.findDealsAndCoupons = async (req, res) => {
    const query = req.body.query.toLowerCase();
    try {
        // await addDealsToDBQuery(query);
        // await addCouponsToDBQuery(query);
        const coupons = (await Coupon.findAll())
            .filter(v => v.title.toLowerCase().includes(query))
            .sort((a, b) =>
                b.title.toLowerCase().indexOf(query) - a.title.toLowerCase().indexOf(query)
            );
        const deals = (await Deal.findAll())
            .filter(v => v.title.toLowerCase().includes(query))
            .sort((a, b) =>
                b.title.toLowerCase().indexOf(query) - a.title.toLowerCase().indexOf(query)
            );
        res.json({
            coupons: coupons,
            deals: deals
        })
    } catch (err) {
        res.status(400).send({message: 'Unexpected error.'});
    }
};