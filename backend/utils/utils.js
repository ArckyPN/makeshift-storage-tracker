const jwt = require("jsonwebtoken")
const {SECRET} = require("../config/constants");

function verifyToken(req, res, next) {
    try {
        req.user = jwt.verify(req.headers.authorization, SECRET);
        return next()
    } catch (err) {
        console.log(err);
        return res.status(401);
    }
}

function tabulatePrices(items, prices, type) {
    let value = {};
    value.storage = items.filter(item => item.unit !== "Inventory" && item.unit !== "Collectible");
    value.storage = addUp(value.storage, prices, type) || 0;
    value.inventory = items.filter(item => item.unit === "Inventory");
    value.inventory = addUp(value.inventory, prices, type) || 0;
    value.total = value.storage + value.inventory;
    return value;
}

function addUp(items, prices, type) {
    return parseFloat(items.reduce((acc, item) => acc + item.quantity * findPrice(item, prices, type), 0).toFixed(2));
}

function findPrice(item, prices, type) {
    const price = prices.find(p => p.name === item.name);
    return price ? price[type] : 0;
}

module.exports = {
    verifyToken,
    tabulatePrices,
}