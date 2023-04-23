const express = require('express');
const router = express.Router();
const userController = require('../../controllers/api/user.controller');

// RESTful API
router.get('/', userController.getAll);
router.get('/:id', userController.getById);
// router.post('/', )
// router.put('/:id', )
// router.delete('/:id', )

router.put('/profile/:id', userController.updateProfile);       // Update profile
router.put('/password/:id', userController.updatePassword);     // Change password

module.exports = router;