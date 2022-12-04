const router = require("express").Router();

const dealController = require("../controllers/deal.controller");

module.exports = (app) => {
  router.get("/grab_deals", dealController.getDeals);
  // router.get("/grab_cj_deals", dealController.getCjDeals);
  router.get("/random", dealController.getRandomDeal);
  router.get("/search_deals_web", dealController.searchDealsWeb);
  router.get("/get_deals_by_merchant", dealController.getDealsByMerchant);

  app.use("/api/deal", router);
};
