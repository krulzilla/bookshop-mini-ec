const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customer.controller');
const authController = require('../controllers/auth.controller');

router.get('/', customerController.home);
router.get('/products', customerController.products);

// Login - Register - Logout
router.get('/login', authController.loggedIn, customerController.login);
router.post('/login', authController.login);
router.get('/register', authController.loggedIn, customerController.register);
router.post('/register', authController.register);
router.get('/logout', authController.logoutCustomer)

module.exports = router;