module.exports = {
  // HOST: "localhost",
  // USER: "root",
  // PASSWORD: "123456",
  // DB: "rewardready",
  HOST: "database",
  USER: "root",
  PASSWORD: "123456",
  DB: "rewardready",
  port: 3306,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
