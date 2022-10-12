const axios = require('axios');

const apiConfig = require('../config/api.config');
const db = require('../models');
const Wallet = db.wallets;

exports.add = async (req, res) => {
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