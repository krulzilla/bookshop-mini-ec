const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    username: String,
    password: String,
    email: String,
    fullname: String,
    age: Number,
    address: String,
    phone: String,
    status: Boolean,
    is_admin: Boolean,
    created_at: Date,
    updated_at: Date
})

module.exports = model("Users", userSchema);