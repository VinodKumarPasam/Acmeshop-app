// JWT library
const jwt = require("jsonwebtoken");

// Middleware runs before controller
function authenticate(req, res, next) {

  try {

    // Get Authorization header
    const authHeader =
      req.headers.authorization;

    // Header missing
    if (!authHeader) {

      return res.status(401).json({
        error: "Token missing"
      });

    }

    // Expected format:
    // Bearer xxxxxxxxx
    const token =
      authHeader.split(" ")[1];

    // Verify token using secret
    const decoded =
      jwt.verify(
        token,
        process.env.JWT_SECRET
      );

    // Store user info in request
    req.user = decoded;

    // Continue to next layer
    next();

  } catch (err) {

    return res.status(401).json({
      error: "Invalid token"
    });

  }

}

module.exports = authenticate;