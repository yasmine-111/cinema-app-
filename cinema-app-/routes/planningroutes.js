const express = require("express");
const router = express.Router(); // Create router instance
const Planning = require("../models/Planning"); // Replace with the correct path to your Planning model

// Get all planning data
router.get("/", async (req, res) => {
  try {
    const planningData = await Planning.find(); // Fetch all documents
    console.log("Fetched planning data:", planningData); // Log fetched data
    res.status(200).json(planningData); // Send response
  } catch (error) {
    console.error("Error fetching planning data:", error);
    res.status(500).json({ message: "Error fetching planning data", error: error.message });
  }
});

module.exports = router; // Export the router
