const {Schema, model} = require('mongoose');

const cartSchema = new Schema({
    id_user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    id_product: {
        type: Schema.Types.ObjectId,
        ref: 'products'
    },
    amount: {
        type: Number,
        default: 0
    }
})

module.exports = model('Cart', cartSchema);