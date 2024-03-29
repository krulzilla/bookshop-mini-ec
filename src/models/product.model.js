const {Schema, model} = require('mongoose');

const productSchema = new Schema({
    id: String,
    id_category: {
        type: Schema.Types.ObjectId,
        ref: "categories"
    },
    name: String,
    author: String,
    publisher: String,
    published_at: Date,
    amount: Number,
    description: String,
    price: Number,
    img_url: String
}, {
    timestamps: true
})

module.exports = model('Products', productSchema);