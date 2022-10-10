const bcrypt = require('bcrypt');
const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();
const emailValidator = require("email-validator");

const db = require('../models');
const User = db.users;
const Op = db.Sequelize.Op;

exports.register = async (req, res) => {
    const body = req.body;
    const firstName = body.firstName;
    const lastName = body.lastName;
    const email = body.email;
    const password = body.password;
    if (!firstName || !lastName || !email || !password) {
        res.status(400).send({message: 'Content cannot be empty'});
        return;
    }

    if (!emailValidator.validate(email)) {
        res.status(400).send({message: 'Email is invalid'});
        return;
    }

    const phoneNumber = body.phoneNumber;
    if (phoneNumber && !phoneUtil.isValidNumber(phoneNumber)) {
        res.status(400).send({message: 'Phone number is invalid'});
        return;
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = {
        firstName,
        lastName,
        phoneNumber: phoneNumber || null,
        email,
        password: hash
    };
    try {
        await User.create(user);
        res.send({});
    } catch (err) {
        res.status(400).send({message: 'Unexpected error'});
    }
};

exports.login = async (req, res) => {
    const body = req.body;
    const email = body.email;
    const password = body.password;
    if (!email || !password) {
        res.status(400).send({message: 'Content cannot be empty'});
        return;
    }

    let existingUsers;
    try {
        existingUsers = await User.findAll({where: {email: {[Op.eq]: email}}});
    } catch (err) {
        res.status(400).send({message: 'Unexpected error'});
        return;
    }
    const hash = existingUsers.length > 0 ? existingUsers[0].get({plain: true}).password : null;
    if (!hash) {
        res.status(400).send({message: 'Invalid email or password'});
        return;
    }

    const validPassword = await bcrypt.compare(password, hash);
    if (!validPassword) {
        res.status(400).send({message: 'Invalid email or password'});
        return;
    }

    // TODO - authentication?
    res.send({});
}