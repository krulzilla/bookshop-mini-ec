const express = require('express');
const router = express.Router();
const userController = require('../../controllers/user.controller');

router.get('/', userController.getAll);
router.get('/create', userController.create);
router.post('/create', userController.save);

module.exports = router;