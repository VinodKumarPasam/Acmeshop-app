const pool = require("../config/db");

const orderModel = require("../models/orderModel");

async function checkout(userId) {

    // Read Cart

    const cart = await pool.query(

        `

        SELECT

        c.product_id,

        c.quantity,

        p.price

        FROM cart_items c

        JOIN products p

        ON c.product_id=p.id

        WHERE c.user_id=$1;

        `,

        [userId]

    );

    const items = cart.rows;

    if (items.length === 0) {

        throw new Error("Cart Empty");

    }

    // Calculate Total

    let total = 0;

    items.forEach(item => {

        total += item.quantity * item.price;

    });

    // Create Order

    const order = await orderModel.createOrder(

        userId,

        total

    );

    // Insert Items

    for (const item of items) {

        await orderModel.addOrderItem(

            order.id,

            item

        );

    }

    // Clear Cart

    await pool.query(

        `

        DELETE FROM cart_items

        WHERE user_id=$1;

        `,

        [userId]

    );

    return order;

}

async function getOrders(userId) {

    return await orderModel.getOrders(userId);

}

module.exports = {

    checkout,

    getOrders

};