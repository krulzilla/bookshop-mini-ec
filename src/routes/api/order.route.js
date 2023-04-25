const express = require('express');
const router = express.Router();
const orderController = require('../../controllers/api/order.controller')

router.get('/', orderController.getAll);
router.get('/pagination', orderController.pagination);
router.get('/details/:id', orderController.getDetails);

module.exports = router;