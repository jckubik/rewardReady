module.exports = (sequelize, Sequelize) => {
    return sequelize.define('wallet', {
        items: {type: Sequelize.JSON, allowNull: false}
    });
};