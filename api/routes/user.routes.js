const router = require("express").Router();

const userController = require("../controllers/user.controller");
const userMiddleware = require("../middleware/user.middleware");
const courierMiddleware = require("../middleware/courier");

module.exports = (app) => {
  router.post("/email", userMiddleware.verifyToken, userController.getEmail);
  router.post(
    "/register",
    [userMiddleware.checkDuplicates, userMiddleware.checkValidity],
    userController.register
  );
  router.post("/login", userController.login);
  router.post("/logout", userController.logout);
  router.post("/update", userMiddleware.verifyToken, userController.updateInfo);
  router.post(
    "/update/password",
    userMiddleware.verifyToken,
    userController.updatePassword,
    courierMiddleware.sendPasswordUpdateConfirmation
  );
  router.post(
    "/update/password/reset",
    userMiddleware.verifyToken,
    userController.resetPassword,
    courierMiddleware.sendPasswordResetConfirmation
  );
  router.post(
    "/update/password/reset/request",
    userController.requestPasswordReset,
    courierMiddleware.sendPasswordResetEmail
  );
  router.post("/delete", userMiddleware.verifyToken, userController.delete);
  // temp for testing coupons
  //   router.get("/coupons", userController.getCoupons);

  app.use("/api/user", router);
};
