const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.get('/:expenseId', expenseController.getExpenseDetails);
router.delete('/:expenseId', expenseController.deleteExpense);
router.post('/:expenseId/items', expenseController.addExpenseItem);
router.post('/:expenseId/items/:itemId/split', expenseController.splitExpenseItem);
router.get('/:expenseId/calculate', expenseController.calculateDebts);

module.exports = router;
