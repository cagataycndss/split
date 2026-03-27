const groupService = require('../services/groupService');

const createGroup = async (req, res) => {
    try { const group = await groupService.createGroup(req.user.id, req.body); res.status(201).json(group); }
    catch (e) { res.status(401).json({ message: e.message }); }
};
const updateGroup = async (req, res) => {
    try { await groupService.updateGroup(req.params.groupId, req.body); res.status(200).send(); }
    catch (e) { res.status(403).json({ message: e.message }); }
};
const deleteGroup = async (req, res) => {
    try { await groupService.deleteGroup(req.params.groupId); res.status(204).send(); }
    catch (e) { res.status(403).json({ message: e.message }); }
};
const getGroupMembers = async (req, res) => {
    try { const members = await groupService.getGroupMembers(req.params.groupId); res.status(200).json(members); }
    catch (e) { res.status(401).json({ message: e.message }); }
};
const addGroupMember = async (req, res) => {
    try { await groupService.addGroupMember(req.params.groupId, req.body.userId); res.status(200).send(); }
    catch (e) { res.status(401).json({ message: e.message }); }
};
const removeGroupMember = async (req, res) => {
    try { await groupService.removeGroupMember(req.params.groupId, req.params.userId); res.status(204).send(); }
    catch (e) { res.status(401).json({ message: e.message }); }
};

module.exports = { createGroup, updateGroup, deleteGroup, getGroupMembers, addGroupMember, removeGroupMember };
