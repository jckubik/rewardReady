const db = require('../models');
const Coupon = db.coupons;
const Deal = db.deals;

// search local database for deals/coupons
exports.findDealsAndCoupons = async (req, res) => {
    const query = req.body.query.toLowerCase();
    try {
        const coupons = (await Coupon.findAll())
            .filter(v => v.title.toLowerCase().includes(query))
            .sort((a, b) =>
                b.title.toLowerCase().indexOf(query) - a.title.toLowerCase().indexOf(query)
            );
        const deals = (await Deal.findAll())
            .filter(v => v.title.toLowerCase().includes(query))
            .sort((a, b) =>
                b.title.toLowerCase().indexOf(query) - a.title.toLowerCase().indexOf(query)
            );
        res.json({
            coupons: coupons,
            deals: deals
        })
    } catch (err) {
        res.status(400).send({message: 'Unexpected error.'});
    }
};