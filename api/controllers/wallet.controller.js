const db = require("../models");
const Wallet = db.wallets;
const WalletCard = db.WalletCard;
const apiConfig = require("../config/api.config");
const { StoreCategories } = require("../models");

const Card = db.cards;
const Op = db.Sequelize.Op;

exports.fetchCards = async (req, res) => {
  Wallet.findOne({ where: { userId: { [Op.eq]: req.userId } } })
    .then((wallet) => {
      return WalletCard.findAll({
        where: { walletId: { [Op.eq]: wallet.id } },
      });
    })
    .then((cards) => {
      const cardsInfo = cards.map((walletCard) => {
        return Card.findOne({ where: { id: { [Op.eq]: walletCard.cardId } } });
      });
      return Promise.all(cardsInfo);
    })
    .then((cards) => res.status(200).send(cards))
    .catch(() => res.status(500).send({ message: "Unexpected error" }));
};

exports.insertCard = async (req, res) => {
  const userId = req.userId;
  Wallet.findOne({ where: { userId: { [Op.eq]: userId } } })
    .then((wallet) => {
      const cardId = req.body.cardId;
      return WalletCard.create({
        cardId: cardId,
        walletId: wallet.id,
      });
    })
    .then((walletCard) =>
      Card.findOne({ where: { id: { [Op.eq]: walletCard.cardId } } })
    )
    .then((insertedCard) => creditCardImageHandler(insertedCard))
    .then((insertedCard) => {
      res.status(200).send(insertedCard);
      return insertedCard;
    })
    .catch(() => res.status(500).send({ message: "Unexpected error" }));
};

exports.removeCard = async (req, res) => {
  const userId = req.userId;
  Wallet.findOne({ where: { userId: { [Op.eq]: userId } } })
    .then((wallet) => {
      const cardId = req.body.cardId;
      return WalletCard.destroy({
        where: {
          cardId: { [Op.eq]: cardId },
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
      WalletCard.findAll({ where: { walletId: { [Op.eq]: wallet.id } } })
    )
    .then((cards) => cards.filter((card) => card !== null))
    .then((cards) => {
      const cardsInfo = cards.map((walletCard) => {
        return Card.findOne({ where: { id: { [Op.eq]: walletCard.cardId } } });
      });
      return Promise.all(cardsInfo);
    })
    .then((cards) => [
      cards,
      Store.findOne({ where: { name: { [Op.eq]: req.body.name } } }),
    ])
    .then((info) => {
      const cards = info[0];
      const store = info[1];
      console.log(cards);
      const topCards = cards.sort(async (cardA, cardB) => {
        let storeCategories = await StoreCategories.findAll({
          where: { storeId: { [Op.eq]: store.id } },
        });
        storeCategories = storeCategories.map(
          (storeCategory) => storeCategory.categoryId
        );
        // const recommendCategory = store.category;
        const earningsA = cardA.earnings
          .filter((earning) => storeCategories.includes(earning.category))
          .sort((earningA, earningB) => earningB.points - earningA.points);
        cardA.earnings = earningsA;
        const earningsB = cardB.earnings
          .filter((earning) => storeCategories.includes(earning.category))
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
        return topCards[0];
      } else {
        res.end();
      }
    })
    .then((walletCard) =>
      Card.findOne({ where: { id: { [Op.eq]: walletCard.id } } })
    )
    .then((card) => {
      res.json(card);
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

async function creditCardImageHandler(card) {
  if (!card.image_url) {
    try {
      let image_url = await fetchImage(card.title);
      await Card.update({ image_url: image_url }, { where: { id: card.id } });
      return await Card.findOne({ where: { id: { [Op.eq]: card.id } } });
    } catch (err) {
      throw new Error(err);
    }
  }
}

async function fetchImage(query) {
  const axios = require("axios");
  const options = {
    method: "GET",
    url: "https://bing-image-search1.p.rapidapi.com/images/search",
    params: {
      q: query,
    },
    headers: {
      "X-RapidAPI-Key": apiConfig.webSearchAPIKey,
      "X-RapidAPI-Host": "bing-image-search1.p.rapidapi.com",
    },
  };
  try {
    let response = await axios.request(options);
    return response.data.value[0].contentUrl;
  } catch (err) {
    throw new Error(err);
  }
}
