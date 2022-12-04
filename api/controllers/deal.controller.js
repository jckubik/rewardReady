const db = require("../models");
const Deal = db.deals;
const Op = db.Sequelize.Op;
const tempUtil = require("../utils/temp.util");
const jsdom = require("jsdom");
const dom = new jsdom.JSDOM("");
global.DOMParser = dom.window.DOMParser;
const xml2js = require("xml2js");
const { Sequelize } = require("../models");

exports.getDeals = async (req, res) => {
  try {
    // console.log();
    const items = await tempUtil.getDeals();
    items.forEach((item) => {
      Deal.findOne({ where: { dealId: item.deal.id } }).then((deal) => {
        if (!deal) {
          Deal.create({
            dealId: item.deal.id,
            title: item.deal.title,
            description: item.deal.description,
            price: item.deal.price,
            value: item.deal.value,
            imageUrl: item.deal.image_url,
            clickUrl: item.deal.url,
            // createdAt: items.deal.created_at,
            merchantName: item.deal.merchant.name,
          });
        }
      });
    });
    // Coupon.create(coupon)
    res.status(200).send({ message: `Deals added successfully` });
    // .then(() => res.end())
    // .catch(() => res.status(500).send({message: 'Unexpected error'}));
    // return items.deal.id;
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: "Unexpected error while grabbing deal" });
  }
};

// exports.getCjDeals = async (req, res) => {
//     var parser, xmlDoc;
//     try {
//         const items = await tempUtil.getCjDeals();
//         parser = new DOMParser();
//         xmlDoc = parser.parseFromString(items, "text/xml");
//         xml2js.parseString(items, (err, result) => {
//             if (err) {
//                 throw err
//             }

//             const json = JSON.stringify(result, null, 2)

//             const jsonParsed = JSON.parse(json);
//             // console.log(jsonParsed["cj-api"].links.entries(link));
//             jsonParsed["cj-api"].links.forEach((item) => {
//                 Object.entries(item).forEach(([key,value]) => {
//                     if (key == "link") {
//                         console.log(value);
//                         // for (const item in value) {
//                         //     // console.log(value[item]["link-id"][0]);
//                         //     const deal = Deal.findOne({ where: { dealId: value[item]["link-id"][0]}});

//                         //     if (deal === null) {
//                         //         Deal.create({
//                         //             dealId: value[item]["link-id"][0],
//                         //             title: value[item]["link-name"][0],
//                         //             merchantName: value[item]["advertiser-name"][0],
//                         //             clickUrl: value[item].clickUrl[0],
//                         //             couponCode: value[item]["coupon-code"][0]
//                         //         })
//                         //     }
//                         // }
//                     }
//                 })
//             })
//         })
//         res.status(200).send({ message: `Deals grabbed successfully`});
//     } catch (err) {
//         console.log(err);
//         res.status(400).send({message: 'Unexpected error while grabbing deal'});
//     }
// }

exports.getRandomDeal = async (req, res) => {
  var data;
  Deal.findAll({ order: Sequelize.literal("rand()"), limit: 5 })
    .then((deals) => {
      const dealArray = [];
      try {
        deals.forEach((deal) => {
          dealArray.push(deal.dataValues);
          // console.log(coupon.dataValues)
        });
        // console.log(coupons)
      } catch (err) {
        console.log(err);
      }
      // data = coupons[0];
      const json = JSON.stringify(dealArray);
      // console.log(json);
      // return json;
      data = deals[0].get();
      // res.json(data);
      return data;
    })
    .then(() => res.status(200).json(data))
    .catch(() => res.status(500).send({ message: "Unexpected error" }));
};

exports.getDealFromDB = async (req, res) => {
  const { dealId } = req.body;

  try {
    const deal = Deal.findOne({
      where: {},
    });
  } catch (event) {
    res.status(400).send({
      message: "Unexpected error while trying to get deal from the DB.",
    });
  }
};

exports.searchDealsWeb = async (req, res) => {
  try {
    const items = await tempUtil.searchDealsWeb(req);

    Object.entries(items).forEach(([key, value]) => {
      if (key === "data") {
        Object.entries(value).forEach(([k2, deal]) => {
          let priceRange;
          if (deal.typical_price_range != null) {
            priceRange = deal.typical_price_range[1];
          } else {
            priceRange = null;
          }
          Deal.findOne({ where: { dealId: deal.product_id_v2 } }).then(
            (item) => {
              if (!item) {
                Deal.create({
                  dealId: deal.product_id_v2,
                  hasProductId: true,
                  productId: deal.product_id,
                  title: deal.product_title,
                  description: deal.product_description,
                  price: deal.offer.price,
                  value: priceRange,
                  imageUrl: deal.product_photos[0],
                  clickUrl: deal.offer.offer_page_url,
                  merchantName: deal.offer.store_name,
                });
              }
            }
          );
        });
      }
    });
    res.status(200).send({ message: `Deals added successfully` });
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: "Unexpected error while grabbing deal" });
  }
};

exports.getDealsByMerchant = async (req, res) => {
  try {
    const merchantName = req.body.merchantName;
    let deals = await Deal.findAll({
      where: { merchantName: { [Op.eq]: merchantName } },
    });

    console.log(deals);
    res.status(200).send(deals);
  } catch (err) {
    console.log(err);
    res
      .status(400)
      .send({ message: "Unexpected error while fetch deals by merchant name" });
  }
};
