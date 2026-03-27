const Expense = require('../models/Expense');

const createManualExpense = async (groupId, paidById, { title, totalAmount }) => {
    const expense = new Expense({ groupId, paidById, title, totalAmount, items: [] });
    return expense.save();
};

const scanReceiptAndCreateExpense = async (groupId, paidById, file) => {
    const expense = new Expense({
        groupId, paidById, title: "AI Scan Sonucu Fiş", totalAmount: 150,
        items: [{ name: "Market Ürünü", category: "Gıda", price: 150 }]
    });
    return expense.save();
};

const getExpenseDetails = async (expenseId) => Expense.findById(expenseId).populate('paidById');

const deleteExpense = async (expenseId) => Expense.findByIdAndDelete(expenseId);

const addExpenseItem = async (expenseId, itemData) => {
    const expense = await Expense.findById(expenseId);
    expense.items.push(itemData);
    return expense.save();
};

const splitExpenseItem = async (expenseId, itemId, assignedUserIds) => {
    const expense = await Expense.findById(expenseId);
    const item = expense.items.id(itemId);
    if(item) {
        item.assignedUserIds = assignedUserIds;
        await expense.save();
    }
};

const calculateDebts = async (expenseId) => {
    const expense = await Expense.findById(expenseId);
    if(!expense) return [];
    
    let debts = {};
    const paidById = expense.paidById.toString();

    expense.items.forEach(item => {
        if(item.assignedUserIds && item.assignedUserIds.length > 0) {
            const splitAmount = item.price / item.assignedUserIds.length;
            item.assignedUserIds.forEach(userId => {
                const uid = userId.toString();
                if(uid !== paidById) {
                    debts[uid] = (debts[uid] || 0) + splitAmount;
                }
            });
        }
    });

    return Object.keys(debts).map(userId => ({
        fromUserId: userId,
        toUserId: paidById,
        amount: debts[userId]
    }));
};

module.exports = { createManualExpense, scanReceiptAndCreateExpense, getExpenseDetails, deleteExpense, addExpenseItem, splitExpenseItem, calculateDebts };
