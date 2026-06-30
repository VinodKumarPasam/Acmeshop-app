// JWT library
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");

async function login(email, password) {

  // Find user in DB
  const user =
    await userModel.findUserByEmail(email);

  // User not found
  if (!user) {

    throw new Error(
      "Invalid email or password"
    );

  }

  // Compare entered password
  // with stored hash
  const isValidPassword =
    await bcrypt.compare(
      password,
      user.password_hash
    );

  // Password mismatch
  if (!isValidPassword) {

    throw new Error(
      "Invalid email or password"
    );

  }

  // Generate JWT token
  const token = jwt.sign(
    {
      userId: user.id,
      email: user.email,
      role: user.role
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h"
    }
  );

  return token;
}

async function signup(userData) {

  const passwordHash = await bcrypt.hash(
    userData.password,
    10
  );

  const user = await userModel.createUser({
    name: userData.name,
    email: userData.email,
    passwordHash,
  });

  return user;
}
// Get profile using userId
async function getProfile(userId) {

  // Fetch user from DB
  const user =
    await userModel.findUserById(userId);

  // User not found
  if (!user) {

    throw new Error(
      "User not found"
    );

  }

  return user;
}
module.exports = {
  signup,
  login,
  getProfile
};