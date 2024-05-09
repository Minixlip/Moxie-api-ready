const express = require("express");

const {
  addProduct,
  getProducts,
  getProduct,
} = require("../controllers/productController");

const router = express.Router();

// Product Route //

// Add product
router.post("/add", addProduct);

// Get all Products
router.post("/fetch", getProducts);

// Get all Products
router.post("/fetch/item", getProduct);

module.exports = router;
