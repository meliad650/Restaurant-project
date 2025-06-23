
const express = require('express');
const router = express.Router();
const controller = require('../controllers/saucesController');

router.get('/sauces', controller.getAllSauces);
router.post('/sauces', controller.addSauce);
router.put('/sauces/:id', controller.updateSauce);
router.delete('/sauces/:id', controller.deleteSauce);

module.exports = router;
