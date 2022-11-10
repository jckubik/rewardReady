const db = require("../models");
const History = db.history;
const Op = db.Sequelize.Op;

exports.getHistory = async (req, res) => {
    History.findOne({where: {userId: {[Op.eq]: req.userId}}})
        .then(history => res.send(history))
        .catch(() => res.status(500).send({message: 'Unexpected error'}));
}

exports.getHistoryLogs = async (req, res) => {
    History.findOne({where: {userId: {[Op.eq]: req.userId}}})
        .then(history => res.send(history.logs))
        .catch(() => res.status(500).send({message: 'Unexpected error'}));
};

exports.insertHistoryLog = async (req, res) => {
    const content = req.body.content; // query used for history
    const type = req.body.type; // coupon, deal
    const id = req.body.id; // relative ID
    const date = new Date();
    History.findOne({where: {userId: {[Op.eq]: req.userId}}})
        .then(history => {
            const logsHistory = history.logs;
            logsHistory.push({
                content: content,
                type: type,
                id: id,
                date: date
            });
            return History.update({logs: logsHistory}, {where: {userId: {[Op.eq]: req.userId}}});
        })
        .then(() => res.end())
        .catch(() => res.status(500).send({message: 'Unexpected error'}));
};