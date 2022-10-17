const router = require('express').Router();

const itemController = require('../controllers/wallet.controller');
const authJwt = require('../middleware/authJwt');

module.exports = app => {
    router.get('/items', authJwt.verifyToken, itemController.items)
    router.post('/insert', authJwt.verifyToken, itemController.insert);
    router.post('/remove', authJwt.verifyToken, itemController.remove);

    app.use('/api/wallet', router);
};