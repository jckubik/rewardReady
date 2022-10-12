const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");

exports.verifyToken = (req, res, next) => {
    let token = req.session.token;
    if (!token) {
        res.status(403).send({message: 'No token provided'});
        return;
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({message: 'Unauthorized'});
        }

        req.userId = decoded.id;
        next();
    });
};
