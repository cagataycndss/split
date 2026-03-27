const User = require('../models/User');
const Group = require('../models/Group');

const getProfile = async (userId) => User.findById(userId);
const updateProfile = async (userId, data) => User.findByIdAndUpdate(userId, data, { new: true });
const deleteAccount = async (userId) => User.findByIdAndDelete(userId);
const changePassword = async (userId, { oldPassword, newPassword }) => {
    const user = await User.findById(userId);
    if (user.password !== oldPassword) throw new Error('Eski şifre yanlış');
    user.password = newPassword;
    await user.save();
};
const uploadAvatar = async (userId, file) => { return true; };
const updateAvatar = async (userId, file) => { return true; };
const deleteAvatar = async (userId) => User.findByIdAndUpdate(userId, { avatarUrl: null });
const getUserGroups = async (userId) => Group.find({ $or: [{ ownerId: userId }, { members: userId }] });

module.exports = { getProfile, updateProfile, deleteAccount, changePassword, uploadAvatar, updateAvatar, deleteAvatar, getUserGroups };
