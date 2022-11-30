const db = require("../models");
const Card = db.cards;
const apiConfig = require("../config/api.config");
const Op = db.Sequelize.Op;

exports.getCreditCards = async (req, res) => {
  try {
    let cards = await Card.findAll({ where: { earnings: { [Op.not]: "'" } } });
    cards = cards.filter((c) => c.earnings != "");

    res.status(200).send(cards);
  } catch (err) {
    res.status(500).send({
      message:
        "Unexpected error while retrieving credit credit cards from database",
    });
  }
};

exports.getCreditCardById = async (req, res) => {
  // check if credit card image url exists in
  console.log(req.params);
  try {
    let card = await Card.findOne({ where: { id: req.params.id } });
    await creditCardImageHandler(card);
    res.status(200).send(card);
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: err,
    });
  }
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

async function creditCardImageHandler(card) {
  if (!card.image_url) {
    try {
      let image_url = await fetchImage(card.title);
      await Card.update({ image_url: image_url }, { where: { id: card.id } });
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
