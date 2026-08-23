const orderService = require("../services/orderService");

async function checkout(req, res, next) {
    try {
        const authHeader = req.headers.authorization;
        const order = await orderService.checkout(req.user.userId, authHeader);
        res.status(201).json(order);
    } catch (err) {
        next(err);
    }
}

async function getOrders(req, res, next) {
    try {
        const orders = await orderService.getOrders(req.user.userId);
        res.json(orders);
    } catch (err) {
        next(err);
    }
}

module.exports = {
    checkout,
    getOrders
};