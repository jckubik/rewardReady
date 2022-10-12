const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();
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

    if (!body.password.match('^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$')) {
        res.status(400).send({message: 'Invalid password'});
        return;
    }

    const phoneNumber = body.phoneNumber;
    if (phoneNumber && !phoneUtil.isValidNumber(phoneNumber)) {
        res.status(400).send({message: 'Phone number is invalid'});
        return;
    }

    next();
}