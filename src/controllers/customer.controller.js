const productModel = require('../models/product.model');

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

    async login(req, res) {
        const token = !!req.cookies.token;
        return res.render('login', {layout: false, token: token});
    }

    async register(req, res) {
        const token = !!req.cookies.token;
        return res.render('register', {layout: false, token: token});
    }
}

module.exports = new Customer();