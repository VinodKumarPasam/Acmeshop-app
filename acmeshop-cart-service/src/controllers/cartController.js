const cartService = require("../services/cartService");

// Add item to cart
async function addToCart(req, res, next) {
  try {
    const cartItem = {
      user_id: req.user.userId,      // From JWT
      product_id: req.body.product_id,
      quantity: req.body.quantity
    };

    const item = await cartService.addToCart(cartItem);
    return res.status(201).json(item);
  } catch (err) {
    next(err);
  }
}

// View logged-in user's cart
async function getCart(req, res, next) {
  try {
    const items = await cartService.getCartByUserId(
      req.user.userId
    );
    return res.json(items);
  } catch (err) {
    next(err);
  }
}

// Update quantity of a cart item
async function updateQuantity(req, res, next) {
  try {
    const item = await cartService.updateQuantity(
      req.params.id,
      req.body.quantity
    );
    return res.json(item);
  } catch (err) {
    next(err);
  }
}

// Remove item from cart
async function removeCartItem(req, res, next) {
  try {
    const item = await cartService.removeCartItem(
      req.params.id
    );
    return res.json(item);
  } catch (err) {
    next(err);
  }
}

// Clear logged-in user's cart
async function clearCart(req, res, next) {
  try {
    await cartService.clearCartByUserId(req.user.userId);
    return res.status(204).send(); // 204 No Content for deletion
  } catch (err) {
    next(err);
  }
}

module.exports = {
  addToCart,
  getCart,
  updateQuantity,
  removeCartItem,
  clearCart
};