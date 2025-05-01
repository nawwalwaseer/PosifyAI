const express = require("express");
const router = express.Router();
const InventoryItem = require("../models/InventoryItem");

// POST /api/inventory
router.post("/", async (req, res) => {
  try {
    const item = new InventoryItem(req.body);
    const saved = await item.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ error: "Failed to save inventory item" });
  }
});

router.get("/", async (req, res) => {
    try {
      const items = await InventoryItem.find();
      res.json(items);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch products" });
    }
  });

module.exports = router;
