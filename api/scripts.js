// const db = require("../models");
// const Card = db.cards;
const axios = require("axios");
const apiConfig = require("./config/api.config");
const fs = require("fs");

const prompt = require("prompt-sync")();
function populateCardsInDB() {
  let totalPages = 145;
  for (let i = 3; i <= totalPages; i++) {
    const options = {
      method: "GET",
      url: "https://ccstack.p.rapidapi.com/search/cards",
      params: { page: i.toString() },
      headers: {
        "X-RapidAPI-Key": apiConfig.ccStackSecret,
        "X-RapidAPI-Host": "ccstack.p.rapidapi.com",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        // console.log(response.data);
        let jsonStr = JSON.stringify(response.data);
        fs.writeFile(`./creditCardsDB/creditCards${i}.json`, jsonStr, (err) => {
          if (err) {
            throw err;
          }
        });
      })
      .catch(function (error) {
        console.error(error);
      });
  }
}

let scriptOptions = [
  {
    name: "Populate database card table with cards from rapidapi",
    function: populateCardsInDB,
  },
];

// -----------------------------------------------------------------------------------------
let formattedScriptOptions = "";

scriptOptions.forEach((option, index) => {
  formattedScriptOptions += index + ". " + option.name + "\n";
});
let chosenScriptOption;
chosenScriptOption = prompt(
  `Which script do you want to run? Enter number.\n${formattedScriptOptions}`
);

while (chosenScriptOption < 0 || chosenScriptOption >= scriptOptions.length) {
  chosenScriptOption = prompt("Invalid input. Enter number again: ");
}

try {
  scriptOptions[chosenScriptOption].function();
  console.log(
    "Successfully executed script: " + scriptOptions[chosenScriptOption].name
  );
} catch (err) {
  console.log(err);
}
