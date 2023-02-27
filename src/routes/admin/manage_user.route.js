const express = require('express');
const router = express.Router();
const userController = require('../../controllers/user.controller');

router.get('/', userController.getAll);
router.get('/create', (req, res) => {res.render('admin/create_user')});
router.post('/create', userController.create);

module.exports = router;