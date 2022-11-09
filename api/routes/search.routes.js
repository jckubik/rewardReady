const router = require("express").Router();

const searchController = require("../controllers/search.controller");

module.exports = (app) => {
    router.post("/findDealsAndCoupons", searchController.findDealsAndCoupons);

    app.use("/api/search", router);
};