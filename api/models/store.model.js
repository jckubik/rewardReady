module.exports = (sequelize, Sequelize) => {
    return sequelize.define('store', {
        name: {type: Sequelize.STRING, allowNull: false},
        logoAddress: {type: Sequelize.STRING, allowNull: false},
        1: {type: Sequelize.BOOLEAN, defaultValue: false},
        2: {type: Sequelize.BOOLEAN, defaultValue: false},
        3: {type: Sequelize.BOOLEAN, defaultValue: false},
        4: {type: Sequelize.BOOLEAN, defaultValue: false},
        5: {type: Sequelize.BOOLEAN, defaultValue: false},
        6: {type: Sequelize.BOOLEAN, defaultValue: false},
        7: {type: Sequelize.BOOLEAN, defaultValue: false},
        8: {type: Sequelize.BOOLEAN, defaultValue: false},
        9: {type: Sequelize.BOOLEAN, defaultValue: false},
        10: {type: Sequelize.BOOLEAN, defaultValue: false},
        11: {type: Sequelize.BOOLEAN, defaultValue: false},
        12: {type: Sequelize.BOOLEAN, defaultValue: false},
        13: {type: Sequelize.BOOLEAN, defaultValue: false},
        14: {type: Sequelize.BOOLEAN, defaultValue: false},
        15: {type: Sequelize.BOOLEAN, defaultValue: false},
        16: {type: Sequelize.BOOLEAN, defaultValue: false},
        17: {type: Sequelize.BOOLEAN, defaultValue: false}
    });
};