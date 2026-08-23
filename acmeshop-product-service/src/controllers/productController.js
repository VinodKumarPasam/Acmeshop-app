const productService = require("../services/productService");

// Create Product
async function createProduct(req, res, next) {
  try {
    const product = await productService.createProduct(req.body);
    return res.status(201).json(product);
  } catch (err) {
    next(err);
  }
}

// Get All Products
async function getProducts(req, res, next) {
  try {
    const products = await productService.getProducts();
    return res.json(products);
  } catch (err) {
    next(err);
  }
}

// Get One Product
async function getProductById(req, res, next) {
  try {
    const product = await productService.getProductById(req.params.id);
    if (!product) {
      const err = new Error("Product not found");
      err.status = 404;
      return next(err);
    }
    return res.json(product);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createProduct,
  getProducts,
  getProductById
};