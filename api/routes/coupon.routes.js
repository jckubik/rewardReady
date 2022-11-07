const router = require("express").Router();

const couponController = require("../controllers/coupon.controller");

module.exports = (app) => {
    router.get("/grab_coupons", couponController.getCoupons);


    app.use("/api/coupon", router);
}