module.exports = (sequelize, Sequelize) => {
  return sequelize.define("category", {
    id: { type: Sequelize.INTEGER, primaryKey: true },
    name: { type: Sequelize.STRING, allowNull: false },
  });
};
