const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.post('/item-categorization', aiController.categorizeItem);
router.post('/verify-price', aiController.verifyPrice);

module.exports = router;
