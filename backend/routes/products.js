// routes/products.js
const express = require("express");
const Product = require("../models/Product"); // Assuming you have a Product model

const router = express.Router();

// Route to fetch all product units
router.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    if (products) {
      return res.status(200).json(products);
    }
    return res.status(404).json({ message: "No products found." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch products." });
  }
});

module.exports = router;