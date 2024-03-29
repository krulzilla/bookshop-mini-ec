const express = require('express');
const router = express.Router();
const manageUsers = require('./admin/manage_user.route');
const manageProducts = require('./admin/manage_product.route');
const authController = require('../controllers/auth.controller');
const config = require('../config/layout.config').admin;

router.get('/login', (req, res) => {
    res.render('admin/login', {layout: false});
})
router.post('/login', authController.loginAdmin);

router.use(authController.isAdmin);
router.get('/logout', authController.logout);

router.get('/', (req, res) => {
    res.render('admin/dashboard', {title: 'Dashboard', currentPage: 'dashboard', ...config})
});
router.use('/user/', manageUsers);
router.use('/product/', manageProducts);

module.exports = router;