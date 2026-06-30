const userService = require("../services/userService");

async function signup(req, res) {

  try {

    const user = await userService.signup(req.body);

    return res.status(201).json({
      message: "User created successfully",
      user,
    });

  } catch (err) {

    console.error(err);

    return res.status(500).json({
      error: "Internal Server Error",
    });

  }
}
async function login(req, res) {

  try {

    // Extract email and password
    const { email, password } = req.body;

    // Call service
    const token =
      await userService.login(
        email,
        password
      );

    // Return JWT
    return res.json({
      token
    });

  } catch (err) {

    return res.status(401).json({
      error: err.message
    });

  }
}
// Return fresh profile data
async function profile(req, res) {

  try {

    // Get userId from JWT
    const userId =
      req.user.userId;

    // Fetch from database
    const user =
      await userService.getProfile(
        userId
      );

    return res.json({

      message:
        "Profile fetched successfully",

      user

    });

  } catch (err) {

    return res.status(404).json({
      error: err.message
    });

  }

}

module.exports = {
  signup,
  login,
  profile
};