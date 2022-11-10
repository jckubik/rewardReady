const { phone } = require("phone");
const emailValidator = require("email-validator");
const jwt = require("jsonwebtoken");

const config = require("../config/auth.config.js");
const db = require("../models");

const User = db.users;
const { Op } = db.Sequelize;

exports.verifyToken = (req, res, next) => {
  const { token } = req.session;
  if (!token) {
    res.status(403).send({ message: "No token provided" });
    return;
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      res.status(401).send({ message: "Unauthorized" });
      return;
    }

    req.userId = decoded.id;
    next();
  });
};

exports.checkDuplicates = async (req, res, next) => {
  User.findAll({ where: { email: { [Op.eq]: req.body.email } } })
    .then((users) => {
      if (users.length > 0) {
        res.status(400).send({ message: "User already exists" });
        return;
      }

      next();
    })
    .catch(() => res.status(500).send({ message: "Unexpected error" }));
};

exports.checkValidity = async (req, res, next) => {
  const { body } = req;
  if (!emailValidator.validate(body.email)) {
    res.status(400).send({ message: "Email is invalid" });
    return;
  }

  const re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  if (!re.test(body.password)) {
    res.status(400).send({ message: "Invalid password" });
    return;
  }

  const phoneInfo = phone(body.phoneNumber);
  if (!phoneInfo.isValid) {
    res.status(400).send({ message: "Phone number is invalid" });
    return;
  }

  body.phoneNumber = phoneInfo.phoneNumber;
  next();
};

exports.verifyEmail = async (req, res, next) => {
    const { email } = req.body;

    // Error if full information not sent
    if (!email) {
        res.status(400).send({ message: 'Content cannot be empty.' });
        return;
    }

    try {
        // find the proper user to validate
        const user = await User.findOne({
            where: {
                email,
            },
        });

        if (user) {
            // If user isn't empty, email correct, send true
            res.status(200).send({ message: 'Entered email is correct.', correctEmail: true });
            next();
        } else {
            // Else, email is incorrect, send false
            res.status(200).send({ message: 'Entered email is incorrect.', correctEmail: false });
            next();
        }
    } catch (error) {
        res.status(400).send({ message: 'Unexpected error while trying to update the user password.' });
    }
};
