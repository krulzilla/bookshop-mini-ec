const productModel = require('../models/product.model');

class Customer {
    async home(req, res) {
        try {
            const products = await productModel.find({});
            return res.render('index', {products: products});
        } catch (e) {
            return res.status(500).send('Error happened');
        }
    }

    async products(req, res) {
        try {
            const products = await productModel.find({});
            return res.render('products', {products: products});
        } catch (e) {
            return res.status(500).send('Error happened');
        }
    }

    async login(req, res) {
        return res.render('login', {layout: false});
    }

    async register(req, res) {
        return res.render('register', {layout: false});
    }
}

module.exports = new Customer();