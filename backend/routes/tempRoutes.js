const express = require('express');
const router = express.Router();
const Temp = require('../models/Temp');

// Fetch all data from the 'temp' collection
router.get('/get', async (req, res) => {
  try {
    const data = await Temp.find();
    res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Server error");
  }
});

module.exports = router;
