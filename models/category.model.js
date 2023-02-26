const {Schema, model} = require('mongoose');

const categorySchema = new Schema({
    id: String,
    name: String,
    created_at: Date,
    updated_at: Date
})

module.exports = model('Categories', categorySchema);