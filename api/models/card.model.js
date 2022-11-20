module.exports = (sequelize, Sequelize) => {
  return sequelize.define("card", {
    content: { type: Sequelize.JSON, allowNull: false },
    cardId: { type: Sequelize.STRING, allowNull: false },
    imageURL: { type: Sequelize.STRING, allowNull: true },
    name: { type: Sequelize.STRING, allowNull: false },
  });
};
