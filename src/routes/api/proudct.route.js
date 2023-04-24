const express = require('express');
const router = express.Router();
const productController = require('../../controllers/api/product.controller')

router.get('/', productController.getAll);
router.get('/pagination', productController.pagination);
router.get('/:id', productController.getById);

module.exports = router;