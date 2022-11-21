module.exports = (sequelize, Sequelize) => {
  return sequelize.define("card", {
    id: { type: Sequelize.STRING, primaryKey: true },
    title: { type: Sequelize.STRING, allowNull: false },
    rewards_type: { type: Sequelize.STRING, allowNull: true },
    rewards: { type: Sequelize.JSON, allowNull: true },
    earnings: { type: Sequelize.JSON, allowNull: true },
    url: { type: Sequelize.STRING, allowNull: true },
    bank: { type: Sequelize.JSON, allowNull: true },
    image_url: { type: Sequelize.STRING, allowNull: true },
  });
};
