const db = require("../models");
const Card = db.cards;

exports.getCards = async (req, res) => {
  Card.findAll()
    .then((cards) => res.send(cards))
    .catch(() => {
      res.status(500).send({ message: "Unexpected error" });
    });
};

exports.createCard = async (req, res) => {
  const { body } = req;
  let data = {
    id: body.id,
    title: body.title,
    rewards_type: body.rewards_type,
    rewards: body.rewards,
    earnings: body.earnings,
    url: body.url,
    bank: body.bank,
    image_url: body.image_url,
  };
  try {
    Card.create(data);
    res
      .status(200)
      .send({ message: "Successfully added credit card to database" });
  } catch (err) {
    console.log(err);
    res
      .status(400)
      .send({ message: "Unexpected error while adding card to database" });
  }
};
