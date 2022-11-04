const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authConfig = require('../config/auth.config');
const db = require('../models');
const User = db.users;
const Wallet = db.wallets;
const Op = db.Sequelize.Op;
const tempUtil = require('../utils/temp.util');

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
                items: {cards: []}
            }
        })
        .then(wallet => Wallet.create(wallet))
        .then(() => res.end())
        .catch(() => res.status(500).send({message: 'Unexpected error'}));
};

exports.login = async (req, res) => {
    const body = req.body;
    User.findOne({where: {email: {[Op.eq]: body.email}}})
        .then(user => user ? user.get({plain: true}) : null)
        .then(user => [user, user ? bcrypt.compareSync(body.password, user.password) : null])
        .then(authentication => {
            const valid = authentication[1];
            if (valid) {
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
};

exports.delete = async (req, res, next) => {
    const { userId } = req.userId;
    const { email } = req.body;

    try {
        // find the proper user to delete
        const user = await User.findAll({
            where: {
                id: userId,
            }
        }).then(() => { user.length > 0 ? user[0] : null });
    
        if (user) {
            // Delete the user instance if found
            user.destroy();
            res.status(200).send({ message: `User with username: ${email} has been deleted successfully.` });
        } else {
            res.status(404).send({ message: 'User requested does not exist.' });
        }
    } catch (error) {
        res.status(400).send({ message: 'Unexpected error while trying to delete user.' })
    }
};

// Update password should probably be serparate with the validation needed?
exports.updateInfo  = async (req, res, next) => {
    const { userId } = req.userId;
    const { firstName, lastName, phoneNumber, email } = req.body;

    // Error if full information not sent
    if (!userId || !firstName || !lastName || !phoneNumber || !email) {
        res.status(400).send({ message: 'Content cannot be empty.' });
        return;
    }

    try {
        // find the proper user to update
        const user = await User.findAll({
            where: {
                id: userId,
            }
        }).then(() => { user.length > 0 ? user[0] : null });
    
        if (user) {
            // Set the data
            user.set({
                firstName,
                lastName,
                phoneNumber,
                email,
            })
    
            // Save the data to the database
            await user.save();
            res.status(200).send({ message: 'User updated successfully.' });
            next();
        } else {
            res.status(404).send({ message: 'User requested does not exist.' });
        }
    } catch(error) {
        res.status(400).send({ message: 'Unexpected error while trying to update user.' })
    }
};

// This is a test for getting coupons in the backend
exports.getCoupons = async (req, res) => {
    try {
        console.log("test");
        const items = tempUtil.getCoupons()
        console.log(items);
        return items[0];
    } catch(err) {
        console.log(err);
    }
};