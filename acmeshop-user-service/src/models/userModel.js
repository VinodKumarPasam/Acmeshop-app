// Import DB connection pool
const pool = require("../config/db");

async function createUser(user) {
  const { name, email, passwordHash } = user;

  const query = `
    INSERT INTO users(name,email,password_hash)
    VALUES($1,$2,$3)
    RETURNING id,name,email,role,created_at
  `;

  const values = [name, email, passwordHash];

  const result = await pool.query(query, values);

  return result.rows[0];
}

// Find user by email
async function findUserByEmail(email) {

  // Query DB
  const query = `
    SELECT *
    FROM users
    WHERE email = $1
  `;

  // Execute query
  const result = await pool.query(
    query,
    [email]
  );

  // Return first matching row
  return result.rows[0];
}
// Find user by ID
async function findUserById(id) {

  // Query database
  const query = `
    SELECT
      id,
      name,
      email,
      role,
      created_at
    FROM users
    WHERE id = $1
  `;

  // Execute query
  const result = await pool.query(
    query,
    [id]
  );

  // Return first row
  return result.rows[0];
}
module.exports = {
  createUser,
  findUserByEmail,
  findUserById
};