const pool = require("../config/db");

// Add product to cart
async function addToCart(cartItem) {

  const { user_id, product_id, quantity } = cartItem;

  // Check whether product already exists
  const existingItem = await pool.query(
    `
    SELECT *
    FROM cart_items
    WHERE user_id = $1
    AND product_id = $2
    `,
    [user_id, product_id]
  );

  // Product already exists
  if (existingItem.rows.length > 0) {

    const updated = await pool.query(
      `
      UPDATE cart_items
      SET quantity = quantity + $1
      WHERE user_id = $2
      AND product_id = $3
      RETURNING *;
      `,
      [
        quantity,
        user_id,
        product_id
      ]
    );

    return updated.rows[0];

  }

  // Insert new product
  const inserted = await pool.query(
    `
    INSERT INTO cart_items
    (
      user_id,
      product_id,
      quantity
    )
    VALUES ($1,$2,$3)
    RETURNING *;
    `,
    [
      user_id,
      product_id,
      quantity
    ]
  );

  return inserted.rows[0];

}

// Get Cart
async function getCartByUserId(userId) {

  const result = await pool.query(
    `
    SELECT

      c.id,

      c.quantity,

      p.id AS product_id,

      p.name,

      p.description,

      p.price

    FROM cart_items c

    JOIN products p
      ON c.product_id = p.id

    WHERE c.user_id = $1

    ORDER BY c.id;
    `,
    [userId]
  );

  return result.rows;

}
// Update quantity of a cart item
async function updateQuantity(id, quantity) {

  // Quantity becomes zero

  if (quantity <= 0) {

    return await removeCartItem(id);

  }

  const result = await pool.query(

    `
    UPDATE cart_items

    SET quantity = $1

    WHERE id = $2

    RETURNING *;
    `,

    [

      quantity,

      id

    ]

  );

  return result.rows[0];

}

// Remove Cart Item
async function removeCartItem(id) {

  const result = await pool.query(
    `
    DELETE FROM cart_items
    WHERE id = $1
    RETURNING *;
    `,
    [id]
  );

  return result.rows[0];

}

module.exports = {

  addToCart,

  getCartByUserId,

  updateQuantity,

  removeCartItem

};