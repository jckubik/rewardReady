module.exports = (sequelize, Sequelize) => {
    return sequelize.define('history', {
        logs: {type: Sequelize.JSON, allowNull: false}
    });
};