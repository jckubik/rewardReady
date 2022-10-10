module.exports = (sequelize, Sequelize) => {
    return sequelize.define('wallet', {
        // TODO - figure out how to organize items
        items: {type: Sequelize.STRING, allowNull: false}
    });
};