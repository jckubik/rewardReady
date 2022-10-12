module.exports = app => {
    const router = require('express').Router();

    const users = require('../controllers/user.controller');
    const verifyRegistry = require('../middleware/verifyRegistry');

    router.post(
        '/register',
        [verifyRegistry.checkDuplicates, verifyRegistry.checkValidity],
        users.register
    );
    router.post('/login', users.login);
    router.post('/logout', users.logout);

    app.use('/api/user', router);
};