const express = require('express');
const router = express.Router();
const testApiController = require('../controllers/testapi.controller');

router.get('/', testApiController.getAll);
router.get('/:id', testApiController.getById);
router.post('/', testApiController.create);

module.exports = router;