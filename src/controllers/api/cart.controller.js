const cartModel = require('../../models/cart.model');
const jwt = require('jsonwebtoken');
const {SECRET_KEY} = require('../../config/secret_key.config');

class Cart {
    async getAll(req, res) {
        try {
            const carts = await cartModel.find({});
            return res.json({
                status: true,
                data: carts
            })
        } catch (e) {
            return res.status(500).json({
                status: false,
                msg: "Some error happened in server!"
            })
        }
    }

    // Find by customer id
    async getById(req, res) {
        const id = req.params.id;
        try {
            const cart = await cartModel.find({id_user: id});
            return res.json({
                status: true,
                data: cart
            })
        } catch (e) {
            return res.status(500).json({
                status: false,
                msg: "Some error happened in server!"
            })
        }
    }

    async modify(req, res) {
        try {
            const {id_product, amount} = req.body;
            const rawToken = req.cookies.token;
             // Verify token -> get id user
            const token = rawToken.split(" ")[1];
            const user = jwt.verify(token, SECRET_KEY);

            if (!user) {
                return res.json({
                    status: false,
                    msg: 'User not found!'
                })
            }

            // Create new if not exist or update
            // https://stackoverflow.com/questions/33305623/mongoose-create-document-if-not-exists-otherwise-update-return-document-in
            const options = {
                upsert: true,
                new: true,
                setDefaultsOnInsert: true
            }
            let cart;
            if (amount == -1) {
                cart = await cartModel.findOneAndUpdate({
                    id_product,
                    id_user: user.id
                }, {$inc : {'amount' : 1}}, options);
            } else if (amount == 0) {
                cart = await cartModel.findOneAndDelete({
                    id_product,
                    id_user: user.id
                })
            } else {
                cart = await cartModel.findOneAndUpdate({
                    id_product,
                    id_user: user.id
                }, {amount}, options);
            }
            if (cart) {
                return res.json({
                    status: true,
                    msg: 'Successfully!'
                })
            } else return res.json({
                status: false,
                msg: "Some error happened in server!"
            })
        } catch (e) {
            return res.status(500).json({
                status: false,
                msg: "Some error happened in server!"
            })
        }
    }

    async update(req, res) {

    }

    async delete(req, res) {

    }
}


module.exports = new Cart();