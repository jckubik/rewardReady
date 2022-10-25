const db = require('../models');
const Wallet = db.wallets;
const Op = db.Sequelize.Op;
const tempUtil = require('../utils/temp.util');

exports.fetchItems = async (req, res) => {
    Wallet.findOne({where: {userId: {[Op.eq]: req.userId}}})
        .then(wallet => res.send(wallet.items))
        .catch(() => res.status(500).send({message: 'Unexpected error'}));
};

exports.fetchCards = async (req, res) => {
    Wallet.findOne({where: {userId: {[Op.eq]: req.userId}}})
        .then(wallet => res.send(wallet.items.cards))
        .catch(() => res.status(500).send({message: 'Unexpected error'}));
};

exports.insertCard = async (req, res) => {
    const userId = req.userId;
    Wallet.findOne({where: {userId: {[Op.eq]: userId}}})
        .then(wallet => {
            const updatedItems = wallet.items;
            updatedItems.cards.push(req.body.cardId);
            return Wallet.update({items: updatedItems}, {where: {userId: {[Op.eq]: userId}}});
        })
        .then(() => res.end())
        .catch(() => res.status(500).send({message: 'Unexpected error'}));
};

exports.removeCard = async (req, res) => {
    const userId = req.userId;
    Wallet.findOne({where: {userId: {[Op.eq]: userId}}})
        .then(wallet => {
            const updatedItems = wallet.items;
            updatedItems.cards = updatedItems.cards.filter(card => card !== req.body.cardId);
            return Wallet.update({items: updatedItems}, {where: {userId: {[Op.eq]: userId}}});
        })
        .then(() => res.end())
        .catch(() => res.status(500).send({message: 'Unexpected error'}));
};

exports.recommendCard = async (req, res) => {
    Wallet.findOne({where: {userId: {[Op.eq]: req.userId}}})
        .then(wallet => Promise.all(wallet.items.cards.map(cardId => tempUtil.getCardById(cardId))))
        .then(cards => cards.filter(card => card !== null))
        .then(cards => {
            const topCards = cards.sort((cardA, cardB) => {
                const recommendCategory = req.body.recommendCategory;
                const earningsA = cardA.earnings
                    .filter(earning => earning.category === recommendCategory)
                    .sort((earningA, earningB) => earningB.points - earningA.points);
                cardA.earnings = earningsA;
                const earningsB = cardB.earnings
                    .filter(earning => earning.category === recommendCategory)
                    .sort((earningA, earningB) => earningB.points - earningA.points);
                cardB.earnings = earningsB;
                let topA = null;
                if (earningsA.length > 0) {
                    topA = earningsA[0];
                }
                let topB = null;
                if (earningsB.length > 0) {
                    topB = earningsB[0];
                }

                if (topA !== null && topB !== null) {
                    return topB.points - topA.points;
                } else if (topA !== null) {
                    return -1;
                } else if (topB !== null) {
                    return 1;
                }

                return 0;
            });

            if (cards.length > 0) {
                res.json(topCards[0]);
            } else {
                res.end();
            }
        })
        .catch(() => res.status(500).send({message: 'Unexpected error'}));
};