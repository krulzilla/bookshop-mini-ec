const express = require('express');
const router = express.Router();
const userRoute = require('./user.route');
const cartRoute = require('./cart.route');

router.use('/user', userRoute);
router.use('/cart', cartRoute);


module.exports = router;