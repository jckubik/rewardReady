const router = require("express").Router();

const storeController = require("../controllers/store.controller");

module.exports = (app) => {
    
    app.use("/api/store", router);
}