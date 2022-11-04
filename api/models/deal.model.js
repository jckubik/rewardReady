module.exports = (sequelize, Sequelize) => {
    return sequelize.define('deal', {
        dealId: {type: Sequelize.STRING, allowNull: false, unique: true}, //json.links.link.link-id
        hasProductId: {type: Sequelize.BOOLEAN, default: false},
        productId: {type: Sequelize.STRING},
        title: {type: Sequelize.STRING, allowNull: false}, //json.links.link.link-name
        description: {type: Sequelize.TEXT}, //json.links.link.description
        price: {type: Sequelize.STRING, allowNull: false},
        value: {type: Sequelize.STRING},
        imageUrl: {type: Sequelize.STRING},
        clickUrl: {type: Sequelize.TEXT, allowNull: false},
        merchantName: {type: Sequelize.STRING, allowNull: false}, //json.links.link.advertiser-name
    })
}