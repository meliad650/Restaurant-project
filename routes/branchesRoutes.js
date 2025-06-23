
const express = require('express');
const router = express.Router();
const branchesController = require('../controllers/branchesController');

router.get('/branches', branchesController.getAllBranches);
router.post('/branches', branchesController.addBranch);
router.delete('/branches/:id', branchesController.deleteBranch);

module.exports = router;
