const express = require("express");
const authenticate = require("../middleware/authMiddleware");

const router = express.Router();

const userController =
require("../controllers/userController");

router.post(
  "/signup",
  userController.signup
);
router.post(
  "/login",
  userController.login
);
router.get(
  "/profile",
  authenticate,
  userController.profile
);

module.exports = router;