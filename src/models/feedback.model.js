const {Schema, model} = require('mongoose');

const feedbackSchema = new Schema({
    id_product: {
        type: Schema.Types.ObjectId,
        ref: 'products'
    },
    id_user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    id_order: {
        type: Schema.Types.ObjectId,
        ref: 'orders'
    },
    rating: Number,
    comment: String,
}, {
    timestamps: true
})

module.exports = model('Feedback', feedbackSchema);