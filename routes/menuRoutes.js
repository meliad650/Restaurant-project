
const express = require('express');
const router = express.Router();
const controller = require('../controllers/menuController');

router.get('/menu', controller.getMenuItems);
router.delete('/menu/:id', controller.deleteMenuItem);

module.exports = router;
