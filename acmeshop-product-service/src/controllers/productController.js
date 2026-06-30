const productService = require("../services/productService");

// Create Product
async function createProduct(req, res) {

  try {

    const product =
      await productService.createProduct(
        req.body
      );

    return res.status(201).json(product);

  } catch (err) {

    console.error(err);

    return res.status(500).json({
      error: err.message
    });

  }

}

// Get All Products
async function getProducts(req, res) {

  try {

    const products =
      await productService.getProducts();

    return res.json(products);

  } catch (err) {

    console.error(err);

    return res.status(500).json({
      error: err.message
    });

  }

}

// Get One Product
async function getProductById(req, res) {

  try {

    const product =
      await productService.getProductById(
        req.params.id
      );

    return res.json(product);

  } catch (err) {

    console.error(err);

    return res.status(500).json({
      error: err.message
    });

  }

}

module.exports = {
  createProduct,
  getProducts,
  getProductById
};