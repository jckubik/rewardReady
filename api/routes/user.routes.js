const router = require('express').Router();

const userController = require('../controllers/user.controller');
const userMiddleware = require('../middleware/user.middleware');

module.exports = app => {
    router.post('/register', [userMiddleware.checkDuplicates, userMiddleware.checkValidity], userController.register);
    router.post('/login', userController.login);
    router.post('/logout', userController.logout);

    app.use('/api/user', router);
};