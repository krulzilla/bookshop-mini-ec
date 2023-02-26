const {Schema, model} = require('mongoose');

const cartSchema = new Schema({
    id_user: String,
    id_product: String,
    amount: Number
})

module.exports = model('Cart', cartSchema);