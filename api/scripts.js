const db = require("./models");
const Card = db.cards;
const Category = db.categories;
const axios = require("axios");
const apiConfig = require("./config/api.config");
const fs = require("fs");
const Store = db.stores;
const Deal = db.deals;
const Coupon = db.coupons;
const Op = db.Sequelize.Op;
const StoreCategories = db.StoreCategories;

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
  try {
    let totalPages = 145;
    for (let i = 1; i <= totalPages; i++) {
      let data = JSON.parse(
        fs.readFileSync(`./creditCardsDB/creditCards${i}.json`)
      );
      data.results.forEach((cc) => {
        let data = {
          id: cc._id,
          title: cc.title,
          rewards: cc.rewards,
          earnings: cc.earnings,
          url: cc.url,
          bank: cc.bank,
        };
        Card.create(data);
      });
    }
    fs.rmSync("./creditCardsDB", { recursive: true, force: true });
  } catch (err) {
    console.log(err);
  }
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
  try {
    categories.forEach((category) => {
      Category.create({
        id: category.id,
        name: category.name,
      });
    });
  } catch (err) {
    console.log(err);
  }
}

async function populateStoresToDB() {
  try {
    const deals = await Deal.findAll();
    for (const deal of deals) {
      const merchantName = deal.merchantName;
      console.log(merchantName);
      const store = await Store.findOne({
        where: { name: { [Op.eq]: merchantName } },
      });
      if (store) {
        continue;
      }

      await Store.create({
        name: merchantName,
        webAddress: deal.clickUrl,
        logoAddress:
          "http://americanrecycling.info/TestimonialCompanyLogo/CompanyDefaultLogo.jpg",
      });
    }
    const coupons = await Coupon.findAll();
    for (const coupon of coupons) {
      const merchantName = coupon.merchantName;
      const store = await Store.findOne({
        where: { name: { [Op.eq]: merchantName } },
      });
      if (store) {
        continue;
      }

      await Store.create({
        name: merchantName,
        webAddress: coupon.clickUrl,
        logoAddress:
          "http://americanrecycling.info/TestimonialCompanyLogo/CompanyDefaultLogo.jpg",
      });
    }
  } catch (err) {
    console.log(err);
  }
}

function addDealsToDB() {
  // TODO
}

function addCouponsToDB() {
  // TODO
}

async function assignCategoryToStores() {
  try {
    await StoreCategories.destroy({ where: {} });
    let storeCategories = JSON.parse(fs.readFileSync("./storeCategories.json"));
    for (let i = 0; i < storeCategories.length; i++) {
      const storeName = storeCategories[i].storeName;
      const categoryIds = storeCategories[i].categoryIds;
      const storeId = storeCategories[i].storeId;
      console.log(`${storeName} ${categoryIds} ${storeId}`);
      if (storeId == undefined || storeId == null) {
        if (!storeName) {
          throw new Error("Record does not contain storeId or storeName");
        } else {
          let store = await Store.findOne({
            where: { name: { [Op.eq]: storeName } },
          });
          if (store) {
            await StoreCategories.destroy({
              where: { storeId: { [Op.eq]: store.id } },
            });
            categoryIds.forEach(async (id) => {
              await StoreCategories.create({
                categoryId: id,
                storeId: store.id,
              });
            });
          }
        }
      } else {
        let store = await Store.findOne({
          where: { id: { [Op.eq]: storeId } },
        });
        if (store) {
          await StoreCategories.destroy({
            where: { storeId: { [Op.eq]: storeId } },
          });
          categoryIds.forEach(async (id) => {
            await StoreCategories.create({
              categoryId: id,
              storeId: storeId,
            });
          });
        }
      }
    }
    let stores = await Store.findAll();
    stores.forEach(async (store) => {
      let defaultStoreCategory = await StoreCategories.findOne({
        where: { storeId: { [Op.eq]: store.id }, categoryId: { [Op.eq]: 7 } },
      });
      if (!defaultStoreCategory) {
        await StoreCategories.create({ categoryId: 7, storeId: store.id });
      }
    });
  } catch (err) {
    console.log(err);
  }
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
  {
    name: "Populate stores table from coupons and deals data",
    function: populateStoresToDB,
  },
  // {
  //   name: "Populate deals table with deals from external API",
  //   function: addDealsToDB,
  // },
  // {
  //   name: "Populate coupons table with coupons from external API",
  //   function: addCouponsToDB,
  // },
  {
    name: "Assign categories to stores",
    function: assignCategoryToStores,
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
