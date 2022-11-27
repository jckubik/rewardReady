const db = require("../models");
const Wallet = db.wallets;
const Op = db.Sequelize.Op;
const tempUtil = require("../utils/temp.util");

exports.checkCardDuplicates = async (req, res, next) => {
  console.log(req.userId);
  Wallet.findOne({ where: { userId: { [Op.eq]: req.userId } } })
    .then((wallet) => {
      console.log(wallet);
      if (wallet.items.cards.includes(req.body.cardId)) {
        res.status(400).send({ message: "Card already exists" });
        return;
      }

      next();
    })
    .catch((err) => res.status(500).send({ message: err }));
};

exports.checkCardValidity = async (req, res, next) => {
  tempUtil
    .getCardById(req.body.cardId)
    .then((card) => {
      if (card === null) {
        res.status(400).send({ message: "Card is not valid" });
        return;
      }

      next();
    })
    .catch(() => res.status(500).send({ message: "Unexpected error" }));
};
