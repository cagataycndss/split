const express = require('express');
const router = express.Router();
const groupController = require('../controllers/groupController');
const expenseController = require('../controllers/expenseController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.post('/', groupController.createGroup);
router.put('/:groupId', groupController.updateGroup);
router.delete('/:groupId', groupController.deleteGroup);
router.get('/:groupId/members', groupController.getGroupMembers);
router.post('/:groupId/members', groupController.addGroupMember);
router.delete('/:groupId/members/:userId', groupController.removeGroupMember);

// Gider Rotalari (Vercel Serverless dosya yüklemesini bypass etmek için Base64 ile yapılıyor)
router.post('/:groupId/expenses', expenseController.createManualExpense);
router.post('/:groupId/expenses/scan', expenseController.scanReceiptAndCreateExpense);

module.exports = router;
