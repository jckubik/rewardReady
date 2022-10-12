module.exports = app => {
    const router = require('express').Router();

    const authJwt = require('../middleware/authJwt');

    router.get('/auth', authJwt.verifyToken, (req, res) => {
        res.json({success: true});
    });

    app.use('/api/test', router);
};

// TODO - delete this file later
