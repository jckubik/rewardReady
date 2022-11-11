module.exports = (sequelize, Sequelize) => {
    return sequelize.define('category', {
        // name: {type: Sequelize.STRING, allowNull: false},
        categoryId: {type: Sequelize.INTEGER, allowNull: false, unique: true}
    });
};