const userService = require("../services/userService");

async function signup(req, res, next) {
  try {
    const user = await userService.signup(req.body);
    return res.status(201).json({
      message: "User created successfully",
      user,
    });
  } catch (err) {
    next(err);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const token = await userService.login(email, password);
    return res.json({
      token
    });
  } catch (err) {
    err.status = 401; // Unauthorized for invalid credentials
    next(err);
  }
}

async function profile(req, res, next) {
  try {
    const userId = req.user.userId;
    const user = await userService.getProfile(userId);
    return res.json({
      message: "Profile fetched successfully",
      user
    });
  } catch (err) {
    err.status = 404; // Not Found if user profile is missing
    next(err);
  }
}

module.exports = {
  signup,
  login,
  profile
};