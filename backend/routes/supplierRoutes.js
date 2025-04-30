// routes/supplierRoutes.js
const express = require("express");
const Supplier = require("../models/Supplier");
const router = express.Router();

// ✅ CORRECT: No need to write /suppliers again here
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, address, city, state, country } = req.body;

    // Create a new supplier object
    const newSupplier = new Supplier({
      name,
      email,
      phone,
      address,
      city,
      state,
      country,
    });

    // Save supplier to the database
    await newSupplier.save();
    res.status(201).json({ message: "Supplier added successfully", supplier: newSupplier });
  } catch (error) {
    console.error("Error saving supplier:", error);
    res.status(500).json({ message: "Error saving supplier", error: error.message });
  }
});

// ✅ Also fix GET route path
router.get("/", async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    res.status(200).json(suppliers);
  } catch (error) {
    console.error("Error fetching suppliers:", error);
    res.status(500).json({ message: "Error fetching suppliers", error: error.message });
  }
});

module.exports = router;
