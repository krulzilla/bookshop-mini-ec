const express = require('express');
const router = express.Router();
const manageUsers = require('./admin/manage_user.route');
const config = require('../config/layout.config').admin;

router.get('/', (req, res) => {
    res.render('admin/dashboard', {title: 'Dashboard', currentPage: 'dashboard', ...config})
});
router.use('/user/', manageUsers);

module.exports = router;