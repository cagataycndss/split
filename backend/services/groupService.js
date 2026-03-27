const Group = require('../models/Group');

const createGroup = async (ownerId, data) => {
    const group = new Group({ ...data, ownerId, members: [ownerId] });
    return group.save();
};
const updateGroup = async (groupId, data) => Group.findByIdAndUpdate(groupId, data, { new: true });
const deleteGroup = async (groupId) => Group.findByIdAndDelete(groupId);
const getGroupMembers = async (groupId) => {
    const group = await Group.findById(groupId).populate('members');
    return group ? group.members : [];
};
const addGroupMember = async (groupId, userId) => {
    const group = await Group.findById(groupId);
    if (!group.members.includes(userId)) {
        group.members.push(userId);
        return group.save();
    }
};
const removeGroupMember = async (groupId, userId) => {
    const group = await Group.findById(groupId);
    group.members = group.members.filter(id => id.toString() !== userId);
    return group.save();
};

module.exports = { createGroup, updateGroup, deleteGroup, getGroupMembers, addGroupMember, removeGroupMember };
