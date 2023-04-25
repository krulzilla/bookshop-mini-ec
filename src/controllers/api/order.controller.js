const orderModel = require('../../models/order.model');
const orderDetailModel = require('../../models/order_details.model');
const {SECRET_KEY} = require('../../config/secret_key.config');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

class Order {
    async getAll(req, res) {
        try {
            const orders = await orderModel.find({});
            return res.json({
                status: true,
                data: orders
            })
        } catch (e) {
            return res.status(500).json({
                status: false,
                msg: "Some error happened in server!"
            })
        }
    }

    async getDetails(req, res) {
        const idOrder = req.params.id;
        try {
            const details = await orderDetailModel.aggregate([
                {
                    $lookup: {
                        from: 'products',
                        localField: 'id_product',
                        foreignField: '_id',
                        as: 'product'
                    }
                },
                {
                    $match: {
                        id_order: new mongoose.Types.ObjectId(idOrder)
                    }
                }
            ]);
            if (details) {
                return res.json({
                    status: true,
                    data: details
                })
            }
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
        let status = req.query.status;
        const rawToken = req.cookies.token ?? " ";

        try {
            const token = jwt.verify(rawToken.split(' ')[1], SECRET_KEY);
            if (token) {
                const matchFilter = [{id_user: new mongoose.Types.ObjectId(token.id)}];
                if (status != -1) matchFilter[1] = {status: new mongoose.Types.Decimal128(status)};
                const orders = await orderModel.aggregate([
                    {
                        $match: {
                            $and: matchFilter
                        }
                    },
                    {
                        $sort: {createdAt: -1}
                    },
                    {
                        $skip: skip
                    },
                    {
                        $limit: pageSize,
                    }
                ]);

                let length = await orderModel.aggregate([
                    {
                        $match: {
                            $and: matchFilter
                        }
                    },
                    {
                        $count: 'total'
                    }
                ]);
                length = length[0].total;

                return res.json({
                    status: true,
                    data: orders,
                    totalRow: length
                })
            }
        } catch (e) {
            return res.status(500).json({
                status: false,
                msg: "Some error happened in server!"
            })
        }
    }
}

module.exports = new Order();