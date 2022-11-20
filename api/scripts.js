// const db = require("../models");
// const Card = db.cards;
const axios = require("axios");

const prompt = require("prompt-sync")();
function populateCardsInDB() {
  const options = {
    method: "GET",
    url: "https://ccstack.p.rapidapi.com/search/cards",
    headers: {
      "X-RapidAPI-Key": "4b363ccb81mshe2bcc27df5e7ca5p13fcf0jsnad473cc60ff1",
      "X-RapidAPI-Host": "ccstack.p.rapidapi.com",
    },
  };

  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
}

let scriptOptions = [{ name: "", function: populateCardsInDB }];

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
