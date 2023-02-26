const {Schema, model} = require('mongoose');

const orderDetailsSchema = new Schema({
    id_order: String,
    id_product: String,
    amount: Number,
    total: Number
})

module.exports = model('Order details', orderDetailsSchema);