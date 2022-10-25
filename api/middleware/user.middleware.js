const {phone} = require('phone');
const emailValidator = require("email-validator");
const jwt = require("jsonwebtoken");

const config = require("../config/auth.config.js");
const db = require('../models');
const User = db.users;
const Op = db.Sequelize.Op;

exports.verifyToken = (req, res, next) => {
    let token = req.session.token;
    if (!token) {
        res.status(403).send({message: 'No token provided'});
        return;
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            res.status(401).send({message: 'Unauthorized'});
            return;
        }

        req.userId = decoded.id;
        next();
    });
};

exports.checkDuplicates = async (req, res, next) => {
    User.findAll({where: {email: {[Op.eq]: req.body.email}}})
        .then(users => {
            if (users.length > 0) {
                res.status(400).send({message: 'User already exists'});
                return;
            }

            next();
        })
        .catch(() => res.status(500).send({message: 'Unexpected error'}));
};

exports.checkValidity = async (req, res, next) => {
    const body = req.body;
    if (!emailValidator.validate(body.email)) {
        res.status(400).send({message: 'Email is invalid'});
        return;
    }

    const re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (!re.test(body.password)) {
        res.status(400).send({message: 'Invalid password'});
        return;
    }

    const phoneInfo = phone(body.phoneNumber);
    if (!phoneInfo.isValid) {
        res.status(400).send({message: 'Phone number is invalid'});
        return;
    }

    body.phoneNumber = phoneInfo.phoneNumber;
    next();
};