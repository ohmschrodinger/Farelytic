const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Define Schema
const tempSchema = new mongoose.Schema({
  name: String,
  age: Number,
});

const Temp = mongoose.model("Temp", tempSchema);

// GET Route to Fetch Data
router.get("/", async (req, res) => {
  try {
    const data = await Temp.find();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
