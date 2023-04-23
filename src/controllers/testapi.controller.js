const model = require('../models/cart.model')
const mongoose = require('mongoose')

class Api {
    async run(req, res) {
        try {
            const cart = await model.aggregate([
                {
                    $lookup: {
                        from: "users",
                        localField: "id_user",
                        foreignField: "_id",
                        as: "user"
                    },
                }, {
                    $lookup: {
                        from: "products",
                        localField: "id_product",
                        foreignField: "_id",
                        as: "product"
                    }
                },{
                    $match: {
                        id_user: new mongoose.Types.ObjectId('63fb7266e7a49def68db8b55')
                    }
                }
            ]);
            return res.json({
                cart
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
