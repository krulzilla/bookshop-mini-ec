const {Schema, model} = require('mongoose');

/*
* Order status cheatsheet
* > 0 = Customer place order
* > 1 = Order is being prepared
* > 2 = Order is being shipped
* > 3 = Order has been shipped successfully
* > 4 = Order was canceled
* */
const orderSchema = new Schema({
    id_user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    total: Number,
    status: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
})

module.exports = model('Orders', orderSchema);