const userModel = require('../models/user.model');
const productModel = require('../models/product.model');
const cartModel = require('../models/cart.model');
const categoryModel = require('../models/category.model');
const orderModel = require('../models/order.model');
const orderDetailsModel = require('../models/order_details.model');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose')
const {SECRET_KEY} = require('../config/secret_key.config');

class Customer {
    async home(req, res) {
        try {
            const products = await productModel.aggregate([
                {
                    $lookup: {
                        from: 'categories',
                        localField: 'id_category',
                        foreignField: '_id',
                        as: 'category'
                    }
                },
                {
                    $sort: {
                        published_at: -1
                    }
                },
                {
                    $limit: 6
                }
            ]);
            const token = !!req.cookies.token;
            return res.render('index', {products: products, token: token});
        } catch (e) {
            return res.status(500).send('Error happened');
        }
    }

    async products(req, res) {
        try {
            const category = await categoryModel.find({});
            const token = !!req.cookies.token;
            return res.render('products', {token: token, category: category});
        } catch (e) {
            return res.status(500).send('Error happened');
        }
    }

    async product(req, res) {
        try {
            const id = req.params.id;
            const token = !!req.cookies.token;
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
                    return res.render('cart', {cart: cart, token: rawToken})
                }
            }
        } catch (e) {
            return res.status(500).send('Error happened');
        }
    }

    async orders(req, res) {
        const rawToken = req.cookies.token ?? " ";
        try {
            const token = jwt.verify(rawToken.split(' ')[1], SECRET_KEY);
            if (token) {
                const orders = await orderModel.find({
                    id_user: token.id
                });
                if (orders) {
                    return res.render('orders', {token: rawToken, orders: orders})
                }
            }
        } catch (e) {
            return res.status(500).send('Error happened');
        }
    }

    async purchase(req, res) {
        const rawToken = req.cookies.token ?? " ";
        try {
            const token = jwt.verify(rawToken.split(' ')[1], SECRET_KEY);
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
                    return res.render('purchase', {cart: cart, token: rawToken})
                }
            }
        } catch (e) {
            return res.status(500).send('Error happened');
        }
    }

    async checkout(req, res) {
        const rawToken = req.cookies.token ?? " ";
        try {
            const token = jwt.verify(rawToken.split(' ')[1], SECRET_KEY);
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

                if (cart.length == 0) {
                    return res.json({
                        status: false,
                        msg: "No product in cart!"
                    })
                }
                const total = cart.reduce((res, ele) => res + ( ele.product[0].price * ele.amount) ,0);
                // Create order
                const order = await orderModel.create({
                    id_user: token.id,
                    total
                })
                // Create order details
                cart.forEach(async (ele) => {
                     await orderDetailsModel.create({
                         id_order: order._id,
                         id_product: ele.id_product,
                         amount: ele.amount,
                         price: ele.product[0].price
                     })
                })
                // Remove cart
                cart.forEach(async (ele) => {
                    await cartModel.findByIdAndRemove(ele._id.toString());
                })
                // Decrease quantity available product
                cart.forEach(async (ele) => {
                    await productModel.findByIdAndUpdate(ele.product[0]._id.toString(), {$inc : {'amount' : -ele.amount}});
                })

                if (order) {
                    return res.json({
                        status: true,
                        msg: "Checkout successfully!"
                    })
                }
            }
        } catch (e) {
            return res.status(500).json({
                status: false,
                msg: 'Somethings went wrong'
            })
        }
    }
}

module.exports = new Customer();