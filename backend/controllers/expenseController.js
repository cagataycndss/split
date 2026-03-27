const expenseService = require('../services/expenseService');

const createManualExpense = async (req, res) => {
    try { const exp = await expenseService.createManualExpense(req.params.groupId, req.user.id, req.body); res.status(201).json(exp); }
    catch (e) { res.status(401).json({ message: e.message }); }
};
const scanReceiptAndCreateExpense = async (req, res) => {
    try { 
      const exp = await expenseService.scanReceiptAndCreateExpense(req.params.groupId, req.user.id, req.body); 
      res.status(201).json(exp); 
    }
    catch (e) { res.status(401).json({ message: e.message }); }
};
const getExpenseDetails = async (req, res) => {
    try { const exp = await expenseService.getExpenseDetails(req.params.expenseId); if(!exp) return res.status(404).json({message: "Not found"}); res.status(200).json(exp); }
    catch (e) { res.status(401).json({ message: e.message }); }
};
const deleteExpense = async (req, res) => {
    try { await expenseService.deleteExpense(req.params.expenseId); res.status(204).send(); }
    catch (e) { res.status(401).json({ message: e.message }); }
};
const addExpenseItem = async (req, res) => {
    try { await expenseService.addExpenseItem(req.params.expenseId, req.body); res.status(201).send(); }
    catch (e) { res.status(401).json({ message: e.message }); }
};
const splitExpenseItem = async (req, res) => {
    try { await expenseService.splitExpenseItem(req.params.expenseId, req.params.itemId, req.body.assignedUserIds); res.status(200).send(); }
    catch (e) { res.status(401).json({ message: e.message }); }
};
const calculateDebts = async (req, res) => {
    try { const debts = await expenseService.calculateDebts(req.params.expenseId); res.status(200).json(debts); }
    catch (e) { res.status(401).json({ message: e.message }); }
};

module.exports = { createManualExpense, scanReceiptAndCreateExpense, getExpenseDetails, deleteExpense, addExpenseItem, splitExpenseItem, calculateDebts };
