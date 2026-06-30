const pool = require("../config/db");

// Create Order
async function createOrder(userId, total) {

    const result = await pool.query(

        `

        INSERT INTO orders

        (user_id,total)

        VALUES ($1,$2)

        RETURNING *;

        `,

        [userId, total]

    );

    return result.rows[0];

}

// Add Order Item
async function addOrderItem(orderId, item) {

    await pool.query(

        `

        INSERT INTO order_items

        (order_id,product_id,quantity,price)

        VALUES ($1,$2,$3,$4);

        `,

        [

            orderId,

            item.product_id,

            item.quantity,

            item.price

        ]

    );

}

// Get Orders
async function getOrders(userId) {

    const result = await pool.query(

        `

        SELECT *

        FROM orders

        WHERE user_id=$1

        ORDER BY created_at DESC;

        `,

        [userId]

    );

    return result.rows;

}

module.exports = {

    createOrder,

    addOrderItem,

    getOrders

};