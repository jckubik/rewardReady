module.exports = (sequelize, Sequelize) => {
    return sequelize.define('user', {
        firstName: {type: Sequelize.STRING, allowNull: false},
        lastName: {type: Sequelize.STRING, allowNull: false},
        phoneNumber: {type: Sequelize.STRING},
        email: {type: Sequelize.STRING, allowNull: false, unique: true},
        password: {type: Sequelize.STRING, allowNull: false}
    });
};