const axios = require('axios');

const apiConfig = require('../config/api.config');
const db = require('../models');
const Wallet = db.wallets;
const Op = db.Sequelize.Op;

exports.items = async(req, res) => {
    // TODO - should i use wallet id or user id
    const userId = JSON.parse(Buffer.from(req.session.token.split('.')[1], 'base64').toString()).id;
    Wallet.findOne({where: {userId: {[Op.eq]: userId}}})
        .then(wallet => res.send(wallet.items))
        .catch(() => res.status(500).send({message: 'Unexpected error'}));
}

exports.insert = async (req, res) => {
    const options = {
        method: 'GET',
        url: 'https://ccstack.p.rapidapi.com/search/cards',
        headers: {
            'X-RapidAPI-Key': apiConfig.ccStackSecret,
            'X-RapidAPI-Host': 'ccstack.p.rapidapi.com'
        }
    };
    axios.request(options)
        .then(x => console.log(x.data))
        .catch(err => console.log(err));
}

exports.remove = async (req, res) => {

}