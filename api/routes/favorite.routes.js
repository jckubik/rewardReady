const router = require("express").Router();

const favoriteController = require("../controllers/favorite.controller");
const userMiddleware = require("../middleware/user.middleware");

module.exports = (app) => {
    router.get("/all", userMiddleware.verifyToken, favoriteController.getFavorites);
    router.post("/store/add", userMiddleware.verifyToken, favoriteController.addFavoriteStore);
    router.post("/store/remove", userMiddleware.verifyToken, favoriteController.removeFavoriteStore);
    router.get("/store/content", userMiddleware.verifyToken, favoriteController.getDealsAndCouponsFromFavoriteStores);

    app.use("/api/favorite", router);
};