module.exports = app => {
    const router = require('express').Router();

    const userController = require('../controllers/user.controller');
    const verifyRegistry = require('../middleware/verifyRegistry');
    const authJwt = require('../middleware/authJwt');

    router.post(
        '/register',
        [verifyRegistry.checkDuplicates, verifyRegistry.checkValidity],
        userController.register
    );
    router.post('/login', userController.login);
    router.post('/logout', userController.logout);
    router.post('/update', authJwt.verifyToken, userController.updateInfo);
    router.post('/delete', authJwt.verifyToken, userController.delete);

    app.use('/api/user', router);
};