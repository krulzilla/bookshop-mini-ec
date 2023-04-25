const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customer.controller');
const authController = require('../controllers/auth.controller');

router.get('/', customerController.home);
router.get('/products', customerController.products);
router.get('/product/:id', customerController.product);

// Login - Register - Logout
router.get('/login', authController.loggedIn, customerController.login);
router.post('/login', authController.login);
router.get('/register', authController.loggedIn, customerController.register);
router.post('/register', authController.register);
router.get('/logout', authController.logoutCustomer)

// Page after login
router.get('/profile', authController.isUser, customerController.profile);
router.get('/orders', authController.isUser, customerController.orders);
router.get('/cart', authController.isUser, customerController.cart);
router.get('/purchase', authController.isUser, customerController.purchase);
router.post('/checkout', authController.isUser, customerController.checkout);

module.exports = router;