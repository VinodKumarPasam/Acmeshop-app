const cartModel = require("../models/cartModel");
const productClient = require("../clients/productClient");

// Add item
async function addToCart(cartItem) {
  return await cartModel.addToCart(cartItem);
}

// Get Cart
async function getCartByUserId(userId) {

  // Get cart items from cart_db
  const cartItems = await cartModel.getCartByUserId(userId);

  // Enrich each item with product details
  const enrichedCart = await Promise.all(

    cartItems.map(async (item) => {

      const product =
        await productClient.getProduct(item.product_id);

      return {
        ...item,
        name: product.name,
        description: product.description,
        price: product.price,
        image: product.image
      };

    })

  );

  return enrichedCart;

}

// Update quantity
async function updateQuantity(id, quantity) {

  return await cartModel.updateQuantity(
    id,
    quantity
  );

}

// Remove item
async function removeCartItem(id) {

  return await cartModel.removeCartItem(id);

}

// Clear cart
async function clearCartByUserId(userId) {
  return await cartModel.clearCartByUserId(userId);
}

module.exports = {
  addToCart,
  getCartByUserId,
  updateQuantity,
  removeCartItem,
  clearCartByUserId
};