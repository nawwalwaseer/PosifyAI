const express = require('express');
const Purchase = require('../models/Purchase'); 

const router = express.Router();

// POST: Save a new purchase
router.post("/add", async (req, res) => {
  try {
    const purchase = new Purchase(req.body);
    await purchase.save();
    res.status(201).json({ message: "Purchase saved successfully!" });
  } catch (err) {
    res.status(500).json({ error: "Failed to save purchase", details: err.message });
  }
});

// GET: Fetch all purchases (optional)
router.get("/", async (req, res) => {
  try {
    const purchases = await Purchase.find();
    res.json(purchases);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch purchases", details: err.message });
  }
});

module.exports = router;

