const express = require('express');
const router = express.Router();
const userRoute = require('./user.route');
const cartRoute = require('./cart.route');
const productRoute = require('./proudct.route');
const orderRoute = require('./order.route');

router.use('/user', userRoute);
router.use('/cart', cartRoute);
router.use('/product', productRoute);
router.use('/order', orderRoute);


module.exports = router;