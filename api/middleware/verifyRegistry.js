const {phone} = require('phone');
const emailValidator = require("email-validator");

const db = require('../models');
const User = db.users;
const Op = db.Sequelize.Op;

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
}

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
}