module.exports = (sequelize, Sequelize) => {
    return sequelize.define('favorite', {
        stores: {type: Sequelize.JSON, allowNull: false}
    });
};