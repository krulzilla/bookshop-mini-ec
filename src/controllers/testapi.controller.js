const model = require('../models/product.model')
const mongoose = require('mongoose')

class Api {
    async run(req, res) {
        try {
            const {category} = req.query;
            console.log(category)
            return res.json({
                category
            });
        } catch (e) {
            return res.status(500).json({
                status: "error",
                msg: e.message
            })
        }
    }
}

module.exports = new Api();
