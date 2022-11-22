const db = require("./models");
const Card = db.cards;
const Category = db.categories;
const axios = require("axios");
const apiConfig = require("./config/api.config");
const fs = require("fs");

const prompt = require("prompt-sync")();

async function downloadCreditCards() {
  fs.mkdirSync("./creditCardsDB", { recursive: true });
  let totalPages = 145;
  for (let i = 1; i <= totalPages; i++) {
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

async function addCreditCardsToDB() {
  let totalPages = 145;
  for (let i = 1; i <= totalPages; i++) {
    let data = JSON.parse(
      fs.readFileSync(`./creditCardsDB/creditCards${i}.json`)
    );
    data.results.forEach((cc) => {
      let data = {
        id: cc._id,
        title: cc.title,
        rewards_type: cc.rewards_type,
        rewards: cc.rewards,
        earnings: cc.earnings,
        url: cc.url,
        bank: cc.bank,
      };
      Card.create(data);
    });
  }
  fs.rmSync("./creditCardsDB", { recursive: true, force: true });
}

function addCategoriesToDB() {
  let categories = [
    {
      name: "Airline",
      id: 1,
    },
    {
      name: "Cable Services",
      id: 2,
    },
    {
      name: "Car Rental",
      id: 3,
    },
    {
      name: "Department Store",
      id: 4,
    },
    {
      name: "Drug Store",
      id: 5,
    },
    {
      name: "Entertainment",
      id: 6,
    },
    {
      name: "Everywhere",
      id: 7,
    },
    {
      name: "Gas Station",
      id: 8,
    },
    {
      name: "Home Improvement Store",
      id: 9,
    },
    {
      name: "Hotel",
      id: 10,
    },
    {
      name: "Office Supply Store",
      id: 11,
    },
    {
      name: "Online Shopping",
      id: 12,
    },
    {
      name: "Phone Service",
      id: 13,
    },
    {
      name: "Restaurant",
      id: 14,
    },
    {
      name: "Selectable Category",
      id: 15,
    },
    {
      name: "Supermarket",
      id: 16,
    },
    {
      name: "Utility",
      id: 17,
    },
  ];

  categories.forEach((category) => {
    Category.create({
      id: category.id,
      name: category.name,
    });
  });
}

let scriptOptions = [
  {
    name: "Download credit cards from ccstack",
    function: downloadCreditCards,
  },
  { name: "Add credit cards to DB", function: addCreditCardsToDB },
  {
    name: "Add categories to DB",
    function: addCategoriesToDB,
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
