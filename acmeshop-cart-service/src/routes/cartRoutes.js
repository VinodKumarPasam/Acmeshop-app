const express = require("express");

const router = express.Router();

const cartController = require("../controllers/cartController");
const authenticate = require("../middleware/authMiddleware");

// All routes below require login

router.post(
    "/",
    authenticate,
    cartController.addToCart
);

router.get(
    "/",
    authenticate,
    cartController.getCart
);
router.patch(
    "/:id",
    authenticate,
    cartController.updateQuantity
);

router.delete(
    "/:id",
    authenticate,
    cartController.removeCartItem
);

router.delete(
    "/",
    authenticate,
    cartController.clearCart
);

module.exports = router;