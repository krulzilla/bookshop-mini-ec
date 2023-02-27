const express = require('express');
const router = express.Router();
const manageUsers = require('./admin/manage_user.route');

router.get('/', (req, res) => res.render('admin/dashboard'));
router.use('/user/', manageUsers);

module.exports = router;