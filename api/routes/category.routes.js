const router = require("express").Router();

const categoryController = require("../controllers/category.controller");

module.exports = (app) => {
    // router.post("/insert", categoryController.insertCategory);

    app.use("/api/category", router);
};