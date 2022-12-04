const db = require("../models");
const Favorite = db.favorite;
const Deal = db.deals;
const Coupon = db.coupons;
const Op = db.Sequelize.Op;

exports.getFavorites = async (req, res) => {
  Favorite.findOne({ where: { userId: { [Op.eq]: req.userId } } })
    .then((favorite) => res.send(favorite))
    .catch(() => res.status(500).send({ message: "Unexpected error" }));
};

exports.addFavoriteStore = async (req, res) => {
  const userId = req.userId;
  const storeName = req.body.storeName;
  Favorite.findOne({ where: { userId: { [Op.eq]: userId } } })
    .then((favorite) => {
      const updatedStores = favorite.stores;
      if (updatedStores.includes(storeName)) return null;
      updatedStores.push(storeName);
      return Favorite.update(
        { stores: updatedStores },
        { where: { userId: { [Op.eq]: userId } } }
      );
    })
    .then(() => res.end())
    .catch((error) =>
      res.status(500).send({ message: `Unexpected error - ${error}` })
    );
};

exports.removeFavoriteStore = async (req, res) => {
  const userId = req.userId;
  const storeName = req.body.storeName;
  Favorite.findOne({ where: { userId: { [Op.eq]: userId } } })
    .then((favorite) => {
      const updatedStores = favorite.stores.filter(
        (store) => store !== storeName
      );
      return Favorite.update(
        { stores: updatedStores },
        { where: { userId: { [Op.eq]: userId } } }
      );
    })
    .then(() => res.end())
    .catch(() => res.status(500).send({ message: "Unexpected error" }));
};

exports.getDealsAndCouponsFromFavoriteStores = async (req, res) => {
  try {
    let favorite = await Favorite.findOne({
      where: { userId: { [Op.eq]: req.userId } },
    });

    let stores = favorite.stores;
    let data = {};
    for (let i = 0; i < stores.length; i++) {
      let deals = await Deal.findAll({
        where: { merchantName: { [Op.eq]: stores[i] } },
      });
      let coupons = await Coupon.findAll({
        where: { merchantName: { [Op.eq]: stores[i] } },
      });
      data[stores[i]] = { deals: [], coupons: [] };
      data[stores[i]].deals = deals;
      data[stores[i]].coupons = coupons;
    }
    res.json(data);
  } catch (err) {
    res.status(500).send({ message: `Unexpected error - ${err}` });
  }
};
