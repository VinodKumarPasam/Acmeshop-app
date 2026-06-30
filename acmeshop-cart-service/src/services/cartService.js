const cartModel = require("../models/cartModel");

async function addToCart(cartItem) {
  return await cartModel.addToCart(cartItem);
}

async function getCartByUserId(userId) {
  return await cartModel.getCartByUserId(userId);
}

async function updateQuantity(id, quantity) {

  return await cartModel.updateQuantity(

    id,

    quantity

  );

}

async function removeCartItem(id) {
  return await cartModel.removeCartItem(id);
}

module.exports = {
  addToCart,
  getCartByUserId,
  updateQuantity,
  removeCartItem
};