const router = require("express").Router();

const couponController = require("../controllers/coupon.controller");

module.exports = (app) => {
    // router.get("/grab_coupons", couponController.getCoupons);
    router.get("/grab_cj_coupons", couponController.getCjCoupons);
    router.get("/random", couponController.getRandomCoupon);

    app.use("/api/coupon", router);
}