const router = require("express").Router();

const userController = require("../controllers/user.controller");
const userMiddleware = require("../middleware/user.middleware");

module.exports = (app) => {
  router.post(
    "/register",
    [userMiddleware.checkDuplicates, userMiddleware.checkValidity],
    userController.register
  );
  router.post("/login", userController.login);
  router.post("/logout", userController.logout);
  router.post("/update", userMiddleware.verifyToken, userController.updateInfo);
  router.post("/update/password", userMiddleware.verifyToken, userController.updatePassword);
  router.post("/delete", userMiddleware.verifyToken, userController.delete);
  // temp for testing coupons
  // router.get("/coupons", userController.getCoupons);

  app.use("/api/user", router);
};
