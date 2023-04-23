const model = require('../models/feedback.model')

class Api {
    async run(req, res) {
        try {
            const category = await model.create({
                id_order: '6444bcb28544deed45f0aa7c',
                id_user: '63fc5bded94c4091b1e5b953',
                id_product: '644409d1e6cece817cd57967',
                rating: 5,
                comment: 'Nice service'
            })
            if (category) {
                return res.json({
                    status: "success",
                    msg: "Created successfully!"
                })
            } else {
                return res.json({
                    status: "fail",
                    msg: "Failed when creating new!"
                })
            }
        } catch (e) {
            return res.status(500).json({
                status: "error",
                msg: e.message
            })
        }
    }
}

module.exports = new Api();
