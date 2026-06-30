const orderService = require("../services/orderService");

async function checkout(req, res) {

    try {

        const order = await orderService.checkout(req.user.userId);

        res.status(201).json(order);

    } catch (err) {

        console.error("Checkout Error:");
        console.error(err);

        res.status(500).json({
            error: err.message
        });

    }

}

async function getOrders(req, res) {

    try {

        const orders = await orderService.getOrders(req.user.userId);

        res.json(orders);

    } catch (err) {

        console.error(err);

        res.status(500).json({
            error: err.message
        });

    }

}

module.exports = {
    checkout,
    getOrders
};