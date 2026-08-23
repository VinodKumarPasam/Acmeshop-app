const pool = require("../config/db");
const orderModel = require("../models/orderModel");
const cartClient = require("../clients/cartClient");

async function checkout(userId, authHeader) {
  // Fetch cart items from Cart Service
  const cartItems = await cartClient.getCart(authHeader);

  if (!cartItems || cartItems.length === 0) {
    const error = new Error("Cart is empty");
    error.status = 400;
    throw error;
  }

  // Calculate Total
  let total = 0;
  cartItems.forEach(item => {
    total += item.quantity * Number(item.price);
  });

  // Start Transaction in orders_db
  const client = await pool.connect();
  let order;
  try {
    await client.query("BEGIN");

    // Insert Order
    const orderRes = await client.query(
      `
      INSERT INTO orders (user_id, total)
      VALUES ($1, $2)
      RETURNING *;
      `,
      [userId, total]
    );
    order = orderRes.rows[0];

    // Insert Order Items
    for (const item of cartItems) {
      await client.query(
        `
        INSERT INTO order_items (order_id, product_id, quantity, price)
        VALUES ($1, $2, $3, $4);
        `,
        [order.id, item.product_id, item.quantity, Number(item.price)]
      );
    }

    await client.query("COMMIT");
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }

  // Clear Cart via Cart Service API
  try {
    await cartClient.clearCart(authHeader);
  } catch (clearErr) {
    console.error("Failed to clear cart:", clearErr.message);
  }

  return order;
}

async function getOrders(userId) {
  return await orderModel.getOrders(userId);
}

module.exports = {
  checkout,
  getOrders
};