const router = require('express').Router();

    const userController = require('../controllers/user.controller');
    const verifyRegistry = require('../middleware/verifyRegistry');
    const userMiddleware = require('../middleware/user.middleware');

module.exports = app => {
    router.post(
        '/register',
        [verifyRegistry.checkDuplicates, verifyRegistry.checkValidity],
        userController.register
    );
    router.post('/login', userController.login);
    router.post('/logout', userController.logout);
    router.post('/update', userMiddleware.verifyToken, userController.updateInfo);
    router.post('/delete', userMiddleware.verifyToken, userController.delete);

    app.use('/api/user', router);
};