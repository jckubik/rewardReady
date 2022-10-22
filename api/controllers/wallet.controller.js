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
            // TODO - recommendation engine
            console.log(cards);
            res.end();

        })
        .catch(() => res.status(500).send({message: 'Unexpected error'}));
};