const productModel = require("../models/productModel");

// Create Product
async function createProduct(productData) {

  return await productModel.createProduct(productData);

}

// Get All Products
async function getProducts() {

  return await productModel.getProducts();

}

// Get One Product
async function getProductById(id) {

  return await productModel.getProductById(id);

}

module.exports = {
  createProduct,
  getProducts,
  getProductById
};