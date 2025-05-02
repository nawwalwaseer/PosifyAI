const express = require("express");
const Pos = require("../models/Pos");

const router = express.Router();

// POST request to save sale data
router.post("/save", async (req, res) => {
  try {
    const {
      billId,
      storeId,
      storeName,
      organisationId,
      organisationName,
      products,
      salesTax,
      serviceCh,
      withholdingTax,
      totalQty,
      totalAmount,
      totalDiscount,
      netAmount,
    } = req.body;

    // Validate input data (you can use express-validator here for more robust validation)
    if (!billId || !storeId || !organisationId || !products || !totalAmount || !netAmount) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Save the POS data to the database
    const pos = new Pos({
      billId,
      storeId,
      storeName,
      organisationId,
      organisationName,
      products,
      salesTax,
      serviceCh,
      withholdingTax,
      totalQty,
      totalAmount,
      totalDiscount,
      netAmount,
    });

    await pos.save();
    res.status(201).json({ message: "POS data saved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error saving POS data" });
  }
});

module.exports = router;
