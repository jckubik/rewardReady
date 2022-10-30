const { stores } = require("../models/store.model");
// const { categories } = require('../models/category.model');
const db = require("../models");
const Store = db.stores;
// const Category = db.categories;
const Op = db.Sequelize.Op;

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
    category: body.category,
  })
    .then(() => res.end())
    .catch(() => res.status(500).send({ message: "Unexpected error" }));
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
