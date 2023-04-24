const express = require('express');
const router = express.Router();
const cartController = require('../../controllers/api/cart.controller')

router.get('/', cartController.getAll);
router.get('/:id', cartController.getById);
router.post('/', cartController.modify);        // Handle add to cart & modify quantity product in cart
router.delete('/:id', cartController.delete);

module.exports = router;