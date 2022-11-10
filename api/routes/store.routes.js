const router = require("express").Router();

const storeController = require("../controllers/store.controller");

module.exports = (app) => {
    router.post("/category", storeController.fetchCategory);
    router.post("/insert", storeController.insertStore);
    // router.post("/add_category", storeController.associateCategory);
    // router.post("/attach_category", storeController.addCategory);
    
    app.use("/api/store", router);
};

