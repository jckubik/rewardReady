const router = require('express').Router();

const itemController = require('../controllers/wallet.controller');
const authJwt = require('../middleware/authJwt');

module.exports = app => {
    router.post('/add', authJwt.verifyToken, itemController.add);
    router.post('/remove', authJwt.verifyToken, itemController.remove);

    app.use('/api/wallet', router);
};