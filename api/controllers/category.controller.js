const { categories } = require('../models/category.model');
const db = require('../models');
const Category = db.categories;
const Op = db.sequelize.Op;

exports.insertCategory = async (req, res) => {
    const body = req.body;
    return Category.create({
        categoryId: body.categoryId
    })
    .then(() => res.end())
    .catch(() => res.status(501).send({message: 'Unexpected error'}));
}
