
const express = require('express');
const router = express.Router();
const controller = require('../controllers/usersController');
const authenticateToken = require('../middleware/authenticateToken');

router.get('', controller.getAllUsers);
router.get('/me', authenticateToken, controller.getCurrentUser);

module.exports = router;
