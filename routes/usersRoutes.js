
const express = require('express');
const router = express.Router();
const controller = require('../controllers/usersController');
const authenticateToken = require('../middleware/authenticateToken');

router.get('', controller.getAllUsers);
router.get('/me', authenticateToken, controller.getCurrentUser);
router.delete('/:id',controller.deleteCartItem)
module.exports = router;
