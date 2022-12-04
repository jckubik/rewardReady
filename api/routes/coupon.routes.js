const router = require("express").Router();

const couponController = require("../controllers/coupon.controller");

module.exports = (app) => {
  // router.get("/grab_coupons", couponController.getCoupons);
  router.get("/grab_cj_coupons", couponController.getCjCoupons);
  router.get("/random", couponController.getRandomCoupon);
  router.get("/cj_query", couponController.getCjCouponsQuery);
  router.get("/get_coupons_by_merchant", couponController.getCouponsByMerchant);

  app.use("/api/coupon", router);
};
