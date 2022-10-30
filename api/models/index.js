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

User.hasOne(Wallet);
Wallet.belongsTo(User);

// Store.create({name: "Amazon", category: 7})
//     .then(() => console.log("Temporary for testing"))
//     .catch(() => console.log("Error"));

module.exports = db;
