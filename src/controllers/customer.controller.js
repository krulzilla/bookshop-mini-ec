const userModel = require('../models/user.model');
const productModel = require('../models/product.model');
const cartModel = require('../models/cart.model');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose')
const {SECRET_KEY} = require('../config/secret_key.config');

class Customer {
    async home(req, res) {
        try {
            const products = await productModel.find({});
            const token = !!req.cookies.token;
            return res.render('index', {products: products, token: token});
        } catch (e) {
            return res.status(500).send('Error happened');
        }
    }

    async products(req, res) {
        try {
            const products = await productModel.find({});
            const token = !!req.cookies.token;
            return res.render('products', {products: products, token: token});
        } catch (e) {
            return res.status(500).send('Error happened');
        }
    }

    async product(req, res) {
        try {
            const id = req.params.id;
            const token = !!req.cookies.token;
            // Stopping here - lien ket bang & lay 1 gia tri = where
            const product = await productModel.aggregate([
                {
                    $lookup: {
                        from: "categories",
                        localField: "id_category",
                        foreignField: "_id",
                        as: "category",
                    },
                }, {
                    $match: {
                        _id: new mongoose.Types.ObjectId(id)
                    }
                }
            ]);
            if (product) {
                return res.render('product_detail', {product: product[0], token: token});
            } return res.redirect('/')
        } catch (e) {
            return res.status(500).send('Error happened');
        }
    }

    async login(req, res) {
        const token = !!req.cookies.token;
        return res.render('login', {layout: false, token: token});
    }

    async register(req, res) {
        const token = !!req.cookies.token;
        return res.render('register', {layout: false, token: token});
    }

    async profile(req, res) {
        const rawToken = req.cookies.token ?? " ";
        try {
            const token = jwt.verify(rawToken.split(' ')[1], SECRET_KEY)
            if (token) {
                const user = await userModel.findOne({_id:token.id})
                if (user) {
                    return res.render('profile', {user: user, token: rawToken})
                }
            }
            res.clearCookie('token');
            return res.redirect('./login');
        } catch (e) {
            res.clearCookie('token');
            return res.redirect('./login');
        }
    }

    async cart(req, res) {
        const rawToken = req.cookies.token ?? " ";
        try {
            const token = jwt.verify(rawToken.split(' ')[1], SECRET_KEY)
            if (token) {
                const cart = await cartModel.aggregate([
                    {
                        $lookup: {
                            from: 'products',
                            localField: 'id_product',
                            foreignField: '_id',
                            as: 'product'
                        }
                    }, {
                        $match: {
                            id_user: new mongoose.Types.ObjectId(token.id)
                        }
                    }
                ]);
                if (cart) {
                    console.log(cart)
                    return res.render('cart', {cart: cart, token: rawToken})
                }
            }
        } catch (e) {
            return res.status(500).send('Error happened');
        }
    }

    async purchase(req, res) {
        try {
            const cart = await cartModel.create({
                id_user: '63fb7266e7a49def68db8b55',
                id_product: '6405fb10a053aa95862af028',
                amount: 2,
            })
            if (cart) {
                return res.json({
                    status: 'success',
                    msg: 'You have created cart'
                })
            }
        } catch (e) {
            return res.json({
                status: 'fail',
                msg: e.message
            })
        }
    }
}

module.exports = new Customer();