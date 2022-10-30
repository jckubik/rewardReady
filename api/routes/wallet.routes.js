const router = require("express").Router();

const walletController = require("../controllers/wallet.controller");
const userMiddleware = require("../middleware/user.middleware");
const walletMiddleware = require("../middleware/wallet.middleware");

module.exports = app => {
    router.get('/items', userMiddleware.verifyToken, walletController.fetchItems);
    router.get('/items/cards', userMiddleware.verifyToken, walletController.fetchCards);
    router.post(
        '/items/cards/insert',
        [userMiddleware.verifyToken, walletMiddleware.checkCardValidity, walletMiddleware.checkCardDuplicates],
        walletController.insertCard
    );
    router.post(
        '/items/cards/remove',
        [userMiddleware.verifyToken, walletMiddleware.checkCardValidity],
        walletController.removeCard
    );
    router.get('/recommend/card', userMiddleware.verifyToken, walletController.recommendCard);
    router.get('/history',  userMiddleware.verifyToken, walletController.fetchHistory);
    router.post('/history/insert', userMiddleware.verifyToken, walletController.insertHistory);

  app.use("/api/wallet", router);
};
