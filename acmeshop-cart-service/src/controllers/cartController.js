const cartService = require("../services/cartService");

// Add item to cart
async function addToCart(req, res) {

  try {

    const cartItem = {
      user_id: req.user.userId,      // From JWT
      product_id: req.body.product_id,
      quantity: req.body.quantity
    };

    const item = await cartService.addToCart(cartItem);

    return res.status(201).json(item);

  } catch (err) {

    console.error(err);

    return res.status(500).json({
      error: err.message
    });

  }

}

// View logged-in user's cart
async function getCart(req, res) {

  try {

    const items = await cartService.getCartByUserId(
      req.user.userId
    );

    return res.json(items);

  } catch (err) {

    console.error(err);

    return res.status(500).json({
      error: err.message
    });

  }

}
//update quantity of a cart item
async function updateQuantity(req, res) {

  try {

    const item = await cartService.updateQuantity(

      req.params.id,

      req.body.quantity

    );

    return res.json(item);

  } catch (err) {

    console.error(err);

    return res.status(500).json({
      error: err.message
    });

  }

}

// Remove item from cart
async function removeCartItem(req, res) {

  try {

    const item = await cartService.removeCartItem(
      req.params.id
    );

    return res.json(item);

  } catch (err) {

    console.error(err);

    return res.status(500).json({
      error: err.message
    });

  }

}

module.exports = {
  addToCart,
  getCart,
  updateQuantity,
  removeCartItem
};