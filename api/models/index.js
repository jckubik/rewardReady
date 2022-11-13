const dbConfig = require("../config/db.config");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
User = db.users = require("./user.model")(sequelize, Sequelize);
Wallet = db.wallets = require("./wallet.model")(sequelize, Sequelize);
Store = db.stores = require("./store.model")(sequelize, Sequelize);
Coupon = db.coupons = require("./coupon.model")(sequelize, Sequelize);
Deal = db.deals = require("./deal.model")(sequelize, Sequelize);
Category = db.categories = require("./category.model")(sequelize, Sequelize);
Card = db.cards = require("./card.model")(sequelize, Sequelize);

User.hasOne(Wallet);
Wallet.belongsTo(User);
// this was changed from what it was before
Store.hasMany(Category);
Category.belongsToMany(Store, {
  through: "store_categories",
  as: "stores",
  foreignKey: "store_id",
});

Wallet.hasMany(Card);
Card.belongsToMany(Wallet, {
  through: "wallet_cards",
  as: "wallets",
  foreignKey: "wallet_id",
});

// These lines below are temporary for testing
// They demonstrate how:
// 1. A Store is created
// 2. Two Categories are made that associate to a Store

// Store.create({
//     name: "Amazon",
//     webAddress: "TEMP",
//     logoAddress: "TEMP"
// })
//     .then(() => console.log("Temporary for testing"))
//     .catch(err => console.log(err));
// Category.create({
//     categoryId: 7,
//     storeId: 1
// })
//     .then(() => console.log("Temporary for testing"))
//     .catch(err => console.log(err));
// Category.create({
//     categoryId: 14,
//     storeId: 1
// })
//     .then(() => console.log("Temporary for testing"))
//     .catch(err => console.log(err));

// Card.create({
//   content: {},
//   walletId: 1,
//   cardId: "5e690b260b077d5830cadc48"
// }
// )
//     .then(() => console.log("test"))
//     .catch(err => console.log(err))
// Card.create({
//       content: {},
//       walletId: 1,
//       cardId: "5e690b260b077d5830cadc21"
//     }
// )
//     .then(() => console.log("test"))
//     .catch(err => console.log(err))

module.exports = db;
