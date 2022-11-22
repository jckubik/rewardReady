const db = require("../models");
const Card = db.cards;
const apiConfig = require("../config/api.config");

exports.getCreditCards = async (req, res) => {
  try {
    let cards = await Card.findAll();
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
  console.log(req);
  try {
    let card = Card.findOne({ where: { id: req.params.id } });
    creditCardImageHandler(card);
    res.status(200).send(card);
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Unexpected error while retrieving credit card from database",
    });
  }
};

exports.updateCard = async (req, res) => {};

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

function creditCardImageHandler(card) {
  if (!card.image_url) {
    // retrieve image url using web search api
    // add field to card object
    try {
      let images = fetchImages(card.title);
      console.log(images);
      // let image_url;
      // Card.update({ image_url: image_url }, { where: { id: card.id } });
    } catch (err) {
      console.log(err);
    }
  }
}

function fetchImages(query) {
  const axios = require("axios");

  const options = {
    method: "GET",
    url: "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/WebSearchAPI",
    params: {
      q: query,
      pageNumber: "1",
      pageSize: "10",
      autoCorrect: "true",
    },
    headers: {
      "X-RapidAPI-Key": apiConfig.webSearchAPIKey,
      "X-RapidAPI-Host": "contextualwebsearch-websearch-v1.p.rapidapi.com",
    },
  };

  axios
    .request(options)
    .then(function (response) {
      return response;
    })
    .catch(function (err) {
      console.error(err);
    });
}
