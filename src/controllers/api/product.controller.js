const productModel = require('../../models/product.model');
const mongoose = require('mongoose');

class Product {
    async getAll(req, res) {
        try {
            const products = await productModel.find({});
            return res.json({
                status: true,
                data: products
            })
        } catch (e) {
            return res.status(500).json({
                status: false,
                msg: "Some error happened in server!"
            })
        }
    }

    async getById(req, res) {
        const id = req.params.id;
        try {
            const product = await productModel.find({id_user: id});
            return res.json({
                status: true,
                data: product
            })
        } catch (e) {
            return res.status(500).json({
                status: false,
                msg: "Some error happened in server!"
            })
        }
    }

    async pagination(req, res) {
        const pageSize = +req.query.pageSize;
        const pageNumber = +req.query.pageNumber;
        const skip = (pageNumber - 1) * pageSize;
        let category = req.query.category;
        try {
            let products, length;
            if (category) {
                // Has filter category
                category = typeof category == 'string' ? [category] : category;
                category = category.map(ele => new mongoose.Types.ObjectId(ele));
                products = await productModel.aggregate([
                    {
                        $lookup: {
                            from: 'categories',
                            localField: 'id_category',
                            foreignField: '_id',
                            as: 'category'
                        }
                    },
                    {
                      $match: {
                          id_category: {
                              $in: category
                          }
                      }
                    },
                    {
                        $skip: skip
                    },
                    {
                        $limit: pageSize,
                    }
                ]);
                length = await productModel.aggregate([
                    {
                        $match: {
                            id_category: {
                                $in: category
                            }
                        }
                    },
                    {
                        $count: 'total'
                    }
                ]);
                length = length[0].total;
            } else {
                length = await productModel.count();
                products = await productModel.aggregate([
                    {
                        $lookup: {
                            from: 'categories',
                            localField: 'id_category',
                            foreignField: '_id',
                            as: 'category'
                        }
                    },
                    {
                        $skip: skip
                    },
                    {
                        $limit: pageSize,
                    }
                ]);
            }
            return res.json({
                status: true,
                totalRow: length,
                data: products
            })
        } catch (e) {
            return res.status(500).json({
                status: false,
                msg: "Some error happened in server!"
            })
        }
    }
}


module.exports = new Product();