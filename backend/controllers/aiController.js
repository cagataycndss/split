const aiService = require('../services/aiService');

const categorizeItem = async (req, res) => {
    try { const result = await aiService.categorizeItem(req.body.itemName); res.status(200).json(result); }
    catch (e) { res.status(401).json({ message: e.message }); }
};

const verifyPrice = async (req, res) => {
    try { const result = await aiService.verifyPrice(req.body.itemName, req.body.price); res.status(200).json(result); }
    catch (e) { res.status(401).json({ message: e.message }); }
};

module.exports = { categorizeItem, verifyPrice };
