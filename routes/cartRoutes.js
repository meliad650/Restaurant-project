
const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.get('/cart/:userId', cartController.getCartByUser);
router.post('/cart', cartController.addToCart);
router.put('/cart/:id', cartController.updateQuantity);
router.delete('/cart/:id', cartController.deleteCartItem);

module.exports = router;
