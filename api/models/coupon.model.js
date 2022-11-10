module.exports = (sequelize, Sequelize) => {
    return sequelize.define('coupon', {
        couponId: {type: Sequelize.INTEGER, allowNull: false, unique: true}, //json.links.link.link-id
        title: {type: Sequelize.STRING, allowNull: false}, //json.links.link.link-name
        description: {type: Sequelize.STRING}, //json.links.link.description
        // price: {type: Sequelize.FLOAT, allowNull: false},
        // value: {type: Sequelize.FLOAT, allowNull: false},
        // imageUrl: {type: Sequelize.STRING},
        // createdAt: {type: Sequelize.DATE},
        merchantName: {type: Sequelize.STRING, allowNull: false}, //json.links.link.advertiser-name
        linkCodeHtml: {type: Sequelize.STRING}, //json.links.link.link-code-html
        clickUrl: {type: Sequelize.TEXT, allowNull: false}, // json.links.link.clickUrl
        couponCode: {type: Sequelize.STRING, allowNull: false}, // json.links.link.coupon-code
    })
}