const pool = require("../config/db");

// Create Product
async function createProduct(productData) {

  const result = await pool.query(
    `
    INSERT INTO products
    (name, description, price)
    VALUES ($1, $2, $3)
    RETURNING *
    `,
    [
      productData.name,
      productData.description,
      productData.price
    ]
  );

  return result.rows[0];

}

// Get All Products
async function getProducts() {

  const result = await pool.query(
    `
    SELECT *
    FROM products
    ORDER BY id
    `
  );

  return result.rows;

}

// Get Product By ID
async function getProductById(id) {

  const result = await pool.query(
    `
    SELECT *
    FROM products
    WHERE id = $1
    `,
    [id]
  );

  return result.rows[0];

}

module.exports = {
  createProduct,
  getProducts,
  getProductById
};