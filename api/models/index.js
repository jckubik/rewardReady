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
User = db.users = require('./user.model')(sequelize, Sequelize);
Wallet = db.wallets = require('./wallet.model')(sequelize, Sequelize);
Store = db.stores = require('./store.model')(sequelize, Sequelize);
Category = db.categories = require('./category.model')(sequelize, Sequelize);
Coupon = db.coupons = require('./coupon.model')(sequelize, Sequelize);
Deal = db.deals = require('./deal.model')(sequelize, Sequelize);
History = db.history = require('./history.model')(sequelize, Sequelize);
Category = db.categories = require("./category.model")(sequelize, Sequelize);

User.hasOne(Wallet);
Wallet.belongsTo(User);
User.hasOne(History);
History.belongsTo(User);
Store.hasMany(Category);
Category.belongsToMany(Store, {
  through: "store_categories",
  as: "stores",
  foreignKey: "store_id",
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

module.exports = db;
