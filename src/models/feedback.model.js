const {Schema, model} = require('mongoose');

const feedbackSchema = new Schema({
    id: String,
    id_product: String,
    id_user: String,
    id_order: String,
    rating: Number,
    comment: String,
    created_at: Date,
    updated_at: Date
})

module.exports = model('Feedback', feedbackSchema);