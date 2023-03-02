const express = require('express');
const router = express.Router();
const productController = require('../../controllers/product.controller');

router.get('/', productController.getAll);
router.get('/create', productController.create);
router.post('/create', productController.save);

module.exports = router;