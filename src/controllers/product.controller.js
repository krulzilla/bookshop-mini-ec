const productModel = require('../models/product.model');
const config = {
    title: 'Manage Products',
    ...require('../config/layout.config').admin
}

class Product {
    async getAll(req, res) {
        try {
            const products = await productModel.find({}).sort({name: -1});
            if (products) {
                return res.render('admin/view_products', {
                    currentPage: 'product.view',
                    ...config,
                    products
                });
            }
        } catch (e) {
            return res.status(500).send('Error happened: ' + e);
        }
    }

    create(req, res) {
        return res.render('admin/create_product', {
            currentPage: 'product.create',
            ...config
        });
    }

    async save(req, res) {
        try {
            const params = req.body;
            const newProduct = await productModel.create({
                id_category: "",
                name: params.name,
                author: params.author,
                publisher: params.publisher,
                published_at: params.published_at,
                amount: params.amount,
                description: params.description,
                price: parseInt(params.price) * 1000,
                img_url: params.img_url,
                created_at: Date.now(),
                updated_at: Date.now(),
            })
            if (newProduct) {
                // return res.status(201).json({
                //     status: 201,
                //     msg: "Created new product successfully!",
                // })
                return res.redirect('./create');
            }
        } catch (e) {
            return res.status(500).send('Error happened: ' + e);
        }
    }

    async update(req, res) {

    }

    async destroy(req, res) {

    }
}

module.exports = new Product();