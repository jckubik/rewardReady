const db = require("../models");
const Favorite = db.favorite;
const Deal = db.deals;
const Coupon = db.coupons;
const Op = db.Sequelize.Op;

exports.getFavorites = async (req, res) => {
    Favorite.findOne({where: {userId: {[Op.eq]: req.userId}}})
        .then(favorite => res.send(favorite))
        .catch(() => res.status(500).send({message: 'Unexpected error'}));
};

exports.addFavoriteStore = async (req, res) => {
    const userId = req.userId;
    const storeName = req.body.storeName;
    Favorite.findOne({where: {userId: {[Op.eq]: userId}}})
        .then(favorite => {
            const updatedStores = favorite.stores;
            if (updatedStores.contains(storeName)) return null;
            updatedStores.push(storeName);
            return Favorite.update({stores: updatedStores}, {where: {userId: {[Op.eq]: userId}}});
        })
        .then(() => res.end())
        .catch(() => res.status(500).send({message: 'Unexpected error'}));
};

exports.removeFavoriteStore = async (req, res) => {
    const userId = req.userId;
    const storeName = req.body.storeName;
    Favorite.findOne({where: {userId: {[Op.eq]: userId}}})
        .then(favorite => {
            const updatedStores = favorite.stores
                .filter(store => store !== storeName);
            return Favorite.update({stores: updatedStores}, {where: {userId: {[Op.eq]: userId}}});
        })
        .then(() => res.end())
        .catch(() => res.status(500).send({message: 'Unexpected error'}));
};

exports.getDealsAndCouponsFromFavoriteStores = async (req, res) => {
    Favorite.findOne({where: {userId: {[Op.eq]: userId}}})
        .then(favorite => favorite.stores)
        .then(stores => {
            return stores.map(store => [
                Promise.resolve(Deal.findAll({where: {merchantName: {[Op.eq]: store}}})),
                Promise.resolve(Coupon.findAll({where: {merchantName: {[Op.eq]: store}}}))
            ]);
        })
        .then(content => res.json(content))
        .catch(() => res.status(500).send({message: 'Unexpected error'}));
};