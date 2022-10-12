const router = require('express').Router();

const userController = require('../controllers/user.controller');
const verifyRegistry = require('../middleware/verifyRegistry');

module.exports = app => {
    router.post(
        '/register',
        [verifyRegistry.checkDuplicates, verifyRegistry.checkValidity],
        userController.register
    );
    router.post('/login', userController.login);
    router.post('/logout', userController.logout);

    app.use('/api/user', router);
};