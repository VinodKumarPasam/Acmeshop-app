const axios = require("axios");

const CART_SERVICE_URL =
  process.env.CART_SERVICE_URL || "http://cart-service:3002/api/v1/cart";

async function getCart(authHeader) {
  const response = await axios.get(CART_SERVICE_URL, {
    headers: {
      Authorization: authHeader,
    },
  });
  return response.data;
}

async function clearCart(authHeader) {
  const response = await axios.delete(CART_SERVICE_URL, {
    headers: {
      Authorization: authHeader,
    },
  });
  return response.data;
}

module.exports = {
  getCart,
  clearCart,
};
