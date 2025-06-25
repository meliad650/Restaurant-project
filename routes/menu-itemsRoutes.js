
const express = require('express');
const router = express.Router();
const controller = require('../controllers/menuItemsController');

router.get('/', controller.getAllMenuItems);
router.get('/:id', controller.getMenuItemById);
router.post('/', controller.createMenuItem);
router.put('/:id', controller.updateMenuItemPrice);
router.delete('/:id', controller.deleteMenuItem);

module.exports = router;
