const db = require("../models");
const Coupon = db.coupons;
const Op = db.Sequelize.Op;
const tempUtil = require("../utils/temp.util");
const jsdom = require("jsdom");
const dom = new jsdom.JSDOM("");
global.DOMParser = dom.window.DOMParser;
const xml2js = require("xml2js");
const { Sequelize } = require("../models");

// exports.getCoupons = async (req, res) => {
//     try {
//         // console.log();
//         const items = await tempUtil.getCoupons();
//         items.forEach((item) => {
//             console.log(item);
//             return Coupon.create({
//                 couponId: item.deal.id,
//                 title: item.deal.title,
//             // description: items.deal.description,
//                 price: item.deal.price,
//                 value: item.deal.value,
//                 imageUrl: item.deal.image_url,
//                 // createdAt: items.deal.created_at,
//                 merchantName: item.deal.merchant.name
//             })
//         })
//         // Coupon.create(coupon)
//         res.status(200).send({ message: `Coupons added successfully`});
//         // .then(() => res.end())
//         // .catch(() => res.status(500).send({message: 'Unexpected error'}));
//         // return items.deal.id;
//     } catch(err) {
//         console.log(err);
//         res.status(400).send({message: 'Unexpected error while grabbing coupon'});
//     }
// };

exports.getCjCoupons = async (req, res) => {
  var parser, xmlDoc;
  try {
    const items = await tempUtil.getCjCoupons();
    parser = new DOMParser();
    xmlDoc = parser.parseFromString(items, "text/xml");
    xml2js.parseString(items, (err, result) => {
      if (err) {
        throw err;
      }

      const json = JSON.stringify(result, null, 2);

      const jsonParsed = JSON.parse(json);
      // console.log(jsonParsed["cj-api"].links.entries(link));
      jsonParsed["cj-api"].links.forEach((item) => {
        Object.entries(item).forEach(([key, value]) => {
          if (key == "link") {
            for (const item in value) {
              // console.log(value[item]["link-id"][0]);
              // const coupon = Coupon.findOne({ where: { couponId: value[item]["link-id"][0]}});

              // if (coupon === null) {
              Coupon.findOne({
                where: { couponId: value[item]["link-id"][0] },
              }).then((coupon) => {
                if (!coupon) {
                  Coupon.create({
                    couponId: value[item]["link-id"][0],
                    title: value[item]["link-name"][0],
                    merchantName: value[item]["advertiser-name"][0],
                    clickUrl: value[item].clickUrl[0],
                    couponCode: value[item]["coupon-code"][0],
                  });
                }
              });

              // }
            }
          }
        });
      });
    });
    res.status(200).send({ message: `Coupons grabbed successfully` });
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: "Unexpected error while grabbing coupon" });
  }
};

exports.getRandomCoupon = async (req, res) => {
  var data;
  Coupon.findAll({ order: Sequelize.literal("rand()"), limit: 5 })
    .then((coupons) => {
      const couponArray = [];
      try {
        coupons.forEach((coupon) => {
          couponArray.push(coupon.dataValues);
          // console.log(coupon.dataValues)
        });
        // console.log(coupons)
      } catch (err) {
        console.log(err);
      }
      // data = coupons[0];
      const json = JSON.stringify(couponArray);
      // console.log(json);
      // return json;
      data = coupons[0].get();
      // res.json(data);
      return data;
    })
    .then(() => res.status(200).json(data))
    .catch(() => res.status(500).send({ message: "Unexpected error" }));
};

exports.getCjCouponsQuery = async (req, res) => {
  var parser, xmlDoc;
  try {
    const items = await tempUtil.getCjCouponsQuery(req);
    parser = new DOMParser();
    xmlDoc = parser.parseFromString(items, "text/xml");
    xml2js.parseString(items, (err, result) => {
      if (err) {
        throw err;
      }

      const json = JSON.stringify(result, null, 2);

      const jsonParsed = JSON.parse(json);
      // console.log(jsonParsed["cj-api"].links.entries(link));
      jsonParsed["cj-api"].links.forEach((item) => {
        Object.entries(item).forEach(async ([key, value]) => {
          if (key == "link") {
            console.log(value[0]);
            for (const item in value) {
              // console.log(value[item]["link-id"][0]);
              // const coupon = await Coupon.findOne({ where: { couponId: value[0]["link-id"][0]}});
              // coupon.then((response) => console.log(response.data))
              // console.log(coupon)

              // if (coupon === null) {
              Coupon.findOne({
                where: { couponId: value[item]["link-id"][0] },
              }).then((coupon) => {
                if (!coupon) {
                  Coupon.create({
                    couponId: value[item]["link-id"][0],
                    title: value[item]["link-name"][0],
                    merchantName: value[item]["advertiser-name"][0],
                    clickUrl: value[item].destination[0],
                    couponCode: value[item]["coupon-code"][0],
                  });
                }
              });
            }
          }
        });
      });
    });
    res.status(200).send({ message: `Coupons grabbed successfully` });
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: "Unexpected error while grabbing coupon" });
  }
};

exports.getCouponsByMerchant = async (req, res) => {
  try {
    const merchantName = req.body.merchantName;
    let coupons = await Coupon.findAll({
      where: { merchantName: { [Op.eq]: merchantName } },
    });
    res.status(200).send(coupons);
  } catch (err) {
    console.log(err);
    res.status(400).send({
      message: "Unexpected error while fetch coupons by merchant name",
    });
  }
};
