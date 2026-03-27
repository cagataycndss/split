const categorizeItem = async (itemName) => {
    const foodKeywords = ['ayran', 'su', 'ekmek', 'peynir'];
    const isFood = foodKeywords.some(kw => itemName.toLowerCase().includes(kw));
    return { category: isFood ? 'Gıda/İçecek' : 'Diğer' };
};

const verifyPrice = async (itemName, price) => {
    const isAnomaly = price > 500;
    return { isAnomaly, confidenceScore: 0.85 };
};

module.exports = { categorizeItem, verifyPrice };
