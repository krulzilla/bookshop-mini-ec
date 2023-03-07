const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customer.controller');

router.get('/', customerController.home);
router.get('/products', customerController.products);
router.get('/login', customerController.login);

module.exports = router;