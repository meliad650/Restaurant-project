
const express = require('express');
const router = express.Router();
const controller = require('../controllers/orderItemsController');

router.post('/order-items', controller.addItemToOrder);
router.get('/order-items/:orderId', controller.getItemsByOrder);
router.put('/order-items/:id', controller.updateOrderItem);
router.delete('/order-items/:id', controller.deleteOrderItem);

module.exports = router;
