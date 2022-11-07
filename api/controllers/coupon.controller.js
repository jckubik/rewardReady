const db = require('../models');
const Coupon = db.coupons;
const Op = db.Sequelize.Op;
const tempUtil = require('../utils/temp.util');

exports.getCoupons = async (req, res) => {
    try {
        // console.log();
        const items = await tempUtil.getCoupons();
        items.forEach((item) => {
            console.log(item);
            return Coupon.create({
                couponId: item.deal.id,
                title: item.deal.title,
            // description: items.deal.description,
                price: item.deal.price,
                value: item.deal.value,
                imageUrl: item.deal.image_url,
                // createdAt: items.deal.created_at,
                merchantName: item.deal.merchant.name
            })
        })
        // Coupon.create(coupon)
        res.status(200).send({ message: `Coupons added successfully`});
        // .then(() => res.end())
        // .catch(() => res.status(500).send({message: 'Unexpected error'}));
        // return items.deal.id;
    } catch(err) {
        console.log(err);
        res.status(400).send({message: 'Unexpected error while grabbing coupon'});
    }
};