module.exports = (sequelize, Sequelize) => {
    return sequelize.define('coupon', {
        couponId: {type: Sequelize.INTEGER, allowNull: false, unique: true},
        title: {type: Sequelize.STRING, allowNull: false},
        description: {type: Sequelize.STRING},
        price: {type: Sequelize.FLOAT, allowNull: false},
        value: {type: Sequelize.FLOAT, allowNull: false},
        imageUrl: {type: Sequelize.STRING},
        createdAt: {type: Sequelize.DATE},
        merchantName: {type: Sequelize.STRING, allowNull: false}
    })
}