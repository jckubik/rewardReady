const router = require("express").Router();

const cardController = require("../controllers/card.controller");
const userMiddleware = require("../middleware/user.middleware");

module.exports = (app) => {
  router.get("/", userMiddleware.verifyToken, cardController.getCreditCards);
  router.get(
    "/id",
    userMiddleware.verifyToken,
    cardController.getCreditCardById
  );

  app.use("/api/card", router);
};
