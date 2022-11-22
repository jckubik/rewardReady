const dbConfig = require("../config/db.config");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  port: dbConfig.port,
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
Category = db.categories = require("./category.model")(sequelize, Sequelize);
Coupon = db.coupons = require("./coupon.model")(sequelize, Sequelize);
Deal = db.deals = require("./deal.model")(sequelize, Sequelize);
Card = db.cards = require("./card.model")(sequelize, Sequelize);
History = db.history = require("./history.model")(sequelize, Sequelize);
WalletCard = db.WalletCard = require("./walletCard.model")(
  sequelize,
  Sequelize
);
Favorite = db.favorite = require("./favorite.model")(sequelize, Sequelize);
StoreCategories = db.StoreCategories = require("./storeCategories.model")(
  sequelize,
  Sequelize
);

// Relationships
User.hasOne(Wallet);
Wallet.belongsTo(User);
User.hasOne(History);
History.belongsTo(User);
User.hasOne(Favorite);
Favorite.belongsTo(User);
// Store.belongsTo(Category);

// this was changed from what it was before
// Store.hasMany(Category);
Category.belongsToMany(Store, {
  through: StoreCategories,
});

// Card.belongsTo(Category, {
//   foreignKey: "rewards_type",
//   as: "category",
// });

// Wallet.hasMany(Card);
Card.belongsToMany(Wallet, {
  through: WalletCard,
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
