const {Schema, model} = require('mongoose');

const orderSchema = new Schema({
    id: String,
    id_user: String,
    total: Number,
    status: Number,
    created_at: Date,
    updated_at: Date
})

module.exports = model('Orders', orderSchema);