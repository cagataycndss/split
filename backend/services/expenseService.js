const Expense = require('../models/Expense');

const createManualExpense = async (groupId, paidById, { title, totalAmount }) => {
    const expense = new Expense({ groupId, paidById, title, totalAmount, items: [] });
    return expense.save();
};

const { GoogleGenerativeAI } = require("@google/generative-ai");

const scanReceiptAndCreateExpense = async (groupId, paidById, file) => {
    if (!file) throw new Error("Fiş görseli bulunamadı.");
    if (!process.env.GEMINI_API_KEY) throw new Error("Sunucuda GEMINI_API_KEY tanımlı değil.");

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const imageParts = [{
        inlineData: {
            data: file.buffer.toString("base64"),
            mimeType: file.mimetype
        }
    }];

    const prompt = `Bu bir alışveriş fişidir. Verileri analiz et ve SADECE aşağıdaki formatta bir JSON objesi döndür. Asla markdown kodu kullanma.
{
  "title": "Mağaza/Market Adı",
  "totalAmount": 150.50,
  "items": [
    { "name": "Ürün 1", "category": "Gıda", "price": 50.25 }
  ]
}`;

    let parsedData;
    try {
        const result = await model.generateContent([prompt, ...imageParts]);
        const responseText = result.response.text().replace(/```json/g, '').replace(/```/g, '').trim();
        parsedData = JSON.parse(responseText);
    } catch (e) {
        console.error("Gemini okuma hatası:", e);
        throw new Error("Fiş okunamadı veya bulanık.");
    }

    const expense = new Expense({
        groupId, paidById, 
        title: parsedData.title || "Yapay Zeka Okuması", 
        totalAmount: parsedData.totalAmount || 0,
        items: parsedData.items || []
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
