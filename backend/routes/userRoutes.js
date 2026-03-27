const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.put('/:userId', userController.updateProfile);
router.get('/:userId/profile', userController.getProfile);
router.delete('/:userId/account', userController.deleteAccount);
router.put('/:userId/change-password', userController.changePassword);
router.post('/:userId/avatar', userController.uploadAvatar);
router.put('/:userId/avatar', userController.updateAvatar);
router.delete('/:userId/avatar', userController.deleteAvatar);
router.get('/:userId/groups', userController.getUserGroups);

module.exports = router;
