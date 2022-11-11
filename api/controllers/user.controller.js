const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sendPasswordResetEmail } = require("../middleware/courier");

const authConfig = require("../config/auth.config");
const db = require("../models");

const authConfig = require("../config/auth.config");
const db = require("../models");
const User = db.users;
const Wallet = db.wallets;
const Op = db.Sequelize.Op;
const tempUtil = require("../utils/temp.util");

const clientLink = "http://localhost:9000/";

exports.register = async (req, res) => {
  const { body } = req;
  bcrypt
    .genSalt(10)
    .then((salt) => bcrypt.hash(body.password, salt))
    .then((hash) => ({
      firstName: body.firstName,
      lastName: body.lastName,
      phoneNumber: body.phoneNumber || null,
      email: body.email,
      password: hash,
    }))
    .then((user) => User.create(user))
    .then((data) => ({
      userId: data.id,
      items: { cards: [] },
      history: [],
    }))
    .then((wallet) => Wallet.create(wallet))
    .then((data) => ({
      userId: data.userId,
      logs: [],
    }))
    .then(() =>
      res.status(200).send({ message: "Successfully registered user" })
    )
    .catch((err) =>
      res.status(500).send({ message: `Unexpected error: ${err}` })
    );
};

exports.login = async (req, res) => {
  const body = req.body;
  User.findOne({ where: { email: { [Op.eq]: body.email } } })
    .then((user) => (user ? user.get({ plain: true }) : null))
    .then((user) => [
      user,
      user ? bcrypt.compareSync(body.password, user.password) : null,
    ])
    .then((authentication) => {
      const valid = authentication[1];
      if (valid) {
        const user = authentication[0];
        delete user.password;
        const token = jwt.sign(user, authConfig.secret, { expiresIn: 86400 });
        req.session.token = token;
        res.json({ token, user });
      } else {
        res.status(400).send({ message: "Incorrect username or password" });
      }
    })
    .catch(() => res.status(500).send({ message: "Unexpected error" }));
};

exports.logout = async (req, res) => {
  try {
    req.session = null;
    res.end();
  } catch (err) {
    this.next(err);
  }
};

exports.delete = async (req, res, next) => {
  const userId = req.userId;
  const { email } = req.body;

  try {
    // find the proper user to delete
    const user = await User.findOne({
      where: {
        id: userId,
      },
    });

    if (user) {
      // Delete the user instance if found
      user.destroy();
      res.status(200).send({
        message: `User with username: ${email} has been deleted successfully.`,
      });
    } else {
      res.status(404).send({ message: "User requested does not exist." });
    }
  } catch (error) {
    res
      .status(400)
      .send({ message: "Unexpected error while trying to delete user." });
  }
};

// Update password should probably be serparate with the validation needed?
exports.updateInfo = async (req, res, next) => {
  const userId = req.userId;
  const { firstName, lastName, phoneNumber, email } = req.body;

  // Throw error if user isn't verrified
  if (userId == null) {
    res.status(400).send({ message: "User cannot be verified." });
    return;
  }

  // Error if full information not sent
  if (
    firstName == null ||
    lastName == null ||
    phoneNumber == null ||
    email == null
  ) {
    res.status(400).send({ message: "Content cannot be empty." });
    return;
  }

  try {
    // find the proper user to update
    const user = await User.findOne({
      where: {
        id: userId,
      },
    });

    if (user) {
      user.set({
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
        email: email,
      });

      // Save the data to the database
      await user.save();
      res.status(200).send({ message: "User updated successfully." });
      next();
    } else {
      res.status(404).send({ message: "User requested does not exist." });
    }
  } catch (error) {
    res
      .status(400)
      .send({ message: "Unexpected error while trying to update user." });
  }
};

// Update user password
exports.updatePassword = async (req, res, next) => {
  const { userId } = req;
  const { newPassword } = req.body;

  if (!userId) {
    res.status(400).send({ message: "UserId not found." });
    return;
  }

  // Error if full information not sent
  if (newPassword === null || newPassword === "") {
    res.status(400).send({ message: "newPassword cannot be empty." });
    return;
  }

  try {
    // find the proper user to update
    const user = await User.findOne({
      where: {
        id: userId,
      },
    });

    if (user) {
      // Salt and hash the password

      const hash = bcrypt
        .genSalt(10)
        .then((salt) => bcrypt.hash(newPassword, salt))
        .then((hash) => ({
          password: hash,
        }));

      hash.then((pw) => user.set(pw));
      // Save the data to the database
      hash.then(() => user.save());

      // Send confirmation email
      await sendPasswordResetEmail(user.email, user.firstName);
      console.log(user);

      res.status(200).send({
        message: "User password updated successfully.",
        password: user.password,
      });
      next();
    } else {
      res.status(404).send({ message: "User requested does not exist." });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: `Unexpected error while trying to update the user password. - ${error}`,
    });
  }
};

exports.requestPasswordReset = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({
      where: {
        email,
      },
    });

    // Check to see if a user with request email exists
    if (!user) {
      res
        .status(404)
        .send({ message: "User with the given email does not exist." });
      next();
    }

    // Generate resetToken
    const resetToken = jwt.sign(user, authConfig.secret, {
      expiresIn: "1800s",
    });

    // Generate needed email variables
    const resetLink = `${clientLink}/passwordReset?token=${resetToken}&id=${user._id}`;
    const expirationDate = Date().now() + 1800000;

    // Send reset email to user
    await sendPasswordResetEmail(
      email,
      user.firstName,
      resetLink,
      expirationDate
    );
    return resetLink;
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: `Unexpected error while trying to update the user password. - ${error}`,
    });
  }
};
