const express = require('express');
const router = express.Router();
const testApiController = require('../controllers/testapi.controller');

router.get('/', testApiController.run);

module.exports = router;