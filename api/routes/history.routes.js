const router = require("express").Router();

const historyController = require("../controllers/history.controller");
const userMiddleware = require("../middleware/user.middleware");

module.exports = (app) => {
    router.get("/getHistory", userMiddleware.verifyToken, historyController.getHistory);
    router.get("/getHistoryLogs", userMiddleware.verifyToken, historyController.getHistoryLogs);
    router.post("/insertHistoryLog", userMiddleware.verifyToken, historyController.insertHistoryLog);

    app.use("/api/history", router);
};