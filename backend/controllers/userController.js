const userService = require('../services/userService');

const updateProfile = async (req, res) => {
    try { await userService.updateProfile(req.params.userId, req.body); res.status(200).send(); }
    catch (e) { res.status(401).json({ message: e.message }); }
};
const getProfile = async (req, res) => {
    try { const user = await userService.getProfile(req.params.userId); res.status(200).json(user); }
    catch (e) { res.status(401).json({ message: e.message }); }
};
const deleteAccount = async (req, res) => {
    try { await userService.deleteAccount(req.params.userId); res.status(204).send(); }
    catch (e) { res.status(401).json({ message: e.message }); }
};
const changePassword = async (req, res) => {
    try { await userService.changePassword(req.params.userId, req.body); res.status(200).send(); }
    catch (e) { res.status(400).json({ message: e.message }); }
};
const uploadAvatar = async (req, res) => {
    try { await userService.uploadAvatar(req.params.userId, req.body); res.status(200).send(); }
    catch (e) { res.status(401).json({ message: e.message }); }
};
const updateAvatar = async (req, res) => {
    try { await userService.updateAvatar(req.params.userId, req.body); res.status(200).send(); }
    catch (e) { res.status(401).json({ message: e.message }); }
};
const deleteAvatar = async (req, res) => {
    try { await userService.deleteAvatar(req.params.userId); res.status(204).send(); }
    catch (e) { res.status(401).json({ message: e.message }); }
};
const getUserGroups = async (req, res) => {
    try { const groups = await userService.getUserGroups(req.params.userId); res.status(200).json(groups); }
    catch (e) { res.status(401).json({ message: e.message }); }
};

module.exports = { updateProfile, getProfile, deleteAccount, changePassword, uploadAvatar, updateAvatar, deleteAvatar, getUserGroups };
