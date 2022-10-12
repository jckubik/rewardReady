const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authConfig = require('../config/auth.config');
const db = require('../models');
const User = db.users;
const Wallet = db.wallets;
const Op = db.Sequelize.Op;

exports.register = async (req, res) => {
    const body = req.body;
    bcrypt.genSalt(10)
        .then(salt => bcrypt.hash(body.password, salt))
        .then(hash => {
            return {
                firstName: body.firstName,
                lastName: body.lastName,
                phoneNumber: body.phoneNumber || null,
                email: body.email,
                password: hash
            };
        })
        .then(user => User.create(user))
        .then(data => {
            return {
                userId: data.id,
                items: {}
            }
        })
        .then(wallet => Wallet.create(wallet))
        .then(() => res.end())
        .catch(() => res.status(500).send({message: 'Unexpected error'}));
};

exports.login = async (req, res) => {
    const body = req.body;
    User.findAll({where: {email: {[Op.eq]: body.email}}})
        .then(users => users.length > 0 ? users[0].get({plain: true}) : null)
        .then(user => [user, user ? bcrypt.compareSync(body.password, user.password) : null])
        .then(authentication => {
            if (authentication[1]) {
                const user = authentication[0]
                delete user.password;
                const token = jwt.sign(user, authConfig.secret, {expiresIn: 86400});
                req.session.token = token;
                res.json({token, user});
            } else {
                res.status(400).send({message: 'Incorrect username or password'});
            }
        })
        .catch(() => res.status(500).send({message: 'Unexpected error'}));
}

exports.logout = async (req, res) => {
    try {
        req.session = null;
        res.end();
    } catch (err) {
        this.next(err);
    }
}
