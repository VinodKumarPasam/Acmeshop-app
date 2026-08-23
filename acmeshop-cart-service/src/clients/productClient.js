const axios = require("axios");

const PRODUCT_SERVICE_URL =
  process.env.PRODUCT_SERVICE_URL || "http://product-service:3001/api/v1/products";

async function getProduct(productId) {

  const response = await axios.get(
    `${PRODUCT_SERVICE_URL}/${productId}`
  );

  return response.data;

}

module.exports = {
  getProduct
};