const db = require("../models");
const Wallet = db.wallets;
const Card = db.cards;
const Op = db.Sequelize.Op;
const tempUtil = require("../utils/temp.util");

exports.fetchCards = async (req, res) => {
  Wallet.findOne({ where: { userId: { [Op.eq]: req.userId } } })
    .then((wallet) => {
      console.log(wallet);
      return Card.findAll({ where: { walletId: { [Op.eq]: wallet.id } } });
    })
    .then((cards) => res.send(cards))
    .catch(() => res.status(500).send({ message: "Unexpected error" }));
};

exports.insertCard = async (req, res) => {
  console.log("INSERTING CARD");
  const userId = req.userId;
  console.log(userId);
  Wallet.findOne({ where: { userId: { [Op.eq]: userId } } })
    .then((wallet) => {
      const cardId = req.body.cardId;
      const content = Card.findOne({ where: { id: cardId } });
      return Card.create({
        cardId: cardId,
        walletId: wallet.id,
        content: content,
      });
    })
    .then(() => res.end())
    .catch((err) => res.status(500).send({ message: JSON.stringify(err) }));
};

exports.removeCard = async (req, res) => {
  const userId = req.userId;
  Wallet.findOne({ where: { userId: { [Op.eq]: userId } } })
    .then((wallet) => {
      return Card.destroy({
        where: {
          cardId: { [Op.eq]: req.body.cardId },
          walletId: { [Op.eq]: wallet.id },
        },
      });
    })
    .then(() => res.end())
    .catch(() => res.status(500).send({ message: "Unexpected error" }));
};

exports.recommendCard = async (req, res) => {
  Wallet.findOne({ where: { userId: { [Op.eq]: req.userId } } })
    .then((wallet) =>
      Card.findAll({ where: { walletId: { [Op.eq]: wallet.id } } })
    )
    .then((cards) => cards.filter((card) => card !== null))
    .then((cards) => [
      cards,
      Store.findOne({ where: { name: { [Op.eq]: req.body.name } } }),
    ])
    .then((info) => {
      const cards = info[0];
      const store = info[1];
      const topCards = cards.sort((cardA, cardB) => {
        const recommendCategory = store.category;
        const earningsA = cardA.earnings
          .filter((earning) => earning.category === recommendCategory)
          .sort((earningA, earningB) => earningB.points - earningA.points);
        cardA.earnings = earningsA;
        const earningsB = cardB.earnings
          .filter((earning) => earning.category === recommendCategory)
          .sort((earningA, earningB) => earningB.points - earningA.points);
        cardB.earnings = earningsB;
        let topA = null;
        if (earningsA.length > 0) {
          topA = earningsA[0];
        }
        let topB = null;
        if (earningsB.length > 0) {
          topB = earningsB[0];
        }

        if (topA !== null && topB !== null) {
          return topB.points - topA.points;
        } else if (topA !== null) {
          return -1;
        } else if (topB !== null) {
          return 1;
        }

        return 0;
      });

      if (cards.length > 0) {
        res.json(topCards[0]);
      } else {
        res.end();
      }
    })
    .catch(() => res.status(500).send({ message: "Unexpected error" }));
};

exports.fetchHistory = async (req, res) => {
  Wallet.findOne({ where: { userId: { [Op.eq]: req.userId } } })
    .then((wallet) => res.send(wallet.history))
    .catch(() => res.status(500).send({ message: "Unexpected error" }));
};

exports.insertHistory = async (req, res) => {
  const body = req.body;
  const userId = req.userId;
  Wallet.findOne({ where: { userId: { [Op.eq]: userId } } })
    .then((wallet) => {
      const updatedHistory = wallet.history;
      updatedHistory.push({ cardId: body.cardId, amount: body.amount });
      return Wallet.update(
        { history: updatedHistory },
        { where: { userId: { [Op.eq]: userId } } }
      );
    })
    .then(() => res.end())
    .catch(() => res.status(500).send({ message: "Unexpected error" }));
};
