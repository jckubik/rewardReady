const db = require('../models');
const Store = db.stores;
const Op = db.Sequelize.Op;

exports.insertStore = async (req, res) => {
    const storeName = req.storeName;
    Store.findOne({where: {storeName: {[Op.eq]: storeName}}})
        .then(store => {
            const updatedLogoAddress = store.logoAddress;
            const updatedOne = store.one;
            const updatedTwo = store.two;
            const updatedThree = store.three;
            const updatedFour = store.four;
            const updatedFive = store.five;
            const updatedSix = store.six;
            const updatedSeven = store.seven;
            const updatedEight = store.eight;
            const updatedNine = store.nine;
            const updatedTen = store.ten;    
            const updatedEleven = store.eleven;
            const updatedTwelve = store.twelve;
            const updatedThirteen = store.thirteen;
            const updatedFourteen = store.fourteen;
            const updatedFifteen = store.fifteen;
            const updatedSixteen = store.sixteen;
            const updatedSeventeen = store.seventeen;
        })
        .then(() => res.end())
        .catch(() => res.status(500).send({message: 'Unexpected errer'}));
};

exports.insertDeal = async (req, res) => {

};

exports.insertCoupon = async (req,res) => {
    
}