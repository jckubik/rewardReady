const { stores } = require("../models/store.model");
// const { categories } = require('../models/category.model');
const db = require("../models");
const Store = db.stores;
const Deal = db.deals;
const Coupon = db.coupons;
// const Category = db.categories;
const Op = db.Sequelize.Op;
const { Sequelize } = require("../models");

exports.fetchCategory = async (req, res) => {
  Store.findOne({ where: { name: { [Op.eq]: req.body.name } } })
    .then((store) => (store ? store.get({ plain: true }) : null))
    .then((store) => {
      if (store) {
        res.json(store);
      } else {
        res.status(400).send({ message: "No store found" });
      }
    })
    .catch(() => res.status(500).send({ message: "Unexpected error" }));
};

exports.insertStore = async (req, res) => {
  const body = req.body;
  return Store.create({
    name: body.name,
    webAddress: body.webAddress,
    logoAddress: body.logoAddress,
  })
    .then(() => res.end())
    .catch(() => res.status(500).send({ message: "Unexpected error" }));
};

exports.getRandomStore = async (req, res) => {
  var data;
  Store.findAll({ order: Sequelize.literal("rand()"), limit: 5 })
    .then((stores) => {
      const storeArray = [];
      try {
        stores.forEach((store) => {
          storeArray.push(store.dataValues);
          // console.log(coupon.dataValues)
        });
        // console.log(coupons)
      } catch (err) {
        console.log(err);
      }
      // data = coupons[0];
      const json = JSON.stringify(storeArray);
      // console.log(json);
      // return json;
      data = stores[0].get();
      console.log(data);
      // res.json(data);
      return data;
    })
    .then(() => res.status(200).json(data))
    .catch(() => res.status(500).send({ message: "Unexpected error" }));
};

exports.getRandomStores = async (req, res) => {
  var data;
  Store.findAll({ order: Sequelize.literal("rand()"), limit: 10 })
    .then((stores) => {
      const storeArray = [];
      try {
        stores.forEach((store) => {
          storeArray.push(store.dataValues);
          // console.log(coupon.dataValues)
        });
        // console.log(coupons)
      } catch (err) {
        console.log(err);
      }
      // data = coupons[0];
      data = stores;
      const json = JSON.stringify(data);
      // console.log(json);
      // return json;

      console.log(storeArray);
      // res.json(data);
      return data;
    })
    .then((data) => res.status(200).json(data))
    .catch(() => res.status(500).send({ message: "Unexpected error" }));
};

exports.createFromCouponsAndDeals = async (req, res) => {
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

    res.end();
  } catch (err) {
    res.status(500).send({ message: "Unexpected error" });
  }
};

// exports.associateCategory = async (req, res) => {
//     const body = req.body;
//     Store.findOne({where: {name: {[Op.eq]: req.body.name}}})
//         .then(found => found ? found.get({plain: true}) : null)
//         .then(found => console.log(found.id))
//         .then(Store.addCategory(1, 7))
//         .then(res.end())
//         // .catch(() => res.status(500).send({message: 'Unexpected error'}));
// }

// exports.addCategory = (storeId, categoryId) => {
//     return Store.findByPk(storeId)
//         .then((store) => {
//             if (!store) {
//                 console.log("Store not found!");
//                 return null;
//             }
//             return Category.findByPk(categoryId).then((category) => {
//               if (!category) {
//                 console.log("Category not found!")
//                 return null;
//               }

//               store.addCategory(category);
//               console.log(`>> added Category id=${category.id} to Store id=${store.id}`);
//               return store;
//             });
//         })
//         .catch((err) => {
//             console.log(">> Error while adding Category to Store: ", err);
//         });
// };
