module.exports = (sequelize, Sequelize) => {
    return sequelize.define('wallet', {
        history: {type: Sequelize.JSON, allowNull: false}
    });
};