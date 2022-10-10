module.exports = app => {
    const router = require('express').Router();

    const users = require('../controllers/user.controller');

    router.post('/register', users.register)
    router.post('/login', users.login)

    app.use('/api/users', router);
};