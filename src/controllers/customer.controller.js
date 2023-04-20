const userModel = require('../models/user.model');
const productModel = require('../models/product.model');
const jwt = require('jsonwebtoken');
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
            const product = await productModel.findOne({_id: id});
            if (product) {
                return res.render('product_detail', {product: product, token: token});
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
        const token = req.cookies.token ?? " ";
        try {
            const verifyToken = jwt.verify(token.split(' ')[1], SECRET_KEY)
            if (verifyToken) {
                const user = await userModel.findOne({_id:verifyToken.id})
                if (user) {
                    return res.render('profile', {user: user, token: token})
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
        const token = !!req.cookies.token;
        return res.render('cart', {token: token})
    }
}

module.exports = new Customer();