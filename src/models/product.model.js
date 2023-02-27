const {Schema, model} = require('mongoose');

const productSchema = new Schema({
    id: String,
    id_category: String,
    name: String,
    author: String,
    publisher: String,
    published_at: Date,
    amount: Number,
    description: String,
    price: Number,
    img_url: String,
    created_at: Date,
    updated_at: Date
})

module.exports = model('Products', productSchema);