const {Schema, model} = require('mongoose');

const categorySchema = new Schema({
    name: String,
    description: String
}, {
    timestamps: true
})

module.exports = model('Categories', categorySchema);