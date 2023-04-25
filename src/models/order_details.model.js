const {Schema, model} = require('mongoose');

const orderDetailsSchema = new Schema({
    id_order: {
        type: Schema.Types.ObjectId,
        ref: 'orders'
    },
    id_product: {
        type: Schema.Types.ObjectId,
        ref: 'products'
    },
    amount: Number,
    price: Number
})

module.exports = model('Order_details', orderDetailsSchema);