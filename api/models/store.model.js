module.exports = (sequelize, Sequelize) => {
  return sequelize.define("store", {
    name: { type: Sequelize.STRING, allowNull: false, unique: true },
    webAddress: { type: Sequelize.STRING, allowNull: false },
    logoAddress: { type: Sequelize.STRING, allowNull: false },
  });
};
